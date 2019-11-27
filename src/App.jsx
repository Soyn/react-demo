import React from "react";
import { Input } from "antd";
import "./index.scss";

class InputEditor extends React.Component {
  handleChange = e => {
    const v = e.target.value;
    this.props.onChange(v);
  };
  render() {
    const { addonBefore } = this.props;
    return (
      <div className="input-container">
        <Input
          placeholder="Input"
          onChange={this.handleChange}
          addonBefore={addonBefore}
          size="large"
        />
      </div>
    );
  }
}
class Counter extends React.PureComponent {
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
class NameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docWidth: document.body.clientWidth
    };
  }
  render() {
    return (
      <div className="name-editor">
        <InputEditor
          addonBefore="First Name: "
          onChange={v => this.setState({ firstName: v })}
        />
        <InputEditor
          addonBefore="Last Name: "
          onChange={v => this.setState({ lastName: v })}
        />
        <div>Doc Width: {this.state.docWidth} px</div>
      </div>
    );
  }
  componentDidUpdate() {
    window.document.title = this.state.firstName + " " + this.state.lastName;
  }
  documentWidthChange = () => {
    this.setState({
      docWidth: document.body.clientWidth
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.documentWidthChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.documentWidthChange);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  onSwitchEditor = e => {
    const target = e.target;
    const idx = target.getAttribute("index");
    this.setState({
      index: idx > -1 ? +idx : 0
    });
  };
  render() {
    return (
      <div className="main-container">
        <div className="editors" onClick={this.onSwitchEditor}>
          <div className={`editor ${this.state.index === 0 ? 'enable' : 'disabled'}`} index={0}>
            Use Name Editor
          </div>
          <div className={`editor ${this.state.index === 1 ? 'enable' : 'disabled'}`} index={1}>
            Use Counter
          </div>
        </div>
        <div className={this.state.index === 0 ? "active" : "in-active"}>
          {<NameInput />}
        </div>
        <div className={this.state.index === 1 ? "active" : "in-active"}>
          {<Counter />}
        </div>
      </div>
    );
  }
}
export default App;
