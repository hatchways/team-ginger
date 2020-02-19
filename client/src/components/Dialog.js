/* Component for rendering the detailed view of a mention
   when the user clicks on a mention
*/
import React from "react";
import { useParams } from "react-router-dom";

function Dialog() {
    let { id } = useParams();
    return (
        <div>This is the Dialog page for the mention with id {id}. Be honest, do I look better than the landing page?</div>
    );
}

export default Dialog;
