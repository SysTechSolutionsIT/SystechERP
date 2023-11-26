import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const AdvanceRequestModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      AdvanceDate: "",
      EmployeeName: "",
      AdvanceType: "",
      AdvanceStatus: "",
      ProjectId: "",
      Amount: "",
      Installment: "",
      AMonth: "",
      AYear: "",
      Purpose: "",
      AcFlag: "Y",
      IUFlag: "I",
      Remark: "",
    },
    onSubmit: (values) => {
      console.log(values);
      addReq(values);
    },
  });

  const addReq = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/advance-request/FnAddUpdateDeleteRecord",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.log("Error: ", error.message);
      // Handle network error
    }
  };

  const [isStatusChecked, setStatusChecked] = useState(false);
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Advance Request
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
                  Advance Date
                </p>
                <input
                  id="AdvanceDate"
                  type="date"
                  value={formik.values.AdvanceDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Employee Name
                </p>
                <input
                  id="EmployeeName"
                  type="text"
                  value={formik.values.EmployeeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Advance Type
                </p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="AdvanceType"
                    value="Official"
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Official</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="AdvanceType"
                    value="Personal"
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Personal</label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Advance Status
                </p>
                <select
                  id="AdvanceStatus"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.AdvanceStatus}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Advance Status</option>
                  <option value="P">Pending</option>
                  <option value="PR">Partial Repayment</option>
                  <option value="R">Repayment</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Project</p>
                <select
                  id="  ProjectId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.ProjectId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Project</option>
                  <option value="1">Project 1</option>
                  <option value="2">Project 2</option>
                  <option value="3">Project 3</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Amount</p>
                <input
                  id="Amount"
                  type="number"
                  value={formik.values.Amount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Installment
                </p>
                <input
                  id="Installment"
                  type="number"
                  value={formik.values.Installment}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Advance Starting Month
                </p>
                <select
                  id="AMonth"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.AMonth}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Advance Starting Month</option>
                  <option value="January">January</option>
                  <option value="Febuary">Febuary</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Advance Starting Year
                </p>
                <select
                  id="AYear"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.AYear}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Advance Starting Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Purpose</p>
                <input
                  id="Purpose"
                  type="text"
                  value={formik.values.Purpose}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div>
                <p className="capitalize font-semibold  text-[13px]">Status</p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={isStatusChecked}
                    value={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                  />
                  Active
                </label>
              </div> */}
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
export default AdvanceRequestModal;
