import React, { useState, useEffect, useRef } from "react";
const Counter = () => {
  const [ count, setCount ] = useState(0);
  const prevCountRef = useRef(undefined);
  useEffect(() => {
    prevCountRef.current = count;
  });
  return (
    <div className="counter">
      <div className="display-current">Current: {count}</div>
      <div className="display-current">
        Previous: {prevCountRef.current !== undefined ? prevCountRef.current : ' '}
      </div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;