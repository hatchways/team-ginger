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
        display: "flex",
        borderRadius: 500,
        padding: theme.spacing(1)
    },
    input: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1)
    },
    save_btn: {
        width: "80%"
    }
}));

function SettingsBody(props) {
    const classes = useStyles();
    // Would perform a GET on all the company names and email here
    const [names, setNames] = useState(["Company ABC"]);
    // Would perform a GET on company email here
    const [email, setEmail] = useState(["companyabc@gmail.com"]);
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
        console.log("Changed company names to", names, " and email to ", email, " ...Not!");
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

            <CompanyNames filled={false} val={""} add={addName} classIC={classes.input_container} classI={classes.input} />

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
