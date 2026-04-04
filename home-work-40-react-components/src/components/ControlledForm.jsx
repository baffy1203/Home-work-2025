import { useState } from "react";

export default function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Ім'я: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Controlled Form</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введіть ім'я"
      />

      <button type="submit">Відправити</button>
    </form>
  );
}
