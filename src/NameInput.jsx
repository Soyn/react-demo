import React, { useState, useEffect } from "react";
import { Input } from "antd";
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
const NameInput = props => {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ docWidth, setDocWidth ] = useState(document.body.clientWidth);
  const onResize = () => {
    setDocWidth(document.body.clientWidth)
  }
  useEffect(() => {
    window.document.title = firstName + " " + lastName;
  }, [firstName, lastName]);
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);
  return (
    <div className="name-editor">
      <InputEditor
        addonBefore="First Name: "
        onChange={v => setFirstName(v)}
      />
      <InputEditor
        addonBefore="Last Name: "
        onChange={v => setLastName(v)}
      />
      <div>Doc Width: {docWidth} px</div>
    </div>
  );
};
export default NameInput;