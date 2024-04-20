import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const ViewWeek = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
  const [state, setState] = useState(false);
  const formik = useFormik({
    initialValues: {
      WeeklyOffId: "",
      WeeklyOffName: "",
      Remark: "",
    },
    onSubmit: async (values) => {
      const formData = {
        WeeklyOffId: values.WeeklyOffId,
        WeeklyOffName: values.WeeklyOffName,
        Remark: values.Remark,
        IUFlag:"U"
      };
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/weekly-off/FnAddUpdateDeleteRecord",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       alert('Weekly Off Updated')
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    fetchWeekData();
  }, [ID]);
  console.log(ID);

  const fetchWeekData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/weekly-off/FnShowParticularData`,
        {
          params: { WeeklyOffId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  // console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        WeeklyOffId: details.WeeklyOffId,
        WeeklyOffName: details.WeeklyOffName,
        Remark: details.Remark,
      });
    }
  }, [details]);

  if (!visible) return null;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Job Type Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Weekly Off ID</p>
                <input
                  id="WeeklyOffId"
                  type="text"
                  placeholder="Enter Weekly Off ID"
                  value={details?.WeeklyOffId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Weekly Off Name</p>
                <input
                  id="WeeklyOffName"
                  type="text"
                  placeholder="Enter Weekly Off Name"
                  value={formik.values.WeeklyOffName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ViewWeek;
