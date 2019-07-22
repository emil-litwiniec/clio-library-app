import React, { useEffect } from "react";
import {Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { connect } from "react-redux";
import Cookie from "js-cookie";
import { decodeToken } from "../actions/auth";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import AuthorDetailPage from "../components/AuthorDetailPage";
import MainPage from "../components/MainPage.js";
import ResultDetailPage from "../components/ResultDetailPage.js";
import AddBookPage from "../components/AddBookPage";
import UserOverviewPage from "../components/UserOverviewPage";
import UpdateBookPage from "../components/UpdateBookPage";
import FindBookToUpdate from "../components/FindBookToUpdate";
import ModifyPage from "../components/ModifyPage";
import SearchUser from "../components/SearchUser";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";

export const history = createBrowserHistory();

const AppRouter = (props) => {

    useEffect(()=> {
            !props.auth.userId && Cookie.get('x-access-token') && props.decodeToken();
    })
    
   return  (
    <Router history={history}>
        <div>
            <Switch>

                <AdminRoute path="/modify" component={ModifyPage} />
                <PublicRoute exact path="/" component={MainPage} />
                <PublicRoute path="/result/:id" component={ResultDetailPage} />
                <PublicRoute path="/author/:authorId" component={AuthorDetailPage} />
                <AdminRoute path="/addBook" component={AddBookPage} />
                <AdminRoute path="/findBookToUpdate" component={FindBookToUpdate} />
                <AdminRoute path="/updateBook/:bookId" component={UpdateBookPage} />
                <PrivateRoute path="/user/:userId" component={UserOverviewPage} />
                <AdminRoute path="/createUser" component={CreateUser} />
                <PublicRoute path="/login" component={Login} />

                <AdminRoute path="/findUser" component={SearchUser} />
            </Switch>
        </div>
    </Router>
)};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { decodeToken })(AppRouter);
