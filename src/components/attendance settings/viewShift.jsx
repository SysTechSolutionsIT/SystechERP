import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { ShiftData } from "./shiftMaster";
import axios from "axios";
import { useAuth } from "../Login";

const ViewShift = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
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
      axios
        .patch(`http://localhost:5500/shift-master/update/${ID}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
          onClick();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchShiftData();
  }, [ID]);
  console.log(ID);
  const fetchShiftData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/shift-master/${ID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
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
  // console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        sID: details.sID,
        eType: details.eType,
        sName: details.sName,
        startT: details.startT,
        endT: details.endT,
        OTstartT: details.OTstartT,
        OTendT: details.OTendT,
        GRstartT: details.GRstartT,
        GRendT: details.GRendT,
        halfDayHour: details.halfDayHour,
        fullDayHours: details.fullDayHours,
        twoDayShift: details.twoDayShift,
        autoRotateFlag: details.autoRotateFlag,
        graceMin: details.graceMin,
        graceMax: details.graceMax,
        remarks: details.remarks,
        status: details.status,
      });
    }
  }, [details]);

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
                  id="sID"
                  type="number"
                  placeholder="Enter Shift ID"
                  value={details.sID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Shift Name</p>
                <input
                  id="sName"
                  type="text"
                  placeholder="Enter Shift Name"
                  value={formik.values.sName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Type</p>
                <select
                  id="eType"
                  value={formik.values.eType}
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
                  id="startT"
                  type="text"
                  placeholder="Enter Start Time"
                  value={formik.values.startT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">End Time</p>
                <input
                  id="endT"
                  type="text"
                  placeholder="Enter End Time"
                  value={formik.values.endT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">OT Start Time</p>
                <input
                  id="OTstartT"
                  type="text"
                  placeholder="Enter OT Start Time"
                  value={formik.values.OTstartT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Early Time</p>
                <input
                  id="GRstartT"
                  type="text"
                  placeholder="Enter Grace Early Time"
                  value={formik.values.GRstartT}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Grace Late Time</p>
                <input
                  id="GRendT"
                  type="text"
                  placeholder="Enter Grace Late Time"
                  value={formik.values.GRendT}
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
                  value={formik.values.halfDayHour}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                      value="true"
                      checked={formik.values.twoDayShift === true}
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
                      value="false"
                      checked={formik.values.twoDayShift === false}
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
                      value="true"
                      checked={formik.values.autoRotateFlag === true}
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
                      value="false"
                      checked={formik.values.autoRotateFlag === false}
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
                  id="graceMin"
                  type="text"
                  placeholder="Enter Shift Grace Hours Min"
                  value={formik.values.graceMin}
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
                  id="graceMax"
                  type="text"
                  placeholder="Enter Shift Grace Hours Max"
                  value={formik.values.graceMax}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remarks"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.remarks}
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
                    onChange={() => setState(!state)}
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
