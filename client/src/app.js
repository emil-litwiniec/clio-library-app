import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import CssBaseline from '@material-ui/core/CssBaseline';



const theme = createMuiTheme({

})


const store = configureStore();

import AppRouter from "./routers/AppRouter";

const jsx = (
        <Provider store={store}>
                <ThemeProvider theme={theme}>
                        <CssBaseline />
                        < AppRouter/>
                </ThemeProvider>
        </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));


