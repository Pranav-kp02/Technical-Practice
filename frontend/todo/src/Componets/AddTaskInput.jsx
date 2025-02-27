import React, { useState } from "react";

function AddTaskInput({ addTasks }) {
  const [inputValue, setInputValue] = useState("");

  const handleTaks = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    addTasks(inputValue);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <form className="form" onSubmit={handleTaks}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">add</button>
    </form>
  );
}

export default AddTaskInput;
