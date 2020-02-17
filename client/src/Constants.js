/* Store constant values here */

export const minPasswordLength = 6;
export const minPasswordErrMsg = `Your password must be at least ${minPasswordLength} characters long`;
export const takenEmailErrMsg = "That email is already taken";
export const IncorrectErrMsg = "Incorrect email or password";

const clientUrl = "http://localhost:3000/";
export const serverSignUpUrl = "/users";
export const serverLoginUrl = "/login";
export const serverLogoutUrl = "/logout";
export const clientDashboardUrl = clientUrl + "dashboard";
export const clientLoginUrl = clientUrl + "login";
