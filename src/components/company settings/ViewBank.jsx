import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";
const ViewBank = ({ visible, onClick, edit, ID }) => {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      BankName: "",
      BranchName: "",
      BranchAddress: "",
      AccountType: "",
      AccountNo: "",
      IFSCCode: "",
      SwiftCode: "",
      RegisteredEmailIdId: "",
      RegisteredContactNoNo: "",
      CurrencyType: "",
      BankGST: "",
      AuthorizedPersonCount: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
      AuthorizedPerson1: "",
      AuthorizedPersonRole1: "",
      AuthorizedPerson2: "",
      AuthorizedPersonRole2: "",
      AuthorizedPerson3: "",
      AuthorizedPersonRole3: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
        BankId: ID,
        BankName: values.BankName,
        BranchName: values.BranchName,
        BranchAddress: values.BranchAddress,
        AccountType: values.AccountType,
        AccountNo: values.AccountNo,
        IFSCCode: values.IFSCCode,
        SwiftCode: values.SwiftCode,
        RegisteredEmailId: values.RegisteredEmailId,
        RegisteredContactNo: values.RegisteredContactNo,
        CurrencyType: values.CurrencyType,
        BankGST: values.BankGST,
        AuthorizedPersonCount: values.AuthorizedPersonCount,
        Remark: values.Remark,
        AuthorizedPerson1: values.AuthorizedPerson1,
        AuthorizedPersonRole1: values.AuthorizedPersonRole1,
        AuthorizedPerson2: values.AuthorizedPerson2,
        AuthorizedPersonRole2: values.AuthorizedPersonRole2,
        AuthorizedPerson3: values.AuthorizedPerson3,
        AuthorizedPersonRole3: values.AuthorizedPersonRole3,
      };
      console.log(updatedData);
      updateBanks(updatedData);
    },
  });

  const updateBanks = async (data) => {
    axios
      .post(`http://localhost:5500/bankmaster/FnAddUpdateDeleteRecord`, data, {
        params: { BankId: ID },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Handle success
        console.log("Data updated successfully", response);
        // You can also perform additional actions here, like closing the modal or updating the UI.
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating data", error);
      });
  };

  useEffect(() => {
    fetchBanks();
  }, [ID]);

  const fetchBanks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/bankmaster/FnShowParticularData`,
        {
          params: { BankId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Response Object", response);
      const data = response.data;
      console.log("data get:", data);
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        BankName: details.BankName,
        BranchName: details.BranchName,
        BranchAddress: details.BranchAddress,
        AccountType: details.AccountType,
        AccountNo: details.AccountNo,
        IFSCCode: details.IFSCCode,
        SwiftCode: details.SwiftCode,
        RegisteredEmailId: details.RegisteredEmailId,
        RegisteredContactNo: details.RegisteredContactNo,
        CurrencyType: details.CurrencyType,
        BankGST: details.BankGST,
        AuthorizedPersonCount: details.AuthorizedPersonCount,
        Remark: details.Remark,
        AuthorizedPerson1: details.AuthorizedPerson1,
        AuthorizedPersonRole1: details.AuthorizedPersonRole1,
        AuthorizedPerson2: details.AuthorizedPerson2,
        AuthorizedPersonRole2: details.AuthorizedPersonRole2,
        AuthorizedPerson3: details.AuthorizedPerson3,
        AuthorizedPersonRole3: details.AuthorizedPersonRole3,
      });
    }
  }, [details]);

  console.log("Details array", details);
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
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
                <p className="capatilize text-left font-semibold text-[13px]">
                  Bank ID
                </p>
                <input
                  id="BankId"
                  type="number"
                  placeholder="Bank ID"
                  value={details?.BankId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold text-[13px] ">
                  Bank Name
                </p>
                <input
                  id="BankName"
                  type="text"
                  placeholder="Enter Bank Name"
                  value={formik.values.BankName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Branch Name
                </p>
                <input
                  id="BranchName"
                  type="text"
                  placeholder="Enter Branch Name"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Branch Address
                </p>
                <input
                  id="BranchAddress"
                  type="text"
                  placeholder=" Enter Branch Address"
                  value={formik.values.BranchAddress}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Account Type
                </p>
                <select
                  id="AccountType"
                  value={formik.values.AccountType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Account No.
                </p>
                <input
                  id="AccountNo"
                  type="number"
                  placeholder=" Enter Account No."
                  value={formik.values.AccountNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  IFSC Code
                </p>
                <input
                  id="IFSCCode"
                  type="text"
                  placeholder=" Enter IFSC Code"
                  value={formik.values.IFSCCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  SWIFT Code.
                </p>
                <input
                  id="SwiftCode"
                  type="text"
                  placeholder=" Enter SWIFT Code"
                  value={formik.values.SwiftCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Registered Email ID
                </p>
                <input
                  id="RegisteredEmailId"
                  type="text"
                  placeholder=" Enter Registered Email"
                  value={formik.values.RegisteredEmailId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Registered Contact No.
                </p>
                <input
                  id="RegisteredContactNo"
                  type="number"
                  placeholder=" Enter Registered Contact No."
                  value={formik.values.RegisteredContactNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize text-left font-semibold  text-[13px]">
                  Currency Type
                </p>
                <select
                  id="CurrencyType"
                  value={formik.values.CurrencyType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Currency Type</option>
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">United States Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound Sterling (GBP)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="SGD">Singapore Dollar (SGD)</option>
                  <option value="CHF">Swiss Franc (CHF)</option>
                  <option value="CNY">Chinese Yuan (CNY)</option>
                </select>
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Bank GST
                </p>
                <input
                  id="BankGST"
                  type="text"
                  placeholder=" Enter Bank GST"
                  value={formik.values.BankGST}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Authorized Person Count
                </p>
                <input
                  id="AuthorizedPersonCount"
                  type="number"
                  placeholder=" Enter Authorized Person Count."
                  value={formik.values.AuthorizedPersonCount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize text-left font-semibold  text-[13px]">
                  Remarks
                </p>
                <input
                  id="Remark"
                  type="text"
                  placeholder=" Enter Remarks."
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize text-left font-semibold  text-[13px]">
                  Authorized Person 1
                </p>
                <input
                  id="AuthorizedPerson1"
                  type="text"
                  value={formik.values.AuthorizedPerson1}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize text-left text-[13px] font-semibold">
                  Authorized Person 1
                </p>
                <div className="space-y-2">
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole1"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole1 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole1"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole1 === "Operation"
                      }
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize text-left font-semibold text-[13px]">
                  Authorized Person 2
                </p>
                <input
                  id="AuthorizedPerson2"
                  type="text"
                  value={formik.values.AuthorizedPerson2}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize text-left font-semibold text-[13px]">
                  Authorized Person 2
                </p>
                <div className="space-y-2">
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole2"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole2 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole2"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole2 === "Operation"
                      }
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize text-left font-semibold text-[13px]">
                  Authorized Person 3
                </p>
                <input
                  id="AuthorizedPerson3"
                  type="text"
                  value={formik.values.AuthorizedPerson3}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize text-left text-[13px] font-semibold">
                  Authorized Person 3
                </p>
                <div className="space-y-2">
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole3"
                      value="View"
                      checked={formik.values.AuthorizedPersonRole3 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2 text-[11px]"
                    />
                    View
                  </label>
                  <label className="flex items-center text-[11px]">
                    <input
                      type="radio"
                      id="AuthorizedPersonRole3"
                      value="Operation"
                      checked={
                        formik.values.AuthorizedPersonRole3 === "Operation"
                      }
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2 "
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

export default ViewBank;
