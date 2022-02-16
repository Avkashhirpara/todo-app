import axios from "axios";

class TodoDataService {
  getAllToDos() {
    return axios.get("http://localhost:8080/todos");
  }
  getToDo(id) {
    return axios.get(`http://localhost:8080/todos/id/${id}`);
  }
  deleteTodos(id) {
    return axios.delete(`http://localhost:8080/todos/id/${id}`);
  }
  updateTodo(name, id, todo) {
    return axios.put(`http://localhost:8080/todos/id/${id}`, todo);
  }
  createTodo(id, todo) {
    return axios.post(`http://localhost:8080/todos/id/${id}`, todo);
  }
}
export default new TodoDataService();
