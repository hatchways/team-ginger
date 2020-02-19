import React from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import ServiceNavBar from "../components/ServiceNavBar";
import { DASHBOARD_URL, LOGIN_URL } from "../Constants";
import Dialog from "../components/Dialog";

function DialogView(props) {
    if (!localStorage.getItem("names") || !localStorage.getItem("email")) {
        window.location = LOGIN_URL;
    }
    return (
        <React.Fragment>
            <ServiceNavBar link={DASHBOARD_URL} noSearch={true}>
                <ViewListIcon fontSize="large" />
            </ServiceNavBar>
            <br></br>
            <Dialog id={Number(props.match.params.id)} />
        </React.Fragment>
    );
}

export default DialogView;
