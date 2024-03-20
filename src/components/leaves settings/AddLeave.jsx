import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { leaveData } from "./LeaveType";
import axios from 'axios'
import { useAuth } from "../Login";

const AddLeave = ({ visible, onClick }) => {
  const { token } = useAuth()
  const [isStatusChecked, setStatusChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      LeaveType: "",
      ShortName: "",
      DefaultBalance:"",
      MaxPerMonth:"",
      PaidFlag: "",
      CarryForwardFlag: "",
      Remark: "",
      IUFlag:"I"
    },
    onSubmit: (values, {resetForm}) => {
      addLeave(values)
      resetForm()
      onClick()
    },
  })

  const addLeave = async (data) => {
    try{
      const response = await axios.post('http://localhost:5500/leave-type/FnAddUpdateDeleteRecord', data,
       {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Leave Successfully Added')
    } catch(error){
      console.error('Error', error);
    }
  }

    const handleCheckboxChange = (fieldName, setChecked, event) => {
      //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
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
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Leave Type Master
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
                <p className="text-[13px] font-semibold">Leave Type Name</p>
                <input
                  id="LeaveType"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  value={formik.values.LeaveType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Short Name</p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Default Balance</p>
                <input
                  id="DefaultBalance"
                  type="number"
                  value={formik.values.DefaultBalance}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Max Per Month</p>
                <input
                  id="MaxPerMonth"
                  type="number"
                  value={formik.values.MaxPerMonth}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Paid Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="PaidFlag"
                      value="P"
                      checked={formik.values.PaidFlag === "P"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="PaidFlag"
                      value="U"
                      checked={formik.values.PaidFlag === "U"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Unpaid
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Carry Forward Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="CarryForwardFlag"
                      value="Y"
                      checked={formik.values.CarryForwardFlag === "Y"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="CarryForwardFlag"
                      value="N"
                      checked={formik.values.CarryForwardFlag === "N"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
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

export default AddLeave;
