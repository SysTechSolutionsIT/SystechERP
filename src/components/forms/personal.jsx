import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function Personal() {
  const formik = useFormik({
    initialValues: {
      EmployeeID: "",
      EmpType: "",
      EmpTypeGroup: "",
      EmployeeName: "",
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
      EmailID1: "",
      EmailID2: "",
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
      ReligionId: "",
      Gender: "",
      BloodGroup: "",
      DrivingLicense: "",
      Photo: "",
      FinanceAccountNo: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // Your other submission logic

      // Reset the form to its initial state
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-0font-[Inter]">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-x-4">
            <div>
              <p className="mb-3 capitalize font-semibold">Employee ID</p>
              <input
                id="EmployeeID"
                type="number"
                value={formik.values.EmployeeID}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col">
              <p className="mb-3 font-semibold">Employee Type</p>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="EmpType"
                  value="Probation"
                  onChange={formik.handleChange}
                />
                Probation
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
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
                  className="mr-2"
                  name="EmpType"
                  value="Contract"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Contract
              </label>
            </div>

            <div className="flex flex-col">
              <p className="mb-3 font-semibold">Employee Type Group</p>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="EmpTypeGroup"
                  value="Worker"
                  onChange={formik.handleChange}
                />
                Worker
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="EmpTypeGroup"
                  value="Staff"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Staff
              </label>
            </div>
            <div className="col-span-2">
              <p className="mb-3 capitalize font-semibold">Name</p>
              <input
                id="EmployeeName"
                type="text"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize font-semibold">Phone</p>
              <input
                id="PhoneNo"
                type="number"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize  font-semibold">Email ID</p>
              <input
                id="EmailID1"
                type="email"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="mb-3 capitalize  font-semibold">Date of Birth</p>
              <input
                id="DOB"
                type="date"
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col">
              <p className="mb-3 font-semibold">Gender</p>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Male"
                  onChange={formik.handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Female"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Other"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                Other
              </label>
            </div>
            <div>
              <div className="flex flex-col mb-3">
                <p className="mb-3 capitalize">Marital Status</p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="true"
                    onChange={formik.handleChange}
                  />
                  <label>Married</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="false"
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label>Unmarried</label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3">Blood Group</p>
            <input
              id="BloodGroup"
              type="text"
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
              onChange={formik.handleChange}
            />
            <div>
              <p className="text-s font-bold uppercase text-blue-900">
                Document Details
              </p>
              <hr className="bg-blue-300 border-1 rounded md:my-2 border-gray-500" />

              <div className="flex mb-6">
                <div className="w-1/2 pr-4">
                  <p className="mb-3 capitalize mt-1 font-semibold">
                    Aadhar Card No
                  </p>
                  <input
                    id="AadharCardNo"
                    type="text"
                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="w-1/2">
                  <p className="mb-3 capitalize font-semibold">PAN Card No</p>
                  <input
                    id="PANNo"
                    type="text"
                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex">
                  <div className="w-1/3 pr-4">
                    <p className="mb-3 capitalize font-semibold">Passport No</p>
                    <input
                      id="PassportNo"
                      type="text"
                      className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/3 pr-4">
                    <p className="mb-3 capitalize font-semibold">
                      Passport Issue Date
                    </p>
                    <input
                      id="PassportIssueDate"
                      type="date"
                      className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-1/3">
                    <p className="mb-3 capitalize font-semibold">
                      Passport Expiry Date
                    </p>
                    <input
                      id="PassportExpireDate"
                      type="date"
                      className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <p className="mb-3 capitalize font-semibold">
                  Driving License Photo
                </p>
                <input
                  id="DrivingLicense"
                  type="text"
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 mb-6 mt-4">
              <div className="col-span-1">
                <p className="mb-3 capitalize font-semibold">Current Address</p>
                <input
                  id="CurretAddress"
                  type="text"
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1">
                <p className="mb-3 capitalize font-semibold">Pincode</p>
                <input
                  id="CurrentPinCode"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 mb-6">
              <div className="col-span-1">
                <p className="mb-3 capitalize font-semibold">
                  Permanent Address
                </p>
                <input
                  id="PermanentAddress"
                  type="text"
                  className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1">
                <p className="mb-3 capitalize font-semibold">
                  Permanent Pincode
                </p>
                <input
                  id="PermanentPinCode"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="flex mb-6">
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize font-semibold">Cell 1</p>
                <input
                  id="CellNo1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize font-semibold">Cell 2</p>
                <input
                  id="CellNo2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3">
                <p className="mb-3 capitalize font-semibold">Email ID 2</p>
                <input
                  id="EmailID2"
                  type="email"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <p className="text-s font-bold uppercase text-blue-900">
              Account Details
            </p>
            <hr className="bg-blue-300 border-1 rounded md:my-2 border-gray-500" />
            <div className="flex mb-6">
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize font-semibold">Bank ID 1</p>
                <input
                  id="BankID1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize  font-semibold">Account No 1</p>
                <input
                  id="AccountNo1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3">
                <p className="mb-3 capitalize  font-semibold">IFSC Code 1</p>
                <input
                  id="IFSCCode1"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="flex mb-6">
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize  font-semibold">Bank ID 2</p>
                <input
                  id="BankID2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize  font-semibold">Account No 2</p>
                <input
                  id="AccountNo2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3">
                <p className="mb-3 capitalize  font-semibold">IFSC Code 2</p>
                <input
                  id="IFSCCode2"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex mb-6">
              <div className="w-1/2 pr-4">
                <p className="mb-3 capitalize  font-semibold">Account Flag</p>
                <input
                  id="AcFlag"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/2">
                <p className="mb-3 capitalize font-semibold">
                  Finance Account No
                </p>
                <input
                  id="FinanceAccountNo"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex mb-6">
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize  font-semibold">Category ID</p>
                <input
                  id="CategoryId"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3 pr-4">
                <p className="mb-3 capitalize  font-semibold">Caste ID</p>
                <input
                  id="CasteId"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/3">
                <p className="mb-3 capitalize font-semibold">Religion</p>
                <input
                  id="ReligionId"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6 w-1/2">
              <p className="mb-3 font-semibold">Referenced</p>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="Referenced"
                  value="Yes"
                  onChange={formik.handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name="Referenced"
                  value="No"
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                No
              </label>
            </div>
            <div className="flex col-span-2 mb-6 w-1/2 pr-4">
              <p className="mb-3 capitalize font-semibold ">Employee Photo</p>
              <input
                id="EmployeePhoto"
                type="text"
                className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
          >
            Save Details
          </button>
        </div>
      </div>
    </form>
  );
}
