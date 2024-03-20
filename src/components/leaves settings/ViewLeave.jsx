import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { leaveData } from "./LeaveType";
import axios from "axios";
import { useAuth } from "../Login";
import { GiCardKingClubs } from "react-icons/gi";

const ViewLeave = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const {token} = useAuth()
  const formik = useFormik({
    initialValues: {
      LeaveTypeId:"",
      LeaveType: "",
      ShortName: "",
      ShortName: "",
      DefaultBalance: "",
      PaidFlag: "",
      CarryForwardFlag: "",
      Remark: "",
    },
    onSubmit: (values, {resetForm}) => {
      const updatedData = {
      LeaveTypeId: values.LeaveTypeId,
      LeaveType: values.LeaveType,
      ShortName: values.ShortName,
      ShortName: details.ShortName,
      DefaultBalance: details.DefaultBalance,
      PaidFlag: values.PaidFlag,
      CarryForwardFlag: values.CarryForwardFlag,
      Remark: values.Remark,
      IUFlag: "U"
      }

      updateLeave(updatedData)
    },
  });

  const updateLeave = async (data) =>{
    try {
      const response = axios.post(`http://localhost:5500/leave-type/FnAddUpdateDeleteRecord`, data, 
      {
        params:{LeaveTypeId : ID},
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Leave Data Updated')
      onClick()
    } catch (error) {
      console.error('Error', error);
    }
  }

  const fetchLeave = async () =>{
    try{
      const response = await axios.get(`http://localhost:5500/leave-type/FnShowParticularData`, {
        params: { LeaveTypeId: ID },
        headers:{ Authorization: `Bearer ${token}`}
      })
      const data = response.data
      console.log(details)
      setDetails(data)
    }catch (error){
      console.error('Error', error);
  } 
  }
  useEffect(() => {

    fetchLeave()
  }, [ID]);

  useEffect(() =>{
    if (details){
        formik.setValues({
          LeaveTypeId: details.LeaveTypeId,
          LeaveType: details.LeaveType,
          ShortName: details.ShortName,
          DefaultBalance: details.DefaultBalance,
          MaxPerMonth: details.MaxPerMonth,
          PaidFlag: details.PaidFlag,
          CarryForwardFlag: details.CarryForwardFlag,
          Remark: details.Remark,
        })
    }
  }, [details])

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
                  value={details?.LeaveTypeId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
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
                      disabled={!edit}
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
                      value="Y"
                      checked={formik.values.CarryForwardFlag === "Y"}
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
                      value="N"
                      checked={formik.values.CarryForwardFlag === "N"}
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
