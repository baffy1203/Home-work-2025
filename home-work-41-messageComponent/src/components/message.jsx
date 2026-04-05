import MessageComponent from "./MessageComponent";

export function fetchMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "Привіт, проміс зробила у файл message.jsx а сам компонент окремо. І цей текст з'явився на екрані через 2 секунди"
      );
    }, 2000);
  });
}
