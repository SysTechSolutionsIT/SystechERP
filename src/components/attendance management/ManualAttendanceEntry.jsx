import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../Login';
import { useRef } from 'react';
import { Icon } from '@iconify/react';

const ManualAttendanceEntry = () => {
  const attData = [
    {
      "ApprovalFlag": true,
      "AttendanceID": "001",
      "AttendanceDate": "2023-11-01",
      "FYear": "2023",
      "EmployeeType": "Full-time",
      "EmployeeName": "John Doe",
      "Shift": "Morning",
      "InTime": "08:00 AM",
      "OutTime": "05:00 PM",
      "JobType": "Regular",
      "SanctionBy": "Manager A",
      "Status": true
    },
    {
      "ApprovalFlag": false,
      "AttendanceID": "002",
      "AttendanceDate": "2023-11-02",
      "FYear": "2023",
      "EmployeeType": "Part-time",
      "EmployeeName": "Jane Smith",
      "Shift": "Evening",
      "InTime": "03:00 PM",
      "OutTime": "08:00 PM",
      "JobType": "Temporary",
      "SanctionBy": "Manager B",
      "Status": false
    },
    {
      "ApprovalFlag": true,
      "AttendanceID": "003",
      "AttendanceDate": "2023-11-03",
      "FYear": "2023",
      "EmployeeType": "Full-time",
      "EmployeeName": "Alice Johnson",
      "Shift": "Morning",
      "InTime": "09:00 AM",
      "OutTime": "06:00 PM",
      "JobType": "Regular",
      "SanctionBy": "Manager C",
      "Status": true
    },
    {
      "ApprovalFlag": false,
      "AttendanceID": "004",
      "AttendanceDate": "2023-11-04",
      "FYear": "2023",
      "EmployeeType": "Part-time",
      "EmployeeName": "Bob Wilson",
      "Shift": "Evening",
      "InTime": "04:00 PM",
      "OutTime": "09:00 PM",
      "JobType": "Temporary",
      "SanctionBy": "Manager D",
      "Status": false
    },
    {
      "ApprovalFlag": true,
      "AttendanceID": "005",
      "AttendanceDate": "2023-11-05",
      "FYear": "2023",
      "EmployeeType": "Full-time",
      "EmployeeName": "Eva Davis",
      "Shift": "Morning",
      "InTime": "08:30 AM",
      "OutTime": "05:30 PM",
      "JobType": "Regular",
      "SanctionBy": "Manager A",
      "Status": true
    },
    {
      "ApprovalFlag": false,
      "AttendanceID": "006",
      "AttendanceDate": "2023-11-06",
      "FYear": "2023",
      "EmployeeType": "Part-time",
      "EmployeeName": "Mike Brown",
      "Shift": "Evening",
      "InTime": "03:30 PM",
      "OutTime": "08:30 PM",
      "JobType": "Temporary",
      "SanctionBy": "Manager B",
      "Status": false
    },
    {
      "ApprovalFlag": true,
      "AttendanceID": "007",
      "AttendanceDate": "2023-11-07",
      "FYear": "2023",
      "EmployeeType": "Full-time",
      "EmployeeName": "Grace Lee",
      "Shift": "Morning",
      "InTime": "09:15 AM",
      "OutTime": "06:15 PM",
      "JobType": "Regular",
      "SanctionBy": "Manager C",
      "Status": true
    },
    {
      "ApprovalFlag": false,
      "AttendanceID": "008",
      "AttendanceDate": "2023-11-08",
      "FYear": "2023",
      "EmployeeType": "Part-time",
      "EmployeeName": "Tom Clark",
      "Shift": "Evening",
      "InTime": "04:15 PM",
      "OutTime": "09:15 PM",
      "JobType": "Temporary",
      "SanctionBy": "Manager D",
      "Status": false
    },
    {
      "ApprovalFlag": true,
      "AttendanceID": "009",
      "AttendanceDate": "2023-11-09",
      "FYear": "2023",
      "EmployeeType": "Full-time",
      "EmployeeName": "Linda Martinez",
      "Shift": "Morning",
      "InTime": "08:45 AM",
      "OutTime": "05:45 PM",
      "JobType": "Regular",
      "SanctionBy": "Manager A",
      "Status": true
    },
    {
      "ApprovalFlag": false,
      "AttendanceID": "010",
      "AttendanceDate": "2023-11-10",
      "FYear": "2023",
      "EmployeeType": "Part-time",
      "EmployeeName": "Chris Rodriguez",
      "Shift": "Evening",
      "InTime": "03:45 PM",
      "OutTime": "08:45 PM",
      "JobType": "Temporary",
      "SanctionBy": "Manager B",
      "Status": false
    }
  ]
  
    const [filteredData, setFilteredData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false); //Add Modal
    const [manualAttendanceEntry, setManualAttendanceEntry] = useState([])
    const { token } = useAuth()
    //View and Edit
    const [LVE, setLVE] = useState(false);
    const [edit, setEdit] = useState(false);
    const [LeaveId, setLeaveId] = useState();

    useEffect(() =>{
      setManualAttendanceEntry(attData)
    }, [attData])
  
    // useEffect(() => {
    //   const fetchManualAttendance = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:5500/leave-master/get', {
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       })
    //       const data = response.data
    //       setmanualAttendanceEntry(data)
    //     } catch (error) {
    //       console.error('Error', error);
    //     }
    //   }
  
    //   fetchLeaveType()
    // }, [token])
  
    //Hamburger Menu
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
  
    const [columnVisibility, setColumnVisibility] = useState({
      ApprovalFlag: true,
      AttendanceID: true,
      AttendanceDate: true,
      FYear: true,
      EmployeeType: true,
      EmployeeName: true,
      Shift: true,
      InTime: true,
      OutTime: true,
      JobType: true,
      SanctionBy: true,
      Status: true
    });

    const columnNames = {
        ApprovalFlag: "Approval Flag",
        AttendanceID: "Attendance ID",
        AttendanceDate: "Attendance Date",
        FYear: "FYear",
        EmployeeType: "Employee Type",
        EmployeeName: "Employee Name",
        Shift: "Shift",
        InTime: "In Time",
        OutTime: "Out Time",
        JobType: "Job Type",
        SanctionBy: "Sanction By",
        Status: "Status"
    }

  
    const handleSearchChange = (title, searchWord) => {
      const newFilter = manualAttendanceEntry.filter((item) => {
        const value = item[title];
        return value && value.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
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
  
    //Menu
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
      const allRows = [...manualAttendanceEntry, ...filteredData];
  
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
    <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
      <div className="mr-auto text-[15px]">
        Attendance Management / Manual Attendance Entry
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
        >
          Column Visibility
          <Icon
            icon="fe:arrow-down"
            className={`mt-1.5 ml-2 ${showDropdown ? "rotate-180" : ""
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
                  checked={selectedColumns.includes(columnName)}
                  onChange={() => toggleColumn(columnName)}
                />
                <span
                  className={
                    selectedColumns.includes(columnName)
                      ? "font-semibold"
                      : ""
                  }
                >
                  {columnName}
                </span>
              </label>
            ))}
          </div>
        )}

        <button
          className="text-white font-semibold px-4 rounded-lg text-[13px] border border-white"
          onClick={() => setModalOpen(true)}
        >
          Add
        </button>
        <div className="flex items-center">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 -ml-10 flex flex-col absolute lg:top-32 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center"
            >
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
                Copy
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
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
      </div>
      <div className="grid gap-2 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8 ">
          <table className="min-w-full text-center whitespace-normal z-0">
            <thead className="border-b-2">
              <tr className="">
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className="w-auto text-[13px] px-1 font-bold text-black border-2 border-gray-400 whitespace-normal">
                  ID
                </th>
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 capitalize whitespace-normal max-w-xs ${columnVisibility[columnName] ? "" : "hidden"
                          }`}
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
                    )
                )}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 " />
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className="p-2 font-bold text-black border-2 text-[11px] capitalize"
                      >
                        <input
                          type="text"
                          placeholder={`Search `}
                          className="w-auto text-[11px] h-6 border-2 border-slate-500 rounded-lg justify-center text-center whitespace-normal"
                          style={{
                            maxWidth: getColumnMaxWidth(columnName) + "px",
                          }}
                          onChange={(e) =>
                            handleSearchChange(columnName, e.target.value)
                          }
                        />
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                  <tr key={key}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setLVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setLeaveId(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setLVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setLeaveId(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {result.id}
                    </td>
                    {selectedColumns.map(
                      (columnName) =>
                        columnVisibility[columnName] && (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-[11px] text-left${columnVisibility[columnName] ? "" : "hidden"
                              }`}
                          >
                            {result[columnName]}
                          </td>
                        )
                    )}
                  </tr>
                ))
                : manualAttendanceEntry.map((result, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setLVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setLeaveId(result.id); // Pass ID to VEModal
                          }}
                        />

                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setLVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setLeaveId(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {index}
                    </td>
                    {selectedColumns.map(
                      (columnName) =>
                        columnVisibility[columnName] && (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px]${columnVisibility[columnName] ? "" : "hidden"
                              }`}
                          >
                            {columnName === "ApprovalFlag"
                          ? result[columnName]
                            ? "Approved"
                            : "Unapproved"
                          : columnName === "Status"
                            ? result[columnName]
                              ? "Active"
                              : "Inactive"
                            : result[columnName]}
                          </td>
                        )
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
    </div>
  )
}

export default ManualAttendanceEntry