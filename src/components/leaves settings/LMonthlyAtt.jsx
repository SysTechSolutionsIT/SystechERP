import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";

function LMonthlyAtt({ LID }) {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState("");
  const [LeavesEarned, setLeavesEarned] = useState(0);
  const [Presenty, setPresenty] = useState(0);
  const [Absenty, setAbsenty] = useState(0);
  const [MaxUsedFlag, setMaxUsedFlag] = useState(false);
  const [CarryForward, setCarryForward] = useState(0);

  useEffect(() => {
    const fetchLeaveApplication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-application/FnShowParticularData",
          {
            params: { LeaveApplicationId: LID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Leave Application", data);
        setDetails(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveApplication();
  }, [token, LID]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowParticularData",
          {
            params: { LeaveTypeId: details.LeaveTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Leave Type Details", data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    if (details.LeaveTypeId) {
      fetchLeaveType();
    }
  }, [token, details]);

  useEffect(() => {
    const fetchLeaveEarned = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnFetchLeaveEarned",
          {
            params: {
              EmployeeId: details.EmployeeId,
              FYear: details.FYear,
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Leave earned", data);
        if (data.length > 0) {
          setLeavesEarned(data);
        } else {
          setLeavesEarned(0);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveEarned();
  }, [token, details]);

  useEffect(() => {
    // Your logic for calculating Presenty, Absenty, MaxUsedFlag, CarryForward, and updating attendance
    // Make sure to use appropriate state setter functions and avoid direct mutations
  }, [details, LeaveTypes, LeavesEarned]);

  return (<div>LMonthlyAtt</div>);
}

export default LMonthlyAtt;
