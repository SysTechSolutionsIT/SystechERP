import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const LeaveApprovalModal = ({ visible, onClick, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth()

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      LeaveApplicationId: "",
      FYear: "",
      ApplicationDate: "",
      EmployeeId: "",
      EmployeeName: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      remarks: "",
      SanctionBy: "",
      SanctionFrom: "",
      SanctionTo: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
      ApprovalFlag: "true",
      LeaveApplicationId: values.LeaveApplicationId,
      FYear: values.FYear,
      ApplicationDate: values.ApplicationDate,
      EmployeeId: values.EmployeeId,
      EmployeeName: values.EmployeeName,
      LeaveFromDate: values.LeaveFromDate,
      LeaveToDate: values.LeaveToDate,
      remarks: values.remarks,
      SanctionBy:values.SanctionBy,
      SanctionFromDate:values.SanctionFrom,
      SanctionToDate:values.SanctionTo,
      SanctionLeaveDay:values.SanctionLeaveDay,
      Status: values.Status,
      }
      updateApproval(updatedData)
    },
  });

  const updateApproval = async (values) =>{
    try{
      const response = axios.patch(`http://localhost:5500/leave-application/update/${ID}`, values, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Leave Approved')
    } catch(error){
      console.error('Error', error);
    }
  }

  const [isStatusChecked, setStatusChecked] = useState(false)

  const handleCheckboxChange = (fieldName, setChecked, event) => {
    //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
      const checked = event.target.checked;
      setChecked(checked);
      formik.setValues({
        ...formik.values,
        [fieldName]: checked.toString(),
      });
    };

  useEffect(() =>{
    const fetchLeave = async () =>{
      try{
        const response = await axios.get(`http://localhost:5500/leave-application/get/${ID}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data
        console.log(data)
        setDetails(data)
      } catch(error){
        console.error('Error', error);
      }
    }
    fetchLeave()
  }, [visible])

  useEffect(() =>{
    if (details){
      formik.setValues({
      LeaveApplicationId: details.LeaveApplicationId,
      FYear: details.FYear,
      ApplicationDate: details.ApplicationDate,
      EmployeeId: details.EmployeeId,
      EmployeeName: details.EmployeeName,
      LeaveFromDate: details.LeaveFromDate,
      LeaveToDate: details.LeaveToDate,
      remarks: details.remarks,
      SanctionBy:details.SanctionBy,
      SanctionFromDate:details.SanctionFrom,
      SanctionToDate:details.SanctionTo,
      SanctionLeaveDay:details.SanctionLeaveDay,
      Status: details.Status,
      })
    }
  }, [details])


  const [status, setStatus] = useState(false);
  const columnHeads = [
    "Leave Type Description",
    "Leave Gain",
    "Leave Taken",
    "Leave Balance",
    "Leave Applied",
    "Sanction Days",
  ];

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Leave Application
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
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Transaction ID</p>
                <input
                  id="LeaveApplicationId"
                  type="text"
                  placeholder="Enter Leave Application ID"
                  value={details?.id}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Leave Application Date
                </p>
                <input
                  id="ApplicationDate"
                  type="date"
                  placeholder="Enter Device ID"
                  value={formik.values.ApplicationDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Financial Year</p>
                <input
                  id="FYear"
                  type="text"
                  placeholder="Enter Financial Year"
                  value={formik.values.FYear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center">
                  <select
                    id="EmployeeName"
                    name="EmployeeName"
                    value={formik.values.EmployeeName}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                   <option value="">Select an Employee</option>
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                    <option value="Charlie">Charlie</option>
                    <option value="David">David</option>
                    <option value="Eve">Eve</option>
                    <option value="Frank">Frank</option>
                    <option value="Grace">Grace</option>
                    <option value="Henry">Henry</option>
                    <option value="Isabel">Isabel</option>
                    <option value="Jack">Jack</option>
                  </select>
                  <button
                    type="button"
                    // onClick={addEmployee}
                    className="ml-2 px-3 py-1 text-[11px] bg-blue-500 text-white rounded-md"
                  >
                    +
                  </button>
                </div>
              <div>
                <p className="text-[13px] font-semibold">Leave From Date</p>
                <input
                  id="LeaveFromDate"
                  type="date"
                  placeholder="Enter Leave From Date"
                  value={formik.values.LeaveFromDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave To Date</p>
                <input
                  id="LeaveToDate"
                  type="date"
                  placeholder="Enter Leave To Date"
                  value={formik.values.LeaveToDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remarks"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="employeeName"
                  className="text-[13px] font-semibold"
                >
                  Sanctioned By
                </label>
                <div className="flex items-center">
                  <select
                    id="SanctionBy"
                    name="SanctionBy"
                    value={formik.values.SanctionBy}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                    <option value="">Select a Supervisor</option>
                    <option value="John">John</option>
                    <option value="Jane">Jane</option>
                    <option value="Smith">Smith</option>
                    <option value="Michael">Michael</option>
                    <option value="Emily">Emily</option>
                    <option value="David">David</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Robert">Robert</option>
                    <option value="Jennifer">Jennifer</option>
                  </select>
                  <button
                    type="button"
                    // onClick={addEmployee}
                    className="ml-2 px-3 py-1 text-[11px] bg-blue-500 text-white rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Sanctioned From Date
                </p>
                <input
                  id="SanctionFrom"
                  type="date"
                  placeholder="Enter sanction From Date"
                  value={formik.values.SanctionFrom}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Sanctioned To Date</p>
                <input
                  id="SanctionTo"
                  type="date"
                  placeholder="Enter Leave To Date"
                  value={formik.values.SanctionTo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                <input
                    id="Status"
                    type="checkbox"
                    checked={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                />
                Active
                </label>
            </div>
            </div>
            <div className="flex mt-4 justify-start">
              <button
                type="submit"
                className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg"
              >
                Show
              </button>
            </div>
            <div className="grid gap-4 justify-between mt-2 w-full">
              <div className="my-1 p-2 pr-8 border ">
                <table className="min-w-full text-center">
                  <thead className="">
                    <tr>
                      {columnHeads.map((columnName) => (
                        <th
                          key={columnName}
                          className="px-2 py-2 font-bold text-[13px] text-center border-2 bg-blue-900 text-white "
                          style={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        >
                          {columnName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
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

export default LeaveApprovalModal;
