/* Store constant values here */
const HOME_URL = "http://localhost:3000/";
export const DASHBOARD_URL = HOME_URL + "dashboard";
export const SETTINGS_URL = HOME_URL + "settings";
export const LOGIN_URL = HOME_URL + "login";
export const SIGNUP_URL = HOME_URL + "signup";
export const DIALOG_URL = DASHBOARD_URL + "/mention/";

//Server Response Constants
export const EMAIL_TAG = "email";
export const RESPONSE_TAG = "response";
export const COMPANY_NAMES_TAG = "companies";
export const SITES_TAG = "sites";

export const REDIRECT_TO_LOGIN = () => {
    if (!localStorage.getItem(COMPANY_NAMES_TAG) || !localStorage.getItem(EMAIL_TAG)) {
        window.location = LOGIN_URL;
    }
};

//Crawling Service Constants
export const REDDIT = "Reddit";
export const TWITTER = "Twitter";
export const FACEBOOK = "Facebook";

//Snackbar Variant Constants
export const GOOD_SNACKBAR = { variant: "success" };
export const BAD_SNACKBAR = { variant: "error" };
