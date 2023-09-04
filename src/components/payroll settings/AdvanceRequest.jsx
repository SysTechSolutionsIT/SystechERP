import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import AdvanceRequestModal from './AdvanceRequestModal';

export const advanceData = [
    // Item 1
    {
      ApprovalFlag: true,
      AdvanceId: 1,
      AdvanceDate: "2023-09-04",
      Employee: "John Doe",
      AdvanceType: "Office",
      AdvanceStatus: "Pending",
      Project: "Project ABC",
      Amount: 1000,
      Installment: 3,
      AdvanceStartingMonth: "September",
      AdvanceStartingYear: 2023,
      Purpose: "Equipment Purchase",
      Status:"Active",
      Remark: "Approval pending from manager",
    },
    // Item 2
    {
      ApprovalFlag: false,
      AdvanceId: 2,
      AdvanceDate: "2023-09-05",
      Employee: "Jane Smith",
      AdvanceType: "Personal",
      AdvanceStatus: "Repayment",
      Project: "",
      Amount: 500,
      Installment: 1,
      AdvanceStartingMonth: "August",
      AdvanceStartingYear: 2023,
      Purpose: "Vacation",
      Status:"Active",
      Remark: "Pending repayment",
    },
    // Item 3
    {
      ApprovalFlag: true,
      AdvanceId: 3,
      AdvanceDate: "2023-09-06",
      Employee: "Alice Johnson",
      AdvanceType: "Office",
      AdvanceStatus: "Partial Repayment",
      Project: "Project XYZ",
      Amount: 1500,
      Installment: 2,
      AdvanceStartingMonth: "October",
      AdvanceStartingYear: 2023,
      Purpose: "Travel Expenses",
      Status:"Active",
      Remark: "Partial repayment in progress",
    },
    // Item 4
    {
      ApprovalFlag: true,
      AdvanceId: 4,
      AdvanceDate: "2023-09-07",
      Employee: "Bob Anderson",
      AdvanceType: "Personal",
      AdvanceStatus: "Pending",
      Project: "",
      Amount: 750,
      Installment: 1,
      AdvanceStartingMonth: "September",
      AdvanceStartingYear: 2023,
      Purpose: "Education Fees",
      Status:"Active",
      Remark: "Awaiting approval",
    },
    // Item 5
    {
      ApprovalFlag: false,
      AdvanceId: 5,
      AdvanceDate: "2023-09-08",
      Employee: "Eva Williams",
      AdvanceType: "Office",
      AdvanceStatus: "Repayment",
      Project: "Project DEF",
      Amount: 1200,
      Installment: 4,
      AdvanceStartingMonth: "November",
      AdvanceStartingYear: 2023,
      Purpose: "Software Licenses",
      Status:"Active",
      Remark: "Repayment initiated",
    },
  ];

  
const AdvanceRequest = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
  
    const handleSearchChange = (title, searchWord) => {
        const newFilter = advanceData.filter((item) => {
          const value = item[title];
      
          if (typeof value === 'string' || typeof value === 'number') {
            // Check if the value is a string or a number
            const valueString = String(value); // Convert to string if it's a number
            return valueString.toLowerCase().includes(searchWord.toLowerCase());
          }
      
          return false; // Ignore other data types
        });
      
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };
      
  
    // const [PTView, setPTView] = useState(false);
    // const [edit, setEdit] = useState(false);
    // const [PTId, setPTId] = useState();
  
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    //Max Searchbar width
    const getColumnMaxWidth = (columnName) => {
      let maxWidth = 0;
      const allRows = [...advanceData];
  
      allRows.forEach((row) => {
        const cellContent = row[columnName];
        const cellWidth = getTextWidth(cellContent, "11px"); // You can adjust the font size here
        maxWidth = Math.max(maxWidth, cellWidth);
      });
  
      return maxWidth + 10; // Adding some padding to the width
    };
  
    const getTextWidth = (text, fontSize) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = fontSize + " sans-serif";
      return context.measureText(text).width;
    };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 sm:whitespace-nowrap text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="mr-auto text-[15px] whitespace-nowrap">
            Payroll Settings / Advance Request
          </div>
          <div className="relative lg:ml-96 sm:ml-8">
            <button
              className="text-white font-semibold py-1 px-4 rounded-lg text-[13px] border border-white"
              onClick={() => setModalOpen(true)}
            >
              Add Record
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2 mr-96">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-[16%] lg:right-[23%] bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
            >
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Copy
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                CSV
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Excel
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                PDF
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Print
              </button>
            </div>
          )}
        </div>
      </div>
      <AdvanceRequestModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Approval Flag
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Advance Date
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Employee
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Advance Type
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                   Amount
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Installment
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Project Name
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Advance Status
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                    Status
                </th>
              </tr>
              <tr>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{
                      maxWidth: getColumnMaxWidth("ApprovalFlag") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("ApprovalFlag", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="number"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{
                      maxWidth: getColumnMaxWidth("AdvanceId") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("AdvanceId", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("AdvanceDate") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("AdvanceDate", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Employee") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Employee", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("AdvanceType") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("AdvanceType", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Amount") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Amount", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Installment") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Installment", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Project") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Project", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("AdvanceStatus") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("AdvanceStatus", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Status") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Status", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                    <tr key={key}>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.ApprovalFlag}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceDate}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Employee}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceType}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Amount}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Installment}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Project}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceStatus}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Status}
                      </td>
                    </tr>
                  ))
                : advanceData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.ApprovalFlag ? 'Approved' : 'Unapproved'}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.AdvanceId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.AdvanceDate}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Employee}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.AdvanceType}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Amount}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Installment}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Project}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.AdvanceStatus}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Status}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdvanceRequest