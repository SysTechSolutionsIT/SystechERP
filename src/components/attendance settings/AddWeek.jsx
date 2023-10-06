import { useFormik } from "formik";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { weeklyOffNameData } from "./weeklyOffNameMaster";
import axios from "axios";
import { useAuth } from "../Login";

const AddWeek = ({ visible, onClick }) => {
  const [state, setState] = useState(false);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      weeklyOffName: "",
      remarks: "",
      status: state,
    },
    onSubmit: async (values) => {
      const status = state === true;

      const formData = {
        weeklyOffName: values.weeklyOffName,
        remarks: values.remarks,
        status: state,
      };
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/weekly-off-master/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          const data = response.data;
          console.log(data);
          alert("Record added successfully");
          onClick();
          window.location.refresh();
          // Handle successful response
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
          // Handle error response
        }
      } catch (error) {
        console.error("Error:", error.message);
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
              Weekly Off Master
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
                  Weekly Off Name
                </p>
                <input
                  id="weeklyOffName"
                  type="text"
                  placeholder="Enter Weekly Off Name"
                  value={formik.values.weeklyOffName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remarks"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className=" mt-1 capitalize font-semibold text-[13px]">
                  Status
                </p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={state}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={() => setState(!state)}
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

export default AddWeek;
