import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { EarningHeads } from "./EarningHeadsMaster";
import axios from "axios";
import { useAuth } from "../Login";

const ViewEarningHeads = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      EarningHeadId: "",
      EarningHead: "",
      HeadPosition: "",
      ShortName: "",
      CalculationType: "",
      CalculationValue: "",
      SalaryParameter1: "",
      SalaryParameter2: "",
      SalaryParameter3: "",
      SalaryParameter4: "",
      SalaryParameter5: "",
      SalaryParameter6: "",
      SalaryParameter7: "",
      SalaryParameter8: "",
      SalaryParameter9: "",
      SalaryParameter10: "",
      Formula: "",
      Remark: "",
    },
    onSubmit: (values) => {
      const updatedData = {
        EarningHeadId: values.EarningHeadId,
        EarningHead: values.EarningHead,
        HeadPosition: values.HeadPosition,
        ShortName: values.ShortName,
        CalculationType: values.CalculationType,
        CalculationValue: values.CalculationValue,
        SalaryParameter1: values.SalaryParameter1,
        SalaryParameter2: values.SalaryParameter2,
        SalaryParameter3: values.SalaryParameter3,
        SalaryParameter4: values.SalaryParameter4,
        SalaryParameter5: values.SalaryParameter5,
        SalaryParameter6: values.SalaryParameter6,
        SalaryParameter7: values.SalaryParameter7,
        SalaryParameter8: values.SalaryParameter8,
        SalaryParameter9: values.SalaryParameter9,
        SalaryParameter10: values.SalaryParameter10,
        Formula: values.Formula,
        Remark: values.Remark,
        IUFlag: "U", // Assuming this is a constant value
        CreatedBy: values.CreatedBy,
        CreatedOn: values.CreatedOn,
        ModifiedBy: values.ModifiedBy,
        ModifiedOn: values.ModifiedOn,
      };
      updateHead(updatedData);
    },
  });

  const updateHead = async (values) => {
    try {
      const response = axios.post(
        `http://localhost:5500/earning-heads/FnAddUpdateDeleteRecord`,
        values,
        {
          params: { EarningHeadId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Earning Head Updated')
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchHeadsData();
  }, [ID]);

  const fetchHeadsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/earning-heads/FnShowParticularData`,
        {
          params: { EarningHeadId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  console.log("Details array", details);

  const [ heads, setHeads ] = useState([])

  useEffect(() =>{
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/earning-heads/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };

    fetchHeadsData()
  },[token])

  function generateSelectWithOptions(optionsArray) {
    const optionsHTML = optionsArray.map((option) => (
      <option key={option.EarningHeadId} value={option.EarningHeadId}>
        {option.EarningHead}
      </option>
    ));
  
    return <>{optionsHTML}</>;
  }  

  useEffect(() => {
    if (details) {
      formik.setValues(details);
    }
  }, [details]);

  const [isStatusChecked, setStatusChecked] = useState(false);
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
  };

  useEffect(() => {
    const selectedEarningHead = EarningHeads.find(
      (entry) => entry.EarningHeadId === ID
    );
    if (selectedEarningHead) {
      setDetails(selectedEarningHead);
    }
  }, [ID]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] h-[80%] overflow-y-scroll p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Earning Heads Master
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
                  Earning Head ID
                </p>
                <input
                  id="EarningHeadId"
                  type="text"
                  value={details?.EarningHeadId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Earning Head Name
                </p>
                <input
                  id="EarningHead"
                  type="text"
                  value={formik.values.EarningHead}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Head Position
                </p>
                <input
                  id="HeadPosition"
                  type="text"
                  value={formik.values.HeadPosition}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Calculation Type
                </p>
                <select
                  id="CalculationType"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.CalculationType}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Calculation Type</option>
                  <option value="Amount">Amount</option>
                  <option value="Formula">Formula</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Calculation Value
                </p>
                <input
                  id="CalculationValue"
                  type="text"
                  value={formik.values.CalculationValue}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 1
                </p>
                <select
                  id="SalaryParameter1"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter1}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 1</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 2
                </p>
                <select
                  id="SalaryParameter2"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter2}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 2</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 3
                </p>
                <select
                  id="SalaryParameter3"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter3}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 3</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 4
                </p>
                <select
                  id="SalaryParameter4"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter4}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 4</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 5
                </p>
                <select
                  id="SalaryParameter5"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter5}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 5</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 6
                </p>
                <select
                  id="SalaryParameter6"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter6}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 6</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 7
                </p>
                <select
                  id="SalaryParameter7"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter7}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 7</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 8
                </p>
                <select
                  id="SalaryParameter8"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter8}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 8</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 9
                </p>
                <select
                  id="SalaryParameter9"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter9}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 9</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Salary Parameter 10
                </p>
                <select
                  id="SalaryParameter10"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.SalaryParameter10}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Salary Parameter 10</option>
                  {generateSelectWithOptions(heads)}
                </select>
              </div>
              <div className="col-span-2">
                <p className="capatilize font-semibold  text-[13px]">Formula</p>
                <input
                  id="Formula"
                  type="text"
                  value={formik.values.Formula}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
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

export default ViewEarningHeads;
