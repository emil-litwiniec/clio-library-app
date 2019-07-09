import { AUTHENTICATED_USER, AUTHENTICATED_ADMIN, UNAUTHENTICATED, AUTHENTICATION_ERROR } from "../actions/auth";

export default function(state = {}, action) {
    switch(action.type) {
        case AUTHENTICATED_USER:
            return { ...state, authenticated: true, admin: false, userId: action.userId};
        case AUTHENTICATED_ADMIN:
            return {
                ...state, authenticated: true, admin: true, userId: action.userId
            }
        case UNAUTHENTICATED:
            return { ...state, authenticated: false};
        case AUTHENTICATION_ERROR:
            return { ...state, error: action.payload };
    }

    return state;
}