import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import ViewShift from "./viewShift";
import AddShift from "./AddShift";
import axios from "axios";
import { useAuth } from "../Login";

export const ShiftData = [
  {
    shiftId: 1,
    employeeType: "contract staff",
    shiftName: "Morning Shift",
    startTime: "08:00",
    endTime: "16:00",
    OTstartTime: "16:30",
    graceEarlyTime: "07:45",
    graceLateTime: "08:15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "",
    status: "active",
  },
  {
    shiftId: 2,
    employeeType: "trainee worker",
    shiftName: "Afternoon Shift",
    startTime: "12:00",
    endTime: "20:00",
    OTstartTime: "20:30",
    graceEarlyTime: "11:45",
    graceLateTime: "12:15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "",
    status: "active",
  },
  {
    shiftId: 3,
    employeeType: "trainer staff",
    shiftName: "Night Shift",
    startTime: "20:00",
    endTime: "04:00",
    OTstartTime: "04.30",
    graceEarlyTime: "19.45",
    graceLateTime: "20.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "yes",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "Night Shift",
    status: "active",
  },
  {
    shiftId: 4,
    employeeType: "worker",
    shiftName: "General Shift",
    startTime: "09.00",
    endTime: "17.00",
    OTstartTime: "17.30",
    graceEarlyTime: "08.45",
    graceLateTime: "09.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "General Shift",
    status: "active",
  },
  {
    shiftId: 5,
    employeeType: "company staff",
    shiftName: "Morning Shift",
    startTime: "08.00",
    endTime: "16.00",
    OTstartTime: "16.30",
    graceEarlyTime: "07.45",
    graceLateTime: "08.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "Morning Shift for company staffs only.",
    status: "active",
  },
  {
    shiftId: 6,
    employeeType: "contract staff",
    shiftName: "Afternoon Shift",
    startTime: "12.00",
    endTime: "20.00",
    OTstartTime: "20.30",
    graceEarlyTime: "11.45",
    graceLateTime: "12.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "",
    status: "inactive",
  },
  {
    shiftId: 7,
    employeeType: "trainee worker",
    shiftName: "Night Shift",
    startTime: "20.00",
    endTime: "04.00",
    OTstartTime: "04.30",
    graceEarlyTime: "19.45",
    graceLateTime: "20.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "yes",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "",
    status: "inactive",
  },
  {
    shiftId: 8,
    employeeType: "trainer staff",
    shiftName: "General Shift",
    startTime: "09.00",
    endTime: "17.00",
    OTstartTime: "17.30",
    graceEarlyTime: "08.45",
    graceLateTime: "09.15",
    halfDayHour: 4,
    fullDayHours: 8,
    twoDayShift: "no",
    autoRotateFlag: "yes",
    shiftGraceHoursMin: 1,
    shiftGraceHoursMax: 2,
    remark: "",
    status: "inactive",
  },
];

const ShiftMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [Fins, setFins] = useState('')

  const { token } = useAuth();
  //View and Edit
  const [SVE, setSVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ShiftId, setShiftId] = useState();

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    eType: true,
    sName: true,
    startT: true,
    endT: true,
    OTstartT: true,
    GRstartT: true,
    GRendT: true,
    halfDayHour: true,
    fullDayHours: true,
    twoDayShift: true,
    autoRotateFlag: false,
    graceMin: false,
    graceMax: false,
    remarks: false,
    status: true,
  });

  const columnNames = {
    eType: "Employee Type",
    sName: "Shift Name",
    startT: "Start Time",
    endT: "End Time",
    OTstartT: "Overtime Start Time",
    GRstartT: "Grace Period Start Time",
    GRendT: "Grace Period End Time",
    halfDayHour: "Half-Day Hours",
    fullDayHours: "Full-Day Hours",
    twoDayShift: "Two-Day Shift",
    autoRotateFlag: "Auto-Rotate Flag",
    graceMin: "Grace Period Minimum",
    graceMax: "Grace Period Maximum",
    remarks: "Remarks",
    status: "Status",
  };


  //Toggle
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
  }, [token]);

  //Max Searchbar width
  const getColumnMaxWidth = (columnName) => {
    let maxWidth = 0;
    const allRows = [...ShiftData, ...filteredData];

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
  //API CALL

  const [Shift, setShift] = useState([]);

  useEffect(() => {
    fetchShiftData();
  }, []);

  const fetchShiftData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/shift-master/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setShift(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  console.log(Shift);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...Shift];

    const newFilter = searchData.filter((item) => {
      // Check if the item matches the search term in any of the selected columns
      const matches = selectedColumns.some((columnName) => {
        const newCol = columnName.charAt(0).toLowerCase() + columnName.slice(1);
        const value = item[newCol];
        return (
          value &&
          value.toString().toLowerCase().includes(searchWord.toLowerCase())
        );
      });

      return matches;
    });

    // Update the filtered data
    setFilteredData(newFilter);
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">
          Attendance Settings / Shift Master
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`ml-2 ${showDropdown ? "rotate-180" : ""} cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
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
      <AddShift visible={isModalOpen} onClick={() => setModalOpen(false)} />

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
                {selectedColumns.map((columnName) => (
                  columnVisibility[columnName] ? (
                    <th
                      key={columnName}
                      className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal`}
                    >
                      {columnNames[columnName]}
                    </th>
                  ) : null
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 " />
                {selectedColumns.map((columnName) => (
                  columnVisibility[columnName] ? (
                    <th key={columnName} className="p-2 font-semibold text-black border-2">
                      <input
                        type="text"
                        placeholder={`Search `}
                        className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                        style={{ maxWidth: getColumnMaxWidth(columnName) + "px" }}
                        onChange={(e) => handleSearchChange(columnName, e.target.value)}
                      />
                    </th>
                  ) : null
                ))}
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
                            setSVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setShiftId(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setSVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setShiftId(result.id); // Pass ID to VEModal
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
                      {result.sID}
                    </td>
                    {selectedColumns.map((columnName) => (
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "twoDayShift" ||
                            columnName === "autoRotateFlag"
                            ? result[columnName] === "yes"
                              ? "Yes"
                              : "No"
                            : columnName === "status"
                              ? result[columnName] === "active"
                                ? "Active"
                                : "Inactive"
                              : result[columnName]}
                        </td>
                      ) : null
                    ))}
                  </tr>
                ))
                : Shift.length > 0 &&
                Shift.map((result, index) => (
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
                            setSVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setShiftId(result.sID); // Pass ID to VEModal
                          }}
                        />

                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setSVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setShiftId(result.sID); // Pass ID to VEModal
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
                      {result.sID}
                    </td>
                    {selectedColumns.map((columnName) => (
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "twoDayShift" ||
                            columnName === "autoRotateFlag"
                            ? result[columnName] === "yes"
                              ? "Yes"
                              : "No"
                            : columnName === "status"
                              ? result[columnName] === "active"
                                ? "Active"
                                : "Inactive"
                              : result[columnName]}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewShift
        visible={SVE}
        onClick={() => setSVE(false)}
        edit={edit}
        ID={ShiftId}
      />
    </div>
  );
};

export default ShiftMaster;
