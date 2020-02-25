/* Store constant values here */
import React from "react";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import SvgIcon from "@material-ui/core/SvgIcon";

// Given a sentiment value in [-1, 1] return an appropriate Icon
export function SentimentToIcon(sentiment) {
    // neutral
    if (Math.abs(sentiment) < 0.2) {
        return (
            <SvgIcon fontSize="large">
                <path d="M9 14h6v1.5H9z" />
                <circle cx="15.5" cy="9.5" r="1.5" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </SvgIcon>
        );
    }
    if (sentiment < 0) {
        if (sentiment < -0.8) {
            return <SentimentVeryDissatisfiedOutlinedIcon fontSize="large" />;
        }
        if (sentiment < -0.5) {
            return <SentimentVeryDissatisfiedIcon fontSize="large" />;
        }
        return <SentimentDissatisfiedIcon fontSize="large" />;
    } else {
        if (sentiment > 0.8) {
            return <SentimentVerySatisfiedOutlinedIcon fontSize="large" />;
        }
        if (sentiment > 0.5) {
            return <SentimentVerySatisfiedIcon fontSize="large" />;
        }
        return <SentimentSatisfiedAltIcon fontSize="large" />;
    }
}

// Client URL Constants
const HOME_URL = "http://localhost:3000/";
export const DASHBOARD_URL = HOME_URL + "dashboard";
export const SETTINGS_URL = HOME_URL + "settings";
export const LOGIN_URL = HOME_URL + "login";
export const SIGNUP_URL = HOME_URL + "signup";
export const DIALOG_URL = DASHBOARD_URL + "/mention/";

export const REDIRECT_TO_LOGIN = () => {
    if (!localStorage.getItem("names") || !localStorage.getItem("email")) {
        window.location = LOGIN_URL;
    }
};

//Server Response Constants
export const EMAIL_TAG = "email";
export const RESPONSE_TAG = "response";
export const COMPANY_NAMES_TAG = "names";
export const SITES_TAG = "sites";

//Crawling Service Constants
export const REDDIT = "Reddit";
export const TWITTER = "Twitter";
export const FACEBOOK = "Facebook";

//Snackbar Variant Constants
export const GOOD_SNACKBAR = { variant: "success" };
export const BAD_SNACKBAR = { variant: "error" };
