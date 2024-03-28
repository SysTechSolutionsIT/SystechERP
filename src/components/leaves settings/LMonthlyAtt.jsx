import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

function LMonthlyAtt(visible, onClick, LID) {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState("");

  console.log("AA gaye bhai yaha");
  console.log("LID:", LID);

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
  }, [LID]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token]);

  return <div>LMonthlyAtt</div>;
}

export default LMonthlyAtt;
