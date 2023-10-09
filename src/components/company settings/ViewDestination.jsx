import React, { useEffect, useState } from "react";
import { destData } from "./DestinationMaster";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const ViewDestination = ({ visible, onClick, edit, ID }) => {
  const [StatusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      destName: "",
      contractorName: "",
      distance: "",
      employeeFare: "",
      remark: "",
      status: ""
    },
    onSubmit: (values) => {
      console.log(values);
      updateDest(values);
    },
  });

  const updateDest = async (values) => {
    try {
      const response = axios.patch(`http://localhost:5500/destinationmaster/update-dest/${ID}`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Patch successful");
    } catch (error) {
      console.log("Error in patch ", error);
    }
  }

  useEffect(() => {
    fetchDestData();
  }, [ID]);

  const fetchDestData = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/destinationmaster/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setDetails(data.DestByID);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  }

  console.log('Details array', details);

  useEffect(() => {
    if (details) {
      formik.setValues(details);
    }
  }, [details]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Destination Master
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
                <p className="text-[13px] font-semibold">Destination ID</p>
                <input
                  id="id"
                  type="number"
                  placeholder="Enter Destination ID"
                  value={details?.id}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Destination Name</p>
                <input
                  id="destName"
                  type="text"
                  placeholder="Enter Destination Name"
                  value={formik.values.destName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Contractor Name</p>
                <select
                  id="contractorName"
                  value={formik.values.contractorName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Contractor Name</option>
                  <option value="Company Employee">Company Employee</option>
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Distance(Km)</p>
                <input
                  id="distance"
                  type="number"
                  placeholder="Enter Distance"
                  value={formik.values.distance}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Fare</p>
                <input
                  id="employeeFare"
                  type="number"
                  placeholder="Enter Employee Fare"
                  value={formik.values.employeeFare}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                    className={`relative w-4 h-4 mr-2 peer shrink-0 checked:appearance-none checked:bg-blue-900 border-2 border-blue-900 rounded-sm`}
                    onChange={() => setStatusCheck(!StatusCheck)}
                    disabled={!edit}
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

export default ViewDestination;
