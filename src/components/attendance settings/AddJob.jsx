import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { JobTypeData } from "./jobTypeMaster";

const AddJob = ({ visible, onClick }) => {
  const [statusCheck, setStatusCheck] = useState(false);

  const formik = useFormik({
    initialValues: {
      jobTypeId: "",
      jobTypeName: "",
      shortname: "",
      ratePerDay: "",
      rateGroup: "",
      category: "",
      position: "",
      remark: "",
      status: statusCheck,
    },
    onSubmit: (values) => {
      console.log(values);
      JobTypeData.push(values);
      onClick();
    },
  });
  useEffect(() => {
    formik.resetForm();
  }, []);

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
                  Job Type ID
                </p>
                <input
                  id="jobTypeId"
                  type="number"
                  placeholder="Enter Job ID"
                  value={formik.values.companyId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Job Type Name
                </p>
                <input
                  id="jobTypeName"
                  type="text"
                  placeholder="Enter Job Type Name"
                  value={formik.values.jobTypeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="shortname"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.shortname}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Rate Per Day
                </p>
                <input
                  id="ratePerDay"
                  type="text"
                  placeholder="Enter Rate/Day"
                  value={formik.values.ratePerDay}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Rate Group
                </p>
                <input
                  id="rateGroup"
                  type="text"
                  placeholder="Enter Rate Group"
                  value={formik.values.rateGroup}
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
                      id="category"
                      value="standard"
                      checked={formik.values.category === "standard"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Standard
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="category"
                      value="position"
                      checked={formik.values.category === "position"}
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
                  id="position"
                  type="text"
                  placeholder="Enter Position"
                  value={formik.values.position}
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
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={statusCheck}
                    className={`w-5 h-5 mr-2 mt-4 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={() => {
                      setStatusCheck(!statusCheck);
                      formik.setFieldValue(
                        "status",
                        statusCheck ? "Inactive" : "Active"
                      ); // Update status value in formik
                    }}
                  />
                  Active {/* Always display "Active" label */}
                </label>
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
