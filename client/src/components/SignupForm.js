import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { USERS_ROUTE } from "../Routes";
import { DASHBOARD_URL, EMAIL_TAG, COMPANY_NAMES_TAG, SITES_TAG } from "../Constants";
import AccountForm from "../components/AccountForm";

const MIN_PASSWORD_LENGTH = 7;
const MIN_PASSWORD_ERR_MSG = `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
const TAKEN_EMAIL_ERR_MSG = "That email is already taken";

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
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.name = React.createRef();
        this.password = React.createRef();
        // Using state to keep track of errors and respond appropriately
        this.state = { emailErr: false, passwordErr: false, emailErrMsg: "", passwordErrMsg: "" };
    }

    // Remove Error messages on change
    handleChange = isPassword => {
        if (isPassword) {
            this.setState({ passwordErr: false, passwordErrMsg: "" });
        } else {
            this.setState({ emailErr: false, emailErrMsg: "" });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        let email = this.email.current.value;
        let name = this.name.current.value;
        let password = this.password.current.value;

        if (this.validate(email, password)) {
            fetch(USERS_ROUTE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, companies: name, password })
            })
                .then(res => {
                    // Token received => success
                    if (res.status === 201) {
                        res.json().then(data => {
                            localStorage.setItem(EMAIL_TAG, data[EMAIL_TAG]);
                            localStorage.setItem(COMPANY_NAMES_TAG, data[COMPANY_NAMES_TAG]);
                            localStorage.setItem(SITES_TAG, JSON.stringify(data[SITES_TAG]));
                            window.location = DASHBOARD_URL;
                        });
                    }
                    // Assume failure means the email is taken
                    else {
                        this.setState({
                            emailErr: true,
                            emailErrMsg: TAKEN_EMAIL_ERR_MSG,
                            passwordErr: false,
                            passwordErrMsg: ""
                        });
                    }
                })
                .catch(err => console.error("Error: ", err));
        }
    };

    // Helper function to check for incorrect inputs (short password, invalid character, etc)
    validate = (email, password) => {
        let valid = true;
        if (password.length < MIN_PASSWORD_LENGTH) {
            this.setState({ passwordErr: true, passwordErrMsg: MIN_PASSWORD_ERR_MSG });
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
                    onChange={() => this.handleChange(false)}
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
                    onChange={() => this.handleChange(true)}
                />
            </AccountForm>
        );
    }
}

export default withStyles(styles)(SignupForm);
