import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardBody from "../components/DashboardBody";
import { SETTINGS_URL, LOGIN_URL, COMPANY_NAMES_TAG, EMAIL_TAG, SITES_TAG, LOGIN_EVENT_TAG, DISCONNECT_EVENT_TAG, CONNECT_EVENT_TAG } from "../Constants";
import {socket} from "../sockets";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard(props) {
    const classes = useStyles();

    if (localStorage.getItem(COMPANY_NAMES_TAG) && localStorage.getItem(EMAIL_TAG) && localStorage.getItem(SITES_TAG)) {
        const names = localStorage.getItem(COMPANY_NAMES_TAG).split(",");
        socket.on(CONNECT_EVENT_TAG, () => {
            console.log("connected")
        });
        if (socket.disconnected)
        {
            socket.open();
            socket.emit(LOGIN_EVENT_TAG, localStorage.getItem(EMAIL_TAG));
        }
        return (
            <React.Fragment>
                <ServiceNavBar link={SETTINGS_URL}>
                    <SettingsIcon fontSize="large" />
                </ServiceNavBar>
                <div className={classes.mentions_layout}>
                    <DashboardSideBar history={props.history} />
                    <DashboardBody names={names} history={props.history} />
                </div>
            </React.Fragment>
        );
    }
    if (socket.connected)
    {
        socket.off(DISCONNECT_EVENT_TAG);
        socket.close();
    }

    return <Redirect to={LOGIN_URL} />;
}

export default Dashboard;
