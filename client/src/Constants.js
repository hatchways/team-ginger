/* Store constant values here */

export const minPasswordLength = 6;
export const minPasswordErrMsg = `Your password must be at least ${minPasswordLength} characters long`;
export const takenEmailErrMsg = "That email is already taken";
export const IncorrectErrMsg = "Incorrect email or password";

const serverUrl = "http://localhost:5000/";
const clientUrl = "http://localhost:3000/";
export const serverSignUpUrl = serverUrl + "user";
export const serverLoginUrl = serverUrl + "login";
export const clientDashboardUrl = clientUrl + "dashboard";
