import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import actualQueryReducer from "../reducers/actualQuery";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            actualQuery: actualQueryReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
