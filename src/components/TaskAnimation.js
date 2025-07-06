import React from "react";
import Lottie from "lottie-react";
import taskAnim from "../assets/task.json";

const TaskAnimation = () => {
  return (
    <div className="task-animation">
      <Lottie
        animationData={taskAnim}
        loop
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default TaskAnimation;
