import React from "react";

export default class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.preCount = undefined;
  }
  onIncrease = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  onDecrease = () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  render() {
    console.log('---> ', this.preCount);
    return (
      <div className="counter">
        <div className="display-current">Current: {this.state.count}</div>
        <div className="display-current">
          Previous: {this.preCount !== undefined ? this.preCount : ' '}
        </div>
        <button onClick={this.onIncrease}>+</button>
        <button onClick={this.onDecrease}>-</button>
      </div>
    );
  }

  componentDidMount() {
    this.preCount = this.state.count;
  }
  componentDidUpdate() {
    this.preCount = this.state.count;
  }
}