import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthenticationService from "../service/AuthenticationService.js";
import TodoDataService from "../service/TodoDataService";

class TodoComponent extends Component {
  state = {
    id: this.props.params.id,
    description: "",
    targetDate: moment(new Date()).format("YYYY-MM-DD"),
  };

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }

    let username = AuthenticationService.getLoggedInUserName();

    TodoDataService.getToDo(this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }

  validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 Characters in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid Target Date";
    }

    return errors;
  };

  onSubmit = (values) => {
    let username = AuthenticationService.getLoggedInUserName();

    let todo = {
      id: this.state.id,
      description: values.description,
      completeDate: values.targetDate,
    };
    console.log(
      "=================================================================="
    );
    console.log(todo);
    console.log(
      "=================================================================="
    );
    if (this.state.id === -1) {
      TodoDataService.createTodo(this.state.id, todo).then(() =>
        this.props.navigate("/todo")
      );
    } else {
      TodoDataService.updateTodo(username, this.state.id, todo).then(() =>
        this.props.navigate("/todo")
      );
    }

    console.log(values);
  };

  render() {
    let { description, targetDate } = this.state;
    //let targetDate = this.state.targetDate

    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
