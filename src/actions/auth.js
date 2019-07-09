import axios from "axios";

export const AUTHENTICATED_USER = 'authenticated_user';
export const AUTHENTICATED_ADMIN = 'authenticated_admin';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function login({email, password}, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:3000/login', {email, password});

            res.data.admin === true && dispatch({ type: AUTHENTICATED_ADMIN, userId: res.data.userId });
            res.data.admin === false && dispatch({ type: AUTHENTICATED_USER, userId: res.data.userId });

            localStorage.setItem('user', res.data.token);
        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "invalid email or password"
            })
        }
    }
}