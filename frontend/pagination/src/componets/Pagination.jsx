import React from "react";

function Pagination({
  pageLength,
  handlePage,
  handleLeftArrow,
  handleRightArrow,
  current,
}) {
  return (
    <div className="pagination-continer">
      <button
        disabled={current === 0}
        className="page-num"
        onClick={handleLeftArrow}
      >
        ◀️
      </button>
      {[...Array(pageLength).keys()].map((n) => (
        <span
          key={n}
          className={`page-num ${n === current ? "active" : ""}`}
          onClick={() => handlePage(n)}
        >
          {n}
        </span>
      ))}
      <button
        disabled={current === pageLength - 1}
        className="page-num"
        onClick={handleRightArrow}
      >
        ▶️
      </button>
    </div>
  );
}

export default Pagination;
