/* Component for rendering the dialog that allows the user to filter mentions by
   platform and company name
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { SITE_TO_IMG } from "../Constants";
import { Typography, FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(4)
    },
    platforms: {
        display: "grid",
        gridGap: theme.spacing(3),
        gridTemplateColumns: `repeat(${Object.entries(SITE_TO_IMG).length}, 1fr)`,
        margin: theme.spacing(3)
    },
    platform_container: {
        display: "grid",
        alignItems: "center",
        justifyItems: "center"
    },
    platform_logo: {
        width: 100,
        height: 100
    },
    platform_filter: {
        margin: 0,
        width: "100%"
    },
    submit_btn: {
        display: "block",
        borderRadius: 500,
        width: 150,
        margin: "auto",
        padding: theme.spacing(2),
        boxShadow: `0 0 5px ${theme.primary}`
    }
}));

function FilteringDialog(props) {
    const classes = useStyles();

    let platforms = [];
    let initial = {};

    Object.keys(SITE_TO_IMG).forEach(platform => (initial[platform] = true));
    const [state, setState] = useState(initial);

    const handleChange = platform => e => setState({ ...state, [platform]: e.target.checked });

    Object.entries(SITE_TO_IMG).forEach(([platform, logo]) => {
        platforms.push(
            <div key={platform} className={classes.platform_container}>
                <img src={logo} className={classes.platform_logo} />
                <FormControlLabel
                    className={classes.platform_filter}
                    control={
                        <Checkbox
                            color="default"
                            className={classes.checkbox}
                            checked={state[platform]}
                            onChange={handleChange(platform)}
                            inputProps={{ "aria-label": `${platform} checkbox` }}
                        />
                    }
                    label={platform}
                />
            </div>
        );
    });

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Paper className={classes.container}>
                <Typography variant="h5" align="center">
                    Filter Search Results
                </Typography>
                <div className={classes.platforms}>{platforms}</div>
                <Button type="submit" className={classes.submit_btn}>
                    Apply
                </Button>
            </Paper>
        </Dialog>
    );
}

export default FilteringDialog;
