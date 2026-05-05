import { memo } from "react";

const ProductCard = ({ product, onAdd }) => {
  console.log("render product", product.id);

  return (
    <div className="card">
      <img src={product.image} alt={product.name} width="150" />

      <h3>{product.name}</h3>
      <p>{product.price} $</p>

      <button onClick={() => onAdd(product.id)}>
        ➕ Add to cart
      </button>
    </div>
  );
};

export default memo(ProductCard);