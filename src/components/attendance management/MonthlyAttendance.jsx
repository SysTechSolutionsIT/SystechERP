import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";
import axios from "axios";

const MonthlyAttendance = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MonthlyAttendance, setMonthlyAttendance] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(30);
  const { token } = useAuth();

  // React Arrays
  const [ManAttData, setManAttData] = useState([]); //Approved Manual Attendance Records
  const [ALeaves, setALeaves] = useState([]); // Approved Leaves Record
  const [Holidays, setHolidays] = useState(0); //Holidays of the given month
  const [WeeklyOff, setWeeklyOffs] = useState([]); //Weekly offs of particular employee

  //Fetching employee names and IDs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ManAttResponse, LeavesResponse, getHolidays] = await Promise.all(
          [
            axios.get(
              "http://localhost:5500/manual-attendance/MAttendance/count",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get("http://localhost:5500/leave-application/MLeaves/count", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              "http://localhost:5500/holiday-master/Mholidays/calc-holidays",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]
        );

        setManAttData(ManAttResponse.data);
        setALeaves(LeavesResponse.data);
        setHolidays(getHolidays.data);
      } catch (error) {
        console.error("Error while fetching data: ", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (ManAttData.length > 0 && ALeaves.length > 0 && WeeklyOff.length > 0) {
      setMonthlyAttendance(mergeCounts(ManAttData, ALeaves, WeeklyOff));
    }
  }, [ManAttData, ALeaves, WeeklyOff]);

  function mergeCounts(attendanceCounts, leaveCounts, weeklyOffs) {
    const combinedCounts = {};

    // Initialize combinedCounts with EmployeeId as keys and Mcount and Lcount as values
    attendanceCounts.forEach((attendanceCount) => {
      combinedCounts[attendanceCount.EmployeeId] = {
        EmployeeId: attendanceCount.EmployeeId,
        Mcount: attendanceCount.Mcount,
        Lcount: 0, // Initialize to 0 as default value
      };
    });

    // Update Lcount for existing EmployeeIds and add new EmployeeIds with Lcount
    leaveCounts.forEach((leaveCount) => {
      if (combinedCounts[leaveCount.EmployeeId]) {
        combinedCounts[leaveCount.EmployeeId].Lcount = leaveCount.Lcount;
      } else {
        combinedCounts[leaveCount.EmployeeId] = {
          EmployeeId: leaveCount.EmployeeId,
          Mcount: 0, // Initialize to 0 as default value
          Lcount: leaveCount.Lcount,
        };
      }
    });

    // Append Wcount for each employee from weeklyOffs
    for (const employeeId in combinedCounts) {
      if (Object.prototype.hasOwnProperty.call(combinedCounts, employeeId)) {
        const weeklyOffData = weeklyOffs.find(
          (employee) => employee.EmployeeId === employeeId
        );
        if (weeklyOffData) {
          combinedCounts[employeeId].Wcount = weeklyOffData.Wcount;
        }
      }
    }

    // Convert the object into an array of values
    const combinedCountsArray = Object.values(combinedCounts);
    console.log("Combined Records are: ", combinedCountsArray);
    return combinedCountsArray;
  }

  // Fetching Weekly Offs
  //2. Append the array with number
  //Append the number to mergeCOunts on the basis of emp id

  function countWeeklyOffOccurrences(weeklyOffString) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Split the WeeklyOff string into an array of days
    const weeklyOffDays = weeklyOffString.split(",");

    // Initialize an object to store the count of each day
    const dayCounts = {};
    weeklyOffDays.forEach((day) => {
      dayCounts[day] = 0; // Initialize count for each day to 0
    });

    // Count occurrences of each day in the current month
    for (
      let i = 1;
      i <= new Date(currentYear, currentMonth, 0).getDate();
      i++
    ) {
      const date = new Date(currentYear, currentMonth - 1, i);
      const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
      if (weeklyOffDays.includes(dayOfWeek)) {
        dayCounts[dayOfWeek]++; // Increment count for the current day of the week
      }
    }

    return dayCounts;
  }

  useEffect(() => {
    const fetchWeeklyOff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/work/GetWeeklyOff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        const newData = data.map((employee) => {
          const counts = countWeeklyOffOccurrences(employee.WeeklyOff);
          return { ...employee, Wcount: counts };
        });

        console.log("Processed data:", newData);
        setWeeklyOffs(newData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchWeeklyOff();
  }, [token]);

  // Calculating Total Days of the week and appending that to Monthly Attendance Array

  useEffect(() => {
    const AppendTotalDays = () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1 to get the current month

      // Get the total days in the current month
      const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

      const updatedMonthlyAttendance = MonthlyAttendance.map((attendance) => ({
        ...attendance,
        TotalDaysInMonth: totalDaysInMonth,
      }));

      // Update the state with the modified array
      setMonthlyAttendance(updatedMonthlyAttendance);
    };
    AppendTotalDays();
  }, [token]);

  //Now main module of Present days calculations
  if (MonthlyAttendance.length > 0) {
    MonthlyAttendance.map((record) => {
      const Presenty = record.MCount + Holidays + record.Wcount;
    });
  }

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Attendance Management / Monthly Attendances
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
      <MonthlyAttendanceModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
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
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                          >
                            {renderColumnValue(columnName, result)}
                          </td>
                        ) : null
                      )}
                    </tr>
                  ))
                : MonthlyAttendance.slice(0, entriesToShow).map(
                    (result, index) => (
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
                                {renderColumnValue(columnName, result)}
                              </td>
                            )
                        )}
                      </tr>
                    )
                  )}
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
      {/* <MVEModal
        visible={MVE}
        onClick={() => setMVE(false)}
        edit={edit}
        ID={ManId}
      /> */}
    </div>
  );
};

export default MonthlyAttendance;
