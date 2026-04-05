import { use } from "react";
import { fetchMessage } from "./message";

const messagePromise = fetchMessage();

export default function MessageComponent() {
  const message = use(messagePromise);

  return (
    <div>
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  );
}