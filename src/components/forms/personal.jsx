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
      FirstName: "",
      MiddleName:"",
      LastName:"",
      Salutation: "",
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
      Category: "",
      Destination:"",
      Caste: "",
      MaritalStatus: "",
      Reference: "",
      EmployeePhoto: "",
      MEmployeeName:"",
      Religion: "",
      Gender: "",
      BloodGroup: "",
      DrivingLicense: "",
      FinanceAccountNo: "",
      Remark:""
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
      <div className="p-0 font-[Inter]">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-x-4">
            <div>
              <p className="mb-1 capitalize font-semibold text-[13px]">Employee ID</p>
              <input
                id="EmployeeID"
                type="number"
                value={formik.values.EmployeeID}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
                      <p
                        className="mb-1 font-semibold text-[13px]"
                      >
                      Employee Type
                      </p>
                      <select
                        id="EmpType"
                        name="EmpType"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.EmpType}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Type</option>
                      <option value='Permenant'>Permenant</option>
                      <option value='Probation'>Probation</option>
                      <option value='Contract'>Contract</option>
                      </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px] ">Employee Photo</p>
              <input
                  id="logo"
                  type="file"
                  placeholder="Upload File"
                  value={formik.values.EmployeePhoto}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
            </div>

            <div className="py-1">
                      <p
                        className="mb-1 font-semibold text-[13px]"
                      >
                      Salutation
                      </p>
                      <select
                        id="Salutation"
                        name="Salutation"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Salutation}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Salutation</option>
                      <option value='Sir/Madam'>Sir/Madam</option>
                      <option value='Dear [Mr./Ms./Dr.] [Last Name]'>Dear [Mr./Ms./Dr.] [Last Name]</option>
                      <option value='[Department] [Last Name]'>[Department] [Last Name]</option>
                      <option value='[Job Title] [Last Name]'>[Job Title] [Last Name]</option>
                      <option value='To Whom It May Concern'>To Whom It May Concern</option>
                      <option value='Greetings [Mr./Ms./Dr.] [Last Name]'>Greetings [Mr./Ms./Dr.] [Last Name]</option>
                      </select>
            </div>

            <div className="py-1">
                      <p
                        className="mb-1 font-semibold text-[13px]"
                      >
                      Employee Type Group
                      </p>
                      <select
                        id="EmpTypeGroup"
                        name="EmpTypeGroup"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.EmpTypeGroup}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Group Type</option>
                      <option value='Worker'>Worker</option>
                      <option value='Staff'>Staff</option>
                      </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">Date of Birth</p>
              <input
                id="DOB"
                type="date"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">First Name</p>
              <input
                id="FirstName"
                type="text"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Middle Name</p>
              <input
                id="MiddleName"
                type="text"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Last Name</p>
              <input
                id="LastName"
                type="text"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Current Address</p>
                <input
                  id="PermanentAddress"
                  type="text"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Current Address Pincode</p>
                <input
                  id="CurrentPinCode"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Permanent Address</p>
                <input
                  id="PermanentAddress"
                  type="text"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Permanent Address Pincode</p>
                <input
                  id="PermanentPinCode"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Phone</p>
              <input
                id="PhoneNo"
                type="number"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Cell 1</p>
                <input
                  id="CellNo1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Cell 2</p>
                <input
                  id="CellNo2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>

            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">Email ID 1</p>
              <input
                id="EmailID1"
                type="email"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">Email ID 2</p>
              <input
                id="EmailID2"
                type="email"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Bank ID 1</p>
                <input
                  id="BankId1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Account No 1</p>
                <input
                  id="AccountNo1"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">IFSC Code 1</p>
                <input
                  id="IFSCCode1"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Bank ID 2</p>
                <input
                  id="BankId2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Account No 2</p>
                <input
                  id="AccountNo2"
                  type="number"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">IFSC Code 2</p>
                <input
                  id="IFSCCode2"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Category</p>
                <select
                        id="Category"
                        name="Category"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Category}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Category</option>
                      <option value="Category 1">Category 1</option>       
                      <option value="Category 2">Category 2</option> 
                      <option value="Category 3">Category 3</option>     
                      <option value="Category 4">Category 4</option> 
                      <option value="Category 5">Category 5</option>     
                </select>
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Destination</p>
                <input
                  id="Destination"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Religion</p>
                <select
                        id="Religion"
                        name="Religion"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Religion}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Religion</option>
                      <option value="Religion 1">Religion 1</option>       
                      <option value="Religion 2">Religion 2</option> 
                      <option value="Religion 3">Religion 3</option>     
                      <option value="Religion 4">Religion 4</option> 
                      <option value="Religion 5">Religion 5</option>     
                </select>
              </div>
              <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Reference</p>
              <select
                        id="Reference"
                        name="Reference"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Reference}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Reference</option>
                      <option value="Professional References">Professional References</option>
                      <option value="Supervisor/Manager References">Supervisor/Manager References</option>
                      <option value="Colleague References">Colleague References</option>
                      <option value="Client/Customer References">Client/Customer References</option>
                      <option value="Subordinate References">Subordinate References</option>
                      <option value="Educational References">Educational References</option>
                      <option value="Personal References">Personal References</option>
                      <option value="Character References">Character References</option>
                      <option value="Industry Experts or Mentors">Industry Experts or Mentors</option>
               </select>
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Caste</p>
              <select
                        id="Caste"
                        name="Caste"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Caste}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Caste</option>
                      <option value="Caste 1">Caste 1</option>       
                      <option value="Caste 2">Caste 2</option> 
                      <option value="Caste 3">Caste 3</option>     
                      <option value="Caste 4">Caste 4</option> 
                      <option value="Caste 5">Caste 5</option>     
                </select>
            </div>
            <div className="py-1">
            <p className="mb-1 text-[13px] font-semibold">Blood Group</p>
            <select
                        id="BloodGroup"
                        name="BloodGroup"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.BloodGroup}
                        onChange={formik.handleChange}
                      >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
            </select>
            </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Gender</p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="Gender"
                    value="Male"
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="Gender"
                    value="Female"
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Female</label>
                </div>
              </div>
            <div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">Marital Status</p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="true"
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Married</label>
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
                  <label className="text-[13px]">Unmarried</label>
                </div>
              </div>
            </div>
              <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">MEmployee Name</p>
              <input
                id="MEmployeeName"
                type="text"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
                <div className="py-1">
                  <p className="mb-1 capitalize mt-1 font-semibold text-[13px]">
                    Aadhar Card No
                  </p>
                  <input
                    id="AadharCardNo"
                    type="text"
                    className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="py-1">
                  <p className="mb-1 capitalize font-semibold text-[13px]">PAN Card No</p>
                  <input
                    id="PANNo"
                    type="text"
                    className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">
                  Finance Account No
                </p>
                <input
                  id="FinanceAccountNo"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
                  <div className="py-1">
                    <p className="mb-1 capitalize font-semibold text-[13px]">Passport No</p>
                    <input
                      id="PassportNo"
                      type="text"
                      className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="py-1">
                    <p className="mb-1 capitalize font-semibold text-[13px]">
                      Passport Issue Date
                    </p>
                    <input
                      id="PassportIssueDate"
                      type="date"
                      className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="py-1">
                    <p className="mb-1 capitalize font-semibold text-[13px]">
                      Passport Expiry Date
                    </p>
                    <input
                      id="PassportExpireDate"
                      type="date"
                      className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                      onChange={formik.handleChange}
                    />
                  </div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">
                  Driving License Photo
                </p>
                <input
                  id="DrivingLicense"
                  type="text"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                />
              </div>
              <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Account Flag</p>
                <input
                  id="AcFlag"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
            </div>
            <div className="py-1">
                <p className="mb-1 capitalize  font-semibold text-[13px]">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
            </div>
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
    </form>
  );
}
