import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
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

function AccountNavBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Box className={classes.logo_container}>
                    <img src={Logo} alt="Logo" className={classes.logo} />
                </Box>

                <Typography variant="subtitle1" className={classes.login_msg}>
                    {props.accountMsg}
                </Typography>

                <Link href={props.link} color="inherit">
                    <Button variant="outlined" color="inherit" className={classes.login_btn}>
                        {props.btnMsg}
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default AccountNavBar;
