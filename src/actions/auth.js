import axios from "axios";

import Cookie from "js-cookie";

export const AUTHENTICATED_USER = 'authenticated_user';
export const AUTHENTICATED_ADMIN = 'authenticated_admin';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function login({email, password}, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:3000/login', {email, password});
            
            Cookie.set('x-access-token', res.data.token);
            res.data.admin === true && dispatch({ type: AUTHENTICATED_ADMIN, userId: res.data.userId });
            res.data.admin === false && dispatch({ type: AUTHENTICATED_USER, userId: res.data.userId });


        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "invalid email or password"
            })
        }
    }
}

export function decodeToken() {
    return async (dispatch) => {
        try {
            const token = Cookie.get('x-access-token')
            const res = await axios.post('http://localhost:3000/decodeToken', {'x-access-token': token});

            res.data.userId && res.data.admin === true && dispatch({ type: AUTHENTICATED_ADMIN, userId: res.data.userId });
            res.data.userId && res.data.admin === false && dispatch({ type: AUTHENTICATED_USER, userId:  res.data.userId});
        }
        catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "Unable to decode token"
            })
        }
    }
}