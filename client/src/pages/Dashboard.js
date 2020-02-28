import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardBody from "../components/DashboardBody";
import { SETTINGS_URL, LOGIN_URL, COMPANY_NAMES_TAG, EMAIL_TAG, SITES_TAG } from "../Constants";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard() {
    const classes = useStyles();

    if (localStorage.getItem(COMPANY_NAMES_TAG) && localStorage.getItem(EMAIL_TAG) && localStorage.getItem(SITES_TAG)) {
        // Insert Socket connection here

        const names = localStorage.getItem(COMPANY_NAMES_TAG).split(",");
        return (
            <React.Fragment>
                <ServiceNavBar link={SETTINGS_URL}>
                    <SettingsIcon fontSize="large" />
                </ServiceNavBar>
                <div className={classes.mentions_layout}>
                    <DashboardSideBar />
                    <DashboardBody names={names} />
                </div>
            </React.Fragment>
        );
    }

    return <Redirect to={LOGIN_URL} />;
}

export default Dashboard;
