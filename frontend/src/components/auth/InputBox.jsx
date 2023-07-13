function InputBox({ type, label, name, value, onChange }) {
  return (
    <div className="mt-4 content-center">
      <input
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-gray-800 bg-gray-300 text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
      />
    </div>
  );
}

export default InputBox;