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
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import CallMadeIcon from "@material-ui/icons/CallMade";

// Map the name of a site to their logo image reference
const SITE_TO_IMG = { Reddit };

const NO_SNIPPET_MESSAGE = "There is no text for this mention";

const styles = theme => ({
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 9fr",
        padding: theme.spacing(4),
        width: "fit-content",
        maxWidth: 1000,
        margin: "auto"
    },
    image: {
        width: 100,
        height: 100
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
        this.state = { id: props.id, mention: null };
    }
    render() {
        const { classes } = this.props;

        if (this.state.mention) {
            let mention = this.state.mention;
            let snippet = mention.snippet.length !== 0 ? mention.snippet : NO_SNIPPET_MESSAGE;
            let snippetColor = mention.snippet.length !== 0 ? "initial" : "textSecondary";
            return (
                <React.Fragment>
                    <Paper className={classes.container}>
                        <img src={SITE_TO_IMG[mention.site]} className={classes.image} />

                        <Box className={classes.info}>
                            <Typography variant="h4" noWrap>
                                {mention.title}
                            </Typography>
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
                                {snippet}
                            </Typography>
                        </Box>
                    </Paper>
                </React.Fragment>
            );
        }
        return <div>Loading Mention</div>;
    }

    componentDidMount() {
        fetch(DIALOG_ROUTE + this.state.id, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            res.json().then(data => {
                if (res.status === 200) {
                    this.setState({ mention: data });
                } else {
                    console.log(res.status, data[RESPONSE_TAG]);
                }
            });
        });
    }
}

export default withStyles(styles)(Dialog);
