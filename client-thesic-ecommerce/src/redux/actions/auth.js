import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const actLoginRequest = (user) => {
    return async dispatch => {
        const res = await callApi('auth/login', 'POST', user);
        if (res && res.data.token) {
            const token = res.data.token
            localStorage.setItem('_auth', token);
            dispatch(actLogin(token));
        }
    };
}

export const actLogin = (token) => {
    return {
        type: Types.LOGIN,
        token
    }
}

export const actRegisterRequest = (user) => {
    return async () => {
        const res = await callApi('auth/register', 'POST', user);
        if (res && res.status === 200) {
            toast.success('Đăng ký thành công')
        }
    };
}

export const actTokenRequest = (token) => {
    return async dispatch => {
        dispatch(actToken(token));
    };
}

export const actToken = (token) => {
    return {
        type: Types.TOKEN_REDUX,
        token
    }
}

export const actForgotPasswordRequest = (email) => {
    return async () => {
        const res = await callApi('auth/forgotPassword', 'POST', email);
        if (res && res.status === 200) {
            toast.success('Đặt lại mật khẩu thành công, vui lòng kiểm tra email của bạn!')
        }
    };
}

export const actUpdateMeRequset = (data, token) => {
    return async dispatch => {
        if (token){
            const res = await callApi('users/me', 'PUT', data, token);
            if (res && res.status === 200) {
                toast.success('Cập nhật người dùng thành công')
            }
        }
    };
}

export const actChangePasswordMeRequset = (data, token) => {
    return async dispatch => {
        const res = await callApi('users/me/changePassword', 'PUT', data, token);
        if (res && res.status === 200) {
            toast.success('Đổi mật khẩu thành công')
        }
    };
}

