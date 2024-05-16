import { useFormik } from "formik";
import React, { useState } from "react";
import { DesignData } from "./DesignationMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
import { useEffect } from "react";

const DesignationModal = ({ visible, onClick }) => {
  const [reportingDesignation, setReportingDesignation] = useState([]);
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      DesignationName: "",
      ReportDesignationId: "",
      ShortName: "",
      DesignationPosition: "",
      Remark: "",
      IUFlag: "I",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      addDesignation(values);
      resetForm();
      onClick();
    },
  });

  const addDesignation = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/d9e7x2a1/FnAddUpdateDeleteRecord",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Designation Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/d9e7x2a1/FnShowActiveData",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(data);
        setReportingDesignation(data);
      } catch (error) {
        console.error("Error fetching reporting to data", error);
      }
    };
    fetchDesignations();
  }, [token, visible]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Designation Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Designation Name</p>
                <input
                  id="DesignationName"
                  type="text"
                  placeholder="Enter Designation Name"
                  value={formik.values.DesignationName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Designation Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Designation Short Name"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Report Designation</p>
                <select
                  id="ReportDesignationId"
                  value={formik.values.ReportDesignationId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="NA">None</option>
                  {reportingDesignation.map((entry) => (
                    <option
                      key={entry.DesignationId}
                      value={entry.DesignationName}
                    >
                      {entry.DesignationName}
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
              onClick={formik.handleSubmit}
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

export default DesignationModal;
