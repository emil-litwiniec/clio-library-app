import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../actions/auth"

const PrivateNavigation = ({userName, logout, userId}) => {


    const { firstName, lastName } = userName;
    return (
        <nav>
            <Link to="/">Search</Link>
            <Link to={`/user/${userId}`}>My books</Link>

            <button onClick={() => logout()}>Log out</button>


            <p>Logged as {firstName} {lastName}</p>
        </nav>
    )

}

const mapStateToProps = state => ({
    userId: state.auth.userId
})

export default connect(mapStateToProps, { logout })(PrivateNavigation);