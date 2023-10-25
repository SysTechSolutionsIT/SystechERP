import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const VEFModal = ({ visible, onClick, edit, ID }) => {
  const [YearCloseCheck, setYearCloseCheck] = useState(false);
  const [StatusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const { token } = useAuth()

  const formik = useFormik({
    initialValues: {
      fName: "",
      sDate: "",
      eDate: "",
      fShortName: "",
      yearClose: "",
      remarks: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
        fName: values.fName,
        fShortName: values.fShortName,
        status: values.status,
        remarks: values.remarks,
        sDate: values.sDate,
        eDate: values.eDate,
      };

      try {
        const response = axios.patch(`http://localhost:5500/financials/update-record/${ID}`, updatedData, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        alert("Record Updated Successfully")
      } catch (error) {
        
      }
    },
  });
  useEffect(() => {
    fetchFinData();
  }, [ID]);

  console.log(ID);
  const fetchFinData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/financials/${ID}`
      );
      console.log("Response Object", response);
      const data = response.data.record;
      setDetails(data);
      console.log(data);
      console.log(typeof details.sDate);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        fName: details.fName,
        fShortName: details.fShortName,
        status: details.status,
        remarks: details.remarks,
        sDate: details.sDate,
        eDate: details.eDate,
      })
    }
  }, [details])

  console.log(typeof sDateFormatted);
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Financial Master
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
                  Financial Year ID
                </p>
                <input
                  id="finId"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details?.finId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Name</p>
                <input
                  id="fName"
                  type="text"
                  placeholder="Enter Name"
                  value={formik.values.fName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Start Date
                </p>
                <input
                  id="sDate"
                  type="text"
                  placeholder="Enter Start Date"
                  value={formik.values.sDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">End Date</p>
                <input
                  id="eDate"
                  type="text"
                  placeholder="Enter End Date"
                  value={formik.values.eDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.fShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Year Active
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="yearClose"
                    type="checkbox"
                    checked={formik.values.yearClose}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={() => setYearCloseCheck(!YearCloseCheck)}
                    disabled={!edit}
                  />
                  Active
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <textarea
                  id="Remark"
                  placeholder="Enter Remark"
                  value={formik.values.remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
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
                    checked={formik.values.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={() => setStatusCheck(!StatusCheck)}
                    disabled={!edit}
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              {edit && ( // Only show the "Save" button if edit is true
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                >
                  Save
                </button>
              )}
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

export default VEFModal;
