import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { JobTypeData } from "./jobTypeMaster";
import axios from "axios";
import { useAuth } from "../Login";

const ViewJob = ({ visible, onClick, edit, ID }) => {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [state, setState] = useState(false);
  const formik = useFormik({
    initialValues: {
      jobName: "",
      jobShortName: "",
      ratePerDay: "",
      rateGroup: "",
      category: "",
      position: "",
      Remark: "",
      status: state,
    },
    onSubmit: async (values) => {
      console.log(values);
      const stat = state === true;
      const updatedData = {
        jobID: ID,
        jobName: values.jobName,
        jobShortName: values.jobShortName,
        category: values.category,
        position: values.position,
        ratePerDay: values.ratePerDay,
        rateGroup: values.rateGroup,
        Remark: values.Remark,
        status: stat,
      };
      axios
        .patch(`http://localhost:5500/job-master/update/${ID}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
          onClick();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchJobData();
  }, [ID]);
  console.log(ID);
  const fetchJobData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/job-master/get/${ID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  // console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        jobID: ID,
        jobName: details.jobName,
        jobShortName: details.jobShortName,
        category: details.category,
        position: details.position,
        ratePerDay: details.ratePerDay,
        rateGroup: details.rateGroup,
        Remark: details.Remark,
        status: details.status,
      });
    }
  }, [details]);
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
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
                <p className="text-[13px] font-semibold">Job Type ID</p>
                <input
                  id="jobID"
                  type="number"
                  placeholder="Enter Job Type ID"
                  value={details.jobID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Job Type Name</p>
                <input
                  id="jobName"
                  type="text"
                  placeholder="Enter Job Type Name"
                  value={formik.values.jobName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">ShortName</p>
                <input
                  id="jobShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.jobShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Rate Per Day</p>
                <input
                  id="ratePerDay"
                  type="number"
                  placeholder="Enter Rate/Day"
                  value={formik.values.ratePerDay}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Rate Group</p>
                <input
                  id="rateGroup"
                  type="text"
                  placeholder="Enter Rate Group"
                  value={formik.values.rateGroup}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                      disabled={!edit}
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
                      disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Status</p>
                <div className="flex items-center">
                  <input
                    id="status"
                    type="checkbox"
                    checked={formik.values.status}
                    value={formik.values.status}
                    className={` relative w-4 h-4 mr-2 peer shrink-0 appearance-none checked:bg-blue-800 border-2 border-blue-900 rounded-sm`}
                    onChange={() => setState(!state)}
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

export default ViewJob;
