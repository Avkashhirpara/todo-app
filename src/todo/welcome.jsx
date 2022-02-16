import { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../api/HelloWorldService";

class WelcomeCompo extends Component {
  state = {
    serverMessage: "",
  };
  render() {
    return (
      <div style={{ color: "green" }}>
        <Link to={"/todo"}>Click Here</Link> for your todo list.
        <br></br>
        <br></br>
        <button className={"btn btn-success"} onClick={this.welcomeService}>
          Click Me !
        </button>
        <br />
        <br />
        {this.state.serverMessage}
      </div>
    );
  }
  welcomeService = () => {
    HelloWorldService.executeHelloWorldServiceWithParam(this.props.params.name)
      .then((response) =>
        this.setState({ serverMessage: response.data.message })
      )
      .catch((res) => {
        this.setState({ serverMessage: res.message });
      });
  };
}
export default WelcomeCompo;
