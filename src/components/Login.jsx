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


export const DetailsContext = createContext();

export function useDetails() {
  return useContext(DetailsContext);
}

export const DetailsProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [fYear, setFYear] = useState("");

  const handleSetCompanyId = (newID) => {
    setCompanyId(newID);
    Cookies.set("companyId", newID, { expires: 7 });
  };

  const handleSetBranchId = (newId) => {
    setBranchId(newId);
    Cookies.set("branchId", newId, { expires: 7 });
  };

  const handleSetFYear = (newFYear) => {
    setFYear(newFYear);
    Cookies.set("fYear", newFYear, { expires: 7 });
  };

  useEffect(() => {
    const savedCompanyId = Cookies.get("companyId");
    const savedBrancId = Cookies.get("branchId");
    const savedFYear = Cookies.get("fYear");

    if (savedCompanyId) {
      setCompanyId(savedCompanyId);
    }

    if (savedBrancId) {
      setBranchId(savedBrancId);
    }

    if (savedFYear) {
      setFYear(savedFYear);
    }
  }, []);

  return (
    <DetailsContext.Provider
      value={{
        companyId,
        setCompanyId: handleSetCompanyId,
        branchId,
        setBranchId: handleSetBranchId,
        fYear,
        setFYear: handleSetFYear,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};


function Login() {
  const [username, setUsername] = useState("ggwpfax");
  const [password, setPassword] = useState("udayan@99");
  const [companies, setCompanies] = useState([]);
  const { token, setToken } = useAuth();
  const { companyId, setCompanyId } = useDetails(); 
  const { branchId, setBranchId } = useDetails()
  const { fYear, setFYear } = useDetails()
  const [finYears, setFinYears] = useState([])

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    console.log(selectedCompanyId);
    setCompanyId(selectedCompanyId);
  };

  const handleFinChange = (e) =>{
    const selectedFYear = e.target.value
    setFYear(selectedFYear)
  }

  const handleBranchChange = (e) => {
    const selectedBranchId = e.target.value;
    setBranchId(selectedBranchId);
  };
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
        console.log("Company Id", companyId);
        console.log('Branch Id', branchId)
        console.log('Fin year', fYear)
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
        "http://localhost:5500/companies/FnShowActiveData"
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setCompanies(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() =>{
    const fetchFinancialYears = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/financials/FnShowActiveData')
        const data = response.data
        setFinYears(data)
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchFinancialYears()
  },[])

  return (
    <DetailsProvider value={companyId}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="mb-4 text-center">
            <img src="/systech.jpg" alt="Logo" className="w-24 mx-auto mb-4" />
            <h2 className="text-[15px] font-semibold">Login</h2>
          </div>
          {/* <form onSubmit={userLogin}> */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-[13px]"
            >
              Company:
            </label>
            <select
              type="dropdown"
              id="company"
              required
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.CompanyId} value={company.CompanyId}>
                  {company.CompanyName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-[13px]"
            >
              Branch:
            </label>
            <select
              type="dropdown"
              id="branch"
              required
              onChange={handleBranchChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
            >
              <option value="">Select a branch</option>
              <option value="00001">Main</option>
              <option value="00002">Sub</option>
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-[13px]"
            >
              Financial Year:
            </label>
            <select
              type="dropdown"
              id="fin"
              required
              onChange={handleFinChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
            >
              <option value="">Select a Financial Year</option>
              {finYears.map((year, index) => (
                <option key={index} value={year.ShortName}>
                  {year.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
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
    </DetailsProvider>
  );
}

export default Login;
