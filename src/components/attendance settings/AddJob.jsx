import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const AddJob = ({ visible, onClick }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues:{
      JobTypeName: "",
      ShortName: "",
      RateGroup: "",
      RatePerDay: "",
      Category: "",
      Position: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
    },
    onSubmit: (values) =>{
      console.log(values)
      addJobType(values)
    }
  })

  const addJobType = async (data) =>{
   try {
    const response = await axios.post('http://localhost:5500/job-type/FnAddUpdateDeleteRecord', data,
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    alert('Job Type Added')
   } catch (error) {
      console.error('Error', error);
   }
  }

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Job Type Master
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
                  Job Type Name
                </p>
                <input
                  id="JobTypeName"
                  type="text"
                  placeholder="Enter Job Type Name"
                  value={formik.values.JobTypeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Rate Per Day
                </p>
                <input
                  id="RatePerDay"
                  type="text"
                  placeholder="Enter Rate/Day"
                  value={formik.values.RatePerDay}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Rate Group
                </p>
                <input
                  id="RateGroup"
                  type="text"
                  placeholder="Enter Rate Group"
                  value={formik.values.RateGroup}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Category</p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="Category"
                      value="Standard"
                      checked={formik.values.Category === "Standard"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Standard
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="Category"
                      value="Position"
                      checked={formik.values.Category === "Position"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Position
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Position</p>
                <input
                  id="Position"
                  type="text"
                  placeholder="Enter Position"
                  value={formik.values.Position}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
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

export default AddJob;
