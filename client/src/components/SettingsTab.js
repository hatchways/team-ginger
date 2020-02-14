/* Component for rendering the tabs of the sidebar of the settings page
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    tab: {
        padding: `${theme.spacing(2)}px 0`,
        cursor: "pointer"
    },
    tab_active: {
        color: theme.primary
    },
    tab_inactive: {
        color: "initial"
    }
}));
function SettingsTab(props) {
    const classes = useStyles();
    const { active, click } = props;
    const activeClassName = `${classes.tab} ${classes.tab_active}`;
    const inactiveClassName = `${classes.tab} ${classes.tab_inactive}`;

    return (
        <Typography variant="body2" className={active ? activeClassName : inactiveClassName} onClick={click}>
            {props.children}
        </Typography>
    );
}

export default SettingsTab;
