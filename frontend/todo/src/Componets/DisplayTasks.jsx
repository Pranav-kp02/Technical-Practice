import React from "react";

function DisplayTasks({ tasks, deleteTask, completeTask }) {
  return (
    <div className="displayTask">
      <ol>
        {tasks.map((ele, index) => (
          <li key={index} className={ele.status ? "line-over" : ""}>
            {ele.value}
            {ele.status ? (
              <button className="compBtn" onClick={() => completeTask(index)}>
                undo
              </button>
            ) : (
              <button className="compBtn" onClick={() => completeTask(index)}>
                complete
              </button>
            )}
            <button className="deleteBtn" onClick={() => deleteTask(index)}>
              delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DisplayTasks;
