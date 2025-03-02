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
          const newUser = await res.json();
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setNewName("");
          setNewEmail("");
          setNewPassword("");
          setShowModal(false);
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
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
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
    await signOut({ redirect: false });
    await signOut({ callbackUrl: "/" });
    window.location.href = "/";
    router.push("/");
  };

  const handleViewUser = (user: User) => {
    swal(`Name: ${user.name}\nEmail: ${user.email}`);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen px-6 sm:px-8 lg:px-12 items-center bg-white bg-opacity-90`}
    >
      <div className="w-full max-w-6xl flex flex-col items-center">
        <header className="w-full flex flex-row justify-between items-center mt-8 sm:mt-10">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black text-base sm:text-xl font-bold h-12 sm:h-14 w-36 sm:w-40 px-6 py-3 rounded-full border-green-700 hover:scale-105 transition-transform hover:bg-green-500 hover:text-white shadow-xl"
          >
            Add User
          </button>
          <button
            onClick={handleSignOut}
            className="bg-white text-black text-base sm:text-xl font-bold h-12 sm:h-14 w-36 sm:w-40 px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform hover:bg-red-500 hover:text-white"
          >
            Sign Out
          </button>
        </header>
        <div className="flex flex-col items-center gap-8 sm:gap-10 mt-8 sm:mt-10 mb-8 sm:mb-12 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black text-center">
            User Management
          </h1>
          {/* CHANGED: Added onDelete prop to pass handleDelete to DataTable */}
          <div className="w-full">
            <DataTable columns={columns} data={users} onDelete={handleDelete} />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-6">
          <div className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
            <h2 className="text-lg sm:text-xl text-blue-700 font-bold mb-6 text-center">
              Add New User
            </h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-3 text-purple-800 rounded-lg mb-6 text-base sm:text-lg"
              placeholder="Enter name"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border p-3 text-purple-800 rounded-lg mb-6 text-base sm:text-lg"
              placeholder="Enter email"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-3 text-purple-800 rounded-lg mb-6 text-base sm:text-lg"
              placeholder="Enter password"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg"
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