import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
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
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
        padding: theme.spacing(2),
        // Give the inputs that 'pill' outline
        borderRadius: 500,
        width: 300
    },

    signup_form__btn: {
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
}));

function SignupForm() {
    const classes = useStyles();

    return (
        <Box className={classes.signup_form_container} borderRadius={8} boxShadow={1}>
            <FormControl className={classes.signup_form} autoComplete="off">
                <Typography variant="h5" align="center">
                    <Box fontWeight="fontWeightBold">Let's get Started!</Box>
                </Typography>

                <Typography variant="subtitle1" align="center" className={classes.signup_form__subtitle}>
                    Create an account
                </Typography>

                <Box border={1} className={classes.signup_form__inputs}>
                    <Input placeholder="Your email" type="email" inputProps={{ "aria-label": "email" }} disableUnderline />
                </Box>

                <Box border={1} className={classes.signup_form__inputs}>
                    <Input placeholder="Your company name" inputProps={{ "aria-label": "company name" }} disableUnderline />
                </Box>

                <Box border={1} className={classes.signup_form__inputs}>
                    <Input
                        placeholder="Your password"
                        type="password"
                        inputProps={{ "aria-label": "password" }}
                        disableUnderline
                    />
                </Box>

                <Button variant="contained" className={classes.signup_form__btn} align="center">
                    Create
                </Button>
            </FormControl>
        </Box>
    );
}

export default SignupForm;
