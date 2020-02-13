import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Link from "@material-ui/core/Link";
import Logo from "../assets/logo.png";
import SearchBar from "../components/SearchBar";
import PlatformCard from "../components/PlatformCard";
import UserMentions from "../components/UserMentions";

const useStyles = makeStyles(theme => ({
    toolbar: {
        backgroundColor: theme.primary
    },
    search_bar_container: {
        margin: "auto"
    },
    search_bar: {
        color: "black",
        backgroundColor: "white",
        width: 400
    },
    login_msg: {
        marginRight: theme.spacing(2)
    },
    login_btn: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        borderRadius: theme.spacing(4),
        fontSize: 12
    },
    mentions_layout: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 2fr) 7fr"
    },
    grid: {
        // The default MUI grid has a -2px margin and was causing alignment issues
        margin: "0 2px", // This fixed it
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: "white"
    },
    grid_tile: {
        borderBottom: "1px solid #ddd",
        borderRight: "1px solid #ddd"
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Box className={classes.logo_container}>
                        <img src={Logo} alt="Logo" className={classes.logo} />
                    </Box>

                    <Box className={classes.search_bar_container}>
                        <SearchBar className={classes.search_bar} />
                    </Box>

                    <Link href="settings" color="inherit">
                        <Button variant="outlined" color="inherit" className={classes.login_btn}>
                            Settings
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.mentions_layout}>
                <div className={classes.grid}>
                    <GridList cols={1}>
                        <GridListTile className={classes.grid_tile}>
                            <PlatformCard />
                        </GridListTile>
                        <GridListTile className={classes.grid_tile}>
                            <PlatformCard />
                        </GridListTile>
                        <GridListTile className={classes.grid_tile}>
                            <PlatformCard />
                        </GridListTile>
                    </GridList>
                </div>
                <UserMentions />
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
