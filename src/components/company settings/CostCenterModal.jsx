import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";

const CostCenterModal = ({ visible, onClick }) => {
  const [status, setStatus] = useState(false);

  const formik = useFormik({
    initialValues: {
      cName: "",
      cRemarks: "",
      status: status,
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        // Make a POST request to your server
        const response = await axios.post(
          "http://localhost:5500/cost-center/add-record",
          values
        );

        // Handle the response from the server here if needed
        console.log("Server response:", response.data);

        // Close the modal or perform any other actions after a successful request
        onClick();
      } catch (error) {
        console.error("Error while sending POST request:", error);
        // Handle errors here if needed
      }
    },
  });

  const handleStatusChange = () => {
    const newStatus = !status; // Toggle the status
    setStatus(newStatus); // Update the local state
    formik.setFieldValue("status", newStatus); // Update the formik field value
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Cost Center Master
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
                <p className="capatilize font-semibold  text-[13px]">
                  Cost Center Name
                </p>
                <input
                  id="cName"
                  type="text"
                  placeholder="Cost Center Name"
                  value={formik.values.cName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="cRemarks"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.cRemarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold  text-[13px]">Status</p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={status}
                    value={formik.values.status}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={handleStatusChange}
                  />
                  Active
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
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
    </form>
  );
};

export default CostCenterModal;
