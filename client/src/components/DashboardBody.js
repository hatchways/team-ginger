import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { MENTIONS_ROUTE } from "../Routes";
import Reddit from "../assets/reddit.png";
import { RESPONSE_TAG, LOGIN_URL } from "../Constants";
import Mention from "./Mention";
import Dialog from "./Dialog";
import DashboardHead from "./DashboardHead";
import InfiniteScroll from "react-infinite-scroll-component";

const LOADING_MESSAGE = "Loading Mentions";
// Map the name of a site to their logo image reference
const SITE_TO_IMG = { Reddit };
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
        // Get regex containing each of the company names as the whole word
        const expression = props.names.map(name => "\\b" + name + "\\b").join("|");
        this.state = {
            tabValue: 1,
            page: 0,
            mentions: {},
            hasMore: true,
            fetched: false,
            // g = global flag, i = ignorecase flag
            regex: new RegExp(expression, "i"),
            globalRegex: new RegExp(expression, "gi")
        };
    }

    handleTabChange = tabValue => {
        // Insert sorting code here
        this.setState({ tabValue });
    };

    // Find the company names using regex and bold them
    boldNames = text => {
        const matches = text.matchAll(this.state.globalRegex);

        // Collect the indices of the bold words
        let Indices = [];
        for (const match of matches) {
            Indices.push(match.index);
            Indices.push(match.index + match[0].length);
        }

        // Bold the words by wrapping a strong tag around them
        let result = [];
        let index = 0;
        for (let i = 0; i < Indices.length; i += 2) {
            // Push unbolded string
            result.push(<React.Fragment key={i}>{text.substring(index, Indices[i])}</React.Fragment>);
            // Push bolded name
            result.push(
                <Box component="strong" key={i + 1}>
                    {text.substring(Indices[i], Indices[i + 1])}
                </Box>
            );
            index = Indices[i + 1];
        }
        result.push(<React.Fragment key={-1}>{text.substring(index)}</React.Fragment>);
        return result;
    };

    fetchMentions = () => {
        const { page, mentions } = this.state;
        fetch(MENTIONS_ROUTE + "/" + page, { method: "GET", headers: { "Content-Type": "application/json" } }).then(res => {
            if (res.status === 204) {
                // no more mentions to fetch
                this.setState({ hasMore: false, fetched: true });
            } else if (res.status === 401) {
                this.props.history.push(LOGIN_URL);
            } else {
                res.json().then(data => {
                    if (res.status === 200) {
                        // concatenate the new mentions
                        let newMentions = mentions;
                        let numEntries = Object.entries(newMentions).length;
                        data.forEach(mention => (newMentions[numEntries++] = mention));
                        this.setState({ mentions: newMentions, page: page + 1, fetched: true });
                    } else {
                        console.log(res.status, data[RESPONSE_TAG]);
                    }
                });
            }
        });
    };

    normalizeSnippet = snippet => {
        if (snippet.length < MAX_SNIPPET_CHARACTERS) {
            return snippet;
        }
        const match = snippet.match(this.state.regex);
        if (match) {
            // Index of first match
            const index = match.index;
            // Index is in the first MSC characters
            if (index < MAX_SNIPPET_CHARACTERS) {
                return snippet.substring(0, MAX_SNIPPET_CHARACTERS);
            }
            // Index is in the last MSC characters
            else if (index > snippet.length - MAX_SNIPPET_CHARACTERS) {
                return snippet.substring(snippet.length - MAX_SNIPPET_CHARACTERS);
            }
            // Index is somewhere in the middle
            else {
                return snippet.substring(index - MAX_SNIPPET_CHARACTERS / 2, index + MAX_SNIPPET_CHARACTERS / 2);
            }
        } else {
            // Could not find company name so return first MSC characters
            return snippet.substring(0, MAX_SNIPPET_CHARACTERS);
        }
    };

    normalizeTitle = title => (title > MAX_TITLE_CHARACTERS ? title.substring(0, MAX_TITLE_CHARACTERS) + "..." : title);

    render() {
        const { classes } = this.props;
        const { tabValue, mentions, hasMore, fetched } = this.state;

        const renderMentions = [];
        if (Object.entries(mentions).length !== 0) {
            Object.entries(mentions).forEach(([key, mention]) => {
                // trim long snippets and titles
                let snippet = this.normalizeSnippet(mention.snippet);
                let title = this.normalizeTitle(mention.title);

                renderMentions.push(
                    <Mention
                        key={mention.id}
                        id={mention.id}
                        img={SITE_TO_IMG[mention.site]}
                        title={title}
                        snippet={snippet}
                        site={mention.site}
                        sentiment={mention.sentiment}
                        bold={this.boldNames}
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
                    {renderMentions.length !== 0 ? <hr></hr> : ""}
                </InfiniteScroll>

                {fetched && (
                    <Route
                        path={`/dashboard/mention/:id`}
                        component={props => (
                            <Dialog id={props.match.params.id} history={props.history} bold={this.boldNames} />
                        )}
                    />
                )}
            </div>
        );
    }

    componentDidMount() {
        this.fetchMentions();
    }
}
export default withStyles(styles)(DashboardBody);
