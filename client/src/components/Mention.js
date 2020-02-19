/* Component for rendering a singlle mention on dashboard and possibly
   weekly report 
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { DIALOG_URL } from "../Constants";

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
    return (
        <Paper className={classes.card} onClick={() => (window.location = DIALOG_URL + props.id)}>
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
    );
}

export default Mention;
