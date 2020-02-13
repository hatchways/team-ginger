/* Component rendering the body or the main content of the settings page
   Users can use this component to add company names or change weekly email
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        margin: `${theme.spacing(6)}px auto`,
        display: "grid",
        alignItems: "center",
        gridGap: theme.spacing(1),
        gridTemplateColumns: "1fr 3fr",
        // Give spacing for that invisible element
        gridAutoRows: "1fr",
        height: "fit-content"
    },
    input_container: {
        borderRadius: 500,
        padding: theme.spacing(1)
    },
    input: {
        paddingLeft: theme.spacing(1)
    },
    save_btn: {
        width: "80%"
    }
}));

function SettingsBody(props) {
    const classes = useStyles();
    const val = "";
    // Note that there are two empty rows on the grid to force some spacing
    return (
        <div className={classes.container}>
            <Typography variant="h6">Your Company</Typography>
            <Paper className={classes.input_container}>
                <InputBase
                    placeholder="Company name"
                    className={classes.input}
                    inputProps={{ "aria-label": "Company Name" }}
                />
            </Paper>
            <div></div>
            <Paper className={classes.input_container}>
                <InputBase
                    placeholder="Company name"
                    className={classes.input}
                    inputProps={{ "aria-label": "Company Name" }}
                />
            </Paper>
            <div></div>
            <div></div>
            <Typography variant="h6">Weekly Report</Typography>
            <Paper className={classes.input_container}>
                <InputBase
                    placeholder="Company email"
                    className={classes.input}
                    value={val}
                    inputProps={{ "aria-label": "Company email" }}
                />
            </Paper>
            <div></div>
            <div></div>
            <Button className={classes.save_btn}>Save</Button>
        </div>
    );
}

export default SettingsBody;
