/* Component rendering the body or the main content of the settings page
   Users can use this component to add company names or change weekly email
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { USERS_ROUTE, COMPANIES_ROUTE } from "../Routes";
import CompanyNames from "./CompanyNames";
import "../utilities/array";

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

    let [names, setNames] = useState(localStorage.getItem("names").split(","));
    // Array of 1 converts into string in localstorage

    const [email, setEmail] = useState(localStorage.getItem("email"));
    // When a user adds a name
    const addName = name => {
        // Prevent duplicate names
        if (!names.find(entry => entry === name)) {
            setNames(names.concat(name));
        }
    };

    // When a user removes a name
    const removeName = name => {
        if (names.length > 1) {
            let index = names.findIndex(n => n === name);
            setNames(names.slice(0, index).concat(names.slice(index + 1, names.length)));
        } else {
            // Popup alert here
        }
    };

    //  When the user hits save
    const handleSave = () => {
        if (localStorage.getItem("email") !== email)
        {
            fetch(USERS_ROUTE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem("email", email);
                    console.log("Changed email");
                } else {
                    res.json().then(data => {
                        console.log(res.status, data["response"]);
                    });
                }
            });
        }
        else
        {
            console.log("Email has not changed!");
        }

        if (!localStorage.getItem("names").split(",").equals(names))
        {
            fetch(COMPANIES_ROUTE, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(names)
            })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("names", names);
                    console.log("Names have been changed");
                } else {
                    res.json().then(data => {
                        console.log(res.status, data["response"]);
                    });
                }
            })
            .catch(err => console.error("Error: ", err));
        }
        else
        {
            console.log("Names have not changed!");
        }
    };

    const filledNames = names.map(name => (
        <React.Fragment key={name}>
            <CompanyNames
                filled={true}
                val={name}
                remove={removeName}
                classIC={classes.input_container}
                classI={classes.input}
            />
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
                    type="email"
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
