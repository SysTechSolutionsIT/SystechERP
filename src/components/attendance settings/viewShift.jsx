import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { ShiftData } from "./shiftMaster";

const ViewShift = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      shiftId: "",
      employeeType: "",
      shiftName: "",
      startTime: "",
      endTime: "",
      OTstartTime: "",
      graceEarlyTime: "",
      graceLateTime: "",
      halfDayHour: "",
      fullDayHours: "",
      twoDayShift: "",
      autoRotateFlag: "",
      shiftGraceHoursMin: "",
      shiftGraceHoursMax: "",
      remark: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      ShiftData.push(values);
      alert("Added Successfully");
    },
  });

  useEffect(() => {
    const selectedDest = ShiftData.find((entry) => entry.jobTypeId === ID);
    if (selectedDest) {
      setDetails(selectedDest);
    }
  }, [ID]);

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">Shift Master</p>
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
                <p className="text-[13px] font-semibold">Shift ID</p>
                <input
                  id="shiftId"
                  type="number"
                  placeholder="Enter Shift ID"
                  value={details.shiftId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Shift Name</p>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter Shift Name"
                  value={details.shiftName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Type</p>
                <select
                  id="employeeType"
                  value={details.employeeType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="contract staff">Contract Staff</option>
                  <option value="trainee worker">Trainee Worker</option>
                  <option value="trainer staff">Trainer Staff</option>
                  <option value="worker">Worker</option>
                  <option value="company staff">Company Staff</option>
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Start Time</p>
                <input
                  id="startTime"
                  type="text"
                  placeholder="Enter Start Time"
                  value={details.startTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">End Time</p>
                <input
                  id="endTime"
                  type="text"
                  placeholder="Enter End Time"
                  value={details.endTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">OT Start Time</p>
                <input
                  id="OTstartTime"
                  type="text"
                  placeholder="Enter OT Start Time"
                  value={details.OTstartTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Early Time</p>
                <input
                  id="graceEarlyTime"
                  type="text"
                  placeholder="Enter Grace Early Time"
                  value={details.graceEarlyTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Late Time</p>
                <input
                  id="graceLateTime"
                  type="text"
                  placeholder="Enter Grace Late Time"
                  value={details.graceLateTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Half Day Hours</p>
                <input
                  id="halfDayHour"
                  type="text"
                  placeholder="Enter Half Day Hours"
                  value={details.halfDayHour}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Full Day Hours</p>
                <input
                  id="halfDayHours"
                  type="text"
                  placeholder="Enter Full Day Hours"
                  value={details.fullDayHours}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>

              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Two Day Shift
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="twoDayShift"
                      value="yes"
                      checked={details.twoDayShift === "yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="twoDayShift"
                      value="no"
                      checked={details.twoDayShift === "no"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Auto Rotate Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="autoRotateFlag"
                      value="yes"
                      checked={details.autoRotateFlag === "yes"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="autoRotateFlag"
                      value="no"
                      checked={details.autoRotateFlag === "no"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Shift Grace Hours Min
                </p>
                <input
                  id="shiftGraceHoursMin"
                  type="text"
                  placeholder="Enter Shift Grace Hours Min"
                  value={details.shiftGraceHoursMin}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Shift Grace Hours Max
                </p>
                <input
                  id="hiftGraceHoursMax"
                  type="text"
                  placeholder="Enter Shift Grace Hours Max"
                  value={details.hiftGraceHoursMax}
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
                  value={details.remark}
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
                    checked={details.status}
                    value={details.status}
                    className={` relative w-4 h-4 mr-2 peer shrink-0 appearance-none checked:bg-blue-800 border-2 border-blue-900 rounded-sm`}
                    onChange={handleStatusChange}
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

export default ViewShift;
