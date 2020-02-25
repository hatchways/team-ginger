import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Mention from "./Mention";
import { MENTIONS_ROUTE } from "../Routes";
import Reddit from "../assets/reddit.png";
import { RESPONSE_TAG } from "../Constants";
import InfiniteScroll from "react-infinite-scroll-component";

const LOADING_MESSAGE = "Loading Mentions";
// Map the name of a site to their logo image reference
const SITE_TO_IMG = { Reddit };

// Max character limit of mention title and snippet
const MAX_TITLE_CHARACTERS = 100;
const MAX_SNIPPET_CHARACTERS = 1000;

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

class UserMentions extends Component {
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
                        data.forEach((mention, index) => (newMentions[numEntries++] = mention));
                        this.setState({ mentions: newMentions, page: page + 1 });
                    } else {
                        console.log(res.status, data[RESPONSE_TAG]);
                    }
                });
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { tabValue, mentions, hasMore } = this.state;

        const renderMentions = [];
        if (Object.entries(mentions).length !== 0) {
            Object.entries(mentions).forEach(([key, mention]) => {
                // trim long snippets and titles
                let snippet =
                    mention.snippet.length > MAX_SNIPPET_CHARACTERS
                        ? mention.snippet.substring(0, MAX_SNIPPET_CHARACTERS) + "..."
                        : mention.snippet;
                let title =
                    mention.title.length > MAX_TITLE_CHARACTERS
                        ? mention.title.substring(0, MAX_TITLE_CHARACTERS) + "..."
                        : mention.title;
                renderMentions.push(
                    <Mention
                        key={mention.id}
                        id={mention.id}
                        img={SITE_TO_IMG[mention.site]}
                        title={title}
                        snippet={snippet}
                        site={mention.site}
                        sentiment={mention.sentiment}
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
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.updatePlatforms !== prevProps.updatePlatforms) {
            // platforms have changed so populate mentions table again
            this.componentDidMount();
        }
    }

    componentDidMount() {
        // make request to populate mentions table
        fetch(MENTIONS_ROUTE, { method: "POST", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(data => {
                this.fetchMentions();
            });
    }
}

export default withStyles(styles)(UserMentions);
