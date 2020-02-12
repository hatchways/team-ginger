import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountNavBar from "../components/AccountNavBar";
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.bgcolor
    }
}));

function Login() {
    const classes = useStyles();

    return (
        <div>
            <AccountNavBar accountMsg="Don't have an account?" btnMsg="Sign Up" link="signup" />
            <LoginForm />
        </div>
    );
}

export default Login;
