import { Dispatch, SetStateAction, useState } from "react";

interface TaskFormProps {
  title: string;
  description: string;
  handleUpdateTask: (title: string, description: string) => void;
  onCancel: () => void;
  showCancel: boolean;
  handleRemoveTask: () => void;
}

function TaskForm({
  title,
  description,
  handleUpdateTask,
  onCancel,
  showCancel,
  handleRemoveTask,
}: TaskFormProps) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [error, setError] = useState<string | null>(null); // For error handling

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate title and description
    if (!taskTitle.trim() || !taskDescription.trim()) {
      setError("Both title and description are required.");
      return;
    }

    // Clear error and call update task handler
    setError(null);
    handleUpdateTask(taskTitle.trim(), taskDescription.trim());
  };

  return (
    <form onSubmit={handleSave} className="p-4 bg-gray-100 rounded-md">
      {error && (
        <p className="mb-2 text-red-500 text-sm">{error}</p> // Display error message
      )}
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="e.g., Grocery shopping"
        className={`block mb-2 p-2 border border-gray-400 rounded-md w-full ${
          error && !taskTitle.trim() ? "border-red-500" : ""
        }`}
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="e.g., Buy fruits, vegetables, and milk"
        className={`block mb-2 p-2 border border-gray-400 rounded-md w-full ${
          error && !taskDescription.trim() ? "border-red-500" : ""
        }`}
      />
      <div className="flex justify-end space-x-2">
        {showCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveTask}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Remove
          </button>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
