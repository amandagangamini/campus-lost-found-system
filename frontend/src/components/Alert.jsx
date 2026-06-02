function Alert({ message, type = "error" }) {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      {type === "success" ? "✅ " : "❌ "}
      {message}
    </div>
  );
}

export default Alert;