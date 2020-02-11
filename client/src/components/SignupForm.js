import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { minPasswordLength, minPasswordErrMsg, serverSignUpUrl, clientDashboardUrl, takenEmailErrMsg } from "../Constants";
import AccountForm from "../components/AccountForm";

const styles = theme => ({
    signup_form__inputs: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        width: 300,
        display: "block"
    }
});

class SignupForm extends Component {
    constructor() {
        super();
        this.email = React.createRef();
        this.name = React.createRef();
        this.password = React.createRef();
        // Using state to keep track of errors and respond appropriately
        this.state = { emailErr: false, passwordErr: false, emailErrMsg: "", passwordErrMsg: "" };
    }

    handleSubmit = e => {
        e.preventDefault();

        let email = this.email.current.value;
        let name = this.name.current.value;
        let password = this.password.current.value;

        if (this.validate(email, password)) {
            fetch(serverSignUpUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, name, password })
            })
                .then(res => res.json())
                .then(data => {
                    // Token received => success
                    console.log(data);
                    if (data["token"]) {
                        localStorage.setItem("token", data["token"]);
                        window.location = clientDashboardUrl;
                    }
                    // Assume failure means the email is taken
                    this.setState({ emailErr: true, emailErrMsg: takenEmailErrMsg, passwordErr: false, passwordErrMsg: "" });
                })
                .catch(err => console.error("Error: ", err));
        }
    };

    // Helper function to check for incorrect inputs (short password, invalid character, etc)
    validate = (email, password) => {
        let valid = true;
        if (password.length < minPasswordLength) {
            this.setState({ passwordErr: true, passwordErrMsg: minPasswordErrMsg });
            valid = false;
        }
        return valid;
    };

    render() {
        const { classes } = this.props;
        return (
            <AccountForm mainMsg="Let's get Started!" subMsg="Create an account" btnMsg="Create" submit={this.handleSubmit}>
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
                    placeholder="Your company name"
                    inputProps={{ "aria-label": "company name" }}
                    required
                    inputRef={this.name}
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

export default withStyles(styles)(SignupForm);
