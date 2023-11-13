import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { bankData } from "./BankMaster";
import axios from "axios";
import { useAuth } from "../Login";

const BankModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      BankName: "",
      branchName: "",
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
      AuthorizedPerson1: "",
      AuthorizedPersonRole1: "",
      AuthorizedPerson2: "",
      AuthorizedPersonRole2: "",
      AuthorizedPerson3: "",
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
      try {
        const response = await axios.get("http://localhost:5500/currency/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.records;
        console.log("Currency", data);
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencyData();
  }, []);

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
                  id="branchName"
                  type="text"
                  placeholder="Enter Branch Name"
                  value={formik.values.branchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Branch Address
                </p>
                <input
                  id="branchAddress"
                  type="text"
                  placeholder=" Enter Branch Address"
                  value={formik.values.branchAddress}
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
                  id="currency"
                  name="currency"
                  className="text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                >
                  {currencies.length > 0 &&
                    currencies.map((currency) => (
                      <option key={currency.id} value={currency.abbr}>
                        {currency.name}
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
                  id="AuthorizedPerson1"
                  type="text"
                  value={formik.values.AuthorizedPerson1}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 1
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
                  id="AuthorizedPerson2"
                  type="text"
                  value={formik.values.AuthorizedPerson2}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 2
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
                  id="AuthorizedPerson3"
                  type="text"
                  value={formik.values.AuthorizedPerson3}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
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
