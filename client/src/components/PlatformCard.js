/* Component for the sidebar items of the dashboard
   Users can toggle if they want to track mentions on a particular platform
   using this component
   Just using Reddit for now
 */

import React, { useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { SITES_ROUTE } from "../Routes";
import { RESPONSE_TAG, SITES_TAG, GOOD_SNACKBAR, BAD_SNACKBAR, REDDIT } from "../Constants";
import { useSnackbar } from "notistack";

const CRAWLING_MESSAGE = (site, isEnabled) => `${site} crawling has been ${isEnabled ? "enabled" : "disabled"}`;

const useStyles = makeStyles(theme => ({
    card: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyItems: "center",
        borderBottom: "1px solid #ddd"
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

function PlatformCard(props) {
    const classes = useStyles();
    const { site_name, site_img, updatePlatforms, setUpdate } = props;
    const theme = useTheme();
    let sites = JSON.parse(localStorage.getItem(SITES_TAG));
    const [check, setCheck] = useState(sites[site_name] ? sites[site_name] : false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // When the user clicks the toggle
    const handleClick = () => {
        // Disable eveything but reddit for now
        if (site_name !== REDDIT) {
            enqueueSnackbar("Not implemented yet", BAD_SNACKBAR);
            return;
        }
        fetch(SITES_ROUTE + site_name, {
            method: "POST"
        }).then(res => {
            if (res.status === 200) {
                sites[props.site_name] = !check;
                localStorage.setItem(SITES_TAG, JSON.stringify(sites));
                setCheck(!check);
                enqueueSnackbar(CRAWLING_MESSAGE(site_name, !check), GOOD_SNACKBAR);
                setUpdate(1 - updatePlatforms);
            } else {
                res.json().then(data => {
                    console.log(res.status, data[RESPONSE_TAG]);
                    enqueueSnackbar(data[RESPONSE_TAG], BAD_SNACKBAR);
                });
            }
        });
    };

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
            <img src={site_img} className={classes.platform_logo} alt={"an icon image"} />
            <Typography className={classes.platform_name}>{site_name}</Typography>
            <CustomSwitch checked={check} onClick={handleClick} inputProps={{ "aria-label": site_name + "checkbox" }} />
        </div>
    );
}

export default PlatformCard;
