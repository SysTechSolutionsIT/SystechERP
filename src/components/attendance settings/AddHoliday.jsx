import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const AddHoliday = ({ visible, onClick }) => {
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      HolidayDate: "",
      HolidayType: "",
      HolidayDescription: "",
      FYear: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      AcFlag: "",
    },
    onSubmit: async (values) => {
      const formData = {
        HolidayDate: values.HolidayDate,
        HolidayType: values.HolidayType,
        HolidayDescription: values.HolidayDescription,
        FYear: values.FYear,
        AcFlag: "Y",
        IUFlag: "I",
        CreatedOn: new Date(),
        Remark: values.Remark,
      };
      onClick();
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/holiday-master/FnAddUpdateDeleteRecord",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Record added successfully");
        window.location.reload();
        onClick();
      } catch (error) {
        console.error("Error:", error.message);
        // Handle network error
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, []);

  const [finYears, setFinYears] = useState([]);

  useEffect(() => {
    const fetchFinancialYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/financials/FnShowActiveData"
        );
        const data = response.data;
        setFinYears(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchFinancialYears();
  }, []);
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
                <p className="text-[13px] font-semibold">Holiday Description</p>
                <input
                  id="HolidayDescription"
                  type="text"
                  placeholder="Enter Holiday Description"
                  value={formik.values.HolidayDescription}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Holiday Date</p>
                <input
                  id="HolidayDate"
                  type="date"
                  placeholder="Enter Holiday Date"
                  value={formik.values.HolidayDate}
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
                      name="HolidayType"
                      value="Paid"
                      checked={formik.values.HolidayType === "Paid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="HolidayType"
                      value="Unpaid"
                      checked={formik.values.HolidayType === "Unpaid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Unpaid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="HolidayType"
                      value="weekOff"
                      checked={formik.values.HolidayType === "weekOff"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    WeekOff
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">FYear</p>
                <select
                  type="dropdown"
                  id="FYear"
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
                >
                  <option value="">Select a Financial Year</option>
                  {finYears.map((year, index) => (
                    <option key={index} value={year.ShortName}>
                      {year.Name}
                    </option>
                  ))}
                </select>
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
