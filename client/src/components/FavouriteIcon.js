/* Component for rendering the favourite icon of a mention */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as FavIcon } from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { FAVOURITE_ROUTE } from "../Routes";
import { LOGIN_URL } from "../Constants";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(1),
        cursor: "pointer",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
            transform: "scale(1.2)"
        }
    },
    favourited: {
        color: "#FD6095"
    },
    favourite: {
        color: "#FFDFEA"
    }
}));

function FavouriteIcon(props) {
    const classes = useStyles();
    const { favourite, id, history } = props;
    const [favourited, setfavourited] = useState(favourite);

    const handleClick = e => {
        e.preventDefault();
        fetch(`${FAVOURITE_ROUTE}${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status === 401) {
                history.push(LOGIN_URL);
            } else if (res.ok) {
                res.json().then(data => {
                    setfavourited(data.favourite);
                });
            } else {
                res.json().then(data => console.log(data));
            }
        });
    };

    if (favourited) {
        return <FavIcon fontSize="large" className={`${classes.favourited} ${classes.icon}`} onClick={handleClick} />;
    }
    return <FavoriteBorderIcon fontSize="large" className={`${classes.favourite} ${classes.icon}`} onClick={handleClick} />;
}

export default FavouriteIcon;
