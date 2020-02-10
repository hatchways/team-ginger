import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Logo from "../assets/logo.png";
import SignupForm from "../components/SignupForm";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.bgcolor
    },
    toolbar: {
        backgroundColor: theme.primary
    },
    logo_container: {
        flexGrow: 1
    },
    login_msg: {
        marginRight: theme.spacing(2)
    },
    login_btn: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        borderRadius: theme.spacing(4),
        fontSize: 12
    }
}));

function SignUp() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Box className={classes.logo_container}>
                        <img src={Logo} alt="Logo" className={classes.logo} />
                    </Box>

                    <Typography variant="subtitle1" className={classes.login_msg}>
                        Already have an account?
                    </Typography>

                    <Link href="login" color="inherit">
                        <Button variant="outlined" color="inherit" className={classes.login_btn}>
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <SignupForm />
        </div>
    );
}

export default SignUp;
