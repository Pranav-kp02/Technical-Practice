import React from "react";

function FilterButtons({ filterTask }) {
  return (
    <div className="fillButtons">
      <button onClick={() => filterTask("all")}>all</button>
      <button onClick={() => filterTask("compelet")}>compelet</button>
      <button onClick={() => filterTask("pending")}>pending</button>
    </div>
  );
}

export default FilterButtons;
