import React, { useState, useEffect, useRef } from "react";
import { useAuth, useDetails } from "../Login";
import { Icon } from "@iconify/react";
import ManualAttendanceEntryModal from "./ManualAttendanceEntryModal";
import axios from "axios";
import MVEModal from "./ManualAttendanceViewEdit";
import NoDataNotice from "../NoDataNotice";

const ManualAttendanceEntry = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [manualAttendanceEntry, setManualAttendanceEntry] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(30);
  const { token } = useAuth();
  const { empid, name} = useDetails()
  //View and Edit
  const [MVE, setMVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ManId, setManId] = useState();

  // React Arrays
  const [employeeTypeMapping, setEmployeeTypes] = useState([]);
  const [employeeIdMapping, setDetails] = useState([]);
  const [shiftMapping, setShift] = useState([]);
  const [jobTypeMapping, setJobs] = useState([]);

  //Fetching employee names and IDs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          detailsResponse,
          employeeTypesResponse,
          shiftsResponse,
          jobsResponse,
        ] = await Promise.all([
          axios.get(
            "http://localhost:5500/employee/personal/FnShowActiveData",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get("http://localhost:5500/employee-type/FnShowActiveData", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5500/shift-master/FnShowActiveData", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5500/job-type/FnShowActiveData", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDetails(detailsResponse.data);
        setEmployeeTypes(employeeTypesResponse.data);
        setShift(shiftsResponse.data);
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error("Error while fetching data: ", error);
      }
    };

    fetchData();
  }, [token]);

  const renderColumnValue = (columnName, result) => {
    switch (columnName) {
      case "EmployeeTypeId":
        const employeeTypeValue =
          employeeTypeMapping.length &&
          employeeTypeMapping.find(
            (item) => item.EmployeeTypeId == result[columnName]
          )?.EmployeeTypeGroup;

        console.log("EmployeeTypeValue:", employeeTypeValue);
        return employeeTypeValue;

      case "EmployeeId":
        const employeeIdValue =
          employeeIdMapping.length &&
          employeeIdMapping.find(
            (item) => item.EmployeeId == result[columnName]
          )?.EmployeeName;
        return employeeIdValue;

      case "ShiftId":
        const shiftValue =
          shiftMapping.length &&
          shiftMapping.find((item) => item.ShiftId == result[columnName]);
        return shiftValue?.ShiftName;

      case "JobTypeId":
        const jobTypeValue = jobTypeMapping.find(
          (item) => item.JobTypeId == result[columnName]
        )?.JobTypeName;
        return jobTypeValue;

      case "AttendanceDate":
        return formatDate(result[columnName]);

      case "InTime":
        return extractTimeFromDate(result[columnName]);
      case "OutTime":
        return extractTimeFromDate(result[columnName]);
      case "SanctionBy":
        const SanctionIdValue =
          employeeIdMapping.length &&
          employeeIdMapping.find(
            (item) => item.EmployeeId == result[columnName]
          )?.EmployeeName;
        return SanctionIdValue;

      default:
        return result[columnName];
    }
  };

  useEffect(() => {
    const fetchManualAttendance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/manual-attendance/FnShowParticularEmployeeData",
          {
            params:{
              EmployeeId: empid
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log("Response", response);
        console.log("data from Manual Attendance:", data);
        setManualAttendanceEntry(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchManualAttendance();
  }, [token]);

  const deleteAttendanceEntry = async (DeleteId) => {
    try {
      const response = await axios.post('http://localhost:5500/manual-attendance/FnAddUpdateDeleteRecord',{
      AttendanceId: DeleteId,  
      IUFlag:'D'
      },
      {
        headers: {Authorization: `Bearer ${token}`}
      })
      alert('Attendance Entry Deleted')
    } catch (error) {
      console.error('Error', error);
    }
  }

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    ApprovalFlag: true,
    AttendanceDate: true,
    FYear: true,
    EmployeeTypeId: true,
    EmployeeId: true,
    AttendanceFlag: true,
    ShiftId: true,
    InTime: true,
    OutTime: true,
    JobTypeId: true,
    SanctionBy: true,
  });

  const columnNames = {
    ApprovalFlag: "Approval Flag",
    AttendanceDate: "Attendance Date",
    FYear: "FYear",
    EmployeeTypeId: "Employee Type",
    EmployeeId: "Employee Name",
    AttendanceFlag: 'Attendance Flag',
    ShiftId: "Shift",
    InTime: "In Time",
    OutTime: "Out Time",
    JobTypeId: "Job Type",
    SanctionBy: "Sanction By",
  };

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

  //Formatting Dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get only the date part
  };

  function extractTimeFromDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  const getApprovalFlagColor = (flag) => {
    switch (flag) {
      case "P":
        return "bg-yellow-500";
      case "R":
        return "bg-red-500";
      case "A":
        return "bg-green-600";
      default:
        return ""; // You can set a default background color here if needed
  };
}

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
      <ManualAttendanceEntryModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />

      {manualAttendanceEntry.length === 0 ? (
          <div className="flex justify-center items-center">
          <NoDataNotice Text='No Attendance Entries Yet' visible={isModalOpen}/>
          </div>
        ) : (
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
                              setMVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setManId(result.AttendanceId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setMVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setManId(result.AttendanceId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteAttendanceEntry(result.AttendanceId)}
                          />
                          <Icon
                            icon="octicon:clock-16"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setMVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setManId(result.AttendanceId); // Pass ID to VEModal
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.AttendanceId}
                      </td>
                      {selectedColumns.map(
                        (columnName) =>
                          columnVisibility[columnName] && (
                            <td
                              key={columnName}
                              className={`px-4 border-2 whitespace-normal text-left text-[11px]${
                                columnVisibility[columnName] ? "" : "hidden"
                              }`}
                            >
                              {columnName === "ApprovalFlag" ? ( 
                                <div
                                  className={` whitespace-normal font-bold text-[15px] text-center capitalize ${
                                    getApprovalFlagColor(result[columnName])
                                  }`}
                                >
                                  {renderColumnValue(columnName, result)}
                                </div>

                              ) : (
                                renderColumnValue(columnName, result)
                              )}
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
                                setMVE(true); // Open VEModal
                                setEdit(false); // Disable edit mode for VEModal
                                setManId(result.AttendanceId); // Pass ID to VEModal
                              }}
                            />

                            <Icon
                              icon="mdi:edit"
                              color="#556987"
                              width="20"
                              height="20"
                              className="cursor-pointer"
                              onClick={() => {
                                setMVE(true); // Open VEModal
                                setEdit(true); // Disable edit mode for VEModal
                                setManId(result.AttendanceId); // Pass ID to VEModal
                              }}
                            />
                            <Icon
                              icon="material-symbols:delete-outline"
                              color="#556987"
                              width="20"
                              height="20"
                              className="cursor-pointer"
                              onClick={() => deleteAttendanceEntry(result.AttendanceId)}
                            />
                            <Icon
                              icon="octicon:clock-16"
                              color="#556987"
                              width="18"
                              height="18"
                              className="cursor-pointer"
                              title="Add Out Time"
                              onClick={() => {
                                setMVE(true); // Open VEModal
                                setEdit(true); // Disable edit mode for VEModal
                                setManId(result.AttendanceId); // Pass ID to VEModal
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                          {result.AttendanceId}
                        </td>
                        {selectedColumns.map(
                        (columnName) =>
                          columnVisibility[columnName] && (
                            <td
                              key={columnName}
                              className={`px-4 border-2 whitespace-normal text-left text-[11px]${
                                columnVisibility[columnName] ? "" : "hidden"
                              }`}
                            >
                              {columnName === "ApprovalFlag" ? ( 
                                <div
                                  className={` whitespace-normal font-bold text-[15px] text-center capitalize ${
                                    getApprovalFlagColor(result[columnName])
                                  }`}
                                >
                                  {renderColumnValue(columnName, result)}
                                </div>

                              ) : (
                                renderColumnValue(columnName, result)
                              )}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="flex mb-5 justify-center">
          <button
            type="button"
            onClick={() => setEntriesToShow(entriesToShow + 30)}
            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
          >
            Load More
          </button>
        </div>
      </div>
      )}
      <MVEModal
        visible={MVE}
        onClick={() => setMVE(false)}
        edit={edit}
        ID={ManId}
      />
    </div>
  );
};

export default ManualAttendanceEntry;
