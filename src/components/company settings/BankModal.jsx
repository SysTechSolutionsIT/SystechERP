import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { bankData } from "./BankMaster";
import axios from "axios";
import { useAuth } from "../Login";

const BankModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [AuthP1, setAuthP1] = useState("");
  const [AuthP2, setAuthP2] = useState("");
  const [AuthP3, setAuthP3] = useState("");
  const [Employees, setEmployees] = useState([]);

  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");

  //Logic for Searches
  const handleInputChange = (event, authorizedPerson) => {
    const { value } = event.target;
    // Set the search term based on the authorized person
    switch (authorizedPerson) {
      case 1:
        setSearchTerm1(value);
        break;
      case 2:
        setSearchTerm2(value);
        break;
      case 3:
        setSearchTerm3(value);
        break;
      default:
        break;
    }
  };
  // 3 filtering for 3 components
  const filteredEmployees1 = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredEmployees2 = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const filteredEmployees3 = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm3.toLowerCase())
  );

  //Fetching Employee Names
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployees();
  }, [token]);

  const formik = useFormik({
    initialValues: {
      BankName: "",
      BranchName: "",
      BranchAddress: "",
      AccountType: "",
      AccountNo: "",
      IFSCCode: "",
      SwiftCode: "",
      RegisteredEmailId: "",
      RegisteredContactNo: "",
      CurrencyType: "",
      BankGST: "",
      AuthorizedPersonCount: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      AuthorizedPerson1: AuthP1,
      AuthorizedPersonRole1: "",
      AuthorizedPerson2: AuthP2,
      AuthorizedPersonRole2: "",
      AuthorizedPerson3: AuthP3,
      AuthorizedPersonRole3: "",
    },
    onSubmit: (values) => {
      console.log(values);
      addBank();
      // alert("Bank Added Successfully");
    },
  });

  const addBank = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/bankmaster/FnAddUpdateDeleteRecord",
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("Bank added successfully");
        onClick();
        window.location.reload();
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle network error
    }
  };

  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    const fetchCurrencyData = async () => {
      const CID = 11;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Currency", data);
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencyData();
  }, [token]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Bank Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Bank Name
                </p>
                <input
                  id="BankName"
                  type="text"
                  placeholder="Enter Bank Name"
                  value={formik.values.BankName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Branch Name
                </p>
                <input
                  id="BranchName"
                  type="text"
                  placeholder="Enter Branch Name"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Branch Address
                </p>
                <input
                  id="BranchAddress"
                  type="text"
                  placeholder=" Enter Branch Address"
                  value={formik.values.BranchAddress}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Account Type
                </p>
                <select
                  id="AccountType"
                  value={formik.values.AccountType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Foriegn currency non-resident (FCNR) account">
                    Foriegn currency non-resident (FCNR) account
                  </option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Loans">Loans</option>
                  <option value="Over Due">Over Due</option>
                  <option value="Cash Credit">Cash Credit</option>
                  <option value="Salary">Salary</option>
                  <option value="Current">Current</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Account No.
                </p>
                <input
                  id="AccountNo"
                  type="number"
                  placeholder=" Enter Account No."
                  value={formik.values.AccountNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  IFSC Code
                </p>
                <input
                  id="IFSCCode"
                  type="text"
                  placeholder=" Enter IFSC Code"
                  value={formik.values.IFSCCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  SWIFT Code.
                </p>
                <input
                  id="SwiftCode"
                  type="text"
                  placeholder=" Enter SWIFT Code"
                  value={formik.values.SwiftCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Registered Email ID
                </p>
                <input
                  id="RegisteredEmailId"
                  type="text"
                  placeholder=" Enter Registered Email"
                  value={formik.values.RegisteredEmailId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Registered Contact No.
                </p>
                <input
                  id="RegisteredContactNo"
                  type="number"
                  placeholder=" Enter Registered Contact No."
                  value={formik.values.RegisteredContactNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Currency Type
                </p>
                <select
                  id="CurrencyType"
                  name="currency"
                  className="text-[11px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  value={formik.values.CurrencyType}
                  onChange={formik.handleChange}
                >
                  {currencies.length > 0 &&
                    currencies.map((currency) => (
                      <option
                        key={currency.FieldId}
                        value={currency.FieldDetails}
                      >
                        {currency.FieldDetails}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Bank GST</p>
                <input
                  id="BankGST"
                  type="text"
                  placeholder=" Enter Bank GST"
                  value={formik.values.BankGST}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Authorized Person Count
                </p>
                <input
                  id="AuthorizedPersonCount"
                  type="number"
                  placeholder=" Enter Authorized Person Count."
                  value={formik.values.AuthorizedPersonCount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder=" Enter Remarks."
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 1
                </p>
                <input
                  type="text"
                  id="AuthorizedPerson1"
                  value={formik.values.AuthorizedPerson1}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleInputChange(e, 1); // Pass 1 as the authorized person identifier
                  }}
                  onFocus={() => setSearchTerm1("")}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  placeholder={
                    formik.values.EmployeeId
                      ? formik.values.EmployeeName
                      : "Search Employee Name"
                  }
                />
                {searchTerm1 && (
                  <div
                    className="z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {filteredEmployees1.length > 0 ? (
                      filteredEmployees1.map((entry) => (
                        <div
                          key={entry.EmployeeId}
                          onClick={() => {
                            setAuthP1(entry.EmployeeId);

                            formik.setValues({
                              ...formik.values,
                              AuthorizedPerson1: entry.EmployeeId,
                            });
                            setSearchTerm1("");
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                        >
                          {entry.EmployeeName}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No matching results
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 1 Role
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole1"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole1 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole1"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole1 === "Operation"
                      }
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 2
                </p>
                <input
                  type="text"
                  id="AuthorizedPerson2"
                  value={formik.values.AuthorizedPerson2}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleInputChange(e, 2); // Pass 1 as the authorized person identifier
                  }}
                  onFocus={() => setSearchTerm2("")}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  placeholder={
                    formik.values.EmployeeId
                      ? formik.values.EmployeeName
                      : "Search Employee Name"
                  }
                />
                {searchTerm2 && (
                  <div
                    className="z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {filteredEmployees2.length > 0 ? (
                      filteredEmployees2.map((entry) => (
                        <div
                          key={entry.EmployeeId}
                          onClick={() => {
                            setAuthP2(entry.EmployeeId);

                            formik.setValues({
                              ...formik.values,
                              AuthorizedPerson2: entry.EmployeeId,
                            });
                            setSearchTerm2("");
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                        >
                          {entry.EmployeeName}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No matching results
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 2 Role
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole2"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole2 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole2"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole2 === "Operation"
                      }
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 3
                </p>
                <input
                  type="text"
                  id="AuthorizedPerson3"
                  value={formik.values.AuthorizedPerson3}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleInputChange(e, 3); // Pass 1 as the authorized person identifier
                  }}
                  onFocus={() => setSearchTerm3("")}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  placeholder={
                    formik.values.EmployeeId
                      ? formik.values.EmployeeName
                      : "Search Employee Name"
                  }
                />
                {searchTerm3 && (
                  <div
                    className="z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {filteredEmployees3.length > 0 ? (
                      filteredEmployees3.map((entry) => (
                        <div
                          key={entry.EmployeeId}
                          onClick={() => {
                            setAuthP3(entry.EmployeeId);

                            formik.setValues({
                              ...formik.values,
                              AuthorizedPerson3: entry.EmployeeId,
                            });
                            setSearchTerm3("");
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                        >
                          {entry.EmployeeName}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No matching results
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 3
                </p>
                <div className="space-y-2  text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole3"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole3 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole3"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole3 === "Operation"
                      }
                      onChange={formik.handleChange}
                      className="mr-2 text-[11px]"
                    />
                    Operation
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default BankModal;
