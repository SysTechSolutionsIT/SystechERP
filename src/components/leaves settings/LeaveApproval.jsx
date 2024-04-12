import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../Login";
import axios from "axios";
import LeaveApprovalModal from "./LeaveApprovalModal";
import LMonthlyAtt from "./LMonthlyAtt";

const LeaveApproval = () => {
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const { token } = useAuth();
  const [LeaveApps, setLeaveApps] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState("");
  const [Employees, setEmployees] = useState([]);
  const [unapprovedLeaves, setUnapprovedLeaves] = useState([]);
  const [ApprovalFlag, setApprovalFlag] = useState("");
  const [testId, setTestId] = useState([]);

  const [columnVisibility, setColumnVisibility] = useState({
    ApprovalFlag: true,
    FYear: true,
    LeaveApplicationDate: true,
    EmployeeId: true,
    EmployeeName: true,
    EmployeeType: true,
    EmployeeTypeGroup: false,
    LeaveFromDate: true,
    LeaveToDate: true,
    Remark: false,
    LeaveTypeId: true,
    LeaveDays: true,
    SanctionBy: false,
    SanctionFromDate: false,
    SanctionToDate: false,
    SanctionLeaveDays: false,
  });

  const columnNames = {
    ApprovalFlag: "Approval Flag",
    FYear: "Financial Year",
    LeaveApplicationDate: "Leave Application Date",
    EmployeeId: "Employee ID",
    EmployeeName: "Employee Name",
    EmployeeType: "Employee Type",
    EmployeeTypeGroup: "Employee Type Group",
    LeaveFromDate: "Leave From Date",
    LeaveToDate: "Leave To Date",
    Remark: "Remark",
    LeaveTypeId: "Leave Type ID",
    LeaveDays: "Leave Days",
    SanctionBy: "Sanctioned By",
    SanctionFromDate: "Sanction From Date",
    SanctionToDate: "Sanction To Date",
    SanctionLeaveDays: "Sanctioned Leave Days",
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    ...Object.keys(columnVisibility),
  ]);

  const toggleColumn = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  useEffect(() => {
    console.log("Selected Columns:", selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => {
    setSelectedColumns([...Object.keys(columnVisibility)]);
    setColumnVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      Object.keys(updatedVisibility).forEach((columnName) => {
        updatedVisibility[columnName] = true;
      });
      return updatedVisibility;
    });
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
    setColumnVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      Object.keys(updatedVisibility).forEach((columnName) => {
        updatedVisibility[columnName] = false;
      });
      return updatedVisibility;
    });
  };

  const handleSearchChange = (title, searchWord) => {
    const newFilter = LeaveApps.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const [veEType, setVeEType] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  //Menu click outside
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
    const allRows = [...LeaveApps, ...filteredData];

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

  useEffect(() => {
    const fetchLeaveApps = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/a5d3g2p6/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        data.sort(
          (a, b) =>
            new Date(b.LeaveApplicationDate) - new Date(a.LeaveApplicationDate)
        );
        setLeaveApps(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchLeaveApps();
  }, [token, isModalOpen]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployees();
  }, [token]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token]);

  const deleteLeaveApplication = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Leave Application"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.post(
        "http://localhost:5500/a5d3g2p6/FnAddUpdateDeleteRecord",
        {
          LeaveApplicationId: DeleteId,
          IUFlag: "D",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Leave Application Deleted");
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const HandleApprove = (LeaveApplicationId) => {
    setModalOpen(true);
    // setTestId(result.LeaveApplicationId);
    setid(LeaveApplicationId);
    console.log("IN prev", LeaveApplicationId);
    setApprovalFlag("A");
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="text-center text-[15px] whitespace-normal min-w-fit items-center">
          Leave Approvals
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`mt-1.5 ml-2 ${
                showDropdown ? "rotate-180" : ""
              } cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50">
              {/* Dropdown content */}
              <div className="flex items-center mb-2">
                <button
                  className="text-blue-500 hover:text-blue-700 underline mr-2 text-[13px]"
                  onClick={selectAllColumns}
                >
                  Select All
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 underline text-[13px]"
                  onClick={deselectAllColumns}
                >
                  Deselect All
                </button>
              </div>
              {Object.keys(columnVisibility).map((columnName) => (
                <label
                  key={columnName}
                  className="flex items-center capitalize text-black text-[13px]"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={columnVisibility[columnName]}
                    onChange={() => toggleColumn(columnName)}
                  />
                  <span
                    className={
                      columnVisibility[columnName] ? "font-semibold" : ""
                    }
                  >
                    {columnName}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className="w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) =>
                  columnVisibility[columnName] ? (
                    <th
                      key={columnName}
                      className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal`}
                    >
                      {columnNames[columnName]}
                    </th>
                  ) : null
                )}
              </tr>
              <tr>
                <th className="border-2" />
                <th className="p-2 font-bold text-black border-2 whitespace-normal" />
                {selectedColumns.map((columnName) =>
                  columnVisibility[columnName] ? (
                    <th
                      key={columnName}
                      className="p-2 font-semibold text-black border-2"
                    >
                      <input
                        type="text"
                        placeholder={`Search `}
                        className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                        style={{
                          maxWidth: getColumnMaxWidth(columnName) + "px",
                        }}
                        onChange={(e) =>
                          handleSearchChange(columnName, e.target.value)
                        }
                      />
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0
                ? filteredData.map((result, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <button
                            type="button"
                            className="bg-green-600 text-white font-semibold py-1 px-2 rounded-lg text-[11px] hover:bg-white hover:border-green-500 hover:border-2 border-2 duration-300 hover:text-green-500"
                            onClick={() => {
                              setModalOpen(true);
                              setid(result.LeaveApplicationId);
                              setApprovalFlag("A");
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 text-white font-semibold py-1 hover:bg-white hover:border-red-500 hover:border-2 border-2 duration-300 hover:text-red-500  px-3 rounded-lg text-[11px]"
                            onClick={() => {
                              setModalOpen(true);
                              setid(result.LeaveApplicationId);
                              setApprovalFlag("R");
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                      <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                        {result.LeaveApplicationId}
                      </td>
                      {selectedColumns.map((columnName) => {
                        if (columnVisibility[columnName]) {
                          if (columnName === "EmployeeName") {
                            const employee = Employees.find(
                              (employee) =>
                                employee.EmployeeId == result.EmployeeId
                            );
                            return (
                              <td
                                key={columnName}
                                className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                              >
                                {employee?.EmployeeName}
                              </td>
                            );
                          } else if (columnName === "LeaveTypeId") {
                            const leaveType =
                              LeaveTypes.length > 0 &&
                              LeaveTypes.find(
                                (type) => type.LeaveTypeId == result.LeaveTypeId
                              );
                            return (
                              <td
                                key={columnName}
                                className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                              >
                                {leaveType?.LeaveType}
                              </td>
                            );
                          } else if (
                            columnName === "LeaveApplicationDate" ||
                            columnName === "LeaveFromDate" ||
                            columnName === "LeaveToDate"
                          ) {
                            return (
                              <td
                                key={columnName}
                                className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                              >
                                {formatDate(result[columnName])}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                key={columnName}
                                className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                              >
                                {result[columnName]}
                              </td>
                            );
                          }
                        } else {
                          return <td key={columnName} className="hidden"></td>;
                        }
                      })}
                    </tr>
                  ))
                : LeaveApps.filter((result) => result.ApprovalFlag === "P").map(
                    (result, index) => (
                      <tr key={index}>
                        <td className="px-2 border-2">
                          <div className="flex items-center gap-2 text-center justify-center">
                            <button
                              type="button"
                              className="bg-green-600 text-white font-semibold py-1 px-2 rounded-lg text-[11px] hover:bg-white hover:border-green-500 hover:border-2 border-2 duration-300 hover:text-green-500"
                              onClick={() =>
                                HandleApprove(result.LeaveApplicationId)
                              }
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="bg-red-500 text-white font-semibold py-1 hover:bg-white hover:border-red-500 hover:border-2 border-2 duration-300 hover:text-red-500  px-3 rounded-lg text-[11px]"
                              onClick={() => {
                                setModalOpen(true);
                                setid(result.LeaveApplicationId);
                                setApprovalFlag("R");
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                          {result.LeaveApplicationId}
                        </td>
                        {selectedColumns.map((columnName) => {
                          if (columnVisibility[columnName]) {
                            if (columnName === "EmployeeName") {
                              const employee = Employees.find(
                                (employee) =>
                                  employee.EmployeeId == result.EmployeeId
                              );
                              return (
                                <td
                                  key={columnName}
                                  className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                  {employee?.EmployeeName}
                                </td>
                              );
                            } else if (columnName === "LeaveTypeId") {
                              const leaveType =
                                LeaveTypes.length > 0 &&
                                LeaveTypes.find(
                                  (type) =>
                                    type.LeaveTypeId == result.LeaveTypeId
                                );
                              return (
                                <td
                                  key={columnName}
                                  className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                  {leaveType?.LeaveType}
                                </td>
                              );
                            } else if (
                              columnName === "LeaveApplicationDate" ||
                              columnName === "LeaveFromDate" ||
                              columnName === "LeaveToDate"
                            ) {
                              return (
                                <td
                                  key={columnName}
                                  className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                  {formatDate(result[columnName])}
                                </td>
                              );
                            } else {
                              return (
                                <td
                                  key={columnName}
                                  className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                  {result[columnName]}
                                </td>
                              );
                            }
                          } else {
                            return (
                              <td key={columnName} className="hidden"></td>
                            );
                          }
                        })}
                      </tr>
                    )
                  )}
            </tbody>
          </table>
        </div>
      </div>
      <LeaveApprovalModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
        ID={id}
        ApprovalFlag={ApprovalFlag}
      />
    </div>
  );
};

export default LeaveApproval;
