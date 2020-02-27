/* Component for rendering a single mention on dashboard and possibly
   weekly report 
*/

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MentionContainer from "./MentionContainer";
import MentionHeader from "./MentionHeader";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        padding: theme.spacing(2),
        width: "100%",
        boxSizing: "border-box"
    },

    text: {
        marginLeft: theme.spacing(2),
        wordBreak: "break-word",
        width: "100%"
    }
}));

function Mention(props) {
    const classes = useStyles();
    const { id, img, regex, title, site, snippet, bold, sentiment } = props;

    return (
        <Link to={`dashboard/mention/${id}`} style={{ textDecoration: "none", width: "100%" }}>
            <MentionContainer container={classes.container} img={img}>
                <Box className={classes.text}>
                    <MentionHeader
                        variant="body1"
                        noWrap={false}
                        bold={bold}
                        regex={regex}
                        title={title}
                        sentiment={sentiment}
                    />
                    <Typography variant="body2" color="textSecondary">
                        {site}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {bold(regex, snippet)}
                    </Typography>
                </Box>
            </MentionContainer>
        </Link>
    );
}

export default Mention;
