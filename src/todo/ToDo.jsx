import React, { Component } from "react";
import "./ToDo.css";
import AuthenticationService from "../service/AuthenticationService.js";
class ToDo extends Component {
  state = {
    username: "avkash",
    password: "admin",
    loginStatus: 0,
  };

  render() {
    return (
      <>
        {this.state.loginStatus === 1 && (
          <div style={{ color: "green" }}>Login successful</div>
        )}
        {this.state.loginStatus === 2 && (
          <div style={{ color: "red" }}>Login Failed</div>
        )}
        Username:
        <input
          type={"text"}
          name="username"
          value={this.state.username}
          onChange={this.onInputChange}
        />
        Password:
        <input
          type={"password"}
          name={"password"}
          value={this.state.password}
          onChange={this.onInputChange}
        />
        <button className="button" onClick={this.onLogin}>
          Login
        </button>
      </>
    );
  }
  onLogin = () => {
    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        this.setState({ loginStatus: 1 });
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          response.data.token
        );
        this.props.navigate(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ loginStatus: 2 });
      });
  };
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
}

export default ToDo;
