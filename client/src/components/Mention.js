/* Component for rendering a single mention on dashboard and possibly
   weekly report 
*/

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MentionContainer from "./MentionContainer";
import MentionHeader from "./MentionHeader";
import MentionInfo from "./MentionInfo";
import MentionText from "./MentionText";
import { DASHBOARD_URL } from "../Constants";

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
    const { id, img, title, site, snippet, bold, sentiment } = props;

    return (
        <Link to={`${DASHBOARD_URL}/mention/${id}`} style={{ textDecoration: "none", width: "100%" }}>
            <MentionContainer container={classes.container} img={img} site={site}>
                <Box className={classes.text}>
                    <MentionHeader
                        titleVariant="body1"
                        noWrap={false}
                        bold={bold}
                        title={title}
                        sentiment={sentiment}
                        site={site}
                        siteVariant="body1"
                    />
                    <MentionText variant="caption" color="textSecondary" bold={bold} text={snippet} />
                </Box>
            </MentionContainer>
        </Link>
    );
}

export default Mention;
