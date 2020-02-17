/* Component rendering the body or the main content of the settings page
   Users can use this component to add company names or change weekly email
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CompanyNames from "./CompanyNames";
import { SIGN_UP_ROUTE, UPDATE_COMPANIES_ROUTE } from "../Routes";

const MAX_NAME_LIMIT = 5;

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        margin: `${theme.spacing(6)}px auto ${theme.spacing(20)}px auto`,
        display: "grid",
        alignItems: "center",
        gridGap: theme.spacing(1),
        gridTemplateColumns: "1fr 3fr",
        gridAutoRows: "65px",
        paddingRight: theme.spacing(10),
        overflow: "auto",
        height: "80vh"
    },
    input_container: {
        display: "flex",
        borderRadius: 500,
        padding: theme.spacing(1)
    },
    input: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1)
    },
    save_btn: {
        maxWidth: 125
    }
}));

function SettingsBody(props) {
    const classes = useStyles();

    let [names, setNames] = useState(localStorage.getItem("names"));
    // Array of 1 converts into string in localstorage
    names = typeof names === "string" ? [names] : names;
    const [email, setEmail] = useState(localStorage.getItem("email"));
    // When a user adds a name
    const addName = name => {
        // Prevent duplicate names
        if (!names.find(entry => entry === name)) {
            setNames(names.concat(name));
        }
    };
    //  When the user hits save
    // Would perform a POST here
    const handleSave = () => {
        fetch(UPDATE_COMPANIES_ROUTE, {
            method: "PUT",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(names)
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("Names have been changed");
                }
            })
            .catch(err => console.error("Error: ", err));

        fetch(SIGN_UP_ROUTE, { method: "PUT", header: { "Content-Type": "application/json" }, body: JSON.stringify(email) })
            .then(res => {
                if (res.status === 200) {
                    console.log("Email has changed");
                }
            })
            .catch(err => console.error("Error: ", err));
    };

    const filledNames = names.map(name => (
        <React.Fragment key={name}>
            <CompanyNames filled={true} val={name} classIC={classes.input_container} classI={classes.input} />
            <div></div>
        </React.Fragment>
    ));

    // Note that there are empty columns on the grid to force some spacing
    return (
        <div className={classes.container}>
            <Typography variant="h6">Your Company</Typography>
            {filledNames}

            {names.length >= MAX_NAME_LIMIT ? (
                <div></div>
            ) : (
                <CompanyNames
                    filled={false}
                    val={""}
                    add={addName}
                    classIC={classes.input_container}
                    classI={classes.input}
                />
            )}

            <div></div>
            <div></div>

            <Typography variant="h6">Weekly Report</Typography>
            <Paper className={classes.input_container}>
                <InputBase
                    placeholder="Company email"
                    className={classes.input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    inputProps={{ "aria-label": "Company email" }}
                />
            </Paper>

            <div></div>
            <div></div>

            <Button className={classes.save_btn} onClick={handleSave}>
                Save
            </Button>
        </div>
    );
}

export default SettingsBody;
