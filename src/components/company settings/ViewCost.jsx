import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { costCenters } from "./CostCenterMaster";
import { Icon } from "@iconify/react";

const VECost = ({ visible, onClick, edit, ID }) => {
  const [StatusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      costCenterID: "",
      costCenterName: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      costCenters.push(values);
    },
  });
  useEffect(() => {
    const selected = costCenters.find((data) => data.costCenterID === ID);
    if (selected) {
      setDetails(selected);
    }
  }, [ID]);
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
                  id="costCenterID"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details.costCenterID}
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
                  id="costCenterName"
                  type="text"
                  placeholder="Enter Name"
                  value={details.costCenterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remarks</p>
                <textarea
                  id="Remark"
                  placeholder="Enter Remark"
                  value={details.Remarks}
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
                    checked={details.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={() => setStatusCheck(!StatusCheck)}
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
