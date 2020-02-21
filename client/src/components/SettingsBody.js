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
import { COMPANY_NAMES_TAG, EMAIL_TAG, RESPONSE_TAG, GOOD_SNACKBAR, BAD_SNACKBAR } from "../Constants";
import { useSnackbar } from "notistack";

const MAX_NAME_LIMIT = 5;
const NO_NAME_MESSAGE = "Must have at least one name";
const DUPLICATE_NAME_MESSAGE = "Cannot have two identical names";
const EMPTY_NAME_MESSAGE = "Cannot have an empty name";
const EMAIL_CHANGE_MESSAGE = "Email succesfully changed";
const NAME_CHANGE_MESSAGE = "Company names succesfully changed";
const BOTH_CHANGE_MESSAGE = "Email and Company names successfully changed";

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

    const [names, setNames] = useState(localStorage.getItem(COMPANY_NAMES_TAG).split(","));

    const [email, setEmail] = useState(localStorage.getItem(EMAIL_TAG));

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // When a user adds a name
    const addName = name => {
        // Prevent duplicate and empty names
        if (name === "") {
            enqueueSnackbar(EMPTY_NAME_MESSAGE, BAD_SNACKBAR);
        } else if (!names.find(entry => entry === name)) {
            setNames(names.concat(name));
        } else {
            enqueueSnackbar(DUPLICATE_NAME_MESSAGE, BAD_SNACKBAR);
        }
    };

    // When a user removes a name
    const removeName = name => {
        if (names.length > 1) {
            let index = names.findIndex(n => n === name);
            setNames(names.slice(0, index).concat(names.slice(index + 1, names.length)));
        } else {
            enqueueSnackbar(NO_NAME_MESSAGE, BAD_SNACKBAR);
        }
    };

    const isEqualNames = () => {
        const oldNames = localStorage
            .getItem("names")
            .split(",")
            .sort();
        const newNames = names.sort();
        let isSame = oldNames.length === newNames.length;
        if (isSame) {
            oldNames.forEach((oldName, index) => (isSame = isSame && oldName === newNames[index]));
        }

        return isSame;
    };

    const handleEmailChange = (resolve, reject) =>
        fetch(USERS_ROUTE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })
            .then(res => resolve(res))
            .catch(err => reject(err));

    const handleNamesChange = (resolve, reject) =>
        fetch(COMPANIES_ROUTE, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(names)
        })
            .then(res => resolve(res))
            .catch(err => reject(err));

    //  When the user hits save
    const handleSave = () => {
        let requestedEmailChange = false;
        let requestedNameChange = false;
        let emailChanged = false;
        let namesChanged = false;
        let emailPromise = Promise.resolve(true);
        let namesPromise = Promise.resolve(true);

        if (localStorage.getItem(EMAIL_TAG) !== email) {
            emailPromise = new Promise(handleEmailChange);
            requestedEmailChange = true;
        }

        if (!isEqualNames()) {
            namesPromise = new Promise(handleNamesChange);
            requestedNameChange = true;
        }

        Promise.all([emailPromise, namesPromise]).then(function([emailResponse, namesResponse]) {
            if (requestedEmailChange) {
                if (emailResponse.status === 200) {
                    localStorage.setItem(EMAIL_TAG, email);
                    emailChanged = true;
                } else {
                    emailResponse.json().then(data => {
                        enqueueSnackbar(data[RESPONSE_TAG], BAD_SNACKBAR);
                    });
                }
            }

            if (requestedNameChange) {
                if (namesResponse.status === 200) {
                    localStorage.setItem(COMPANY_NAMES_TAG, names);
                    namesChanged = true;
                } else {
                    namesResponse.json().then(data => {
                        enqueueSnackbar(`Error: ${data[RESPONSE_TAG]}`, BAD_SNACKBAR);
                    });
                }
            }

            if (emailChanged) {
                if (namesChanged) {
                    enqueueSnackbar(BOTH_CHANGE_MESSAGE, GOOD_SNACKBAR);
                } else {
                    enqueueSnackbar(EMAIL_CHANGE_MESSAGE, GOOD_SNACKBAR);
                }
            } else if (namesChanged) {
                enqueueSnackbar(NAME_CHANGE_MESSAGE, GOOD_SNACKBAR);
            }
        });
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
