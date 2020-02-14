import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Mention from "./Mention";

const useStyles = makeStyles(theme => ({
    container: {
        width: "90%",
        margin: `${theme.spacing(4)}px auto`
    },
    top_section: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 800,
        margin: `0 auto ${theme.spacing(4)}px auto`
    },
    mention_header: {
        flexGrow: 1
    },
    mention_tabs: {
        backgroundColor: theme.secondary,
        // High border radius to give a 'pill' look
        borderRadius: 500
    },
    mention_tab: {
        borderRadius: 500
    },
    tab_active: {
        backgroundColor: theme.primary,
        color: "white"
    },
    tab_inactive: {
        backgroundColor: "transparent",
        color: theme.primary
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

    const [tabValue, setTab] = useState(0);
    return (
        <div className={classes.container}>
            <div className={classes.top_section}>
                <Typography variant="h4" className={classes.mention_header}>
                    My Mentions
                </Typography>
                <div className={classes.mention_tabs}>
                    <Tab
                        label="Most Recent"
                        className={`${classes.mention_tab} ${tabValue === 0 ? classes.tab_active : classes.tab_inactive}`}
                        onClick={() => setTab(0)}
                    />
                    <Tab
                        label="Most Popular"
                        className={`${classes.mention_tab} ${tabValue === 1 ? classes.tab_active : classes.tab_inactive}`}
                        onClick={() => setTab(1)}
                    />
                </div>
            </div>
            <div className={classes.grid}>
                <Mention />
                <Mention />
            </div>
        </div>
    );
}
