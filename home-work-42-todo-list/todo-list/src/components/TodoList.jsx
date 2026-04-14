import { useEffect, useState } from "react";
import { getTodosFromServer } from "../api/todosAdapter.js";
import styles from "./TodoList.module.css";
import Todo from "./Todo.jsx";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userId, setUserId] = useState();
  const [inputId, setInputId] = useState("");

  async function getTodos(id) {
    setLoading(true);
    setError("");

    try {
      const data = await getTodosFromServer(id);
      setTodos(data);
    } catch (error) {
      setError(`Error: ${error.code} ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodos(userId);
  }, []);

  const handleLoad = () => {
    if (!inputId) return;

    setUserId(inputId);
    getTodos(inputId);
  };

  const handleAdd = () => {
    const newTodo = {
      id: new Date().getTime(),
      title: "NEW todo",
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleDo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          placeholder="Введіть userId"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <span className={styles.buttons}>
          <button className={styles.button} onClick={handleLoad}>
            Завантажити
          </button>

          <button className={styles.buttonAdd} onClick={handleAdd}>
            Додати todo
          </button>
        </span>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && !todos.length && <div>No Todos found</div>}

      {!!todos.length &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDo={handleDo}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
}
