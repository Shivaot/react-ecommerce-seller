import * as actionTypes from "./actionTypes";
import axios from "../../axios";

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (email, access_token,authorities) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		userId: email,
		token: access_token,
		authorities: authorities
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('sellerId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		var bodyFormData = new FormData();
		bodyFormData.append("grant_type", "password");
		bodyFormData.append("client_id", "live-test");
		bodyFormData.append("client_secret", "abcde");
		bodyFormData.append("username", email);
		bodyFormData.append("password", password);
		axios({
			method: "post",
			url: "/oauth/token",
			data: bodyFormData,
			config: { headers: { accept: "application/json" } },
		}).then((response) => {
				var roles = [];
				response.data.authorities.map(el => roles.push(el.authority));	
				if (!roles.includes("ROLE_SELLER") || roles.length > 1) {	
					dispatch({ type: "NOT_SELLER" })
					dispatch(logout());
					return;
				}
                const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                localStorage.setItem('sellerToken',response.data.access_token);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('sellerId',email);
				dispatch(authSuccess(email, response.data.access_token,response.data.authorities));
				dispatch(checkAuthTimeout(response.data.expires_in));
			}).catch((error) => {
				if (error.response) {
					console.log(error.response.data.error);
				console.log(error.response.data.error_description);
				let errorMessage = "";
				if (!error.response.data.error_description) {
					errorMessage = error.response.data.error;
				} else {
					errorMessage = error.response.data.error_description;
				}
				dispatch(authFail(errorMessage));
				}
			});
	};
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('sellerToken');
        if (!token) {
            dispatch(logout());            
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                dispatch(authSuccess(localStorage.getItem('sellerId'),token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }    
        }
    };
};


