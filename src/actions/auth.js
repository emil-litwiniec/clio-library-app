import axios from "axios";

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function login({email, password}, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:3000/login', {email, password});

            dispatch({ type: AUTHENTICATED});
            localStorage.setItem('user', res.data.token);
            console.log('token', res.data.token)
            console.log('response: ', res);
            console.log('res.data: ', res.data)
        } catch(error) {
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: "invalid email or password"
            })
        }
    }
}