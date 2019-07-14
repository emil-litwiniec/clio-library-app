import React from "react";

import GenresControl from "./controls/GenresControl";
import AuthorsControl from "./controls/AuthorsControl";
import TranslatorsControl from "./controls/TranslatorsControl";
import PublishersControl from "./controls/PublishersControl";



const ModifyPage = () => {
    return (
        <div>
            <GenresControl />
            <AuthorsControl />
            <TranslatorsControl />
            <PublishersControl />
        </div>
    )
}


export default ModifyPage;