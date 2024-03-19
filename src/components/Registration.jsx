import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [empid, setEmpid] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const roleBasedAccess = {
    Admin: [287,549,610,624,703,736,872,954,143,217,395,431,502,598,786,820,148,201,409,752,875,269,317,370,497,531,548,654,753,153,418,460,706,159,273,523,619,625,690,758,832,871,907,926,141,182,305,407,603,724,879],
    Employee: [153, 159, 926, 871, 141, 531, 497]
    };
  
  const [accessRights, setAccessRights] = useState('')
  useEffect(() =>{
    if (role === 'Admin') setAccessRights(roleBasedAccess.Admin.join(','))
    if (role === 'Employee') setAccessRights(roleBasedAccess.Employee.join(','))
  }, [role])  

  const userRegistration = async () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
      empid: empid,
      role: role,
      accessrights: accessRights
    }
    console.log('Data that goes to the API', data)
    try {
      const response = await axios.post(
        'http://localhost:5500/users/register', data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.error) {
        // Email already registered
        alert(response.data.error);
      } else {
        alert("New user added, please login")
        navigate('/')
      }
    } catch (error) {
      console.log('Error', error);
      alert('Email is already registered, please contact Admin.')
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate email on input change
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(emailRegex.test(enteredEmail));
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
        {/* <form onSubmit={handleSubmit}> */}
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
            <label htmlFor="name" className="block text-gray-700 text-[13px]">
              Employee Id
            </label>
            <input
              type="text"
              id="empid"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px]"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-[13px]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px] ${
              isValidEmail ? "" : "border-red-500"
            }`}
          />
          {!isValidEmail && (
            <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-[13px]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px]"
            />
            <button
              className="absolute top-2 right-2 text-sm"
              onClick={togglePasswordVisibility}
            >
          {showPassword ? (
            <Icon icon="fluent:eye-off-24-filled" width="24" height="24" style={{ color: "#462a68" }} />
          ) : (
            <Icon icon="iconoir:eye-solid" width="24" height="24" style={{ color: "#462a68" }} />
          )}
            </button>
          </div>
        </div>
          <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-[13px]"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatchError(password !== e.target.value);
            }}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[11px] ${
              passwordMatchError ? "border-red-500" : ""
            }`}
          />
          {passwordMatchError && confirmPassword !== "" && (
            <p className="text-red-500 text-sm mt-1">
              Passwords do not match.
            </p>
          )}
          {!passwordMatchError && confirmPassword !== "" && (
            <p className="text-green-500 text-sm mt-1">Passwords match.</p>
          )}
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
            </select>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              onClick={userRegistration}
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Register
            </button>
            <button
              type='button'
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Registration;
