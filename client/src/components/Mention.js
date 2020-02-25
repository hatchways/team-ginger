/* Component for rendering a singlle mention on dashboard and possibly
   weekly report 
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { default as Modal } from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import { SentimentToIcon } from "../Constants";
import Dialog from "./Dialog";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        padding: theme.spacing(2),
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer"
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
    const [open, setOpen] = useState(false);
    const sentiment = Number(Number(props.sentiment).toFixed(2));
    return (
        <React.Fragment>
            <Paper className={classes.card} onClick={() => setOpen(true)}>
                <img src={props.img} className={classes.image} />

                <Box className={classes.text}>
                    <Box className={classes.header}>
                        <Typography variant="body1" className={classes.title}>
                            {props.title}
                        </Typography>

                        <Tooltip
                            title={`Score: ${sentiment * 100}`}
                            placement="top"
                            aria-label="Sentiment score"
                            className={classes.icon}
                        >
                            {SentimentToIcon(props.sentiment)}
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        {props.site}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {props.snippet}
                    </Typography>
                </Box>
            </Paper>
            <Modal open={open} onClose={() => setOpen(false)} maxWidth="xl" scroll="paper">
                <Dialog id={props.id} />
            </Modal>
        </React.Fragment>
    );
}

export default Mention;
