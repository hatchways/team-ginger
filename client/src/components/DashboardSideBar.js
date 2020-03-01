/* Component rendering the sidebar of the dashboard page
   Users can use this component to display mentions from
   chosen platforms
*/

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PlatformCard from "./PlatformCard";
import RedditImg from "../assets/reddit.png";
import TwitterImg from "../assets/twitter.png";
import { REDDIT, TWITTER, SITES_TAG, UPDATE_EVENT_TAG } from "../Constants";
import { socket } from "../sockets";

const PLATFORMS = [REDDIT, TWITTER];
const PLATFORM_IMAGES = [RedditImg, TwitterImg];

const styles = theme => ({
    platform_container: {
        backgroundColor: "white",
        borderRight: "1px solid #ddd"
    }
});

class DashboardSideBar extends Component {
    constructor(props) {
        super(props);
        const sites = JSON.parse(localStorage.getItem(SITES_TAG));
        this.state = { toggles: [sites[REDDIT] === true, sites[TWITTER] === true] };
    }

    render() {
        const { classes, history } = this.props;
        const { toggles } = this.state;
        const platformCards = PLATFORMS.map((platform, index) => (
            <PlatformCard
                key={index}
                site_img={PLATFORM_IMAGES[index]}
                site_name={platform}
                history={history}
                isToggled={toggles[index]}
                index={index}
            />
        ));
        return <div className={classes.platform_container}>{platformCards}</div>;
    }

    componentDidMount() {
        socket.on(UPDATE_EVENT_TAG, sites => {
            localStorage.setItem(SITES_TAG, sites);
            let parsed_sites = JSON.parse(sites);
            const { toggles } = this.state;
            let newToggles = [...toggles];
            for (let i=0; i<PLATFORMS.length; ++i)
            {
                newToggles[i] = parsed_sites[PLATFORMS[i]];
            }
            this.setState({ toggles: newToggles });
        });
    }

    componentWillUnmount() {
        socket.off(UPDATE_EVENT_TAG);
    }
}

export default withStyles(styles)(DashboardSideBar);
