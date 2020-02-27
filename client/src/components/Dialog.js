/* Component for rendering the detailed view of a mention
   when the user clicks on a mention
*/
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DIALOG_ROUTE } from "../Routes";
import { RESPONSE_TAG } from "../Constants";
import Reddit from "../assets/reddit.png";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { default as Modal } from "@material-ui/core/Dialog";
import MentionContainer from "./MentionContainer";
import MentionHeader from "./MentionHeader";

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
    render() {
        const { classes, regex, bold, history } = this.props;
        const { mention, message } = this.state;

        if (mention) {
            const snippet = mention.snippet.length !== 0 ? mention.snippet : NO_SNIPPET_MESSAGE;
            const snippetColor = mention.snippet.length !== 0 ? "initial" : "textSecondary";

            return (
                <Modal
                    open={true}
                    onClose={() => {
                        history.push("/dashboard");
                    }}
                    maxWidth="xl"
                    scroll="paper"
                >
                    <MentionContainer container={classes.container} img={SITE_TO_IMG[mention.site]}>
                        <Box className={classes.info}>
                            <MentionHeader
                                variant="h4"
                                noWrap={true}
                                bold={bold}
                                regex={regex}
                                title={mention.title}
                                sentiment={mention.sentiment}
                            />

                            <Typography variant="h5" color="textSecondary">
                                {mention.site}
                            </Typography>
                            <Typography variant="h5" color="textSecondary">
                                Hits: {mention.hits}
                            </Typography>
                            <Link href={mention.url} variant="h5">
                                Source <CallMadeIcon />
                            </Link>
                            <br></br>
                            <br></br>
                        </Box>

                        <Box className={classes.snippet}>
                            <Typography variant="body1" color={snippetColor}>
                                {bold(regex, snippet)}
                            </Typography>
                        </Box>
                    </MentionContainer>
                </Modal>
            );
        }
        return (
            <Modal
                open={true}
                onClose={() => {
                    this.props.history.push("/dashboard");
                }}
                maxWidth="xl"
                scroll="paper"
            >
                <MentionContainer container={classes.simpleContainer}>
                    <Typography variant="h5" color={"textSecondary"}>
                        {message}
                    </Typography>
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
