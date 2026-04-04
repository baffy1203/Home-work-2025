import { useRef } from "react";

export default function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Ім'я: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>

      <input
        type="text"
        ref={inputRef}
        placeholder="Введіть ім'я"
      />

      <button type="submit">Відправити</button>
    </form>
  );
}