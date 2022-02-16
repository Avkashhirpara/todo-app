import axios from "axios";

class AuthenticationService {
  registerSuccessfulLogin(username, token) {
    sessionStorage.setItem("authenticatedUser", username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(token));
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }
  getLoggedInUserName() {
    return sessionStorage.getItem("authenticatedUser");
  }
  createBasicAuthToken(token) {
    return "Bearer " + token;
  }
  setupAxiosInterceptors(basicAuthHeader) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = basicAuthHeader;
      }
      return config;
    });
  }

  // executeBasicAuthenticationService(username, password) {
  //   return axios.get("http://localhost:8080/basicauth", {
  //     headers: { authorization: this.createBasicAuthToken(username, password) },
  //   });
  // }
  executeBasicAuthenticationService(username, password) {
    return axios.post("http://localhost:8080/authenticate", {
      username,
      password,
    });
  }
}

export default new AuthenticationService();
