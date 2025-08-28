"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { taskAPI, Task } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import { toast, Toaster } from "react-hot-toast";

export default function EditTaskPage() {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await taskAPI.getAllTasks();
        const foundTask = tasks.find((t) => t.id === taskId);
        if (foundTask) {
          setTask(foundTask);
        } else {
          toast.error("Task not found");
          router.push("/");
        }
      } catch (error) {
        toast.error("Failed to fetch task");
        router.push("/");
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId, router]);

  const handleSubmit = async (data: { title: string; color: string }) => {
    if (!task) return;

    setIsLoading(true);
    try {
      await taskAPI.updateTask(task.id, data);
      toast.success("Task updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  if (!task) {
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
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
