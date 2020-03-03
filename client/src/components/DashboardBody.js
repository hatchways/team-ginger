import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BY_POPULAR, BY_RECENT, MENTIONS_ROUTE, SEARCH_ROUTE, SEARCH_QUERY } from "../Routes";
import { LOGIN_URL, DISCONNECT_EVENT_TAG, MENTIONS_EVENT_TAG } from "../Constants";
import Mention from "./Mention";
import DashboardHead from "./DashboardHead";
import InfiniteScroll from "react-infinite-scroll-component";
import { socket } from "../sockets";

const LOADING_MESSAGE = "Loading Mentions";
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
        const actualPage = Math.max(this.state.page - (incrementPage ? 0 : 1), 1);
        const url =
            this.props.searchString !== ""
                ? `${SEARCH_ROUTE + this.state.sort}/${this.state.page}?${SEARCH_QUERY}=${this.props.searchString}`
                : `${MENTIONS_ROUTE + this.state.sort}/${actualPage}`;

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status === 401) {
                this.props.history.push(LOGIN_URL);
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

    normalizeSnippet = snippet => {
        if (snippet.length < MAX_SNIPPET_CHARACTERS) {
            return snippet;
        }
        const match = snippet.match(this.props.regex);

        if (match) {
            // Index of first match
            const index = match.index;
            // Index is in the first MSC characters
            if (index < MAX_SNIPPET_CHARACTERS) {
                return snippet.substring(0, MAX_SNIPPET_CHARACTERS) + "...";
            }
            // Index is in the last MSC characters
            else if (index > snippet.length - MAX_SNIPPET_CHARACTERS) {
                return "..." + snippet.substring(snippet.length - MAX_SNIPPET_CHARACTERS);
            }
            // Index is somewhere in the middle
            else {
                return (
                    "..." + snippet.substring(index - MAX_SNIPPET_CHARACTERS / 2, index + MAX_SNIPPET_CHARACTERS / 2) + "..."
                );
            }
        } else {
            // Could not find company name so return first MSC characters
            return snippet.substring(0, MAX_SNIPPET_CHARACTERS) + "...";
        }
    };

    normalizeTitle = title =>
        title.length > MAX_TITLE_CHARACTERS ? title.substring(0, MAX_TITLE_CHARACTERS) + "..." : title;

    render() {
        const { classes } = this.props;
        const { tabValue, mentions, hasMore } = this.state;

        const renderMentions = [];
        if (Object.entries(mentions).length !== 0) {
            Object.entries(mentions).forEach(([key, mention]) => {
                // trim long snippets and titles
                let snippet = this.normalizeSnippet(mention.snippet);
                let title = this.normalizeTitle(mention.title);

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
        if (prevProps.searchString !== this.props.searchString) {
            this.setState({ page: 1, mentions: [], hasMore: true }, () => this.fetchMentions(false));
        }
    }

    componentWillUnmount() {
        socket.off(MENTIONS_EVENT_TAG);
    }
}
export default withStyles(styles)(DashboardBody);
