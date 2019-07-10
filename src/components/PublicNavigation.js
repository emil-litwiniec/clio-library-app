import React from "react";

import { Link } from "react-router-dom";



const PublicNavigation = () => {
    return (
        <nav>   
            <Link to="/">Search</Link>
            <Link to="/login">Log in</Link>
        </nav>
    )
};


export default PublicNavigation;