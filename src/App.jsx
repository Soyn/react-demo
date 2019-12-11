import React, { useState } from "react";
import "./index.scss";
import NameInput from './NameInput';
import Movie from './Movie';
import Counter from './Counter';

const App = () => {
  const [ index, setIndex ] = useState(0);
  const onSwitchEditor = (e) => {
    const target = e.target;
    const idx = target.getAttribute("index");
    setIndex(+idx);
  }
  return (
    <div className="main-container">
      <div className="editors" onClick={onSwitchEditor}>
        <div className={`editor ${index === 0 ? 'enable' : 'disabled'}`} index={0}>
          Use Name Editor
        </div>
        <div className={`editor ${index === 1 ? 'enable' : 'disabled'}`} index={1}>
          Use Counter
        </div>
        <div className={`editor ${index === 2 ? 'enable' : 'disabled'}`} index={2}>
            Use Movies
          </div>
      </div>
      <div className={index === 0 ? "active" : "in-active"}>
        {<NameInput />}
      </div>
      <div className={index === 1 ? "active" : "in-active"}>
        {<Counter />}
      </div>
      <div className={index === 2 ? "active" : "in-active"}>
          {<Movie />}
        </div>
    </div>
  );
}
export default App;
