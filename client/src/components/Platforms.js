/* Component rendering the sidebar of the dashboard page
   Users can use this component to display mentions from
   chosen platforms
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlatformCard from "./PlatformCard";

const useStyles = makeStyles(theme => ({
    platform_container: {
        backgroundColor: "white",
        borderRight: "1px solid #ddd"
    }
}));

function Platforms() {
    const classes = useStyles();
    return (
        <div className={classes.platform_container}>
            <PlatformCard />
            <PlatformCard />
            <PlatformCard />
        </div>
    );
}

export default Platforms;
