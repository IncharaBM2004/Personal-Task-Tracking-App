import React from "react";

function TaskFilter({ filter, onChange, counts }) {
  return (
    <div className="task-filter">
      {["All", "Completed", "Pending"].map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => onChange(f)}
        >
          {f} ({counts[f]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
