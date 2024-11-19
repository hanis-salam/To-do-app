"use client";
import Header from "@/components/Header";
import { ToDo } from "@/type/to-do";
import { useEffect, useState } from "react";

import ListingNotAvailable from "@/components/ListingNotAvailable";
import TaskListingPage from "@/components/TaskListingPage";

export default function Home() {
  const [Todos, setTodos] = useState<ToDo[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [showCancel, setshowCancel] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const dataString = localStorage.getItem("task");
    if (dataString) {
      const tasks: ToDo[] = JSON.parse(dataString);
      const validTasks = tasks.filter(
        (task) => task.title.trim() !== "" || task.description.trim() !== ""
      );
      setTodos(validTasks); // Initialize state with only valid tasks
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (Todos.length > 0) {
      localStorage.setItem("task", JSON.stringify(Todos));
    }
  }, [Todos]);

  const addTask = () => {
    const newTask: ToDo = {
      id: Todos.length + 1,
      title: "",
      description: "",
      isCheck: false, //default value
      completedAt: "",
    };
    setEditingTaskId(newTask.id);
    setTodos((prev) => [newTask, ...prev]);
    setshowCancel(false);
  };

  const CheckDone = (id: number, checked: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCheck: checked,
              completedAt: checked ? new Date().toISOString() : undefined,
            }
          : todo
      )
    );
  };

  const deleteTask = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setshowCancel(true);
  };

  const updateTask = (id: number, title: string, description: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );

    setEditingTaskId(null); // Exit edit mode
    // console.log("Save Task", id, updatedTodos);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        {/* TailwindCSS spinner */}
      </div>
    );
  }

  return (
    <div>
      {/* header */}
      <Header addTask={addTask} />
      {/* content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-2 mx-4">
        {Todos.length > 0 ? (
          <TaskListingPage
            Todos={Todos}
            deleteTask={deleteTask}
            updateTask={updateTask}
            CheckDone={CheckDone}
            setEditingTaskId={setEditingTaskId}
            editingTaskId={editingTaskId}
            setshowCancel={setshowCancel}
            showCancel={showCancel}
          />
        ) : (
          <>
            <ListingNotAvailable />
          </>
        )}
      </main>
    </div>
  );
}
