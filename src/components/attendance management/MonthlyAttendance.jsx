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
            axios.get("http://localhost:5500/MLAttendance/FnshowActiveData", {
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
        console.log("Leaves Response:", ALeaves);
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
      };
    });

    // Update Lcount for existing EmployeeIds and add new EmployeeIds with Lcount
    leaveCounts.forEach((leaveCount) => {
      if (combinedCounts[leaveCount.EmployeeId]) {
        combinedCounts[leaveCount.EmployeeId].Lcount = leaveCount.Presenty;
      } else {
        combinedCounts[leaveCount.EmployeeId] = {
          EmployeeId: leaveCount.EmployeeId,
          Lcount: leaveCount.Presenty,
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
