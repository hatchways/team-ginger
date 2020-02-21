import { LOGIN_URL, DASHBOARD_URL } from "../Constants";

function Landing() {
    if (!localStorage.getItem("names") || !localStorage.getItem("email")) {
        window.location = LOGIN_URL;
    } else {
        window.location = DASHBOARD_URL;
    }
    return;
}

export default Landing;
