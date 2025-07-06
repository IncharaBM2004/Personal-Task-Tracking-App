import React, { useState, useEffect } from "react";
import LoginInterface from "./components/LoginInterface";
import SplashScreen from "./components/SplashScreen";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskAnimation from "./components/TaskAnimation";
import Lottie from "lottie-react";
import backgroundAnim from "./assets/interface.json";
import "./styles/App.css";
import sampleTasks from "./sampledata";

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [tempUser, setTempUser] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage, or use sample tasks
  useEffect(() => {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    const data = JSON.parse(stored);
    if (data.length === 0) {
      setTasks(sampleTasks);
    } else {
      setTasks(data);
    }
  } else {
    setTasks(sampleTasks);
  }
}, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (name) => {
    setTempUser(name);
    setShowSplash(true);
  };

  const handleSplashComplete = () => {
    setUser(tempUser);
    setShowSplash(false);
  };

  const handleAddTask = (task) => {
    if (task.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
    } else {
      setTasks([
        ...tasks,
        {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          priority: task.priority || "Medium",
          dueDate: task.dueDate || "",
        },
      ]);
    }
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Pending") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (!user && showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!user) {
    return <LoginInterface onLogin={handleLogin} />;
  }

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      {!showTaskForm && (
        <Lottie
          animationData={backgroundAnim}
          loop
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: isDark ? 0.2 : 0.5,
          }}
        />
      )}

      {!showTaskForm && (
        <>
          <div className="interface-header">
            <h1>Task Tracker</h1>
            <div className="interface-actions">
              <button className="plus-button" onClick={() => setShowTaskForm(true)}>
                +
              </button>
              <button className="toggle-button" onClick={() => setIsDark(!isDark)}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              width: "100%",
              maxWidth: "400px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <div className="task-filter">
            <button
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All ({totalCount})
            </button>
            <button
              className={filter === "Pending" ? "active" : ""}
              onClick={() => setFilter("Pending")}
            >
              Pending ({pendingCount})
            </button>
            <button
              className={filter === "Completed" ? "active" : ""}
              onClick={() => setFilter("Completed")}
            >
              Completed ({completedCount})
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleComplete}
          />
        </>
      )}

      {showTaskForm && (
        <div className="task-form-screen">
          <div className="task-form-left">
            <TaskAnimation />
          </div>
          <div className="task-form-right">
            <div className="task-form-box">
              <TaskForm
                onSave={handleAddTask}
                onClose={() => {
                  setShowTaskForm(false);
                  setTaskToEdit(null);
                }}
                taskToEdit={taskToEdit}
                enablePriority={true}
                enableDueDate={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
