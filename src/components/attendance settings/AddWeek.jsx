import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const AddWeek = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [weeklyOffData, setWeeklyOffData] = useState([]);

  const formik = useFormik({
    initialValues: {
      WeeklyOffName: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      CreatedOn: new Date(),
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = {
        WeeklyOffName: values.WeeklyOffName,
        Remark: values.Remark,
        IUFlag: "I",
        CreatedOn: new Date(),
      };
      console.log(formData);
      AddWeeklyOff(formData);
      onClick();
      resetForm();
    },
  });

  const AddWeeklyOff = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/weekly-off/FnAddUpdateDeleteRecord",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Weekly Off Added");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Weekly Off Master
            </p>
            <p className="text-white underline text-[11px] font-semibold">
              Note: (1) Please enter Weekday names with first letter capital{" "}
              <br />
              (2) Separate multiple entries by a comma (,)
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
                <p className="capatilize font-semibold text-[13px]">
                  Weekly Off Name
                </p>
                <input
                  id="WeeklyOffName"
                  type="text"
                  placeholder="Enter Weekly Off Name"
                  value={formik.values.WeeklyOffName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                />
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              >
                Save
              </button>
              <button
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                onClick={onClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddWeek;
