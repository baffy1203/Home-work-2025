import React, { useState } from "react";

function StatefulComponent({ message }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Stateful Component</h2>
      <p>{message}</p>

      <p>Лічильник: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Збільшити
      </button>
    </div>
  );
}

export default StatefulComponent;