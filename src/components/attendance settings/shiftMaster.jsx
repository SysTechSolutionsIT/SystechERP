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
  const [ Fins, setFins] = useState('')

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

  //Toggle
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    ...Object.keys(columnVisibility),
  ]);

  const toggleColumn = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col !== columnName)
      );
    } else {
      setSelectedColumns((prevSelected) => [...prevSelected, columnName]);
    }
  };

  useEffect(() => {
    console.log("Selected Columns:", selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => {
    setSelectedColumns([...Object.keys(columnVisibility)]);
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
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
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="flex items-center gap-4 whitespace-normal">
          <div className="mr-auto text-[15px] whitespace-normal min-w-fit">
            Attendance Settings / Shift Master
          </div>
          <div className="relative sticky lg:ml-96 sm:ml-64">
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
          </div>
          {showDropdown && (
            <div className="absolute top-[16%] lg:ml-[42%] sm:mr-[20%] bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
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

          <div className="min-w-[40%]">
            <button
              className="text-white font-semibold px-4 rounded-lg text-[13px] border border-white"
              onClick={() => setModalOpen(true)}
            >
              Add Entry
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2 lg:mr-[210px] sm:mr-[60px]">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-28 lg:right-38 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
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
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 capitalize whitespace-normal max-w-xs ${
                          columnVisibility[columnName] ? "" : "hidden"
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
                            onClick={() => {
                              setSVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setShiftId(result.sID); // Pass ID to VEModal
                            }}
                          />
                          <ViewShift
                            visible={SVE}
                            onClick={() => setSVE(false)}
                            edit={edit}
                            ID={ShiftId}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.sID}
                      </td>
                      {selectedColumns.map(
                        (columnName) =>
                          columnVisibility[columnName] && (
                            <td
                              key={columnName}
                              className={`px-4 border-2 whitespace-normal text-[11px] text-left${
                                columnVisibility[columnName] ? "" : "hidden"
                              }`}
                            >
                              {result[columnName]}
                            </td>
                          )
                      )}
                    </tr>
                  ))
                : Shift.length > 0 &&
                  Shift.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setSVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setShiftId(entry.sID); // Pass ID to VEModal
                            }}
                          />

                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setSVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setShiftId(entry.sID); // Pass ID to VEModal
                            }}
                          />
                          <ViewShift
                            visible={SVE}
                            onClick={() => setSVE(false)}
                            edit={edit}
                            ID={ShiftId}
                          />

                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.sID}
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
                              {columnName === "twoDayShift" ||
                              columnName === "autoRotateFlag"
                                ? entry[columnName] === "yes"
                                  ? "Yes"
                                  : "No"
                                : columnName === "status"
                                ? entry[columnName] === "active"
                                  ? "Active"
                                  : "Inactive"
                                : entry[columnName]}
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
  );
};

export default ShiftMaster;
