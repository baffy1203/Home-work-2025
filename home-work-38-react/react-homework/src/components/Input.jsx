export default Input;

function Input({ placeholder, type, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

