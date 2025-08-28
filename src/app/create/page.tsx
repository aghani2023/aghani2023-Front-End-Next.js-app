"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { taskAPI } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import { toast, Toaster } from "react-hot-toast";

export default function CreateTaskPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: { title: string; color: string }) => {
    setIsLoading(true);
    try {
      await taskAPI.createTask(data);
      toast.success("Task created successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4">
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
