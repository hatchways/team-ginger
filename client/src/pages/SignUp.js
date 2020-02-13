import React from "react";
import AccountNavBar from "../components/AccountNavBar";
import SignupForm from "../components/SignupForm";

function SignUp() {
    return (
        <div>
            <AccountNavBar accountMsg="Already have an account?" btnMsg="Login" link="login" />
            <SignupForm />
        </div>
    );
}

export default SignUp;
