import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const FinancialModal = ({ visible, onClick }) => {
  const [YearCloseCheck, setYearCloseCheck] = useState(false);
  const [StatusCheck, setStatusCheck] = useState(false);

  const formik = useFormik({
    initialValues: {
      fName: "",
      sDate: "",
      eDate: "",
      fShortName: "",
      yearClose: YearCloseCheck,
      remarks: "",
      status: StatusCheck,
    },
    onSubmit: async (values) => {
      const status = StatusCheck === true;
      const YearClosed = YearCloseCheck === true;
      console.log(values);
      try {
        const formData = {
          finId: values.finId,
          fName: values.fName,
          sDate: values.sDate,
          eDate: values.eDate,
          fShortName: values.fShortName,
          yearClose: YearClosed, // YearCloseCheck was already part of formik.values
          remarks: values.remarks,
          status: status, // StatusCheck was already part of formik.values
        };

        const response = await axios.post(
          "http://localhost:5500/financials/add-record",
          formData // Send the extracted form data
        );

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          alert("Financial record added successfully");
          // Handle successful response
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

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Finacial Master
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
                <p className="capatilize font-semibold text-[13px]">Name</p>
                <input
                  id="fName"
                  type="text"
                  placeholder="Enter Name"
                  value={formik.values.fName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Start Date
                </p>
                <input
                  id="sDate"
                  type="date"
                  placeholder="Enter Start Date"
                  value={formik.values.sDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">End Date</p>
                <input
                  id="eDate"
                  type="date"
                  placeholder="Enter End Date"
                  value={formik.values.eDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="fShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.fShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Year Close
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="yearClose"
                    type="checkbox"
                    checked={YearCloseCheck}
                    value={formik.values.yearClose}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg`}
                    onChange={(e) => setYearCloseCheck(!YearCloseCheck)}
                  />
                  Active
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <textarea
                  id="remarks"
                  placeholder="Enter Remark"
                  value={formik.values.remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={StatusCheck}
                    value={formik.values.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={() => setStatusCheck(!StatusCheck)}
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

export default FinancialModal;
