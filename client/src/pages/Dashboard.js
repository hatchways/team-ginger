import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/NavBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import SearchBar from "../components/SearchBar";
import Platforms from "../components/Platforms";
import UserMentions from "../components/UserMentions";

const useStyles = makeStyles(theme => ({
    search_bar_container: {
        margin: "auto"
    },
    search_bar: {
        color: "black",
        backgroundColor: "white",
        width: 400
    },
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr"
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Navbar flexGrow="initial">
                <Box className={classes.search_bar_container}>
                    <SearchBar className={classes.search_bar} />
                </Box>

                <Link href="settings" color="inherit">
                    <Button variant="outlined" color="inherit">
                        Settings
                    </Button>
                </Link>
            </Navbar>
            <div className={classes.mentions_layout}>
                <Platforms />
                <UserMentions />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
