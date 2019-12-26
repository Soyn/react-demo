import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import "./index.scss";

const sizeList = ["small", "normal", "large"];
const { useState } = React;
function Cell(props) {
  const [size, changeSize] = useState(props.size || 0);
  const cellClass = classnames("cell", sizeList[size]);
  return <div className={cellClass} />;
}

function Rows({ rowCount, colCount, customCss }) {
  const rows = [];
  
  for (let i = 0; i < rowCount; i += 1) {
    const cells = [];
    for (let j = 0; j < colCount; j += 1) {
      cells.push(<Cell size={1} />);
    }
    rows.push(<div className='row'>{cells}</div>);
  }
  return <div className="rows">{rows}</div>;
}
function RowHeader() {
  return (<div className='row-header'>
    <div className="parent"></div>
    <div className="children">
      <Cell size={1} />
      <Cell size={1} />
      <Cell size={1} />
      <Cell size={1} />
    </div>
  </div>);
}
export default class App extends React.Component {
  render() {
    return (<>
    <Rows rowCount={1} colCount={8} />
    <RowHeader />
    <RowHeader />
    <RowHeader />
    <RowHeader />
    </>);
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
