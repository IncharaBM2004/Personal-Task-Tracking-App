import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-title">
          {task.title}
          {/* show icon only if priority is High */}
          {task.priority === "High" && (
            <FaExclamationCircle
              color="red"
              style={{ marginLeft: "8px" }}
              title="High Priority"
            />
          )}
        </span>
        <small>({task.priority})</small>
      </div>

      {task.description && (
  <p className="task-description">{task.description}</p>
)}


      <p className="date">
         Created:{" "}
        {new Date(task.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {/* ✅ Add Due Date display here */}
      {task.dueDate && (
        <p className="date">
          Due:{" "}
          {new Date(task.dueDate).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}

      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
