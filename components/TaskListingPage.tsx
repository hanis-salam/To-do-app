import { ToDo } from "@/type/to-do";
import { AiOutlineMore } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";
import TaskForm from "./TaskForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ListingProps {
  Todos: ToDo[];
  deleteTask: (id: number) => void;
  updateTask: (id: number, title: string, description: string) => void;
  CheckDone: (id: number, checked: boolean) => void;
  setEditingTaskId: Dispatch<SetStateAction<number | null>>;
  editingTaskId: number | null;
  setshowCancel: Dispatch<SetStateAction<boolean>>;
  showCancel: boolean;
}

function TaskListingPage({
  Todos,
  deleteTask,
  updateTask,
  CheckDone,
  setEditingTaskId,
  editingTaskId,
  showCancel,
  setshowCancel,
}: ListingProps) {
  const showEditForm = (id: number) => {
    setEditingTaskId(id);
    setshowCancel(true);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleUpdateTask = (title: string, description: string) => {
    if (editingTaskId !== null) {
      updateTask(editingTaskId, title, description);
    }
  };

  const handleRemoveTask = () => {
    if (editingTaskId !== null) {
      deleteTask(editingTaskId);
    }
  };

  return Todos.map((todo) =>
    editingTaskId === todo.id ? (
      <TaskForm
        key={todo.id}
        title={todo.title}
        description={todo.description}
        onCancel={handleCancelEdit}
        handleUpdateTask={handleUpdateTask}
        showCancel={showCancel}
        handleRemoveTask={handleRemoveTask}
      />
    ) : (
      <div
        key={todo.id}
        className="bg-[#F8E1CD] p-4 m-2 rounded-md text-white border hover:shadow-lg transition duration-300"
      >
        <div className="mx-auto flex items-center justify-between text-gray-800">
          <p
            className={`text-lg font-semibold ${
              todo.isCheck ? "line-through" : ""
            }`}
          >
            {todo.title}
          </p>
          <Popover>
            <PopoverTrigger>
              <AiOutlineMore size={20} />
            </PopoverTrigger>
            <PopoverContent className="w-auto drop-shadow-2xl ">
              <button onClick={() => showEditForm(todo.id)}>Edit...</button>
              <Separator className="bg-gray-500 my-2" />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>Delete</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your task from the list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTask(todo.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </div>
        <p
          className={`text-gray-600 mt-2 ${todo.isCheck ? "line-through" : ""}`}
        >
          {todo.description}
        </p>
        <div className="flex justify-end items-center space-x-2 text-gray-700">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.isCheck}
            onCheckedChange={(checked) => CheckDone(todo.id, !!checked)}
          />
          <label htmlFor={`todo-${todo.id}`} className="text-sm">
            Done
          </label>
        </div>
      </div>
    )
  );
}
export default TaskListingPage;
