import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AccountForm from "./AccountForm";
import { serverLoginUrl, IncorrectErrMsg, clientDashboardUrl } from "../Constants";

const styles = theme => ({
    signup_form__inputs: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        width: 300,
        display: "block"
    }
});

class LoginForm extends Component {
    constructor() {
        super();
        this.email = React.createRef();
        this.password = React.createRef();
        // Using state to keep track of errors and respond appropriately
        this.state = { emailErr: false, passwordErr: false, emailErrMsg: "", passwordErrMsg: "" };
    }

    handleSubmit = e => {
        e.preventDefault();

        let email = this.email.current.value;
        let password = this.password.current.value;

        fetch(serverLoginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                // Token received => success
                if (data["token"]) {
                    localStorage.setItem("token", data["token"]);
                    window.location = clientDashboardUrl;
                } else {
                    this.setState({
                        emailErr: true,
                        emailErrMsg: IncorrectErrMsg,
                        passwordErr: true,
                        passwordErrMsg: IncorrectErrMsg
                    });
                }
            })
            .catch(err => console.error("Error: ", err));
    };

    render() {
        const { classes } = this.props;
        return (
            <AccountForm mainMsg="Welcome back!" subMsg="Login to your account" btnMsg="Log in" submit={this.handleSubmit}>
                <TextField
                    className={classes.signup_form__inputs}
                    variant="outlined"
                    fullWidth
                    placeholder="Your email"
                    type="email"
                    inputProps={{ "aria-label": "email" }}
                    required
                    inputRef={this.email}
                    error={this.state.emailErr}
                    helperText={this.state.emailErrMsg}
                />

                <TextField
                    className={classes.signup_form__inputs}
                    variant="outlined"
                    fullWidth
                    placeholder="Your password"
                    type="password"
                    inputProps={{ "aria-label": "password" }}
                    required
                    inputRef={this.password}
                    error={this.state.passwordErr}
                    helperText={this.state.passwordErrMsg}
                />
            </AccountForm>
        );
    }
}

export default withStyles(styles)(LoginForm);
