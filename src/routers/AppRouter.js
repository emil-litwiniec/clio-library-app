import React from "react";
import {Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

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

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/result/:id" component={ResultDetailPage} />
                <Route path="/author/:authorId" component={AuthorDetailPage} />
                <Route path="/addBook" component={AddBookPage} />
                <Route path="/updateBook/:bookId" component={UpdateBookPage} />
                <Route path="/user/:userId" component={UserOverviewPage} />
                <Route path="/publicUser/:userId" component={PublicUserOverviewPage} />
                <Route path="/createUser" component={CreateUser} />
                <Route path="/login" component={Login} />

                <Route path="/modify" component={ModifyPage} />
                <Route path="/searchUser" component={SearchUser} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
