import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import ServiceNavBar from "../components/ServiceNavBar";

const useStyles = makeStyles(theme => ({}));

function Settings(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ServiceNavBar link="dashboard">
                <ViewListIcon fontSize="large" />
            </ServiceNavBar>
        </React.Fragment>
    );
}

export default Settings;
