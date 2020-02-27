/* Component for rendering a single mention on dashboard and possibly
   weekly report 
*/

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { SentimentToIcon } from "../Constants";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        padding: theme.spacing(2),
        width: "100%",
        boxSizing: "border-box"
    },
    header: {
        display: "flex"
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(1)
    },
    icon: {
        color: theme.primary
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        marginLeft: theme.spacing(2),
        wordBreak: "break-word",
        width: "100%"
    }
}));

function Mention(props) {
    const classes = useStyles();
    const sentiment = Number(Number(props.sentiment).toFixed(2));
    const { id, img, regex, title, site, snippet, bold } = props;

    return (
        <Link to={`dashboard/mention/${id}`} style={{ textDecoration: "none", width: "100%" }}>
            <Paper className={classes.card}>
                <img src={img} className={classes.image} alt="Thumbnail" />

                <Box className={classes.text}>
                    <Box className={classes.header}>
                        <Typography variant="body1" className={classes.title}>
                            {bold(regex, title)}
                        </Typography>

                        <Tooltip
                            title={`Score: ${Number(sentiment * 100).toFixed()}`}
                            placement="top"
                            aria-label="Sentiment score"
                            className={classes.icon}
                        >
                            {SentimentToIcon(sentiment)}
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        {site}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {bold(regex, snippet)}
                    </Typography>
                </Box>
            </Paper>
        </Link>
    );
}

export default Mention;
