import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { ShiftData } from "./shiftMaster";
import axios from "axios";
import { useAuth } from "../Login";

const AddShift = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);

  const { token } = useAuth();
  // Boolean Values
  const [twoDay, setTwoDay] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [state, setState] = useState(false);

  const formik = useFormik({
    initialValues: {
      eType: "",
      sName: "",
      startT: "",
      endT: "",
      OTstartT: "",
      OTendT: "",
      GRstartT: "",
      GRendT: "",
      halfDayHour: "",
      fullDayHours: "",
      twoDayShift: twoDay,
      autoRotateFlag: autoRotate,
      graceMin: "",
      graceMax: "",
      remarks: "",
      status: state,
    },
    onSubmit: async (values) => {
      const status = state === true;
      const two = twoDay === true;
      const rotate = autoRotate === true;

      const formData = {
        eType: values.eType,
        sName: values.sName,
        startT: values.startT,
        endT: values.endT,
        OTstartT: values.OTstartT,
        OTendT: values.OTendT,
        GRstartT: values.GRstartT,
        GRendT: values.GRendT,
        halfDayHour: values.halfDayHour,
        fullDayHours: values.fullDayHours,
        twoDayShift: two,
        autoRotateFlag: rotate,
        graceMin: values.graceMin,
        graceMax: values.graceMax,
        remarks: values.remarks,
        status: status,
      };
      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/shift-master/add",
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
                <p className="text-[13px] font-semibold">Shift Name</p>
                <input
                  id="sName"
                  type="text"
                  placeholder="Enter Shift Name"
                  value={formik.values.sName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Type</p>
                <select
                  id="eType"
                  value={formik.values.eType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                  id="startT"
                  type="text"
                  placeholder="HH:MM"
                  value={formik.values.startT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">End Time</p>
                <input
                  id="endT"
                  type="text"
                  placeholder="HH:MM"
                  value={formik.values.endT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">OT Start Time</p>
                <input
                  id="OTstartT"
                  type="text"
                  placeholder="HH:MM"
                  value={formik.values.OTstartT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">OT End Time</p>
                <input
                  id="OTendT"
                  type="text"
                  placeholder="HH:MM"
                  value={formik.values.OTendT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Start Time</p>
                <input
                  id="GRstartT"
                  type="text"
                  placeholder="Enter Grace Early Time"
                  value={formik.values.GRstartT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace End Time</p>
                <input
                  id="GRendT"
                  type="text"
                  placeholder="Enter Grace Late Time"
                  value={formik.values.GRendT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Half Day Hours</p>
                <input
                  id="halfDayHour"
                  type="text"
                  placeholder="Enter Half Day Hours"
                  value={formik.values.halfDayHour}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Full Day Hours</p>
                <input
                  id="fullDayHours"
                  type="text"
                  placeholder="Enter Full Day Hours"
                  value={formik.values.fullDayHours}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                      name="twoDayShift"
                      value="true"
                      checked={twoDay === true}
                      onChange={() => setTwoDay(true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="twoDayShift"
                      name="twoDayShift"
                      value="false"
                      checked={twoDay === false}
                      onChange={() => setTwoDay(false)}
                      className="mr-2"
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
                      name="autoRotateFlag"
                      value="true"
                      checked={autoRotate === true}
                      onChange={() => setAutoRotate(true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="autoRotateFlag"
                      name="autoRotateFlag"
                      value="false"
                      checked={autoRotate === false}
                      onChange={() => setAutoRotate(false)}
                      className="mr-2"
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
                  id="graceMin"
                  type="text"
                  placeholder="Enter Shift Grace Hours Min"
                  value={formik.values.graceMin}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Shift Grace Hours Max
                </p>
                <input
                  id="graceMax"
                  type="text"
                  placeholder="Enter Shift Grace Hours Max"
                  value={formik.values.graceMax}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remarks"
                  type="text"
                  placeholder="Enter remarks"
                  value={formik.values.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={state}
                    className={`w-5 h-5 mr-2 mt-4 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={() => {
                      setState(!state);
                    }}
                  />
                  Active {/* Always display "Active" label */}
                </label>
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

export default AddShift;
