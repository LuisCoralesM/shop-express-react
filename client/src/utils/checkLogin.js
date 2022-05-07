export const checkLogin = (key = "isLogged") => {
  return localStorage.getItem(key) ? true : false;
};
