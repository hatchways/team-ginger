import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import Platforms from "../components/Platforms";
import UserMentions from "../components/UserMentions";
import { SETTINGS_URL, LOGIN_URL } from "../Constants";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    if (!localStorage.getItem("names") || !localStorage.getItem("email")) {
        window.location = LOGIN_URL;
    }
    return (
        <React.Fragment>
            <ServiceNavBar link={SETTINGS_URL}>
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
