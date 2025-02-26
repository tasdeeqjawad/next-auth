import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert";

type TodoItem = {
  id: string;
  name: string;
  detail: string;
};

export default function Home() {
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [newDetails, setNewDetails] = useState("");

  const handleAddNewTodo = () => {
    if (newTodo.trim()) {
      const newItem: TodoItem = {
        id: crypto.randomUUID(),
        name: newTodo,
        detail: newDetails,
      };
      setTodo((prev) => [...prev, newItem]);
      setShowModal(false);
      setNewTodo("");
      setNewDetails("");
    }
  };

  const handleDelete = (id: string) => {
    setTodo((prev) => prev.filter((item) => item.id !== id));
  };

  const handleView = (item: TodoItem) => {
    swal(`Title: ${item.name}\nDetails: ${item.detail}`);
  };

  return (
    <div
      // Added responsive padding and background for consistent spacing and design across all screen sizes
      className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100"
    >
      <div
        // Adjusted container width and padding for responsiveness on different devices
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-lg bg-white p-6 sm:p-8 rounded-xl"
      >
        <div className="flex items-center bg-gray-200 rounded-3xl px-4 py-2 hover:scale-105 transition-transform">
          <Image
            // Made the user avatar responsive with scalable width and height for various screens
            className="object-cover rounded-full w-12 h-12 sm:w-16 sm:h-16"
            src="/user-icon-jpg-28.jpg"
            alt="User Avatar"
            width={64}
            height={64}
          />
          <div className="ml-4">
            <p className="text-2xl sm:text-3xl text-gray-600">To-Do List</p>
            <p className="text-sm">Today</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            // Enhanced 'Add New To-Do' button with responsive padding for better touch targets on mobile devices
            className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Add New To-Do
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {todo.map((item) => (
            <li
              key={item.id}
              // Improved list item layout with flex and spacing for consistent alignment across devices
              className="w-full border-2 rounded-xl p-3 flex items-center justify-between hover:border-blue-300"
            >
              <input type="checkbox" className="w-5 h-5 mr-3" />
              <span className="flex-grow text-sm sm:text-base">{item.name}</span>
              <button
                onClick={() => handleView(item)}
                className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-md hover:scale-105 transition-transform text-xs sm:text-sm"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-md hover:scale-105 transition-transform text-xs sm:text-sm ml-2"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div
            // Adjusted modal width for responsiveness on mobile and desktop
            className="bg-white w-full max-w-sm sm:max-w-md p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4">Add New To-Do</h2>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full border-2 p-2 rounded-lg mb-4 text-sm sm:text-base"
              placeholder="Enter title..."
            />
            <textarea
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              className="w-full border-2 p-2 rounded-lg text-sm sm:text-base"
              rows={4}
              placeholder="Enter details..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
