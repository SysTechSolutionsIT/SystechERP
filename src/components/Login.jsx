import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const handleSetToken = (newToken) => {
    setToken(newToken);
    // Save token to a cookie whenever it changes
    Cookies.set("token", newToken, { expires: 7 }); // Set an expiration date if needed
  };

  useEffect(() => {
    // Check if a token exists in cookies and set it in the state
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};

function Login() {
  const [username, setUsername] = useState("ggwpfax");
  const [password, setPassword] = useState("udayan@99");
  const [companies, setCompanies] = useState([]);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const userLogin = async () => {
    console.log("login clicked");

    try {
      const response = await axios.post(
        "http://localhost:5500/users/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = await response.data.token;
      setToken(response.data.token);
      console.log("Token is", token);

      // Set token in the AuthContext
      // setToken(token);

      // Redirect if token is available
      if (token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchCompData();
  }, []);

  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/companies/FnShowAllData",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data.companies;
      console.log(data);
      setCompanies(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4 text-center">
          <img src="/systech.jpg" alt="Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-[15px] font-semibold">Login</h2>
        </div>
        {/* <form onSubmit={userLogin}> */}
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-[13px]">
            Company:
          </label>
          <select
            type="dropdown"
            id="company"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
          >
            {companies.map((company, index) => (
              <option key={index} value={company.CompanyId}>
                {company.CompanyName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-[13px]">
            Branch:
          </label>
          <select
            type="dropdown"
            id="branch"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
          >
            {companies.map((company, index) => (
              <option key={index} value={company.CompanyId}>
                {company.CompanyName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-[13px]">
            Financial Year:
          </label>
          <select
            type="dropdown"
            id="company"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
          >
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="username" className="block text-gray-700 text-[13px]">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-[13px]">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
          />
        </div>
        <button
          type="submit"
          onClick={userLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-[13px]"
        >
          Login
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Login;
