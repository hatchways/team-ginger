import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardBody from "../components/DashboardBody";

import { SETTINGS_URL, REDIRECT_TO_LOGIN } from "../Constants";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard() {
    REDIRECT_TO_LOGIN();

    const classes = useStyles();

    return (
        <React.Fragment>
            <ServiceNavBar link={SETTINGS_URL}>
                <SettingsIcon fontSize="large" />
            </ServiceNavBar>
            <div className={classes.mentions_layout}>
                <DashboardSideBar />
                <DashboardBody />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
