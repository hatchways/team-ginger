/* Component for rendering a singlle mention on dashboard and possibly
   weekly report 
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Reddit from "../assets/reddit.png";

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        padding: theme.spacing(2),
        width: "100%",
        boxSizing: "border-box"
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        marginLeft: theme.spacing(2)
    }
}));

function Mention() {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <img src={Reddit} className={classes.image} />

            <Box className={classes.text}>
                <Typography variant="body1">Paypal invested $500 million into Company ABC</Typography>
                <Typography variant="body2" color="textSecondary">
                    Facebook
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Man Paypal made a really huge mistake
                </Typography>
            </Box>
        </Paper>
    );
}

export default Mention;
