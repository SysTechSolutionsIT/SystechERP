import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const VEFModal = ({ visible, onClick, edit, ID }) => {
  const [YearCloseCheck, setYearCloseCheck] = useState(false);
  const [StatusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      FinID: "",
      Name: "",
      StartDate: "",
      EndDate: "",
      ShortName: "",
      YearClose: YearCloseCheck,
      Remark: "",
      Status: StatusCheck,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    fetchFinData();
  }, [ID]);
  console.log(ID);
  const fetchFinData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/financials/${ID}`
      );
      console.log("Response Object", response);
      const data = response.data.record;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Financial Master
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
                  Financial Year ID
                </p>
                <input
                  id="FinID"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details?.finId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Name</p>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter Name"
                  value={details?.fName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Start Date
                </p>
                <input
                  id="StartDate"
                  type="date"
                  placeholder="Enter Start Date"
                  value={details?.sDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">End Date</p>
                <input
                  id="EndDate"
                  type="date"
                  placeholder="Enter End Date"
                  value={details?.eDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={details?.fShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Year Active
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="YearClose"
                    type="checkbox"
                    checked={YearCloseCheck}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={() => setYearCloseCheck(!YearCloseCheck)}
                    disabled={!edit}
                  />
                  Active
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <textarea
                  id="Remark"
                  placeholder="Enter Remark"
                  value={details?.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="Status"
                    type="checkbox"
                    checked={StatusCheck}
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

export default VEFModal;
