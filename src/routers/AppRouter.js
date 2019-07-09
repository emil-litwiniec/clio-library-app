import React, { useEffect } from "react";
import {Router, Route, Switch } from "react-router-dom";
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
import ModifyPage from "../components/ModifyPage";
import SearchUser from "../components/SearchUser";
import PublicUserOverviewPage from "../components/PublicUserOverviewPage";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";

export const history = createBrowserHistory();

const AppRouter = (props) => {

    useEffect(()=> {
            console.log(props.decodeToken)
            !props.auth.userId && Cookie.get('x-access-token') && props.decodeToken();
            //  console.log('the auth state is empty but cookie can help fill it up')
    })
    
   return  (
    <Router history={history}>
        <div>
            <Switch>

                <AdminRoute path="/modify" component={ModifyPage} />
                <Route exact path="/" component={MainPage} />
                <Route path="/result/:id" component={ResultDetailPage} />
                <Route path="/author/:authorId" component={AuthorDetailPage} />
                <Route path="/addBook" component={AddBookPage} />
                <Route path="/updateBook/:bookId" component={UpdateBookPage} />
                <AdminRoute path="/user/:userId" component={UserOverviewPage} />
                <AdminRoute path="/publicUser/:userId" component={PublicUserOverviewPage} />
                <Route path="/createUser" component={CreateUser} />
                <Route path="/login" component={Login} />

                {/* <Route path="/modify" component={ModifyPage} /> */}
                <Route path="/searchUser" component={SearchUser} />
            </Switch>
        </div>
    </Router>
)};

const mapStateToProps = state => ({
    auth: state.auth
})

// const mapDispatchToProps = dispatch => ({
//     decodeToken: () => dispatch()
// })

export default connect(mapStateToProps, { decodeToken })(AppRouter);
