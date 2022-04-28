export const checkLogin = (key = "token") => {
    return localStorage.getItem(key) ? true : false;
}