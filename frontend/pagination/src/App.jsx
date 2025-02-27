import { use, useEffect, useState } from "react";
import "./App.css";
import Products from "./componets/Products";
import Pagination from "./componets/Pagination";

function App() {
  const PAGE_SIZE = 8;

  const [product, setProduct] = useState([]);
  const [current, setCurrent] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const res = await data.json();
      setProduct(res.products);
    } catch (error) {
      console.log(error);
    }
  };

  const pageLength = Math.ceil(product.length / PAGE_SIZE);

  const handlePage = (num) => {
    setCurrent(num);
  };

  const handleLeftArrow = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleRightArrow = () => {
    setCurrent((prev) => prev + 1);
  };

  const start = current * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  return !product.length === 0 ? (
    <h2>no product</h2>
  ) : (
    <>
      <h2 className="heading">Pagination</h2>
      <Pagination
        pageLength={pageLength}
        handlePage={handlePage}
        handleLeftArrow={handleLeftArrow}
        handleRightArrow={handleRightArrow}
        current={current}
      />
      <div className="prod-card">
        {product.slice(start, end).map((ele) => (
          <Products key={ele.id} items={ele} />
        ))}
      </div>
    </>
  );
}

export default App;
