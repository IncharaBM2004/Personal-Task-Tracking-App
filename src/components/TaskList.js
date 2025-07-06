import React from "react";
import TaskItem from "./TaskItem";
import { motion } from "framer-motion";
import EmptyState from "./EmptyState";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) return <EmptyState />; 
    
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default TaskList;
