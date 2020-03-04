/* Component for rendering the nav bar on the dashboard/settings page */

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

function ServiceNavBar(props) {
    const classes = useStyles();

    const { searchbar, children, search } = props;

    return (
        <Navbar flexGrow="initial">
            <Box className={classes.search_bar_container}>
                {searchbar && <SearchBar search={search} filter={props.filter} />}
            </Box>

            <Link to={props.link} className={classes.link}>
                {children}
            </Link>
        </Navbar>
    );
}

export default ServiceNavBar;
