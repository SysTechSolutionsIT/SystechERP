import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const GatePassModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [Details, setDetails] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "P",
      GatepassDate: "",
      FYear: "",
      EmployeeId: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      InTime: "",
      OutTime: "",
      GatepassType: "",
      Purpose: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      CreatedOn: new Date(),
    },
    onSubmit: (values) => {
      const updatedData = {
        ApprovalFlag: "P",
        FYear: formik.values.FYear,
        GatepassDate: formik.values.GatepassDate,
        EmployeeId: formik.values.EmployeeId,
        EmployeeTypeId: formik.values.EmployeeId,
        EmployeeTypeGroup: formik.values.EmployeeTypeGroup,
        InTime: formik.values.InTime,
        OutTime: formik.values.OutTime,
        GatepassType: formik.values.GatepassType,
        Purpose: formik.values.Purpose,
        AcFlag: "Y",
        IUFlag: "I",
        Remark: formik.values.Remark,
        CreatedOn: new Date(),
      };
      console.log("Data:", updatedData);
      addGatePassEntry(updatedData);
    },
  });

  // Posting data
  const addGatePassEntry = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/gate-pass/FnAddUpdateDeleteRecord",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      alert("Data Added Successfully");
      onClick();
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };
  //Fetching employee names and IDs
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
      setDetails(data);
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

  // Setting employee Type
  useEffect(() => {
    const fetchEmployeeTypeGroup = async () => {
      try {
        if (formik.values.EmployeeType) {
          const response = await axios.get(
            "http://localhost:5500/employee-type/FnShowParticularData",
            {
              params: { EmployeeTypeId: formik.values.EmployeeType }, // Pass EmployeeTypeId as a parameter
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          console.log("Employee type group data:", data);
          if (data && data.length > 0) {
            console.log("employee type group:", data.EmployeeTypeGroup);
            formik.setFieldValue("EmployeeTypeGroup", data.EmployeeTypeGroup);
          }
        } else {
          formik.setFieldValue("EmployeeTypeGroup", ""); // Reset the value when no Employee Type is selected
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchEmployeeTypeGroup();
  }, [formik.values.EmployeeType, token]);

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
                  type="date"
                  placeholder="Enter Gate Pass Date"
                  value={formik.values.GatepassDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <select
                  id="EmployeeId"
                  name="EmployeeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeId}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {Details.length > 0 &&
                    Details.map((employee) => (
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
                  onChange={formik.handleChange}
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
                  type="datetime-local" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.InTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Out Time</p>
                <input
                  id="OutTime"
                  type="datetime-local" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.OutTime}
                  onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
                    />
                    Personal
                  </label>
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="GatepassType"
                      value="Official"
                      className="mr-2 ml-2"
                      onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
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

export default GatePassModal;
