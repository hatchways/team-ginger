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

    const theme = useTheme();
    const [check, setCheck] = useState(true);
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
            <img src={props.site_img} className={classes.platform_logo}  alt={"an icon image"}/>
            <Typography className={classes.platform_name}>{props.site_name}</Typography>
            <CustomSwitch
                checked={!check}
                onClick={() => {
                    setCheck(!check)
                    fetch(SITES_ROUTE + props.site_name, {
                        method: "POST"
                    }).then(res => {
                        if (res.status === 200)
                        {

                        }
                    })
                }}
                inputProps={{ "aria-label": props.site_name+"checkbox" }}
            />
        </div>
    );
}

export default PlatformCard;
