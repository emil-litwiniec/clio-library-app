import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../actions/auth"

const PrivateNavigation = ({userName, logout}) => {


    const { firstName, lastName } = userName;
    return (
        <nav>
            <Link to="/">Search</Link>
            <Link to="/">My books</Link>

            <button onClick={() => logout()}>Log out</button>


            <p>Logged as {firstName} {lastName}</p>
        </nav>
    )

}

export default connect(undefined, { logout })(PrivateNavigation);