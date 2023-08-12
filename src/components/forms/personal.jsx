import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import { useFormik } from "formik";

export default function Personal() {
  const formik = useFormik({
    EmployeeID: 0,
    EmpType: "",
    EmpTypeGroup: "",
    EmployeeName: "",
    MEmployeeName: "",
    AadharCardNo: "",
    PANNo: "",
    PassportNo: "",
    PassportIssueDate: "",
    PassportExpireDate: "",
    CurrentAddress: "",
    CurrentPinCode: "",
    PermanentAddress: "",
    PermanentPinCode: "",
    DOB: "",
    PhoneNo: "",
    CellNo1: "",
    CellNo2: "",
    EmailId1: "",
    EmailId2: "",
    BankId1: "",
    AccountNo1: "",
    IFSCCode1: "",
    BankId2: "",
    AccountNo2: "",
    IFSCCode2: "",
    AcFlag: "",
    CategoryId: "",
    CasteId: "",
    MaritalStatus: "",
    Referenced: "",
    EmployeePhoto: "",
    DestinationId: "",
    ReligionId: "",
    Gender: "",
    BloodGroup: "",
    "Driving License": "",
    Photo: "",
    "Finance Account No": "",
  });

  return (
    <form>
      <div className="p-8">
        <div className="p-8 bg-white rounded-xl shadow-md">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="mb-3 capitalize">Employee ID</p>
              <input
                id="Eid"
                type="number"
                value={formik.values.EmployeeID}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>

            <div className="flex flex-col">
              <p className="mb-3">Employee Type</p>
              <label>
                <input
                  type="radio"
                  name="EmpType"
                  value="Probation"
                  onChange={formik.handleChange}
                />
                Probation
              </label>
              <label>
                <input
                  type="radio"
                  name="EmpType"
                  value="Permanent"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Permanent
              </label>
              <label>
                <input
                  type="radio"
                  name="EmpType"
                  value="Contract"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Contract
              </label>
            </div>

            <div className="flex flex-col">
              <p className="mb-3">Employee Type Group</p>
              <label>
                <input
                  type="radio"
                  name="EmpTypeGroup"
                  value="Worker"
                  onChange={formik.handleChange}
                />
                Worker
              </label>
              <label>
                <input
                  type="radio"
                  name="EmpTypeGroup"
                  value="Staff"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Staff
              </label>
            </div>
            <div className="col-span-2">
              <p className="mb-3 capitalize">Name</p>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Aadhar Card No</p>
              <input
                id="AadharCardNo"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">PAN Card No</p>
              <input
                id="PANNo"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Passport No</p>
              <input
                id="PassportNo"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Passport Issue Date</p>
              <input
                id="PassportIssueDate"
                type="date"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Passport Expiry Date</p>
              <input
                id="PassportExpireDate"
                type="date"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-2">
              <p className="mb-3 capitalize">Current Address</p>
              <input
                id="CurretAddress"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Pincode</p>
              <input
                id="CurrentPinCode"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-span-2">
              <p className="mb-3 capitalize">Permanent Address</p>
              <input
                id="PermanentAddress"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Permanent Pincode</p>
              <input
                id="PermanentPinCode"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Date of Birth</p>
              <input
                id="DOB"
                type="date"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Phone</p>
              <input
                id="Phone"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Cell 1</p>
              <input
                id="CellNo1"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Cell 2</p>
              <input
                id="CellNo2"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Email ID 1</p>
              <input
                id="EmailID1"
                type="email"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Email ID 2</p>
              <input
                id="EmailID2"
                type="email"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Bank ID 1</p>
              <input
                id="BankID1"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Account No 1</p>
              <input
                id="AccountNo1"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">IFSC Code 1</p>
              <input
                id="IFSCCode1"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Bank ID 2</p>
              <input
                id="BankID2"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Account No 2</p>
              <input
                id="AccountNo2"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize">IFSC Code 2</p>
              <input
                id="IFSCCode2"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <p className="mb-3">Blood Group</p>
              <input
                id="bloodGroup"
                type="text"
                className={`addRecord-textareaBG ${
                  !isValidBloodGroup ? "invalid" : ""
                }`}
                onChange={handleBloodGroupChange}
              />
              {!isValidBloodGroup && (
                <p className="text-[#c71f37]">
                  Please enter a valid blood group (e.g., A+, B-, AB+, O-).
                </p>
              )}
            </div>
            <div className="col-span-2">
              <p className="mb-3 capitalize">Address</p>
              <input
                id="address"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
              />
            </div>
            <div>
              <p className="mb-3 capitalize">Pincode</p>
              <input
                id="pincode"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg ${
                  !isValidPinCode ? "border-[#c71f37]" : "mb-6"
                }`}
                onChange={handlePinCodeChange}
              />
              {!isValidPinCode && (
                <p className="text-[#c71f37] mb-6">
                  Please enter a valid 6 digit Indian pincode.
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="mb-3 capitalize">Nationality</p>
              <input
                id="nationality"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
              />
            </div>

            <div>
              <div className="flex flex-col mb-3">
                <p className="mb-3 capitalize">Marital Status</p>
                <div>
                  <input
                    type="radio"
                    name="maritalStatus"
                    value="true"
                    onChange={formik.handleChange}
                  />
                  <label>Married</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="maritalStatus"
                    value="false"
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label>Unmarried</label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 grid grid-cols-2 gap-4">
            <div>
              <p className="mb-3 capitalize">Email</p>
              <input
                id="emailID"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg ${
                  !isValidEmail ? "border-[#c71f37]" : "mb-6"
                }`}
                onChange={handleEmailChange}
              />
              {!isValidEmail && (
                <p className="text-[#c71f37] mb-6">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div>
              <p className="mb-3 capitalize">Healthcard ID</p>
              <input
                id="healthCardID"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={AddPatient}
              type="button"
              className="px-8 py-2 bg-[#20A0D8] text-white text-lg rounded-md"
            >
              Add Patient
            </button>
            <button
              onClick={navDash}
              type="button"
              className="px-8 py-2 bg-[#20A0D8] text-white text-lg rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
