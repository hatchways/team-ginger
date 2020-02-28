/* Component for rendering the detailed view of a mention
   when the user clicks on a mention
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DIALOG_ROUTE } from "../Routes";
import { RESPONSE_TAG, DASHBOARD_URL } from "../Constants";
import Reddit from "../assets/reddit.png";
import Box from "@material-ui/core/Box";
import { default as Modal } from "@material-ui/core/Dialog";
import MentionContainer from "./MentionContainer";
import MentionHeader from "./MentionHeader";
import MentionInfo from "./MentionInfo";
import MentionText from "./MentionText";

// Map the name of a site to their logo image reference
const SITE_TO_IMG = { Reddit };

const LOADING_MESSAGE = "Loading Mention";
const NOT_FOUND_MESSAGE = "No Mention Found";
const NO_SNIPPET_MESSAGE = "There is no text for this mention";

const styles = theme => ({
    simpleContainer: {
        padding: theme.spacing(4),
        margin: "auto"
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 9fr",
        gridGap: theme.spacing(2),
        padding: theme.spacing(4),
        width: "fit-content",
        maxWidth: 1000,
        margin: "auto"
    },
    info: {
        marginLeft: theme.spacing(2),
        maxWidth: 900
    },
    snippet: {
        gridColumn: "span 2",
        wordBreak: "break-word"
    }
});

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id, mention: null, message: LOADING_MESSAGE };
    }

    handleClose = () => {
        this.props.history.push(DASHBOARD_URL);
    };
    render() {
        const { classes, bold } = this.props;
        const { mention, message } = this.state;

        if (mention) {
            const snippet = mention.snippet.length !== 0 ? mention.snippet : NO_SNIPPET_MESSAGE;
            const snippetColor = mention.snippet.length !== 0 ? "initial" : "textSecondary";
            const { site, hits, url } = mention;

            return (
                <Modal open={true} onClose={this.handleClose} maxWidth="xl" scroll="paper">
                    <MentionContainer container={classes.container} img={SITE_TO_IMG[mention.site]}>
                        <Box className={classes.info}>
                            <MentionHeader
                                variant="h4"
                                noWrap={true}
                                bold={bold}
                                title={mention.title}
                                sentiment={mention.sentiment}
                            />
                            <MentionInfo
                                siteVariant="h5"
                                site={site}
                                hitsVariant="h5"
                                hits={hits}
                                url={url}
                                urlVariant="h5"
                            />
                        </Box>

                        <Box className={classes.snippet}>
                            <MentionText variant="body1" color={snippetColor} bold={bold} text={snippet} />
                        </Box>
                    </MentionContainer>
                </Modal>
            );
        }
        return (
            <Modal open={true} onClose={this.handleClose} maxWidth="xl" scroll="paper">
                <MentionContainer container={classes.simpleContainer}>
                    <MentionText variant="h5" color="textSecondary" text={message} />
                </MentionContainer>
            </Modal>
        );
    }

    componentDidMount() {
        fetch(DIALOG_ROUTE + this.state.id, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            res.json().then(data => {
                if (res.status === 200) {
                    this.setState({ mention: data });
                } else if (res.status === 404) {
                    this.setState({ message: NOT_FOUND_MESSAGE });
                } else {
                    console.log(res.status, data[RESPONSE_TAG]);
                }
            });
        });
    }
}

export default withStyles(styles)(Dialog);
