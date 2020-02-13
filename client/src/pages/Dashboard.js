import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import Platforms from "../components/Platforms";
import UserMentions from "../components/UserMentions";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ServiceNavBar link="settings">
                <SettingsIcon fontSize="large" />
            </ServiceNavBar>
            <div className={classes.mentions_layout}>
                <Platforms />
                <UserMentions />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
