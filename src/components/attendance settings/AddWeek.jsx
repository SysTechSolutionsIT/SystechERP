import { useFormik } from "formik";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { WeeklyOffData } from "./WeeklyOffMaster";

const AddWeek = ({ visible, onClick }) => {
  const [isStatusChecked, setStatusCheched] = useState(false);

  const formik = useFormik({
    initialValues: {
      weeklyOffId: "",
      weeklyOff: "",
      remark: "",
      status: isStatusChecked.toString(),
    },
    onSubmit: (values) => {
      console.log(values);
      WeeklyOffData.push(values);
    },
  });
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
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
                  Weekly Off ID
                </p>
                <input
                  id="weeklyOffId"
                  type="text"
                  placeholder="Enter Weekly Off ID"
                  value={formik.values.weeklyOffId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Weekly Off Name
                </p>
                <input
                  id="weeklyOff"
                  type="text"
                  placeholder="Enter Weekly Off Name"
                  value={formik.values.weeklyOff}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className=" mt-1 capitalize font-semibold text-[13px]">
                  Status
                </p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={isStatusChecked}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={(event) =>
                      handleCheckboxChange("status", setStatusCheched, event)
                    }
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              <button
                type="submit"
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
