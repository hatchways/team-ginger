import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import { MENTIONS_ROUTE } from "../Routes";
import Reddit from "../assets/reddit.png";
import { RESPONSE_TAG, COMPANY_NAMES_TAG } from "../Constants";
import Mention from "./Mention";
import Dialog from "./Dialog";
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
    top_section: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 800,
        margin: `0 auto ${theme.spacing(4)}px auto`
    },
    mention_header: {
        flexGrow: 1
    },
    mention_tabs: {
        backgroundColor: theme.secondary,
        // High border radius to give a 'pill' look
        borderRadius: 500
    },
    mention_tab: {
        borderRadius: 500
    },
    tab_active: {
        backgroundColor: theme.primary,
        color: "white"
    },
    tab_inactive: {
        backgroundColor: "transparent",
        color: theme.primary
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
            tabValue: 1,
            page: 0,
            mentions: {},
            hasMore: true
        };
    }

    fetchMentions = () => {
        const { page, mentions } = this.state;

        fetch(MENTIONS_ROUTE + "/" + page, { method: "GET", headers: { "Content-Type": "application/json" } }).then(res => {
            if (res.status === 204) {
                // no more mentions to fetch
                this.setState({ hasMore: false });
            } else {
                res.json().then(data => {
                    if (res.status === 200) {
                        // concatenate the new mentions
                        let newMentions = mentions;
                        let numEntries = Object.entries(newMentions).length;
                        data.forEach(mention => (newMentions[numEntries++] = mention));
                        this.setState({ mentions: newMentions, page: page + 1 });
                    } else {
                        console.log(res.status, data[RESPONSE_TAG]);
                    }
                });
            }
        });
    };

    normalizeSnippet = (snippet, regex) => {
        if (snippet.length < MAX_SNIPPET_CHARACTERS) {
            return snippet;
        }
        const match = snippet.match(regex);
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
            // Could not find company name so return first
            return snippet.substring(0, MAX_SNIPPET_CHARACTERS);
        }
    };

    normalizeTitle = title => (title > MAX_TITLE_CHARACTERS ? title.substring(0, MAX_TITLE_CHARACTERS) + "..." : title);

    render() {
        const { classes } = this.props;
        const { tabValue, mentions, hasMore } = this.state;
        const names = localStorage.getItem(COMPANY_NAMES_TAG).split(",");
        // Get regex containing each of the company names as the whole word
        let reg = names.map(name => "\\b" + name + "\\b");
        reg = reg.join("|");
        // g = global flag, i = ignorecase flag
        const regex = new RegExp(reg, "i");
        const globalRegex = new RegExp(reg, "gi");

        const renderMentions = [];
        if (Object.entries(mentions).length !== 0) {
            Object.entries(mentions).forEach(([key, mention]) => {
                // trim long snippets and titles
                let snippet = this.normalizeSnippet(mention.snippet, regex);

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
                        regex={reg}
                    />
                );
            });
        }

        return (
            <div className={classes.container}>
                <div className={classes.top_section}>
                    <Typography variant="h4" className={classes.mention_header}>
                        My Mentions
                    </Typography>
                    <div className={classes.mention_tabs}>
                        <Tab
                            label="Most Recent"
                            className={`${classes.mention_tab} ${
                                tabValue === 0 ? classes.tab_active : classes.tab_inactive
                            }`}
                            onClick={() => this.setState({ tabValue: 0 })}
                        />
                        <Tab
                            label="Most Popular"
                            className={`${classes.mention_tab} ${
                                tabValue === 1 ? classes.tab_active : classes.tab_inactive
                            }`}
                            onClick={() => this.setState({ tabValue: 1 })}
                        />
                    </div>
                </div>
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

                <Route
                    path={`/dashboard/mention/:id`}
                    component={props => <Dialog id={props.match.params.id} regex={globalRegex} history={props.history} />}
                />
            </div>
        );
    }

    componentDidMount() {
        this.fetchMentions();
    }
}

export default withStyles(styles)(DashboardBody);
