import { useEffect, useState } from "react";
import "./App.css";
import AddTaskInput from "./Componets/AddTaskInput";
import DisplayTasks from "./Componets/DisplayTasks";
import FilterButtons from "./Componets/FilterButtons";

function App() {
  const [task, setTask] = useState(() => {
    const data = JSON.parse(localStorage.getItem("task"));
    return data ? data : [];
  });
  const [tfilter, setTfilter] = useState("all");
  console.log(task);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  });
  const handleAddTask = (val) => {
    setTask([...task, { value: val, status: false }]);
  };
  const handleDeleteTask = (index) => {
    let delTask = task.filter((ele, i) => i !== index);
    setTask(delTask);
  };

  const handleComplete = (index) => {
    let compTask = task.map((ele, i) =>
      i === index ? { ...ele, status: !ele.status } : ele
    );
    setTask(compTask);
  };
  const handleFilterTask = (item) => {
    setTfilter(item);
  };

  const filteredTask = task.filter((ele) => {
    if (tfilter === "all") return true;
    if (tfilter === "compelet") return ele.status === true;
    if (tfilter === "pending") return ele.status === false;
  });

  return (
    <>
      <h2 className="header">TODO LIST</h2>
      <AddTaskInput addTasks={handleAddTask} />
      <FilterButtons filterTask={handleFilterTask} />
      <DisplayTasks
        tasks={filteredTask}
        deleteTask={handleDeleteTask}
        completeTask={handleComplete}
      />
    </>
  );
}

export default App;
