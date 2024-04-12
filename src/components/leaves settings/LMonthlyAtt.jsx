import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";

const LMonthlyAtt = ({ LID }) => {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState("");
  const [LeavesEarned, setLeavesEarned] = useState(0);
  const [Presenty, setPresenty] = useState(0);
  const [Absenty, setAbsenty] = useState(0);
  const [MaxUsedFlag, setMaxUsedFlag] = useState(false);
  const [CarryForward, setCarryForward] = useState(0);

  console.log("In LMonthly ATtendance: ", LID);

  useEffect(() => {
    const fetchLeaveApplication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/a5d3g2p6/FnShowParticularData",
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
          "http://localhost:5500/leave-balance/FnFetchLeaveEarned",
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

  //Updating Leave Balance
  // const updateLeaveBalance = async () => {
  //   try {
  //     console.log("Leave balance in funciton", LeaveBalance);
  //     const response = await axios.patch(
  //       "http://localhost:5500/leave-balance/FnUpdateRecords",
  //       LeaveBalance,
  //       {
  //         params: {
  //           EmployeeId: employeeId,
  //           FYear: formik.values.FYear,
  //         },
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     alert("Leave Balance Updated");
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  // Calculating Monthly Attendance after fetching the data
  useEffect(() => {
    // Your logic for calculating Presenty, Absenty, MaxUsedFlag, CarryForward, and updating attendance
    // Make sure to use appropriate state setter functions and avoid direct mutations

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
    // updateLeaveBalance()
    const UpdationObject = {
      EmployeeId: details.EmployeeId,
      Presenty: Presenty,
      Absenty: Absenty,
      FYear: details.FYear,
      Month: new Date(details?.SanctionFromDate).getMonth(),
    };
    updateAttendance(UpdationObject);
  }, [details, LeaveTypes, LeavesEarned]);

  return <div></div>;
};

export default LMonthlyAtt;
