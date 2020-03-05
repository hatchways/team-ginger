/* Store constant values here */
import Reddit from "./assets/reddit.png";
import Twitter from "./assets/twitter.png";

// Client URL Constants
export const DASHBOARD_URL = "/dashboard";
export const SETTINGS_URL = "settings";
export const LOGIN_URL = "login";
export const SIGNUP_URL = "signup";

//Server Response Constants
export const EMAIL_TAG = "email";
export const RESPONSE_TAG = "response";
export const COMPANY_NAMES_TAG = "companies";
export const SITES_TAG = "sites";

//Crawling Service Constants
export const REDDIT = "Reddit";
export const TWITTER = "Twitter";
export const FACEBOOK = "Facebook";

//Snackbar Variant Constants
export const GOOD_SNACKBAR = { variant: "success" };
export const BAD_SNACKBAR = { variant: "error" };

//Crawler platforms
export const PLATFORMS = [REDDIT, TWITTER];
//Platform images map
export const SITE_TO_IMG = { Reddit, Twitter };

//Socket Events
export const SAVE_EVENT_TAG = "save";
export const UPDATE_EVENT_TAG = "update";
export const LOGIN_EVENT_TAG = "login";
export const DISCONNECT_EVENT_TAG = "disconnect";
export const CONNECT_EVENT_TAG = "connect";
export const MENTIONS_EVENT_TAG = "mentions";
