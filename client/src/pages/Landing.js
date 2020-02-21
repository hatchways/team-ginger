import { REDIRECT_TO_LOGIN, DASHBOARD_URL } from "../Constants";

function Landing() {
    REDIRECT_TO_LOGIN();
    window.location = DASHBOARD_URL;
    return;
}

export default Landing;
