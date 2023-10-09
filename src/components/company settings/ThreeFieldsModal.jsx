import { useFormik } from "formik";
import React, { useState } from "react";
import { ThreeFData } from "./ThreeFieldsMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const ThreeFieldsModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      masterName: "",
      fieldDetails1: "",
      fieldDetails2: "",
      status: "",
      remark: "",
    },
    onSubmit: (values) => {
      console.log(values);
      addField(values);
    },
  });

  const addField = async (values) => {
    try {
      const response = await axios.post("http://localhost:5500/threefieldmaster/add/", values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("Three Fields added successfully");
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.log(`Error: `, error.message);
      // Handle network error
    }
  }

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Three Fields Master
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
                <p className="text-[13px] font-semibold">Field ID</p>
                <input
                  id="ID"
                  type="number"
                  placeholder="Enter Field ID"
                  // value={formik.values.ID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                // onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Master Name</p>
                <input
                  id="masterName"
                  type="text"
                  placeholder="Enter Master Name"
                  value={formik.values.masterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Field Details 1</p>
                <input
                  id="fieldDetails1"
                  type="text"
                  placeholder="Enter Field Details 1"
                  value={formik.values.fieldDetails1}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Field Details 2</p>
                <input
                  id="fieldDetails2"
                  type="text"
                  placeholder="Enter Field Details 2"
                  value={formik.values.fieldDetails2}
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
                    className={`relative w-4 h-4 mr-2 peer shrink-0 checked:appearance-none checked:bg-blue-900 border-2 border-blue-900 rounded-sm`}
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

export default ThreeFieldsModal;
