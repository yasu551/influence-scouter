import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return(
  <>
    <div className="bg-slate-400 p-3">
      <p>
        Count: {count}
        <button onClick={increment}>
          Increment
        </button>
      </p>
    </div>
  </>);
}

export default Counter;
