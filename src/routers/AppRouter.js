import React from "react";
import {Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

import AuthorDetailPage from "../components/AuthorDetailPage";
import MainPage from "../components/MainPage.js";
import ResultDetailPage from "../components/ResultDetailPage.js";
import AdminPanelPage from "../components/AdminPanelPage";
import UserPage from "../components/UserPage";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/result/:id" component={ResultDetailPage} />
                <Route path="/author/:authorId" component={AuthorDetailPage} />
                <Route path="/admin" component={AdminPanelPage} />
                <Route path="/user" component={UserPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
