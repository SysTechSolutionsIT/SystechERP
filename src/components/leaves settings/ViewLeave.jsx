import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { leaveData } from "./LeaveType";
import axios from "axios";
import { useAuth } from "../Login";

const ViewLeave = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const {token} = useAuth()
  const formik = useFormik({
    initialValues: {
      LeaveType: "",
      ShortName: "",
      PaidFlag: "",
      CarryForwardFlag: "",
      Remark: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
        LeaveType: values.LeaveType,
      ShortName: values.ShortName,
      PaidFlag: values.PaidFlag,
      CarryForwardFlag: values.CarryForwardFlag,
      Remark: values.Remark,
      Status: values.Status,
      }

      updateLeave(updatedData)
    },
  });

  const updateLeave = async (data) =>{
    try {
      const response = axios.patch(`http://localhost:5500/leave-master/update/${ID}`, data, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Leave Data Updated')
      window.location.reload()
    } catch (error) {
      console.error('Error', error);
    }
  }

  useEffect(() => {
    const fetchLeave = async () =>{
      try{
        const response = await axios.get(`http://localhost:5500/leave-master/get/${ID}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data
        setDetails(data)
      }catch (error){
        console.error('Error', error);
    } 
    }

    fetchLeave()
  }, [ID]);

  useEffect(() =>{
    if (details){
        formik.setValues({
          LeaveType: details.LeaveType,
          ShortName: details.ShortName,
          PaidFlag: details.PaidFlag,
          CarryForwardFlag: details.CarryForwardFlag,
          Remark: details.Remark,
          Status: details.Status,
        })
    }
  }, [details])

  const [isStatusChecked, setStatusChecked] = useState(false)

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
                <p className="text-[13px] font-semibold">Leave ID</p>
                <input
                  type="number"
                  placeholder="Enter Leave ID"
                  value={details?.id}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave Type Name</p>
                <input
                  id="LeaveType"
                  type="text"
                  placeholder="Enter Leave Type Name"
                  value={formik.values.LeaveType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">ShortName</p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                      value="Paid"
                      checked={formik.values.PaidFlag === "Paid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="PaidFlag"
                      value="Unpaid"
                      checked={formik.values.PaidFlag === "Unpaid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
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
                      value="Yes"
                      checked={formik.values.CarryForwardFlag === "Yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="CarryForwardFlag"
                      value="No"
                      checked={formik.values.CarryForwardFlag === "No"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remark"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                <input
                    id="Status"
                    type="checkbox"
                    checked={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                />
                Active
                </label>
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

export default ViewLeave;
