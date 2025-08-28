"use client";

import { useState, useEffect } from "react";
import { taskAPI, Task } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskAPI.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await taskAPI.updateTask(id, { completed });
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed } : task))
      );
      toast.success(completed ? "Task completed!" : "Task marked incomplete");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
            <p className="text-gray-600 mt-2">
              Tasks: {tasks.length} | Completed: {completedTasks} of{" "}
              {tasks.length}
            </p>
          </div>
          <Link href="/create" className="btn-primary">
            Create Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No tasks yet</div>
            <p className="text-gray-400 mt-2">
              Create your first task to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={(task) => (window.location.href = `/edit/${task.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
