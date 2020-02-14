/* Component for rendering the sidebar of the settings page
   Users can use this component to logout or switch tabs
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsTab from "./SettingsTab";

const useStyles = makeStyles(theme => ({
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
    }
}));

function SettingsSideBar() {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const tabNames = ["Company", "Security", "Log out"];
    const tabs = tabNames.map((name, tabIndex) => (
        <SettingsTab key={name} active={index === tabIndex} click={() => setIndex(tabIndex)}>
            {name}
        </SettingsTab>
    ));

    return (
        <div className={classes.tab_container}>
            <Box className={classes.title_container}>
                <Typography variant="h4" className={classes.title}>
                    Settings
                </Typography>
                <SettingsIcon className={classes.icon} fontSize="large" />
            </Box>
            {tabs}
        </div>
    );
}

export default SettingsSideBar;
