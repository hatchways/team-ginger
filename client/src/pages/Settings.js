import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ViewListIcon from "@material-ui/icons/ViewList";
import ServiceNavBar from "../components/ServiceNavBar";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsBody from "../components/SettingsBody";

const useStyles = makeStyles(theme => ({
    settings_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr",
        height: "100%"
    },
    tab_container: {
        backgroundColor: "white",
        borderRight: "1px solid #ddd",
        padding: theme.spacing(6)
    },
    title_container: {
        position: "relative",
        marginBottom: theme.spacing(4)
    },
    title: {
        display: "inline",
        fontWeight: "bold"
    },
    icon: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: theme.spacing(1),
        color: theme.primary
    },
    tab: {
        padding: `${theme.spacing(2)}px 0`
    },
    tab_active: {
        color: theme.primary
    },
    tab_inactive: {
        color: "initial"
    }
}));

function Settings(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ServiceNavBar link="dashboard">
                <ViewListIcon fontSize="large" />
            </ServiceNavBar>
            <div className={classes.settings_layout}>
                <div className={classes.tab_container}>
                    <Box className={classes.title_container}>
                        <Typography variant="h4" className={classes.title}>
                            Settings
                        </Typography>
                        <SettingsIcon className={classes.icon} fontSize="large" />
                    </Box>
                    <Typography varaint="body2" className={`${classes.tab} ${classes.tab_active}`}>
                        Company
                    </Typography>
                    <Typography varaint="body2" className={classes.tab}>
                        Security
                    </Typography>
                    <Typography varaint="body2" className={classes.tab}>
                        Log out
                    </Typography>
                </div>
                <SettingsBody />
            </div>
        </React.Fragment>
    );
}

export default Settings;
