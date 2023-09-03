import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

export const leaveApplications = [
  {
    "Approval Flag": "P",
    "Leave Application Id": "1",
    FYear: "2023",
    "Application Date": "2023-08-01",
    "Employee Id": "E001",
    "Employee Name": "John Doe",
    "Leave From Date": "2023-08-05",
    "Leave To Date": "2023-08-10",
    "Leave Type": "Vacation",
    "Sanction By": "Manager1",
    "Sanction From Date": "2023-08-03",
    "Sanction To Date": "2023-08-04",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "A",
    "Leave Application Id": "2",
    FYear: "2023",
    "Application Date": "2023-08-15",
    "Employee Id": "E002",
    "Employee Name": "Jane Smith",
    "Leave From Date": "2023-08-20",
    "Leave To Date": "2023-08-25",
    "Leave Type": "Sick Leave",
    "Sanction By": "Manager2",
    "Sanction From Date": "2023-08-18",
    "Sanction To Date": "2023-08-19",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "C",
    "Leave Application Id": "3",
    FYear: "2023",
    "Application Date": "2023-08-10",
    "Employee Id": "E003",
    "Employee Name": "Alice Johnson",
    "Leave From Date": "2023-08-15",
    "Leave To Date": "2023-08-18",
    "Leave Type": "Personal Leave",
    "Sanction By": "Manager3",
    "Sanction From Date": "2023-08-13",
    "Sanction To Date": "2023-08-14",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "P",
    "Leave Application Id": "4",
    FYear: "2023",
    "Application Date": "2023-08-22",
    "Employee Id": "E004",
    "Employee Name": "Robert Brown",
    "Leave From Date": "2023-08-25",
    "Leave To Date": "2023-08-30",
    "Leave Type": "Vacation",
    "Sanction By": "Manager1",
    "Sanction From Date": "2023-08-23",
    "Sanction To Date": "2023-08-24",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "A",
    "Leave Application Id": "5",
    FYear: "2023",
    "Application Date": "2023-08-05",
    "Employee Id": "E005",
    "Employee Name": "Emily Davis",
    "Leave From Date": "2023-08-10",
    "Leave To Date": "2023-08-15",
    "Leave Type": "Sick Leave",
    "Sanction By": "Manager2",
    "Sanction From Date": "2023-08-08",
    "Sanction To Date": "2023-08-09",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "C",
    "Leave Application Id": "6",
    FYear: "2023",
    "Application Date": "2023-08-12",
    "Employee Id": "E006",
    "Employee Name": "Michael Wilson",
    "Leave From Date": "2023-08-17",
    "Leave To Date": "2023-08-20",
    "Leave Type": "Personal Leave",
    "Sanction By": "Manager3",
    "Sanction From Date": "2023-08-15",
    "Sanction To Date": "2023-08-16",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "P",
    "Leave Application Id": "7",
    FYear: "2023",
    "Application Date": "2023-08-28",
    "Employee Id": "E007",
    "Employee Name": "Sophia Lee",
    "Leave From Date": "2023-09-01",
    "Leave To Date": "2023-09-05",
    "Leave Type": "Vacation",
    "Sanction By": "Manager1",
    "Sanction From Date": "2023-08-30",
    "Sanction To Date": "2023-08-31",
    "Sanction Leave Day": "2",
  },
  {
    "Approval Flag": "A",
    "Leave Application Id": "8",
    FYear: "2023",
    "Application Date": "2023-08-18",
    "Employee Id": "E008",
    "Employee Name": "William Martinez",
    "Leave From Date": "2023-08-22",
    "Leave To Date": "2023-08-27",
    "Leave Type": "Sick Leave",
    "Sanction By": "Manager2",
    "Sanction From Date": "2023-08-21",
    "Sanction To Date": "2023-08-21",
    "Sanction Leave Day": "2",
  },
];

const LeaveApproval = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  //View and Edit
  const [SVE, setSVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ShiftId, setShiftId] = useState();

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const fieldNames = [
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

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="mr-auto text-[15px] whitespace-normal min-w-fit">
          Leave Approval
        </div>
      </div>
      <div className="grid gap-2 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8 ">
          <table className="min-w-full text-center whitespace-normal z-0">
            <thead className="border-b-2">
              <tr className="">
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal" />
                {fieldNames.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 capitalize whitespace-normal max-w-xs `}
                  >
                    {columnName
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .split(" ")
                      .map((word, index) => (
                        <div key={index} className="whitespace-nowrap">
                          {word}
                        </div>
                      ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {leaveApplications.map((entry, index) => (
                <tr key={index}>
                  <td className="px-2 border-2">
                    <div className="flex items-center gap-2 text-center justify-center">
                      <button
                        type="submit"
                        className="bg-blue-900 text-white font-semibold py-1 px-1 rounded-lg text-[11px]"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                  {fieldNames.map((columnName, index) => (
                    <td
                      key={index}
                      className={`px-4 border-2 whitespace-normal text-left text-[11px]`}
                    >
                      {entry[columnName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApproval;
