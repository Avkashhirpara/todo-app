import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get("http://localhost:8080/hello");
  }
  executeHelloWorldServiceWithParam(name) {
    return axios.get(`http://localhost:8080/hello/pv/${name}`);
  }
}
export default new HelloWorldService();
