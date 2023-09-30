import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const AddJob = ({ visible, onClick }) => {
  const [statusCheck, setStatusCheck] = useState(false);

  const formik = useFormik({
    initialValues: {
      jobName: "",
      jobShortName: "",
      ratePerDay: "",
      rateGroup: "",
      category: "",
      position: "",
      Remark: "",
      status: statusCheck,
    },
    onSubmit: async (values) => {
      const status = statusCheck === true;
      console.log(values);
      try {
        const formData = {
          jobName: values.jobName,
          jobShortName: values.jobShortName,
          category: values.category,
          position: values.position,
          ratePerDay: values.ratePerDay,
          rateGroup: values.rateGroup,
          Remark: values.remark,
          status: status, // StatusCheck was already part of formik.values
        };

        const response = await axios.post(
          "http://localhost:5500/job-master/add",
          formData // Send the extracted form data
        );

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          alert(" record added successfully");
          // Handle successful response
          onClick();
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
          // Handle error response
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
        // Handle network error
      }
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
                  Job Type Name
                </p>
                <input
                  id="jobName"
                  type="text"
                  placeholder="Enter Job Type Name"
                  value={formik.values.jobName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="jobShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.jobShortName}
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
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
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
                      formik.setFieldValue("status", statusCheck); // Update status value in formik
                    }}
                  />
                  Active
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
