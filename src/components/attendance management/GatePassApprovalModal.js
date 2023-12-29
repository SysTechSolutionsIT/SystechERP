import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const GatePassApprovalModal = ({ visible, onClick, ID }) => {
  const [details, setDetails] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      GatepassId: ID,
      ApprovalFlag: "",
      GatepassDate: "",
      FYear: "",
      EmployeeId: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      InTime: "",
      OutTime: "",
      GatepassType: "",
      Purpose: "",
      RejectReason: "",
      SanctionBy: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
      updatedOn: new Date(),
    },
    onSubmit: (values) => {
      const updatedData = {
        GatepassId: ID,
        ApprovalFlag: values.RejectReason ? "R" : "A",
        GatepassDate: values.GatepassDate,
        FYear: values.FYear,
        EmployeeId: values.EmployeeId,
        EmployeeType: values.EmployeeType,
        EmployeeTypeGroup: values.EmployeeTypeGroup,
        InTime: values.InTime,
        OutTime: values.OutTime,
        GatepassType: values.GatepassType,
        Purpose: values.Purpose,
        Remark: values.Remark,
        AcFlag: "Y",
        IUFlag: "U",
        CreatedOn: new Date(),
      };
      console.log(updatedData);

      // Send a PUT request to update the data
      axios
        .post(
          `http://localhost:5500/gate-pass/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { GatepassId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          alert("Data updated successfully", response);
          onClick();
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchGatepassData();
  }, [ID]);
  console.log(ID);
  const fetchGatepassData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/gate-pass/FnShowParticularData",
        {
          params: { GatepassId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.error("Error while fetching company data: ", error.message);
    }
  };
  console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        GatepassId: details.GatepassId,
        ApprovalFlag: details.ApprovalFlag,
        GatepassDate: details.GatepassDate,
        FYear: details.FYear,
        EmployeeType: details.EmployeeType,
        EmployeeTypeGroup: details.EmployeeTypeGroup,
        EmployeeId: details.EmployeeId,
        InTime: details.InTime,
        OutTime: details.OutTime,
        SanctionBy: details.SanctionBy,
        Purpose: details.Purpose,
        RejectReason: details.RejectReason,
        Remark: details.Remark,
      });
    }
  }, [details]);

  // All API Calls
  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowActiveData`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setPersonal(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
  }, [token]);

  // getting Employee Types
  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[50%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Add Gate Pass Entry
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
          <div className="py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  GatePass Date
                </p>
                <input
                  id="GatepassDate"
                  type="text"
                  placeholder="Enter Gate Pass Date"
                  value={formik.values.GatepassDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Financial Year
                </p>
                <input
                  id="FYear"
                  type="number"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.FYear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <select
                  id="EmployeeId"
                  name="EmployeeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeId}
                  disabled={true}
                >
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {personal.length > 0 &&
                    personal.map((employee) => (
                      <option
                        key={employee.EmployeeId}
                        value={employee.EmployeeId}
                      >
                        {employee.EmployeeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="py-1">
                <p className="font-semibold text-[13px]">Employee Type</p>
                <select
                  id="EmployeeType"
                  name="EmployeeType"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeType}
                  disabled={true}
                >
                  <option value="">Select Type</option>
                  {employeeTypes.map((entry) => (
                    <option
                      key={entry.EmployeeTypeId}
                      value={entry.EmployeeTypeId}
                    >
                      {entry.EmployeeType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">In Time</p>
                <input
                  id="InTime"
                  type="text" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.InTime}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Out Time</p>
                <input
                  id="OutTime"
                  type="text" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.OutTime}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col p-2 space-x-2">
                <p className="mb-3 font-semibold text-[13px]">Gate Pass Type</p>
                <div className="flex">
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="GatepassType"
                      value="Personal"
                      className="mr-2"
                      checked={formik.values.GatepassType === "Personal"}
                      disabled={true}
                    />
                    Personal
                  </label>
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="GatepassType"
                      value="Official"
                      className="mr-2 ml-2"
                      checked={formik.values.GatepassType === "Official"}
                      disabled={true}
                    />
                    Official
                  </label>
                </div>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Purpose</p>
                <input
                  id="Purpose"
                  type="text"
                  placeholder="Enter Purpose"
                  value={formik.values.Purpose}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Reject Reason
                </p>
                <input
                  id="RejectReason"
                  type="text"
                  placeholder="Enter Purpose"
                  value={formik.values.RejectReason}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Sanction By
                </p>
                <input
                  id="SanctionBy"
                  type="text"
                  placeholder="Enter sanctioner"
                  value={formik.values.SanctionBy}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              <button
                type="submit"
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              >
                Approve
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

export default GatePassApprovalModal;
