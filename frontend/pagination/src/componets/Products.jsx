import React from "react";

function Products({ items }) {
  return (
    <div className="prod-div">
      <img className="img-prod" src={items.thumbnail} alt={items.title} />
      <span>{items.title}</span>
    </div>
  );
}

export default Products;
