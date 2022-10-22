export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const LOG_OUT = "LOG_OUT";

export const setAccessToken = (token) => {
    return (dispatch) => {
        dispatch({
            payload: token,
            type: ACCESS_TOKEN
        })
    }
}

export const setLogout = (state) => {
    return (dispatch) => {
        dispatch({
            payload: state,
            type: LOG_OUT
        })
    }
}