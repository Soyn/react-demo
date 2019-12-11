import React from "react";
import "./index.scss";
import NameInput from './NameInput';
import Counter from './Counter';
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
