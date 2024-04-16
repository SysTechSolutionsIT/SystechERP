import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useDetails } from "../Login";

const MonthlyAttendance = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MonthlyAttendance, setMonthlyAttendance] = useState([]); // for counting and posting
  const [MonAttendance, setMonAttendance] = useState([]);

  const [entriesToShow, setEntriesToShow] = useState(30);
  const { token } = useAuth();
  const { fYear } = useDetails();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // React Arrays
  const [ManAttData, setManAttData] = useState([]); //Approved Manual Attendance Records
  const [ALeaves, setALeaves] = useState([]); // Approved Leaves Record
  const [Holidays, setHolidays] = useState([]); //Holidays of the given month
  const [WeeklyOff, setWeeklyOffs] = useState([]); //Weekly offs of particular employee
  const [WeekOffCounts, setWeekOffCounts] = useState([]);
  const [mergedWeeks, setMergedWeeks] = useState([]); //contain Employee Id and WeeklyOff counts
  const [employeeIdData, setEmployeeIdData] = useState([]); // looping per employee iid

  //1. Fetching approved manual attendance data
  useEffect(() => {
    const fetchManualAttendanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/manual-attendance/MAttendance/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setManAttData(response.data);
        console.log("Manual Attendance Response:", response.data);
      } catch (error) {
        console.error("Error while fetching manual attendance data:", error);
      }
    };

    fetchManualAttendanceData();
  }, [token]);

  //2. Fetching approved leaves

  useEffect(() => {
    const fetchLeavesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/MLAttendance/FnshowActiveData",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setALeaves(response.data);
        console.log("Leaves Response:", response.data);
      } catch (error) {
        console.error("Error while fetching leaves data:", error);
      }
    };

    fetchLeavesData();
  }, [token]);

  //Part A: fetching emp ID and weekly Off
  useEffect(() => {
    const fetchWeeklyOffData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/work/FnFetchWeeklyOff",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWeeklyOffs(response.data);
      } catch (error) {
        console.error("Error while fetching weekly off data:", error);
      }
    };

    fetchWeeklyOffData();
  }, [token]);

  //Part B: Fetcing counts of weekly off per month

  useEffect(() => {
    const fetchWeeklyOffCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/weekly-off/GetWeeklyOffCount",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWeekOffCounts(response.data);
        console.log("Weekly Off COunts Response:", response.data);
      } catch (error) {
        console.error("Error while fetching weekly off count data:", error);
      }
    };

    fetchWeeklyOffCounts();
  }, [WeeklyOff, token]);

  // Part C : merging employeed and weekly off data

  useEffect(() => {
    if (WeeklyOff.length > 0 && WeekOffCounts.length > 0) {
      mergeEmployeeDataWithWeeklyOffs(WeeklyOff, WeekOffCounts);
    }
  }, [WeeklyOff, token, WeekOffCounts]);

  const mergeEmployeeDataWithWeeklyOffs = (employeeData, weeklyOffCounts) => {
    // Create a map to store counts based on WeeklyOffId
    const countsMap = new Map();
    weeklyOffCounts.forEach((item) => {
      countsMap.set(item.WeeklyOffId, item.TotalCount);
    });

    // Merge employee data with counts
    const mergedData = employeeData.map((employee) => {
      const totalCount = countsMap.get(employee.WeeklyOff) || 0;
      return { ...employee, TotalCount: totalCount };
    });
    setMergedWeeks(mergedData);
    console.log("merged weeks", mergedWeeks);
  };

  // 4. Fetching Holidays in a week

  useEffect(() => {
    const fetchHolidaysData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/s3f9n7v2/Mholidays/calc-holidays",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHolidays(response.data);
        console.log("Holidays Response:", response.data);
      } catch (error) {
        console.error("Error while fetching holidays data:", error);
      }
    };

    fetchHolidaysData();
  }, [token]);

  //Fetching all employee Id

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowEmpIds",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployeeIdData(response.data);
        console.log("Employee Response:", response.data);
      } catch (error) {
        console.error("Error while fetching holidays data:", error);
      }
    };

    fetchEmployeeData();
  }, [token]);

  //Posting Monthly Attendance

  const postAttendanceData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/monthly-attendance/FnAddUpdateDeleteRecord",
        MonthlyAttendance,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Posting monthly attendance.");
      console.log("Final Data", MonthlyAttendance);
    } catch (error) {
      console.error("Error while fetching holidays data:", error);
      console.log("Final Data", MonthlyAttendance);
    }
  };

  //Fetching Monthly Attendance
  useEffect(() => {
    const fetchMAttendanceData = async () => {
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      try {
        const response = await axios.get(
          "http://localhost:5500/monthly-attendance/FnShowMonthlyData",
          {
            params: { MAYear: currentYear, MAMonth: month },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMonAttendance(response.data);
        console.log("Employee Response:", response.data);
      } catch (error) {
        console.error("Error while fetching holidays data:", error);
      }
    };

    fetchMAttendanceData();
  }, [token, MonthlyAttendance]);

  useEffect(() => {
    if (ManAttData.length > 0 && ALeaves.length > 0 && mergedWeeks.length > 0) {
      const monthlyAttendance = mergeCounts(ManAttData, ALeaves, mergedWeeks);
      setMonthlyAttendance(monthlyAttendance);
      console.log("Monthly Attendance: ", MonthlyAttendance);
    }
  }, [ManAttData, ALeaves, mergedWeeks, token]);

  const mergeCounts = (ManAttData, ALeaves, mergedWeeks) => {
    const monthlyAttendanceData = [];
    const currentDate = new Date();
    const month = currentDate.getMonth() - 1;
    const currentYear = currentDate.getFullYear();

    // Iterate over each employee ID
    employeeIdData.forEach((employee) => {
      // Retrieve data from each response object based on Employee ID
      const employeeId = employee.EmployeeId;

      // Find the corresponding manual attendance data for the current employee
      const manualAttendance = ManAttData.find(
        (attendance) => attendance.EmployeeId === employeeId
      );

      // Find the corresponding leave data for the current employee
      const leave = ALeaves.find((leave) => leave.EmployeeId === employeeId);

      // Find the corresponding weekly off counts data for the current employee
      const weeklyOffData = mergedWeeks.find(
        (weeklyOff) => weeklyOff.EmployeeId === employeeId
      );

      // Calculate total salaried days
      const totalSalariedDays =
        (manualAttendance ? manualAttendance.ManualAttendance : 0) +
        (leave ? leave.Presenty : 0) +
        (Holidays ? Holidays.paidHolidaysCount : 0) +
        (weeklyOffData ? weeklyOffData.TotalCount : 0);

      const totalDays =
        (manualAttendance ? manualAttendance.ManualAttendance : 0) +
        (leave ? leave.Presenty : 0) +
        (leave ? leave.Absenty : 0) +
        (Holidays ? Holidays.paidHolidaysCount : 0) +
        (Holidays ? Holidays.unpaidHolidaysCount : 0) +
        (weeklyOffData ? weeklyOffData.TotalCount : 0);

      // Construct the object for the current employee
      const employeeData = {
        EmployeeId: employeeId,
        ManualAttendance: manualAttendance
          ? manualAttendance.ManualAttendance
          : 0,
        PaidLeaves: leave ? leave.Presenty : 0,
        UnpaidLeaves: leave ? leave.Absenty : 0,
        PaidHolidays: Holidays ? Holidays.paidHolidaysCount : 0,
        UnpaidHolidays: Holidays ? Holidays.unpaidHolidaysCount : 0,
        MAMonth: month,
        IUFlag: "I",
        MAYear: currentYear,
        WeeklyOffs: weeklyOffData ? weeklyOffData.TotalCount : 0,
        TotalSalariedDays: totalSalariedDays,
        TotalDays: totalDays,
      };

      // Push the data for the current employee to the final array
      monthlyAttendanceData.push(employeeData);
      console.log("EMployeee Data: ", employeeData);
    });

    return monthlyAttendanceData;
  };

  //Displaying into table

  const columnNames = {
    EmployeeId: "Employee Id",
    ManualAttendance: "Manual Attendance",
    PaidLeaves: "Paid Leaves",
    UnpaidLeaves: "Unpaid Leaves",
    PaidHolidays: "Paid Leaves",
    UnpaidHolidays: "Unpaid Holidays",
    Month: "Attendance Month",
    WeeklyOffs: "Weekly Off",
    TotalSalariedDays: "Total Salaried Days",
    TotalDays: "Total Attendance",
  };

  const [columnVisibility, setColumnVisibility] = useState({
    ManualAttendance: true,
    PaidLeaves: true,
    UnpaidLeaves: true,
    PaidHolidays: true,
    UnpaidHolidays: false,
    Month: true,
    WeeklyOffs: true,
    TotalSalariedDays: true,
    TotalDays: false,
  });

  const getColumnMaxWidth = (columnName) => {
    let maxWidth = 0;
    const allRows = [...MonthlyAttendance, ...filteredData];

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

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...MonthlyAttendance];

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

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">
          Attendance Settings / Monthly Attendance
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`ml-2 ${
                showDropdown ? "rotate-180" : ""
              } cursor-pointer`}
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
            onClick={() => postAttendanceData()}
          >
            Generate Monthly Attendance
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
                <th className="w-auto text-[13px] px-1 font-bold text-black border-2 border-gray-400 whitespace-normal">
                  ID
                </th>
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 capitalize ${
                          columnVisibility[columnName] ? "" : "hidden"
                        }`}
                      >
                        {columnNames[columnName]}
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
                      <td className="px-2 border-2"></td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.MAttendanceId}
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
                : MonAttendance.length > 0 &&
                  MonAttendance.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2"></td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.MAttendanceId}
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
                              {entry[columnName]}
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

export default MonthlyAttendance;
