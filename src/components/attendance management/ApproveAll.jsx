import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";

const ApproveAll = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [Details, setDetails] = useState([]);

  const formik = useFormik({
    initialValues:{
        AttendanceDate:"",
        EmployeeName:""
    },
    onSubmit: (values) =>{
        // const formattedDate = new Date(values.AttendanceDate).toISOString().slice(0, 19).replace('T', ' ');
        // const updatedData = {
        //     ...values,
        //     AttendanceDate: formattedDate,
        // };
        console.log(values)
        approveAll(values)
    }
  })

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowActiveData`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
  }, [token]);

  const approveAll = async (data) => {
    const confirmApprove = window.confirm('Are you sure you want to approve all attendance for the day?')
    if(!confirmApprove) return
    try {
      const response = await axios.post(
        "http://localhost:5500/manual-attendance/FnApproveAll",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response)
      alert('Approved attendance for the specified day')
      window.location.reload()
    } catch (error) {
        console.error('Error', error);
    }
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
      <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
        <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
          <p className="text-white text-[13px] font-semibold">Approve All</p>
          <Icon
            icon="maki:cross"
            color="white"
            className="cursor-pointer"
            onClick={onClick}
          />
        </div>
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[13px] font-semibold">Attendance Date</p>
              <input
                id="AttendanceDate"
                type="date"
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                value={formik.values.AttendanceDate}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold">Sanction By</p>
              <select
                id="EmployeeName"
                name="EmployeeName"
                className="w-full px-4 py-2 font-normal text-[11px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                value={formik.values.EmployeeName}
                onChange={formik.handleChange}
              >
                <option value="">Select Employee</option>
                {Details.length > 0 &&
                  Details.map((entry) => (
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
                      {entry.EmployeeName}
                    </option>
                  ))}
              </select>
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

export default ApproveAll;
