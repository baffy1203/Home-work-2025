import React from "react";

function StatelessComponent({ name, age }) {
  return (
    <div>
      <h2>Stateless Component</h2>
      <p>Ім'я: {name}</p>
      <p>Вік: {age}</p>
    </div>
  );
}

export default StatelessComponent;