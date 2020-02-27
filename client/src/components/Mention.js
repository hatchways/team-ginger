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

export function boldNames(reg, text) {
    // g = global flag, i = ignorecase flag
    const regex = new RegExp(reg, "gi");
    const matches = text.matchAll(regex);

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
}

function Mention(props) {
    const classes = useStyles();
    const sentiment = Number(Number(props.sentiment).toFixed(2));
    const { id, img, regex, title, site, snippet } = props;

    return (
        <Link to={`dashboard/mention/${id}`} style={{ textDecoration: "none", width: "100%" }}>
            <Paper className={classes.card}>
                <img src={img} className={classes.image} alt="Thumbnail" />

                <Box className={classes.text}>
                    <Box className={classes.header}>
                        <Typography variant="body1" className={classes.title}>
                            {boldNames(regex, title)}
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
                        {boldNames(regex, snippet)}
                    </Typography>
                </Box>
            </Paper>
        </Link>
    );
}

export default Mention;
