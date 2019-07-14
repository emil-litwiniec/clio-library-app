import { AUTHENTICATED_USER, AUTHENTICATED_ADMIN, UNAUTHENTICATED, AUTHENTICATION_ERROR } from "../actions/auth";

export default function(state = { authenticated: false }, action) {
    switch(action.type) {
        case AUTHENTICATED_USER:
            return {
                ...state,
                authenticated: true,
                admin: false,
                userId: action.userId,
                firstName: action.firstName,
                lastName: action.lastName,
                error: ''
            };
        case AUTHENTICATED_ADMIN:
            return {
                ...state,
                authenticated: true,
                admin: true,
                userId: action.userId,
                firstName: action.firstName,
                lastName: action.lastName,
                error: ''

                
            };
        case UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false,
                admin: false,
                userId: null,
                firstName: null,
                lastName: null
            };
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
    }

    return state;
}