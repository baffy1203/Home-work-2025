import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TodoList.module.css";
import Todo from "./Todo.jsx";

import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../redux/todosSlice";

import { todosSelector, todosLoading, todosError } from "../redux/selectors";

export default function TodoList() {
  const dispatch = useDispatch();

  const todos = useSelector(todosSelector);
  const loading = useSelector(todosLoading);
  const error = useSelector(todosError);

  const [inputId, setInputId] = useState("");

  // 👉 якщо хочеш автозавантаження при старті (можеш прибрати)
  useEffect(() => {
    dispatch(fetchTodos(1));
  }, [dispatch]);

  const handleLoad = () => {
    if (!inputId) return;
    dispatch(fetchTodos(inputId));
  };

  const handleAdd = () => {
    dispatch(addTodo());
  };

  const handleDo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          placeholder="Введіть userId"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        ```
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
      {error && <div className={styles.error}>Error: {error}</div>}
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
