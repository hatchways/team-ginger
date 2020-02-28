/* Component for rendering the details of a mention such as the # 0f hits and url */
import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CallMadeIcon from "@material-ui/icons/CallMade";

function MentionInfo(props) {
    const { hits, hitsVariant, url, urlVariant } = props;
    return (
        <React.Fragment>
            {hits != null && (
                <Typography variant={hitsVariant} color="textSecondary">
                    Hits: {hits}
                </Typography>
            )}
            {url && (
                <Link href={url} variant={urlVariant} target="_blank">
                    Source <CallMadeIcon />
                </Link>
            )}
        </React.Fragment>
    );
}

export default MentionInfo;
