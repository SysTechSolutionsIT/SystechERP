import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { EmployeeTypeData } from "./EmployeeTypeMaster";
import TwoFieldsModal from "../company settings/TwoFieldsModal";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const EmployeeTypeModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MMId, setMMId] = useState();
  const [ShortNameEnabled, setShortNameEnabled] = useState()

  const formik = useFormik({
    initialValues: {
      EmployeeType: "",
      EmployeeTypeGroup: "",
      Enabled:"",
      ShortName: "",
      Remark: "",
      IUFlag: "I",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      addEmpType();
      resetForm()
      onClick()
    },
  });

  const addEmpType = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee-type/FnAddUpdateDeleteRecord",
        formik.values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Employee Type Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const [employeeTypeGroup, setEmployeeTypeGroup] = useState([]);
  useEffect(() => {
    const fetchEmpTypeData = async () => {
      const CID = 1;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("empTypeData", data);
        setEmployeeTypeGroup(data);
      } catch (error) {
        console.error("Error fetching emptype:", error);
      }
    };
    fetchEmpTypeData();
  }, [token, isModalOpen]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Employee Type Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Employee Type</p>
                <input
                  id="EmployeeType"
                  type="text"
                  placeholder="Enter Employee Type"
                  value={formik.values.EmployeeType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col">
                <p className="capatilize font-semibold text-[13px] mb-1">
                  Employee Type Group
                </p>
                <div className="flex items-center">
                  <select
                    id="EmployeeTypeGroup"
                    name="EmployeeTypeGroup"
                    value={formik.values.EmployeeTypeGroup}
                    className="w-full px-4 py-2 font-normal text-[11px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Employee Type Group</option>
                    {Array.isArray(employeeTypeGroup) &&
                      employeeTypeGroup.map((entry) => (
                        <option key={entry.FieldId} value={entry.FieldId}>
                          {entry.FieldDetails}
                        </option>
                      ))}
                  </select>
                  <Icon
                    icon="flat-color-icons:plus"
                    width="24"
                    height="24"
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setMMId(1);
                    }}
                  />
                </div>
                <TwoFieldsModal
                  visible={isModalOpen}
                  onClick={() => setModalOpen(false)}
                  MasterID={MMId}
                />
              </div>
              <div className="flex flex-col">
                <p className="capatilize font-semibold text-[13px] mb-1">
                  Is Prefix Enabled
                </p>
                  <div className="flex">
                    <label className="flex items-center text-[13px]">
                      <input
                        type="radio"
                        name="PrefixEnabled"
                        value="Yes"
                        className="mr-2"
                        checked={formik.values.PrefixEnabled === "Yes"}
                        onChange={(e) => {
                          formik.handleChange(e); // Handle formik change
                          setShortNameEnabled(true); // Update shortNameEnabled state
                        }}
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-[13px]">
                      <input
                        type="radio"
                        name="PrefixEnabled"
                        value="No"
                        className="mr-2 ml-2"
                        checked={formik.values.PrefixEnabled === "No"}
                        onChange={(e) => {
                          formik.handleChange(e); // Handle formik change
                          setShortNameEnabled(false); // Update shortNameEnabled state
                        }}
                      />
                      No
                    </label>
                  </div>
                </div>
              <div>
                <p className="text-[13px] font-semibold">Prefix</p>
                <input
                  id="ShortName"
                  type="text"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal  focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!ShortNameEnabled}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
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

export default EmployeeTypeModal;
