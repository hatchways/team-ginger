/* Component rendering the sidebar of the dashboard page
   Users can use this component to display mentions from
   chosen platforms
*/

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PlatformCard from "./PlatformCard";
import RedditImg from "../assets/reddit.png";
import TwitterImg from "../assets/twitter.png";
import { REDDIT, TWITTER, SITES_TAG } from "../Constants";
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

    handleToggle = index => {
        const { toggles } = this.state;
        let newToggles = toggles;
        newToggles[index] = !toggles[index];
        let sites = JSON.parse(localStorage.getItem(SITES_TAG));
        sites[PLATFORMS[index]] = toggles[index];
        localStorage.setItem(SITES_TAG, JSON.stringify(sites));
        this.setState({ toggles: newToggles });
    };

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
                toggle={() => this.handleToggle(index)}
            />
        ));
        return <div className={classes.platform_container}>{platformCards}</div>;
    }

    componentDidMount() {
        socket.on("update", (crawler_toggle_index) => {
            this.handleToggle(crawler_toggle_index);
        });
    }
}

export default withStyles(styles)(DashboardSideBar);
