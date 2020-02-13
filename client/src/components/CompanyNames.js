/* Component for rendering the input field in the settings page
   Users can use this component to add or remove company names
*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    input_container: {
        borderRadius: 500,
        padding: theme.spacing(1)
    },
    input: {
        paddingLeft: theme.spacing(1)
    }
}));

function CompanyNames(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.input_container}>
            <InputBase
                placeholder="Company email"
                className={classes.input}
                value={props.val || ""}
                inputProps={{ "aria-label": "Company email" }}
            />
        </Paper>
    );
}

export default CompanyNames;
