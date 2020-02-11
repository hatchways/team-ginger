import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { minPasswordLength, minPasswordErrMsg, serverSignUpUrl, clientDashboardUrl, takenEmailErrMsg } from "../Constants";

const styles = theme => ({
    signup_form_container: {
        margin: "auto",
        width: "fit-content",
        backgroundColor: theme.secondary,
        marginTop: theme.spacing(4)
    },

    signup_form: {
        padding: theme.spacing(4)
    },

    signup_form__subtitle: {
        color: theme.primary
    },

    signup_form__inputs: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        padding: theme.spacing(2),
        width: 300,
        display: "block"
    },

    signup_form__btn: {
        display: "block",
        backgroundColor: theme.primary,
        color: theme.secondary,
        borderRadius: 500,
        width: 150,
        margin: "auto",
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        // Change the default hover styles
        "&:hover": {
            backgroundColor: theme.secondary,
            color: theme.primary
        }
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
            <Box className={classes.signup_form_container} borderRadius={8} boxShadow={1}>
                <form className={classes.signup_form} onSubmit={this.handleSubmit}>
                    <Typography variant="h5" align="center">
                        <Box fontWeight="fontWeightBold">Let's get Started!</Box>
                    </Typography>

                    <Typography variant="subtitle1" align="center" className={classes.signup_form__subtitle}>
                        Create an account
                    </Typography>

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

                    <Button variant="contained" type="submit" className={classes.signup_form__btn} align="center">
                        Create
                    </Button>
                </form>
            </Box>
        );
    }
}

export default withStyles(styles)(SignupForm);
