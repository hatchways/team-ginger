/* Component for the sidebar of the dashboard
   Users can toggle if they want to track mentions on a particular platform
   using this component
   Just using Reddit for now
 */

import React from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Reddit from "../assets/reddit.png";

const useStyles = makeStyles(theme => ({
    card: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyItems: "center"
    },
    platform_logo: {
        width: "70%"
    },
    platform_name: {
        justifySelf: "left",
        fontWeight: "bold",
        marginLeft: theme.spacing(1)
    }
}));

function PlatformCard() {
    const classes = useStyles();

    const theme = useTheme();
    const CustomSwitch = withStyles({
        switchBase: {
            color: theme.primary,
            "&$checked": {
                color: theme.primary
            },
            "&$checked + $track": { backgroundColor: theme.primary }
        },
        checked: {},
        track: {}
    })(Switch);

    return (
        <div className={classes.card}>
            <img src={Reddit} className={classes.platform_logo} />
            <Typography className={classes.platform_name}>Reddit</Typography>
            <CustomSwitch checked={true} inputProps={{ "aria-label": "reddit checkbox" }} />
        </div>
    );
}

export default PlatformCard;