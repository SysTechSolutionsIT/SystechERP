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
  const [WeekOffCounts, setWeekOffCounts] = useState([]);
  const [mergedWeeks, setMergedWeeks] = useState([]); //contain Employee Id and WeeklyOff counts

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
        console.log("Weekly Off Response:", response.data);
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

  //Merge counts of weekly off with employee id
  useEffect(() => {
    const mergedData = WeeklyOff.map(({ EmployeeId, WeeklyOff }) => {
      const totalCountObj = WeekOffCounts.find(
        ({ WeeklyOffId }) => WeeklyOffId === WeeklyOff
      );
      const totalCount = totalCountObj ? totalCountObj.TotalCount : 0;
      return { EmployeeId, TotalCount: totalCount };
    });

    // Filter out entries with empty WeeklyOff or no corresponding TotalCount
    const filteredData = mergedData.filter(
      ({ TotalCount }) => TotalCount !== 0
    );

    // Store the merged and filtered data in an array
    setMergedWeeks(
      filteredData.map(({ EmployeeId, TotalCount }) => ({
        EmployeeId,
        TotalCount,
      }))
    );
  }, [token, WeeklyOff, WeekOffCounts]);

  console.log("Merged Array:", mergedWeeks);

  // 4. Fetching Holidays in a week

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
    if (ManAttData.length > 0 && ALeaves.length > 0 && mergedWeeks.length > 0) {
      const monthlyAttendance = mergeCounts(ManAttData, ALeaves, mergedWeeks);
      setMonthlyAttendance(monthlyAttendance);
    }
  }, [ManAttData, ALeaves, mergedWeeks, token]);
  
  function mergeCounts(attendanceCounts, leaveCounts, weeklyOffs) {
    const combinedCountsMap = new Map();
  
    // Merge attendance counts
    attendanceCounts.forEach((attendanceCount) => {
      const { EmployeeId, ManualAttendance } = attendanceCount;
      combinedCountsMap.set(EmployeeId, { EmployeeId, ManualAttendance });
    });
  
    // Merge leave counts
    leaveCounts.forEach((leaveCount) => {
      const { EmployeeId, Presenty } = leaveCount;
      if (combinedCountsMap.has(EmployeeId)) {
        const existingRecord = combinedCountsMap.get(EmployeeId);
        combinedCountsMap.set(EmployeeId, { ...existingRecord, Presenty });
      } else {
        combinedCountsMap.set(EmployeeId, { EmployeeId, Presenty });
      }
    });
  
    // Merge weekly offs
    weeklyOffs.forEach((weeklyOff) => {
      const { EmployeeId, TotalCount } = weeklyOff;
      if (combinedCountsMap.has(EmployeeId)) {
        const existingRecord = combinedCountsMap.get(EmployeeId);
        combinedCountsMap.set(EmployeeId, { ...existingRecord, TotalCount });
      } else {
        combinedCountsMap.set(EmployeeId, { EmployeeId, TotalCount });
      }
    });
  
    // Convert the map values into an array
    const combinedCountsArray = Array.from(combinedCountsMap.values());
    console.log("Combined Records are: ", combinedCountsArray);
    return combinedCountsArray;
  }
  
  console.log("Monthly Attendance: ", MonthlyAttendance);

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
      const Presenty =
        record.ManualAttendance +
        Holidays +
        record.TotalCount +
        record.Presenty;
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
