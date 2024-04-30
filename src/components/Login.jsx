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
    Cookies.set("token", newToken, { expires: 1 }); // Set an expiration date if needed
  };

  useEffect(() => {
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
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [empid, setEmpid] = useState("");
  const [rights, setRights] = useState("");

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

  const handleName = (newName) => {
    setName(newName);
    Cookies.set("name", newName, { expires: 7 });
  };

  const handleRole = (newRole) => {
    setRole(newRole);
    Cookies.set("role", newRole, { expires: 7 });
  };

  const handleEmpid = (newEmpid) => {
    setEmpid(newEmpid);
    Cookies.set("empid", newEmpid, { expires: 7 });
  };

  const handleRights = (newRights) => {
    setRights(newRights);
    Cookies.set("rights", newRights, { expires: 7 });
  };

  useEffect(() => {
    const savedCompanyId = Cookies.get("companyId");
    const savedBrancId = Cookies.get("branchId");
    const savedFYear = Cookies.get("fYear");
    const savedName = Cookies.get("name");
    const savedRole = Cookies.get("role");
    const savedempid = Cookies.get("empid");
    const savedRights = Cookies.get("rights");

    if (savedCompanyId) {
      setCompanyId(savedCompanyId);
    }

    if (savedBrancId) {
      setBranchId(savedBrancId);
    }

    if (savedFYear) {
      setFYear(savedFYear);
    }

    if (savedName) {
      setName(savedName);
    }

    if (savedRole) {
      setRole(savedRole);
    }

    if (savedempid) {
      setEmpid(savedempid);
    }

    if (savedRights) {
      setRights(savedRights);
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
        name,
        setName: handleName,
        role,
        setRole: handleRole,
        empid,
        setEmpid: handleEmpid,
        rights,
        setRights: handleRights,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

function Login() {
  const [email, setEmail] = useState("ggwpfax@gmail.com");
  const [password, setPassword] = useState("Udayan@99");
  const [companies, setCompanies] = useState([]);
  const { token, setToken } = useAuth();
  const { companyId, setCompanyId } = useDetails();
  const { branchId, setBranchId } = useDetails();
  const { fYear, setFYear } = useDetails();
  const { name, setName } = useDetails();
  const { role, setRole } = useDetails();
  const { empid, setEmpid } = useDetails();
  const { rights, setRights } = useDetails();
  const [finYears, setFinYears] = useState([]);
  const [branches, setBranches] = useState([]);

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    console.log(selectedCompanyId);
    setCompanyId(selectedCompanyId);
  };

  const handleFinChange = (e) => {
    const selectedFYear = e.target.value;
    setFYear(selectedFYear);
  };

  const handleBranchChange = (e) => {
    const selectedBranchId = e.target.value;
    setBranchId(selectedBranchId);
  };
  const navigate = useNavigate();

  const handleNewUser = () => {
    navigate("registration");
  };

  const userLogin = async () => {
    console.log("login clicked");

    try {
      const response = await axios.post(
        "http://localhost:5500/users/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      const token = await response.data.token;
      setToken(response.data.token);
      const name = await response.data.name;
      setName(name);
      const role = await response.data.role;
      setRole(role);
      const empid = await response.data.empid;
      setEmpid(empid);
      const rights = await response.data.rights;
      setRights(rights);
      // Set token in the AuthContext
      // setToken(token);

      // Redirect if token is available
      if (token) {
        navigate("/j0hg2l4r");
        console.log("Company Id", companyId);
        console.log("Branch Id", branchId);
        console.log("Fin year", fYear);
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

  useEffect(() => {
    const fetchFinancialYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/financials/FnShowActiveData"
        );
        const data = response.data;
        setFinYears(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchFinancialYears();
  }, []);

  useEffect(() => {
    const fetchBranchMaster = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/l3r2o5v7/FnShowActiveData"
        );
        const data = response.data;
        setBranches(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBranchMaster();
  }, []);

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
              {branches.map((company) => (
                <option key={company.BranchId} value={company.BranchId}>
                  {company.BranchName}
                </option>
              ))}
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
            <label htmlFor="email" className="block text-gray-700 text-[13px]">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300 text-[13px] font-bold"
            disabled={!companyId && !branchId && !fYear}
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleNewUser}
            className=" mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-800 transition duration-300 text-[13px] font-bold"
          >
            Register
          </button>
          {/* </form> */}
        </div>
      </div>
    </DetailsProvider>
  );
}

export default Login;
