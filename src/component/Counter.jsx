import React, { Component } from "react";
import "./Counter.css";
import PropTypes from "prop-types";

class Counter extends Component {
  state = {
    counter: 0,
  };

  render() {
    return (
      <div>
        <div>
          <CounterButton by={1} onIncreament={this.increament}></CounterButton>
          <CounterButton by={2} onIncreament={this.increament}></CounterButton>
          <CounterButton by={5} onIncreament={this.increament}></CounterButton>
          <CounterButton by={10} onIncreament={this.increament}></CounterButton>
        </div>
        <span className="count">{this.state.counter}</span>
        <div>
          <button className="reset" onClick={this.reset}>
            reset
          </button>
        </div>
      </div>
    );
  }

  increament = (bycount) => {
    this.setState({ counter: this.state.counter + bycount });
  };
  reset = () => {
    this.setState({ counter: 0 });
  };
}

class CounterButton extends Component {
  state = {
    counter: 0,
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.increment}>
          +{this.props.by}
        </button>
        <button className="button" onClick={this.decrement}>
          -{this.props.by}
        </button>
      </div>
    );
  }

  increment = () => {
    console.log(`button of child called ${this.props.by}`);
    this.props.onIncreament(this.props.by);
  };
  decrement = () => {
    console.log(`button of child called ${this.props.by}`);
    this.props.onIncreament(-1 * this.props.by);
  };
}

CounterButton.defaultValue = {
  by: 1,
};
CounterButton.propType = {
  by: PropTypes.number,
};

export default Counter;
