function ItemImage({ src, alt }) {
  if (!src) {
    return (
      <div className="item-image-placeholder">
        <span>🖼️</span>
        <p>No Image Available</p>
      </div>
    );
  }

  return (
    <div className="item-image-box">
      <img
        src={`http://localhost:5000${src}`}
        alt={alt || "Item"}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.classList.add("image-error");
          e.currentTarget.parentElement.innerHTML =
            "<span>🖼️</span><p>No Image Available</p>";
        }}
      />
    </div>
  );
}

export default ItemImage;