import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { costCenters } from "./CostCenterMaster";

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
          <div className="bg-blue-900 text-white text-center font-semibold text-lg py-4 px-8 rounded-lg">
            Cost Center Master
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold">Cost Center ID</p>
                <input
                  id="costCenterID"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details.costCenterID}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg  border-blue-900 `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Cost Center Name</p>
                <input
                  id="costCenterName"
                  type="text"
                  placeholder="Enter Name"
                  value={details.costCenterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg  border-blue-900`}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold">Remarks</p>
                <textarea
                  id="Remark"
                  placeholder="Enter Remark"
                  value={details.Remarks}
                  className={`w-full px-4 py-2 h-32 font-normal focus:outline-gray-300 resize-none rounded-lg break-words border-blue-900`}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold">Year Active</p>
                <label className="capitalize font-semibold">
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
