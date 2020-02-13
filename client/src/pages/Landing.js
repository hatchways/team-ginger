import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div>
            This is the landing page. Click <Link to="signup">here</Link> to go to the signup page. Click{" "}
            <Link to="login">here</Link> to go to the login page.
        </div>
    );
}
