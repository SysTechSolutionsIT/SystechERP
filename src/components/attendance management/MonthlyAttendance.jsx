import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useDetails } from "../Login";

const MonthlyAttendance = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MonthlyAttendance, setMonthlyAttendance] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(30);
  const { token } = useAuth();
  const { fYear } = useDetails();

  // React Arrays
  const [ManAttData, setManAttData] = useState([]); //Approved Manual Attendance Records
  const [ALeaves, setALeaves] = useState([]); // Approved Leaves Record
  const [Holidays, setHolidays] = useState(0); //Holidays of the given month
  const [WeeklyOff, setWeeklyOffs] = useState([]); //Weekly offs of particular employee

  //Fetching employee names and IDs
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [ManAttResponse, LeavesResponse, getWeeklyOffs, getHolidays] =
  //         await Promise.all([
  //           axios.get(
  //             "http://localhost:5500/manual-attendance/MAttendance/count",
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           ),
  //           axios.get("http://localhost:5500/MLAttendance/FnshowActiveData", {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }),
  //           axios.get("http://localhost:5500/weekly-off/MWeeklyOff/count", {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }),
  //           axios.get(
  //             "http://localhost:5500/holiday-master/Mholidays/calc-holidays",
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           ),
  //         ]);

  //       setManAttData(ManAttResponse.data);
  //       setALeaves(LeavesResponse.data);
  //       setWeeklyOffs(getWeeklyOffs.data);
  //       setHolidays(getHolidays.data);
  //       console.log("Leaves Response:", ALeaves);
  //       console.log("Manual Attendance Response", ManAttData);
  //       console.log("Weekly Off", WeeklyOff);
  //       console.log("Holidays:", Holidays);
  //     } catch (error) {
  //       console.error("Error while fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [token]);

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

  useEffect(() => {
    const fetchWeeklyOffData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/weekly-off/MWeeklyOff/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWeeklyOffs(response.data);
        console.log("Weekly Off Response:", response.data);
      } catch (error) {
        console.error("Error while fetching weekly off data:", error);
      }
    };

    fetchWeeklyOffData();
  }, [token]);

  useEffect(() => {
    const fetchHolidaysData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/holiday-master/Mholidays/calc-holidays",
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
        ManualAttendance: attendanceCount.ManualAttendance,
      };
    });

    // Update Lcount for existing EmployeeIds and add new EmployeeIds with Lcount
    leaveCounts.forEach((leaveCount) => {
      if (combinedCounts[leaveCount.EmployeeId]) {
        combinedCounts[leaveCount.EmployeeId].Presenty = leaveCount.Presenty;
      } else {
        combinedCounts[leaveCount.EmployeeId] = {
          EmployeeId: leaveCount.EmployeeId,
          Presenty: leaveCount.Presenty,
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
          combinedCounts[employeeId].WeekOffs = weeklyOffData.WeekOffs;
        }
      }
    }

    // Convert the object into an array of values
    const combinedCountsArray = Object.values(combinedCounts);
    console.log("Combined Records are: ", combinedCountsArray);
    return combinedCountsArray;
  }

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

  //Fetching Presenty Absenty based on Leaves:
  useEffect(() => {
    const FetchLeavesAttendance = async (values) => {
      try {
        const response = await axios.get(
          "http://localhost:5500/MLAttendance/FnshowActiveData",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Monthly attendance presenty results", data);
        console.log();
      } catch (error) {
        console.error("Error updating Leave balance", error);
      }
    };

    FetchLeavesAttendance();
  }, [token]);

  //Now main module of Present days calculations
  if (MonthlyAttendance.length > 0) {
    MonthlyAttendance.map((record) => {
      const Presenty = record.MCount + Holidays + record.Wcount + record.Lcount;
    });
  }

  return (
    <div className="top-25 min-w-[40%]">
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
