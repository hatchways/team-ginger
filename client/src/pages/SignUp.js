import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountNavBar from "../components/AccountNavBar";
import SignupForm from "../components/SignupForm";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.bgcolor
    }
}));

function SignUp() {
    const classes = useStyles();

    return (
        <div>
            <AccountNavBar accountMsg="Already have an account?" btnMsg="Login" link="login" />
            <SignupForm />
        </div>
    );
}

export default SignUp;
