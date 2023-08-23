import React from "react";
import { bankData } from "./BankMaster";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

const ViewBank = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      bankId: "",
      bankName: "",
      branchName: "",
      branchAddress: "",
      accountType: "",
      accountNo: "",
      ifscCode: "",
      swiftCode: "",
      registeredEmail: "",
      registeredContact: "",
      currencyType: "",
      bankGst: "",
      authPersonCount: "",
      remark: "",
      authPerson1: "",
      authPerson2: "",
      authPerson3: "",
    },
    onSubmit: (values) => {
      console.log(values);
      bankData.push(values);
    },
  });

  useEffect(() => {
    const selectedBank = bankData.find((bank) => bank.bankId === ID);
    if (selectedBank) {
      setDetails(selectedBank);
    }
  }, [ID]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] mt-96 p-8 rounded-lg">
          <div className="bg-blue-900 text-white text-center font-semibold text-lg py-4 px-8 rounded-lg">
            Bank Master
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold">Bank ID</p>
                <input
                  id="bankId"
                  type="number"
                  placeholder="Bank ID"
                  value={details.bankId}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Bank Name</p>
                <input
                  id="bankName"
                  type="text"
                  placeholder="Enter Bank Name"
                  value={details.bankName}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Branch Name</p>
                <input
                  id="branchName"
                  type="text"
                  placeholder="Enter Branch Name"
                  value={details.branchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Branch Address</p>
                <input
                  id="branchAddress"
                  type="text"
                  placeholder=" Enter Branch Address"
                  value={details.branchAddress}
                  className={`w-full px-4 py-5 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Account Type</p>
                <select
                  id="accountType"
                  value={details.accountType}
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg whitespace-normal"
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
                <p className="capatilize font-semibold">Account No.</p>
                <input
                  id="accountNo"
                  type="number"
                  placeholder=" Enter Account No."
                  value={details.accountNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">IFSC Code</p>
                <input
                  id="ifscCode"
                  type="text"
                  placeholder=" Enter IFSC Code"
                  value={details.ifscCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">SWIFT Code.</p>
                <input
                  id="swiftCode"
                  type="text"
                  placeholder=" Enter SWIFT Code"
                  value={details.swiftCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Registered Email ID</p>
                <input
                  id="registeredEmail"
                  type="text"
                  placeholder=" Enter Registered Email"
                  value={details.registeredEmail}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">
                  Registered Contact No.
                </p>
                <input
                  id="registeredContact"
                  type="number"
                  placeholder=" Enter Registered Contact No."
                  value={details.registeredContact}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold">Currency Type</p>
                <select
                  id="currencyType"
                  value={details.currencyType}
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg whitespace-normal"
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
                <p className="capatilize font-semibold">Bank GST</p>
                <input
                  id="bankGst"
                  type="text"
                  placeholder=" Enter Bank GST"
                  value={details.bankGst}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">
                  Authorized Person Count
                </p>
                <input
                  id="authPersonCount"
                  type="number"
                  placeholder=" Enter Authorized Person Count."
                  value={details.authPersonCount}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder=" Enter Remarks."
                  value={details.remark}
                  className={`w-full px-4 py-5 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 1</p>
                <select
                  id="authPerson1"
                  value={details.authPerson1}
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg whitespace-normal"
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Authorized Person 1</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 1</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson1"
                      value="View"
                      checked={details.authPerson1 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson1"
                      value="Operation"
                      checked={details.authPerson1 === "Operation"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 2</p>
                <select
                  id="authPerson2"
                  value={details.authPerson2}
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg whitespace-normal"
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Authorized Person 2</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 2</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson2"
                      value="View"
                      checked={details.authPerson2 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson2"
                      value="Operation"
                      checked={details.authPerson2 === "Operation"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    Operation
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 3</p>
                <select
                  id="authPerson3"
                  value={details.authPerson3}
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg whitespace-normal"
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Authorized Person 3</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold">Authorized Person 3</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson3"
                      value="View"
                      checked={details.authPerson3 === "View"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson3"
                      value="Operation"
                      checked={details.authPerson3 === "Operation"}
                      onChange={formik.handleChange}
                      disabled={!edit}
                      className="mr-2"
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
