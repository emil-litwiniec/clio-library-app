import React from "react";
import ReactDOM from "react-dom";
// import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";


const store = configureStore();

import LoadingPage from "./components/LoadingPage";
import AppRouter from "./routers/AppRouter";

const jsx = (
        <Provider store={store}>
                        < AppRouter/>
        </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));


