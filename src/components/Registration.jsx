import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your authentication logic here.
    // For simplicity, we'll just check if username and password are not empty.

    if (username && password) {
      // If authentication is successful, call the onLogin callback
      // to set isLoggedIn to true in the parent component (App).
      navigate("/company-masters");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const navDash = () => {
    navigate("/company-masters");
  };
  return (
    <div className="mt-8 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4 text-center">
          <img
            src="/systech.jpg"
            alt="Logo"
            className="w-22 mb-2 mx-auto h-[120px]"
          />
          <h2 className="text-l font-semibold">Register a New User</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-[13px]">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-[13px]"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-[13px]"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-[13px]">
              Role
            </label>
            <select
              id="role"
              value={role}
              className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Add
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={navDash}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
