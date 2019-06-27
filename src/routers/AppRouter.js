import React from "react";
import {Router, Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { createBrowserHistory } from 'history';


import MainPage from "../components/MainPage.js";
import ResultDetailPage from "../components/ResultDetailPage.js";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            {/* <Switch>
                <PublicRoute exact path="/" component={LoginPage} />
                <PrivateRoute
                    path="/dashboard"
                    component={DashboardPage}
                />

                <Route component={NotFoundPage} />
            </Switch> */}

        <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/result/:bookId' component={ResultDetailPage}/>


        </Switch>
        </div>
    </Router>
);

export default AppRouter;
