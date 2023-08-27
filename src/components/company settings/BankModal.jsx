import React from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { bankData } from "./BankMaster";

const BankModal = ({ visible, onClick }) => {
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
                <p className="capatilize font-semibold text-[13px]">Bank ID</p>
                <input
                  id="bankId"
                  type="number"
                  placeholder="Bank ID"
                  value={formik.values.bankId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Bank Name
                </p>
                <input
                  id="bankName"
                  type="text"
                  placeholder="Enter Bank Name"
                  value={formik.values.bankName}
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
                  id="accountType"
                  value={formik.values.accountType}
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
                  id="accountNo"
                  type="number"
                  placeholder=" Enter Account No."
                  value={formik.values.accountNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  IFSC Code
                </p>
                <input
                  id="ifscCode"
                  type="text"
                  placeholder=" Enter IFSC Code"
                  value={formik.values.ifscCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  SWIFT Code.
                </p>
                <input
                  id="swiftCode"
                  type="text"
                  placeholder=" Enter SWIFT Code"
                  value={formik.values.swiftCode}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Registered Email ID
                </p>
                <input
                  id="registeredEmail"
                  type="text"
                  placeholder=" Enter Registered Email"
                  value={formik.values.registeredEmail}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Registered Contact No.
                </p>
                <input
                  id="registeredContact"
                  type="number"
                  placeholder=" Enter Registered Contact No."
                  value={formik.values.registeredContact}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Currency Type
                </p>
                <select
                  id="currencyType"
                  value={formik.values.currencyType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                <p className="capatilize font-semibold text-[13px]">Bank GST</p>
                <input
                  id="bankGst"
                  type="text"
                  placeholder=" Enter Bank GST"
                  value={formik.values.bankGst}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Authorized Person Count
                </p>
                <input
                  id="authPersonCount"
                  type="number"
                  placeholder=" Enter Authorized Person Count."
                  value={formik.values.authPersonCount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder=" Enter Remarks."
                  value={formik.values.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 1
                </p>
                <select
                  id="authPerson1"
                  value={formik.values.authPerson1}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 1</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 1
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson1"
                      value="View"
                      checked={formik.values.authPerson1 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson1"
                      value="Operation"
                      checked={formik.values.authPerson1 === "Operation"}
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
                  id="authPerson2"
                  value={formik.values.authPerson2}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 2</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Authorized Person 2
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson2"
                      value="View"
                      checked={formik.values.authPerson2 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson2"
                      value="Operation"
                      checked={formik.values.authPerson2 === "Operation"}
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
                  id="authPerson3"
                  value={formik.values.authPerson3}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Authorized Person 3</option>
                  <option value="ABC">Abc</option>
                  <option value="XYZ">Xyz</option>
                  <option value="PQR">Pqr</option>
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
                      id="authPerson3"
                      value="View"
                      checked={formik.values.authPerson3 === "View"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    View
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="authPerson3"
                      value="Operation"
                      checked={formik.values.authPerson3 === "Operation"}
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
