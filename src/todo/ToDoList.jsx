import { Component, useEffect, useState } from "react";
import TodoDataService from "../service/TodoDataService.js";

class ToDoList extends Component {
  state = {
    todolist: [],
  };

  updateClick = (id) => {
    console.log("update is being called for id => " + id);
    this.props.navigate(`/todo/${id}`);
  };

  deleteClick = (id) => {
    TodoDataService.deleteTodos(id).then((response) => {
      this.refreshList();
    });
  };

  addTodoClicked = () => {
    this.props.navigate(`/todo/-1`);
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    console.log("refresh list");
    TodoDataService.getAllToDos().then((response) => {
      console.log(response);
      this.setState({ todolist: response.data });
      //this.state.todolist = response.data;
    });
  };

  render() {
    return (
      <div>
        <h3>Your Todo List</h3>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>IsComplete</th>
                <th>CompleteDate</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todolist.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.completed.toString()}</td>
                  <td>{todo.completeDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteClick(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateClick(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.addTodoClicked}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ToDoList;
