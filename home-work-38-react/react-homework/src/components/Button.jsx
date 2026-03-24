export default Button;

function Button({ text, type, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
}

