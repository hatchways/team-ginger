import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BY_POPULAR, BY_RECENT, MENTIONS_ROUTE, SEARCH_QUERY } from "../Routes";
import { LOGIN_URL, DISCONNECT_EVENT_TAG, MENTIONS_EVENT_TAG } from "../Constants";
import Mention from "./Mention";
import DashboardHead from "./DashboardHead";
import InfiniteScroll from "react-infinite-scroll-component";
import { socket } from "../sockets";

const LOADING_MESSAGE = "Loading Mentions";
const NO_MENTION_MESSAGE = "There's nothing here! Make sure you have at least one platform tracked";
// Max character limit of mention title and snippet
const MAX_TITLE_CHARACTERS = 100;
const MAX_SNIPPET_CHARACTERS = 280;

const styles = theme => ({
    container: {
        width: "90%",
        margin: `${theme.spacing(4)}px auto`
    },
    grid: {
        width: "100%",
        boxSizing: "border-box",
        maxWidth: 800,
        margin: "auto",
        paddingRight: theme.spacing(10),
        display: "grid",
        justifyItems: "center",
        gridGap: theme.spacing(2),
        height: "70vh"
    },
    empty_msg: {
        alignSelf: "center",
        marginBottom: theme.spacing(10)
    }
});

class DashboardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            page: 1,
            sort: BY_RECENT,
            mentions: [],
            hasMore: true,
            regex: props.regex
        };
    }

    handleTabChange = tabValue => {
        if (this.state.tabValue !== tabValue) {
            const sort = tabValue === 0 ? BY_RECENT : BY_POPULAR;
            this.setState({ tabValue, page: 1, mentions: [], hasMore: true, sort }, () => this.fetchMentions(false));
        }
    };

    fetchMentions = (incrementPage = true) => {
        const { searchString, filters, history } = this.props;
        const actualPage = Math.max(this.state.page - (incrementPage ? 0 : 1), 1);
        const platformFilters = Object.entries(filters)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
        const url = `${MENTIONS_ROUTE + this.state.sort}/${actualPage}?${SEARCH_QUERY}=${searchString}&${platformFilters}`;

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status === 401) {
                history.push(LOGIN_URL);
            } else if (res.ok) {
                res.json().then(data => {
                    console.log(data);
                    // concatenate the new mentions
                    let hasMore = !data.end;
                    let mentions = data.mentions;

                    if (hasMore || mentions.length > Object.entries(this.state.mentions).length) {
                        this.setState({
                            mentions: mentions,
                            page: actualPage + 1,
                            hasMore: hasMore
                        });
                        return;
                    }
                    // there was no new mentions to fetch
                    this.setState({ hasMore });
                });
            }
        });
    };

    summarizeString = (string, limit) => {
        if (string.length < limit) {
            return string;
        }
        const match = string.match(this.props.regex);

        if (match) {
            // Index of first match
            const index = match.index;
            // Index is in the first limit characters
            if (index < limit) {
                return string.substring(0, limit) + "...";
            }
            // Index is in the last limit characters
            else if (index > string.length - limit) {
                return "..." + string.substring(string.length - limit);
            }
            // Index is somewhere in the middle
            else {
                return "..." + string.substring(index - limit / 2, index + limit / 2) + "...";
            }
        } else {
            // Could not find company name so return first limit characters
            return string.substring(0, limit) + "...";
        }
    };

    render() {
        const { classes } = this.props;
        const { tabValue, mentions, hasMore } = this.state;

        const renderMentions = [];
        if (Object.entries(mentions).length !== 0) {
            Object.entries(mentions).forEach(([key, mention]) => {
                // summarize long snippets and titles
                let snippet = this.summarizeString(mention.snippet, MAX_SNIPPET_CHARACTERS);
                let title = this.summarizeString(mention.title, MAX_TITLE_CHARACTERS);

                renderMentions.push(
                    <Mention
                        key={key}
                        id={mention.id}
                        img={mention.thumbnail}
                        title={title}
                        snippet={snippet}
                        site={mention.site}
                        sentiment={mention.sentiment}
                        bold={this.props.bold}
                    />
                );
            });
        } else {
            return (
                <Typography variant="h5" align="center" color="textSecondary" className={classes.empty_msg}>
                    {NO_MENTION_MESSAGE}
                </Typography>
            );
        }
        return (
            <div className={classes.container}>
                <DashboardHead
                    tab={tabValue}
                    click1={() => this.handleTabChange(0)}
                    click2={() => this.handleTabChange(1)}
                />

                <InfiniteScroll
                    className={classes.grid}
                    dataLength={renderMentions.length}
                    next={this.fetchMentions}
                    hasMore={hasMore}
                    height={"70vh"}
                    loader={
                        <Typography variant="h5" align="center" color="textSecondary">
                            {LOADING_MESSAGE}
                        </Typography>
                    }
                >
                    {renderMentions}
                </InfiniteScroll>
            </div>
        );
    }

    componentDidMount() {
        this.fetchMentions(false);
        socket.on(MENTIONS_EVENT_TAG, () => {
            console.log("fetching new mentions");
            this.fetchMentions(false);
        });
        socket.on(DISCONNECT_EVENT_TAG, () => {
            console.log("connection was lost, attempting to reconnect");
            socket.open();
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchString !== this.props.searchString || prevProps.filters !== this.props.filters) {
            this.setState({ page: 1, mentions: [], hasMore: true }, () => this.fetchMentions(false));
        }
    }

    componentWillUnmount() {
        socket.off(MENTIONS_EVENT_TAG);
    }
}
export default withStyles(styles)(DashboardBody);
