/* Component for rendering a singlle mention on dashboard and possibly
   weekly report 
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { default as Modal } from "@material-ui/core/Dialog";
import { DIALOG_URL } from "../Constants";
import Dialog from "./Dialog";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        padding: theme.spacing(2),
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer"
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        marginLeft: theme.spacing(2)
    }
}));

function Mention(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <Paper className={classes.card} onClick={() => setOpen(true)}>
                <img src={props.img} className={classes.image} />

                <Box className={classes.text}>
                    <Typography variant="body1">{props.title}</Typography>
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
