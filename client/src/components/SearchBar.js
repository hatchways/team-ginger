import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

// Debouncing timer
const DELAY = 3000;

const styles = theme => ({
    search_container: {
        position: "relative"
    },
    search_bar: {
        color: "black",
        backgroundColor: "white",
        width: 400,
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
});

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.delayTimer = null;
        this.callTimer = this.callTimer.bind(this);
    }

    handleChange = e => {
        clearTimeout(this.delayTimer);
        const value = e.target.value;
        this.setState({ value }, this.callTimer);
    };

    callTimer() {
        if (this.state.value !== "") {
            this.delayTimer = setTimeout(() => this.props.search(this.state.value), DELAY);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.search_container}>
                    <InputBase
                        placeholder="Search…"
                        className={`${classes.className} ${classes.search_bar}`}
                        inputProps={{ "aria-label": "search" }}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <div className={classes.search_icon}>
                        <SearchIcon />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.delayTimer);
    }
}

export default withStyles(styles)(SearchBar);
