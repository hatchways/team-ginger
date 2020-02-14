import React from "react";
import AccountNavBar from "../components/AccountNavBar";
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div>
            <AccountNavBar accountMsg="Don't have an account?" btnMsg="Sign Up" link="signup" />
            <LoginForm />
        </div>
    );
}

export default Login;
