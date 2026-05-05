import './App.css'
import "./index.css"
import { useState, useCallback, useMemo } from "react";
import ProductCard from "./components/ProductCard";


export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const product = {
    id: 1,
    name: "iPhone 15",
    price: 999,
    image: "https://picsum.photos/200",
  };

  const products = [];

  for (let i = 0; i < 100; i++) {
    products.push({
      ...product,
      id: i,
    });
  }


  const handleAdd = useCallback((id) => {
    setCartCount((prev) => prev + 1);
  }, []);


  const totalPrice =  cartCount * product.price;


  return (
    <div>
      <h1>Cart: {cartCount}</h1>
      <h2>Total: {totalPrice}$</h2>

      <div className="list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}