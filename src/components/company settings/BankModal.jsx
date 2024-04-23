import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";
import TwoFieldsModal from "../company settings/TwoFieldsModal";

const BankModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [Employees, setEmployees] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MMId, setMMId] = useState();

  const [accountNo, setAccountNo] = useState("");

  const handleAccNoChange = (event) => {
    const { value } = event.target;

    // Only update the account number state if the input value contains only numbers
    if (/^[0-9]*$/.test(value)) {
      setAccountNo(value);
    }
  };

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
      AuthorizedPerson1: "",
      AuthorizedPersonRole1: "",
      AuthorizedPerson2: "",
      AuthorizedPersonRole2: "",
      AuthorizedPerson3: "",
      AuthorizedPersonRole3: "",
    },
    onSubmit: (values, {resetForm}) => {
      const updatedData = {
        BankName: values.BankName,
        BranchName: values.BranchName,
        BranchAddress: values.BranchAddress,
        AccountType: values.AccountType,
        AccountNo: accountNo,
        IFSCCode: values.IFSCCode,
        SwiftCode: values.SwiftCode,
        RegisteredEmailId: values.RegisteredEmailId,
        RegisteredContactNo: values.RegisteredContactNo,
        CurrencyType: values.CurrencyType,
        BankGST: values.BankGST,
        AuthorizedPersonCount: values.AuthorizedPersonCount,
        Remark: values.Remark,
        IUFlag: "I",
        AuthorizedPerson1: values.AuthorizedPerson1,
        AuthorizedPersonRole1: values.AuthorizedPersonRole1,
        AuthorizedPerson2: values.AuthorizedPerson2,
        AuthorizedPersonRole2: values.AuthorizedPersonRole2,
        AuthorizedPerson3: values.AuthorizedPerson3,
        AuthorizedPersonRole3: values.AuthorizedPersonRole3,
      };
      console.log(updatedData);
      addBank(updatedData);
      resetForm()
      onClick()
    },
  });

  const addBank = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/bankmaster/FnAddUpdateDeleteRecord",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      console.log("Response:", response);
      console.log("Data:", response.data);
      alert("Bank added successfully");
      onClick();
    } catch (error) {
      console.error("Error:", error.message);
      // Handle network error
    }
  };

  const [AccountType, setAccountType] = useState([]);
  useEffect(() => {
    const fetchAccountTypes = async () => {
      const ID = 10;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Account Types", data);
        setAccountType(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchAccountTypes();
  }, [token, isModalOpen]);

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
                <p className="capatilize font-semibold text-[13px]">Bank Id</p>
                <input
                  id="BankId"
                  type="text"
                  placeholder="Enter Bank Id"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
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
              <div className="flex flex-col">
                <p className="capatilize font-semibold text-[13px] mb-1">
                  Account Type
                </p>
                <div className="flex items-center">
                  {AccountType.length > 0 ? (
                    <select
                      id="AccountType"
                      name="AccountType"
                      value={formik.values.AccountType}
                      className="flex-1 px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Account Type</option>
                      {AccountType.map((entry) => (
                        <option key={entry.FieldId} value={entry.FieldId}>
                          {entry.FieldDetails}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                      No available entries
                    </p>
                  )}
                  <Icon
                    icon="flat-color-icons:plus"
                    width="24"
                    height="24"
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setMMId(10);
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Account No.
                </p>
                <input
                  id="AccountNo"
                  type="text"
                  placeholder="Enter Account No."
                  value={accountNo}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  onChange={handleAccNoChange}
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
              <div className="flex flex-col">
                <p className="mb-1 font-semibold text-[13px]">Currency Type</p>
                <div className="flex">
                  {currencies.length > 0 ? (
                    <select
                      id="CurrencyType"
                      name="CurrencyType"
                      className="text-[11px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mr-1"
                      value={formik.values.CurrencyType}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Currency Type</option>
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
                  ) : (
                    <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                      No available entries
                    </p>
                  )}
                  <Icon
                    icon="flat-color-icons:plus"
                    width="24"
                    height="24"
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setMMId(11);
                    }}
                  />
                </div>
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
                <select
                  id="AuthorizedPerson1"
                  value={formik.values.AuthorizedPerson1}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 1</option>
                  {Employees.map((entry) => (
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
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
                <select
                  id="AuthorizedPerson2"
                  value={formik.values.AuthorizedPerson2}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 2</option>
                  {Employees.map((entry) => (
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
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
                <select
                  id="AuthorizedPerson3"
                  value={formik.values.AuthorizedPerson3}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 3</option>
                  {Employees.map((entry) => (
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
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
              Submit
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
        <TwoFieldsModal
          visible={isModalOpen}
          onClick={() => setModalOpen(false)}
          MasterID={MMId}
        />
      </div>
    </form>
  );
};
export default BankModal;
