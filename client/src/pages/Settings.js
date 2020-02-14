import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ServiceNavBar from "../components/ServiceNavBar";
import SettingsBody from "../components/SettingsBody";
import SettingsSideBar from "../components/SettingsSideBar";

const useStyles = makeStyles(theme => ({
    settings_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Settings(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ServiceNavBar link="dashboard">
                <ViewListIcon fontSize="large" />
            </ServiceNavBar>
            <div className={classes.settings_layout}>
                <SettingsSideBar />
                <SettingsBody />
            </div>
        </React.Fragment>
    );
}

export default Settings;
