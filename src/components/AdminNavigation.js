
import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../actions/auth"


const AdminNavigation = ({userName, logout}) => {


    const { firstName, lastName } = userName;

    return (
        <nav>
            <Link to="/">Search</Link>
            <Link to="/">Dashboard</Link>
            <Link to="/modify">Modify catalogue</Link>
            <Link to="/findUser">Find user</Link>
            <button onClick={() => logout()}>Log out</button>
            <p>Logged as {firstName} {lastName}</p>
            <p>ADMIN</p>
        </nav>
    )

}

export default connect(undefined, { logout })(AdminNavigation);