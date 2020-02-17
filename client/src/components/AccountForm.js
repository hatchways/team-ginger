import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    signup_form_container: {
        margin: "auto",
        width: "fit-content",
        backgroundColor: "white",
        marginTop: theme.spacing(4)
    },

    signup_form: {
        padding: theme.spacing(4)
    },

    signup_form__subtitle: {
        color: theme.primary
    },

    signup_form__btn: {
        display: "block",
        borderRadius: 500,
        width: 150,
        margin: "auto",
        marginTop: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

function AccountForm(props) {
    const classes = useStyles();

    return (
        <Box className={classes.signup_form_container} borderRadius={8} boxShadow={1}>
            <form className={classes.signup_form} onSubmit={props.submit}>
                <Typography variant="h5" align="center">
                    <Box fontWeight="fontWeightBold">{props.mainMsg}</Box>
                </Typography>

                <Typography variant="subtitle1" align="center" className={classes.signup_form__subtitle}>
                    {props.subMsg}
                </Typography>

                {props.children}

                <Button type="submit" className={classes.signup_form__btn}>
                    {props.btnMsg}
                </Button>
            </form>
        </Box>
    );
}

export default AccountForm;
