import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import ServiceNavBar from "../components/ServiceNavBar";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardBody from "../components/DashboardBody";
import Dialog from "../components/Dialog";
import {
    SETTINGS_URL,
    LOGIN_URL,
    COMPANY_NAMES_TAG,
    EMAIL_TAG,
    SITES_TAG,
    LOGIN_EVENT_TAG,
    DISCONNECT_EVENT_TAG,
    CONNECT_EVENT_TAG
} from "../Constants";
import { socket } from "../sockets";

const useStyles = makeStyles(theme => ({
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    }
}));

function Dashboard(props) {
    const classes = useStyles();

    const [searchString, setSearch] = useState("");

    if (localStorage.getItem(COMPANY_NAMES_TAG) && localStorage.getItem(EMAIL_TAG) && localStorage.getItem(SITES_TAG)) {
        const names = localStorage.getItem(COMPANY_NAMES_TAG).split(",");
        socket.on(CONNECT_EVENT_TAG, () => {
            console.log("connected");
        });
        if (socket.disconnected) {
            socket.open();
            socket.emit(LOGIN_EVENT_TAG, localStorage.getItem(EMAIL_TAG));
        }

        const expression = names.map(name => "\\b" + name + "\\b").join("|");
        // g = global flag, i = ignorecase flag
        const regex = new RegExp(expression, "i");
        const globalRegex = new RegExp(expression, "gi");

        const boldNames = text => {
            const matches = text.matchAll(globalRegex);

            // Collect the indices of the bold words
            let Indices = [];
            for (const match of matches) {
                Indices.push(match.index);
                Indices.push(match.index + match[0].length);
            }

            // Bold the words by wrapping a strong tag around them
            let result = [];
            let index = 0;
            for (let i = 0; i < Indices.length; i += 2) {
                // Push unbolded string
                result.push(<React.Fragment key={i}>{text.substring(index, Indices[i])}</React.Fragment>);
                // Push bolded name
                result.push(
                    <Box component="strong" key={i + 1}>
                        {text.substring(Indices[i], Indices[i + 1])}
                    </Box>
                );
                index = Indices[i + 1];
            }
            result.push(<React.Fragment key={-1}>{text.substring(index)}</React.Fragment>);
            return result;
        };

        return (
            <React.Fragment>
                <ServiceNavBar link={SETTINGS_URL} search={setSearch} searchbar={true}>
                    <SettingsIcon fontSize="large" />
                </ServiceNavBar>
                <div className={classes.mentions_layout}>
                    <DashboardSideBar history={props.history} />
                    <DashboardBody history={props.history} regex={regex} bold={boldNames} searchString={searchString} />
                    <Route
                        path={`/dashboard/mention/:id`}
                        component={props => <Dialog id={props.match.params.id} history={props.history} bold={boldNames} />}
                    />
                </div>
            </React.Fragment>
        );
    }
    if (socket.connected) {
        socket.off(DISCONNECT_EVENT_TAG);
        socket.close();
    }

    return <Redirect to={LOGIN_URL} />;
}

export default Dashboard;
