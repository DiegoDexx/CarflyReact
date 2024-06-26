// import { user, game } from "../../constants";

//save item function
export const saveItem = (key, value) => {
    window.localStorage.setItem(key, value);
    }

export const getTokenFromStorage = ($token) => {
    return localStorage.getItem("authToken");
    }

export const getUserIdFromStorage = ($userId) => {

    return localStorage.getItem("userId");
    }