"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect, useCallback } from "react";
import swal from "sweetalert";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { People, columns } from "./columns";
import { DataTable } from "./data-table";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  // CHANGED: Added a reusable fetchUsers function with useCallback
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  // CHANGED: Updated useEffect to use fetchUsers
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // CHANGED: Rewrote handleAddUser to update state directly instead of reloading
  const handleAddUser = async () => {
    if (newName.trim() && newEmail.trim() && newPassword.trim()) {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName, email: newEmail, password: newPassword }),
        });
        if (res.ok) {
          const newUser = await res.json(); // Assumes API returns the new user
          setUsers((prevUsers) => [...prevUsers, newUser]); // Add new user to state
          setNewName("");
          setNewEmail("");
          setNewPassword("");
          setShowModal(false); // Close modal
        } else {
          swal("Error", "Failed to add user", "error");
        }
      } catch (error) {
        console.error("Error adding user:", error);
        swal("Error", "Something went wrong", "error");
      }
    }
  };

  // CHANGED: Rewrote handleDelete to update state directly instead of reloading
  const handleDelete = (user: User) => {
    swal({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This action cannot be undone!`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await fetch(`/api/user?id=${user.id}`, { method: "DELETE" });
          if (res.ok) {
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)); // Remove user from state
          } else {
            swal("Error", "Failed to delete user", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          swal("Error", "Something went wrong", "error");
        }
      }
    });
  };

  // CHANGED: Simplified handleSignOut by removing redundant calls
  const handleSignOut = async () => {
    
    await signOut({ callbackUrl: "/" });
    window.location.href = "/";
    router.push("/");
  };

  const handleViewUser = (user: User) => {
    swal(`Name: ${user.name}\nEmail: ${user.email}`);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} table-auto flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 justify-center items-center bg-blue-400`}
    >
      <header className="flex flex-col items-center gap-4 mb-12">
        <h1 className="text-6xl font-bold text-gray-200">User Management</h1>
      </header>
      <main>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white text-lg px-2 lg:px-6 lg:py-4 rounded-full items-end shadow-md hover:scale-105 transition-transform font-bold sm:text-lg ml-2 py-8 fixed top-3 right-3 left-15"
        >
          Sign Out
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white text-3xl font-bold px-6 py-3 rounded-full border-spacing-2 border-green-700 fixed top-3 right-15 left-3 hover:scale-105"
        >
          Add User
        </button>
        {/* CHANGED: Added onDelete prop to pass handleDelete to DataTable */}
        <DataTable columns={columns} data={users} onDelete={handleDelete} />
      </main>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg text-blue-700 font-bold mb-4">Add New User</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-2 text-purple-800 rounded-lg mb-4"
              placeholder="Enter name"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border p-2 text-purple-800 rounded-lg mb-4"
              placeholder="Enter email"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 text-purple-800 rounded-lg mb-4"
              placeholder="Enter password"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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