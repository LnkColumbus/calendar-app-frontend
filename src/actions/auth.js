import Swal from 'sweetalert2';

import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        
        const res = await fetchWithOutToken( 'auth', { email, password }, 'POST' );
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: body.msg
            });
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const res = await fetchWithOutToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: body.msg
            });
        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {


        const isCurrentToken = !!(localStorage.getItem('token') || '');

        if (!isCurrentToken) {
            dispatch(checkingFinish());
            return;
        }
        
        const res = await fetchWithToken( 'auth/renew' );
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout });