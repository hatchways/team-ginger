/* Component for rendering the container of a mention and its thumbnail */
import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    image: {
        width: 100,
        height: 100
    }
}));

function MentionContainer(props) {
    const classes = useStyles();
    const { container, img, children } = props;
    return (
        <Paper className={container}>
            {img && <img src={img} alt="Thumbnail" className={classes.image} />}
            {children}
        </Paper>
    );
}

export default MentionContainer;
