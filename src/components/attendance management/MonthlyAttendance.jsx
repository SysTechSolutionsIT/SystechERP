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
  const [Holidays, setHolidays] = useState([]); //Holidays of the given month
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

  useEffect(() => {
    if (
      ManAttData.length > 0 &&
      ALeaves.length > 0 &&
      WeekOffCounts.length > 0
    ) {
      const monthlyAttendance = mergeCounts(ManAttData, ALeaves, WeekOffCounts);
      setMonthlyAttendance(monthlyAttendance);
    }
    console.log("Monthly Attendance: ", MonthlyAttendance);
  }, [ManAttData, ALeaves, WeekOffCounts, token]);

  function mergeCounts(attendanceCounts, leaveCounts, weeklyOffs) {
    const mergedData = [];

    // Iterate over each Employee ID
    ALeaves.forEach((leave) => {
      // Retrieve data from each response object based on Employee ID
      const employeeId = leave.EmployeeId;
      const month = new Date.getMonth();
      console.log("Month", month);
      const paidHolidays = Holidays.paidHolidaysCount;
      const unpaidHolidays = Holidays.unpaidHolidaysCount;

      // Find the corresponding manual attendance data for the current employee
      const manualAttendance = ManAttData.find(
        (attendance) => attendance.EmployeeId === employeeId
      );

      // Find the corresponding weekly off counts data for the current employee
      const weeklyOffCounts = WeekOffCounts.find(
        (weeklyOff) => weeklyOff.EmployeeId === employeeId
      );

      // Calculate total salaried days
      const totalSalariedDays =
        (manualAttendance ? manualAttendance.ManualAttendance : 0) +
        (weeklyOffCounts ? weeklyOffCounts.TotalCount : 0) +
        paidHolidays +
        leave.Presenty;

      // Construct the object for the current employee
      const employeeData = {
        EmployeeId: employeeId,
        Month: month,
        PaidHolidays: paidHolidays,
        UnpaidHolidays: unpaidHolidays,
        WeeklyOffs: weeklyOffCounts ? weeklyOffCounts.TotalCount : 0,
        PaidLeaves: leave.Presenty,
        UnpaidLeaves: leave.Absenty || 0,
        TotalSalariedDays: totalSalariedDays,
      };

      // Push the data for the current employee to the final array
      mergedData.push(employeeData);
      console.log("Merged Data", mergedData);
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
