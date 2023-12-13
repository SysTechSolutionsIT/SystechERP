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
      JobTypeId: "",
      JobTypeName: "",
      ShortName: "",
      RateGroup: "",
      RatePerDay: "",
      Category: "",
      Position: "",
      Remark: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const stat = state === true;
      const updatedData = {
      JobTypeId: ID,
      JobTypeName: values.JobTypeName,
      ShortName: values.ShortName,
      RateGroup: values.RateGroup,
      RatePerDay: values.RatePerDay,
      Category: values.Category,
      Position: values.Position,
      Remark: values.Remark,
      };
      axios
        .post(`http://localhost:5500/job-type/FnAddUpdateDeleteRecord`, updatedData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Handle success
          alert("Job Type Updated Successfully") ;
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
        `http://localhost:5500/job-type/FnShowParticularData`,
        {
          params: { JobTypeId: ID },
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
      JobTypeId: ID,
      JobTypeName: details.JobTypeName,
      ShortName: details.ShortName,
      RateGroup: details.RateGroup,
      RatePerDay: details.RatePerDay,
      Category: details.Category,
      Position: details.Position,
      Remark: details.Remark,
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
                  id="JobTypeId"
                  type="number"
                  placeholder="Enter Job Type ID"
                  value={details.JobTypeId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Job Type Name</p>
                <input
                  id="JobTypeName"
                  type="text"
                  placeholder="Enter Job Type Name"
                  value={formik.values.JobTypeName}
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
                <p className="text-[13px] font-semibold">Rate Per Day</p>
                <input
                  id="RatePerDay"
                  type="number"
                  placeholder="Enter Rate/Day"
                  value={formik.values.RatePerDay}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Rate Group</p>
                <input
                  id="RateGroup"
                  type="text"
                  placeholder="Enter Rate Group"
                  value={formik.values.RateGroup}
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
                      id="Category"
                      value="Standard"
                      checked={formik.values.Category === "Standard"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
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
                      disabled={!edit}
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
