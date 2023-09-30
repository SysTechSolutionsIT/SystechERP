import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const VECost = ({ visible, onClick, edit, ID }) => {
  const [status, setStatus] = useState(false);
  const [details, setDetails] = useState([]);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      cID: "",
      cName: "",
      cRemarks: "",
      status: status,
    },
    onSubmit: async (values) => {
      console.log(values);
      const state = status === true;

      try {
        // Make a PATCH request to update the cost center
        const response = await axios.patch(
          `http://localhost:5500/cost-center/update-cost-center/${ID}}`,
          {
            // Pass the updated values to the server
            cName: values.cName,
            cRemarks: values.cRemarks,
            status: state, // Use the status value from the form
          },
          {
            header: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response from the server here if needed
        console.log("Server response:", response.data);

        // You may want to update your local data (costCenters) or perform other actions here
      } catch (error) {
        console.error("Error while sending PATCH request:", error);
        // Handle errors here if needed
      }
    },
  });

  //API
  useEffect(() => {
    fetchNewData();
  }, [ID]);

  const fetchNewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/cost-center/${ID}`,
        {
          header: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data.record;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  const handleStatusChange = () => {
    const newStatus = !status; // Toggle the status
    setStatus(newStatus); // Update the local state
    formik.setFieldValue("status", newStatus); // Update the formik field value
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
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
                  Cost Center ID
                </p>
                <input
                  id="cID"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details?.cID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Cost Center Name
                </p>
                <input
                  id="cName"
                  type="text"
                  placeholder="Enter Name"
                  value={details?.cName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remarks</p>
                <textarea
                  id="cRemarks"
                  placeholder="Enter Remark"
                  value={details?.cRemarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold  text-[13px]">
                  Year Active
                </p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="YearClose"
                    type="checkbox"
                    checked={details?.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={handleStatusChange}
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

export default VECost;
