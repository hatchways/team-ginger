import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ServiceNavBar from "../components/ServiceNavBar";
import SettingsBody from "../components/SettingsBody";
import SettingsSideBar from "../components/SettingsSideBar";
import { DASHBOARD_URL } from "../Constants";

const useStyles = makeStyles(theme => ({
    settings_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(20%, 300px) 1fr",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "minmax(225px, 1fr) 3fr"
        },
        [theme.breakpoints.down("xs")]: {
            gridTemplateColumns: "minmax(190px, 1fr) 3fr"
        }
    }
}));

function Settings(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ServiceNavBar link={DASHBOARD_URL}>
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
