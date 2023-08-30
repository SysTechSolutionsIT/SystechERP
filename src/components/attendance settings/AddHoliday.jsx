import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { HolidayData } from "./Holidaymaster";

const AddHoliday = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      id: "",
      description: "",
      date: "",
      type: "",
      year: "",
      remark: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      HolidayData.push(values);
      alert("Added Successfully");
      onClick();
    },
  });

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Holiday Master
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
                <p className="text-[13px] font-semibold">Holiday ID</p>
                <input
                  id="id"
                  type="text"
                  placeholder="Enter Holiday ID"
                  value={formik.values.id}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Holiday Description</p>
                <input
                  id="description"
                  type="text"
                  placeholder="Enter Holiday Description"
                  value={formik.values.description}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Holiday Date</p>
                <input
                  id="date"
                  type="date"
                  placeholder="Enter Holiday Date"
                  value={formik.values.date}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Holiday Type
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="type"
                      value="Paid"
                      checked={formik.values.type === "Paid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="type"
                      value="unpaid"
                      checked={formik.values.type === "Unpaid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Unpaid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="type"
                      value="weekOff"
                      checked={formik.values.type === "weekOff"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Unpaid
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">FYear</p>
                <input
                  id="year"
                  type="number"
                  placeholder="Enter FYear"
                  value={formik.values.year}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
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
                <p className="text-[13px] font-semibold">Status</p>
                <div className="flex items-center">
                  <input
                    id="status"
                    type="checkbox"
                    checked={status}
                    value={formik.values.status}
                    className={` relative w-4 h-4 mr-2 peer shrink-0 appearance-none checked:bg-blue-800 border-2 border-blue-900 rounded-sm`}
                    onChange={handleStatusChange}
                  />
                  <Icon
                    className="absolute w-4 h-4 hidden peer-checked:block"
                    icon="gg:check"
                    color="white"
                  />
                  <label for="status" className="text-[11px] font-semibold">
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
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

export default AddHoliday;
