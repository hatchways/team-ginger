/* Component for rendering the favourite icon of a mention */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as FavIcon } from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles(theme => ({
    favourited: {
        color: "#FFDFEA",
        marginRight: theme.spacing(1)
    },
    favourite: {
        color: "#FD6095",
        marginRight: theme.spacing(1)
    }
}));

function FavouriteIcon(props) {
    const classes = useStyles();
    const { favourite } = props;
    const [favourited, setfavourited] = useState(favourite);
    if (favourited) {
        return <FavIcon fontSize="large" className={favourited} onClick={e => e.preventDefault()} />;
    }
    return <FavoriteBorderIcon fontSize="large" className={classes.favourite} onClick={e => e.preventDefault()} />;
}

export default FavouriteIcon;
