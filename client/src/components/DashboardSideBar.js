/* Component rendering the sidebar of the dashboard page
   Users can use this component to display mentions from
   chosen platforms
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlatformCard from "./PlatformCard";
import RedditImg from "../assets/reddit.png";
import TwitterImg from "../assets/twitter.png";
import { REDDIT, TWITTER } from "../Constants";

const useStyles = makeStyles(theme => ({
    platform_container: {
        backgroundColor: "white",
        borderRight: "1px solid #ddd"
    }
}));

function DashboardSideBar() {
    const classes = useStyles();
    return (
        <div className={classes.platform_container}>
            <PlatformCard site_img={RedditImg} site_name={REDDIT} />
            <PlatformCard site_img={TwitterImg} site_name={TWITTER} />
        </div>
    );
}

export default DashboardSideBar;
