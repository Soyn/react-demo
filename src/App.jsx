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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      docWidth: document.body.clientWidth,
    };
  }
  render() {
    return (
      <div id="app">
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

export default App;
