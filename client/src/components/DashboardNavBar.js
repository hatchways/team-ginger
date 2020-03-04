/* Component for rendering the navbar on the dashboard page */

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./NavBar";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";

const useStyles = makeStyles(theme => ({
    search_bar_container: {
        margin: "auto"
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}));

function DashboardNavBar(props) {
    const classes = useStyles();

    const { children, search, filter, link } = props;

    return (
        <Navbar flexGrow="initial">
            <Box className={classes.search_bar_container}>
                <SearchBar search={search} filter={filter} />
            </Box>

            <Link to={link} className={classes.link}>
                {children}
            </Link>
        </Navbar>
    );
}

export default DashboardNavBar;
