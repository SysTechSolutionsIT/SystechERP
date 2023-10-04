import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../Login";
import LeaveModal1 from "./LeaveModal1";

const LeaveApp = () => {
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [LeaveApps, setLeaveApps] = useState([])
  const { token } = useAuth()

  const employeeFields = [
    "Approval Flag",
    "Leave Application Id",
    "FYear",
    "Application Date",
    "Employee Id",
    "Employee Name",
    "Leave From Date",
    "Leave To Date",
    "Leave Type",
    "Sanction By",
    "Sanction From Date",
    "Sanction To Date",
    "Sanction Leave Day",
  ];

useEffect(() =>{
  const fetchLeaveApps = async () =>{
    try {
      const response = await axios.get('http://localhost:5500/leave-application/get', {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      setLeaveApps(data)
    } catch (error) {
      console.error('Error', error);
    }
  }
  fetchLeaveApps()
}, [token])

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="text-center text-[15px] whitespace-normal min-w-fit items-center">
          Leave Application
        </div>
      </div>
      <div className="grid gap-2 justify-between mt-2">
        <div className="my-1 rounded-2xl  p-2 pr-8 ">
          <table className="min-w-full text-center whitespace-normal z-0">
            <thead className="border-b-2">
              <tr className="">
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  <button
                    type="submit"
                    className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg "
                    onClick={() => setModalOpen(true)}
                  >
                    Add
                  </button>
                  <LeaveModal1
                    visible={isModalOpen}
                    onClick={() => setModalOpen(false)}
                  />
                </th>
                {employeeFields.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
          {LeaveApps.map((entry, index) => (
          <tr>
            <td className="px-2 text-[11px] border-2">
              <div className="flex items-center gap-2 text-center justify-center">
                <Icon
                  className="cursor-pointer"
                  icon="lucide:eye"
                  color="#556987"
                  width="20"
                  height="20"
                />
                <Icon
                  className="cursor-pointer"
                  icon="mdi:edit"
                  color="#556987"
                  width="20"
                  height="20"
                />
                <Icon
                  className="cursor-pointer"
                  icon="material-symbols:delete-outline"
                  color="#556987"
                  width="20"
                  height="20"
                />
              </div>
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.ApprovalFlag ? 'Approved' : 'Not Approved'}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.id}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.FYear}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.ApplicationDate}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.EmployeeId}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.EmployeeName}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.LeaveFromDate}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.LeaveToDate}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.LeaveType}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.SanctionBy || 'NA'}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.SanctionFromDate || 'NA'}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.SanctionToDate || 'NA'}
            </td>
            <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
              {entry.SanctionLeaveDay || 'NA'}
            </td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApp;
