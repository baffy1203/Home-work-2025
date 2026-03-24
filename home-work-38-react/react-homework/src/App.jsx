import { useState } from 'react'
import Button from "./components/Button";
import Input from "./components/Input";
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // зберігаємо те, що вводить користувач
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // показуємо alert
  const handleClick = () => {
  alert(`Привіт, ${name}!`);
  };

  // кнопка з лічильником
  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Мій проект</h1>

      <h1>Введи своє ім'я</h1>

      <Input
        type="text"
        placeholder="Твоє ім'я..."
        onChange={handleChange}
      />

      <br /><br />

      <Button
        text="Привітатись"
        type="button"
        onClick={handleClick}
      />

      <br /><br />

      {/* Кнопка з лічильником */}
      <Button
        text={`Кліків: ${count}`}
        type="button"
        onClick={handleCount}
      />
    </div>
  );
}

export default App
