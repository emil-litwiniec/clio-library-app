import axios from "axios";

import Cookie from "js-cookie";

import { history } from "../routers/AppRouter";


export const AUTHENTICATED_USER = 'authenticated_user';
export const AUTHENTICATED_ADMIN = 'authenticated_admin';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function login({email, password}, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:3000/login', {email, password});
            history.push()
            
            Cookie.set('x-access-token', res.data.token);
            res.data.admin === true &&
                dispatch({
                    type: AUTHENTICATED_ADMIN,
                    userId: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
            res.data.admin === false &&
                dispatch({
                    type: AUTHENTICATED_USER,
                    userId: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });


        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "invalid email or password"
            })
        }
    }
}

export function logout() {
    return async(dispatch) => {
        try {

            Cookie.remove('x-access-token');
            history.push("/")

            dispatch({
                type: UNAUTHENTICATED
            })
        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "Unable to logout"
            })
        }
    }
}

export function decodeToken() {
    return async (dispatch) => {
        try {
            const token = Cookie.get('x-access-token')
            const res = await axios.post('http://localhost:3000/decodeToken', {'x-access-token': token});

            res.data.userId &&
                res.data.admin === true &&
                dispatch({
                    type: AUTHENTICATED_ADMIN,
                    userId: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
            res.data.userId &&
                res.data.admin === false &&
                dispatch({
                    type: AUTHENTICATED_USER,
                    userId: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
        }
        catch(error) {
            if(error.message !== "Network Error") {
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: "Unable to decode token"
                })

            }
        }
    }
}