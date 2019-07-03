import React from "react";

import GenresControl from "./GenresControl";
import AuthorsControl from "./AuthorsControl";
import TranslatorsControl from "./TranslatorsControl";
import PublishersControl from "./PublishersControl";



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