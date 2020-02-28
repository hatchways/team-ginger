import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    search_container: {
        position: "relative"
    },
    search_bar: {
        borderRadius: "20px",
        padding: "5px 20px"
    },
    search_icon: {
        cursor: "pointer",
        position: "absolute",
        right: 0,
        top: "50%",
        color: theme.primary,
        transform: "translateY(-50%)",
        marginRight: theme.spacing(1)
    }
}));

function SearchBar(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.search_container}>
                <InputBase
                    placeholder="Search…"
                    className={`${props.className} ${classes.search_bar}`}
                    inputProps={{ "aria-label": "search" }}
                />
                <div className={classes.search_icon}>
                    <SearchIcon />
                </div>
            </div>
        </React.Fragment>
    );
}

export default SearchBar;
