import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Mention from "./Mention";

const useStyles = makeStyles(theme => ({
    container: {
        width: "90%",
        margin: `${theme.spacing(4)}px auto`
    },
    top_section: {
        width: "100%",
        maxWidth: 800,
        margin: `0 auto ${theme.spacing(12)}px auto`
    },
    mention_header: {
        float: "left"
    },
    mention_btn: {
        float: "right",
        margin: theme.spacing(1)
    },
    grid: {
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        display: "grid",
        justifyItems: "center",
        gridGap: theme.spacing(2)
    }
}));

export default function UserMentions() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.top_section}>
                <Typography variant="h5" className={classes.mention_header}>
                    My Mentions
                </Typography>
                <Button variant="outlined" className={classes.mention_btn}>
                    most recent
                </Button>
                <Button variant="outlined" className={classes.mention_btn}>
                    most recent
                </Button>
            </div>
            <div className={classes.grid}>
                <Mention />
                <Mention />
            </div>
        </div>
    );
}
