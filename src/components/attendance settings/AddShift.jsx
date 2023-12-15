import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { ShiftData } from "./shiftMaster";
import axios from "axios";
import { useAuth } from "../Login";

const AddShift = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [employeeTypes, setEmployeeTypes] = useState([])

  const formik = useFormik({
    initialValues: {
      EmployeeTypeId: "",
      ShiftName: "",
      StartTime: "",
      EndTime: "",
      OTStartTime: "",
      GraceEarlyTime: "",
      GraceLateTime: "",
      HalfdayHours: "",
      FulldayHours: "",
      AutoRotateFlag: "",
      TwoDayShift: "",
      ShiftGraceHoursMin: "",
      ShiftGraceHoursMax: "",
      Remark: "",
    },
    onSubmit: async (values) => {
      const formData = {
        EmployeeTypeId: values.EmployeeTypeId,
        ShiftName: values.ShiftName,
        StartTime: values.StartTime,
        EndTime: values.EndTime,
        OTStartTime: values.OTStartTime,
        GraceEarlyTime: values.GraceEarlyTime,
        GraceLateTime: values.GraceLateTime,
        HalfdayHours: values.HalfdayHours,
        FulldayHours: values.FulldayHours,
        AutoRotateFlag: values.AutoRotateFlag,
        TwoDayShift: values.TwoDayShift,
        ShiftGraceHoursMin: values.ShiftGraceHoursMin,
        ShiftGraceHoursMax: values.ShiftGraceHoursMax,
        Remark: values.Remark,
        IUFlag:"I"
      };
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/shift-master/FnAddUpdateDeleteRecord",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
          alert("Shift added successfully");
          onClick();
          window.location.refresh();
      } catch (error) {
        console.error("Error:", error.message);
        // Handle network error
      }
    },
  });

  useEffect(() =>{
    const fetchEmployeeTypes = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
        { headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployeeTypes(data)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeTypes()
  },[token])

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">Shift Master</p>
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
                <p className="text-[13px] font-semibold">Shift Name</p>
                <input
                  id="ShiftName"
                  type="text"
                  placeholder="Enter Shift Name"
                  value={formik.values.ShiftName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
              <p className="font-semibold text-[13px]">Employee Type</p>
              <select
                id="EmployeeTypeId"
                name="EmployeeTypeId"
                className="w-full px-4 py-1.5 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeId}
                onChange={formik.handleChange}
              >
                    <option value="">Select Type</option>
                    {employeeTypes.map((entry) => (
                    <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                      {entry.EmployeeType}
                    </option>
                    ))}
              </select>
            </div>
              <div>
                <p className="text-[13px] font-semibold">Start Time</p>
                <input
                  id="StartTime"
                  type="time"
                  placeholder="HH:MM"
                  value={formik.values.StartTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">End Time</p>
                <input
                  id="EndTime"
                  type="time"
                  placeholder="HH:MM"
                  value={formik.values.EndTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">OT Start Time</p>
                <input
                  id="OTStartTime"
                  type="time"
                  placeholder="HH:MM"
                  value={formik.values.OTStartTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Start Time</p>
                <input
                  id="GraceEarlyTime"
                  type="number"
                  placeholder="Enter Grace Early Time"
                  value={formik.values.GraceEarlyTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace End Time</p>
                <input
                  id="GraceLateTime"
                  type="number"
                  placeholder="Enter Grace Late Time"
                  value={formik.values.GraceLateTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Half Day Hours</p>
                <input
                  id="HalfdayHours"
                  type="text"
                  placeholder="Enter Half Day Hours"
                  value={formik.values.HalfdayHours}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Full Day Hours</p>
                <input
                  id="FulldayHours"
                  type="text"
                  placeholder="Enter Full Day Hours"
                  value={formik.values.FulldayHours}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
              <p className="capitalize font-semibold text-[13px]">
                Two Day Shift
              </p>
              <div className="space-y-2 text-[11px]">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="TwoDayShift"
                    value="Y"
                    onChange={formik.handleChange}
                    className="mr-2"
                    checked={formik.values.TwoDayShift === 'Y'}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="TwoDayShift"
                    value="N"
                    onChange={formik.handleChange}
                    className="mr-2"
                    checked={formik.values.TwoDayShift === 'N'}
                  />
                  No
                </label>
              </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Auto Rotate Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      Na="AutoRotateFlag"
                      name="AutoRotateFlag"
                      value="Y"
                      onChange={formik.handleChange}
                      className="mr-2"
                      checked={formik.values.AutoRotateFlag === 'Y'}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      Na="AutoRotateFlag"
                      name="AutoRotateFlag"
                      value="N"
                      onChange={formik.handleChange}
                      className="mr-2"
                      checked={formik.values.AutoRotateFlag === 'N'}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Shift Grace Hours Min
                </p>
                <input
                  id="ShiftGraceHoursMin"
                  type="text"
                  placeholder="Enter Shift Grace Hours Min"
                  value={formik.values.ShiftGraceHoursMin}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Shift Grace Hours Max
                </p>
                <input
                  id="ShiftGraceHoursMax"
                  type="text"
                  placeholder="Enter Shift Grace Hours Max"
                  value={formik.values.ShiftGraceHoursMax}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remark"
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

export default AddShift;
