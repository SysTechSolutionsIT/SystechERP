import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

function LMonthlyAtt({ LID }) {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState("");
  let LeavesEarned = 0;
  let Presenty = 0;
  let Absenty = 0;
  let MaxUsedFlag;
  let CarryForward = 0;

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
  useEffect(() => {
    fetchLeaveApplication();
  }, [token, LID]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowParticularData",
          {
            params: { LeaveTypeId: details.LeaveTypeId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log("Leave Type Details", data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token, details]);

  //Updating leave Balance

  const updateLeaveBalance = async (values) => {
    try {
      const response = await axios.patch(
        "http://localhost:5500/leave-balance/FnLeaveApproved",
        values,
        {
          params: {
            EmployeeId: details.EmployeeId,
            FYear: details.FYear,
            LeaveTypeId: details.LeaveTypeId,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Leave Attendance Updated");
    } catch (error) {
      console.error("Error updating Leave balance", error);
    }
  };

  //Fetching Leaves Earned:
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log("Leave earned", data);
        if (data.length > 0) {
          LeavesEarned = data;
        } else {
          LeavesEarned = 0;
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchLeaveEarned();
  }, [token]);

  //Updating Leaves Earned
  const UpdateLeaveEarned = async (CarryForward) => {
    try {
      const response = await axios.get(
        "http://localhost:5500/leave-type/FnLeaveEarnedUpdate",
        {
          params: {
            EmployeeId: details.EmployeeId,
            FYear: details.FYear,
            CarryForward: CarryForward,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log("Response", data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  //Updating Attendances
  const updateAttendance = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/MLAttendance/FnAddUpdateDeleteRecord",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("UPdated attendance posted");
    } catch (error) {
      console.error("Error updating Leave balance", error);
    }
  };

  // Calculating Monthly Attendance after fetching the data

  // When leaves taken is less than the maximum of the month
  if (details.SanctionedDays < LeaveTypes.MaxPerMonth) {
    Presenty += details.SanctionedDays;
    MaxUsedFlag = false;
    if (LeaveTypes.CarryForwardFlag === "Y") {
      CarryForward = LeaveTypes.MaxPerMonth - details.SanctionedDays;
    }
    //Updating Leave Balance
  }
  // When leaves taken is exactly equal to maximum of the month
  else if (details.SanctionedDays == LeaveTypes.MaxPerMonth) {
    Presenty += details.SanctionedDays;
    MaxUsedFlag = true;
    if (LeaveTypes.CarryForwardFlag === "Y") {
      CarryForward = 0;
    }
  } else {
    // where leaves taken exceeds maximum per month
    // Here we must check for Leaves Eaened Module
    Presenty = LeaveTypes.MaxPerMonth;
    const Remain = details.SanctionedDays - LeaveTypes.MaxPerMonth;
    MaxUsedFlag = true;

    if (Remain < LeavesEarned) {
      //Update Leaves Earned
      CarryForward = LeavesEarned - Remain;
    } else if (Remain == LeavesEarned) {
      CarryForward = 0;
    } else {
      Absenty = details.SanctionedDays - LeaveTypes.MaxPerMonth;
    }

    if (LeaveTypes.CarryForwardFlag === "Y") {
      CarryForward = 0;
    }
  }
  UpdateLeaveEarned(CarryForward);
  updateLeaveBalance(details);
  const UpdationObject = {
    EmployeeId: details.EmployeeId,
    Presenty: Presenty,
    Absenty: Absenty,
    FYear: details.FYear,
    Month: new Date(details?.SanctionFromDate).getMonth(),
  };
  updateAttendance(UpdationObject);

  return <div></div>;
}

export default LMonthlyAtt;
