import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
import { useEffect } from "react";


const EmployeeTypeDeductionModal = ({ visible, onClick }) => {
    const { token } = useAuth()
    const [selectedHeads, setSelectedHeads] = useState([]);
    const [ heads, setHeads ] = useState([])
      const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
      const [employeeTypes, setEmployeeTypes] = useState([])
      const formik = useFormik({
          initialValues:{
          CaderwiseDeductionDate: "",
          EmployeeTypeId: "",
          EmployeeType: "",
          EmployeeTypeGroup: "",
          Remark: "",
          },
          onSubmit: (values) =>{
              console.log(selectedHeads)
              addCaderwiseDeduction(selectedHeads)
          }
      })
  
      useEffect(() =>{
        const selectedHeadsData = heads
        .filter((item) => item.Selected)
        .map(
          ({
            DeductionHeadID,
            DeductionHead,
            CalculationType,
            CalculationValue,
            Formula,
          }) => ({
            CaderwiseDeductionDate: formik.values.CaderwiseDeductionDate,
            EmployeeTypeId: formik.values.EmployeeTypeId,
            EmployeeType: formik.values.EmployeeType,
            EmployeeTypeGroup: formik.values.EmployeeTypeGroup,
            Remark: formik.values.Remark,
            DeductionHeadID,
            DeductionHead,
            DCalculationType: CalculationType,
            DCalculationValue: CalculationValue,
            Formula,
            IUFlag:"I"
          }) 
        )
        setSelectedHeads(selectedHeadsData);
      },[heads, employeeTypes])
  
      const addCaderwiseDeduction = async (data) =>{
          try {
              const response = await axios.post('http://localhost:5500/caderwise-deduction/FnAddUpdateDeleteRecord',
              data,
              { headers: { Authorization: `Bearer ${token}`}}
              )
              alert('Employee Type Deduction Added')
          } catch (error) {
              console.error('Error', error);
          }
      }
  
      useEffect(() =>{
        const fetchEmployeeTypes = async() =>{
          try{
            const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
            { headers: { Authorization: `Bearer ${token}`}
          })
          const data = response.data
          setEmployeeTypes(data)
          console.log(response)
          } catch (error){
            console.error('Error', error);
          }
        }
        fetchEmployeeTypes()
      },[token])
    
  
      useEffect(() =>{
        const fetchHeadsData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5500/deduction-heads/FnShowActiveData",
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
            <option key={option.DeductionHeadId} value={option.DeductionHeadId}>
              {option.DeductionHead}
            </option>
          ));
        
          return <>{optionsHTML}</>;
        }  
  
        const handleCheckboxChange = (index) => {
          const updatedHeads = [...heads];
          updatedHeads[index].Selected = !updatedHeads[index].Selected;
          setHeads(updatedHeads);
        };
  
        useEffect(() => {
          const selectedEmployee = employeeTypes.find(
            (entry) => entry.EmployeeTypeId === selectedEmployeeType
          );
        
          formik.setFieldValue("EmployeeType", selectedEmployee? selectedEmployee.ShortName : "");
        }, [employeeTypes]);
  
        const handldCalculationValueChange = (index, newValue) => {
          const updatedHeads = [...heads];
          updatedHeads[index].CalculationValue = newValue;
          setHeads(updatedHeads);
        };
        
  
  if (!visible) return null
  return (
      <form onSubmit={formik.handleSubmit}>
        <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
          <div className="bg-gray-200 w-[60%] h-[80%] overflow-y-scroll max-h-fit p-8 rounded-lg">
            <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
              <p className="text-white text-[15px] font-semibold text-center">
                Employee Type Deduction Master
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
                    Caderwise Deduction Date
                  </p>
                  <input
                    id="CaderwiseDeductionDate"
                    type="date"
                    value={formik.values.CaderwiseDeductionDate}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="">
                <p className=" font-semibold text-[13px]">Employee Type</p>
                <select
                id="EmployeeType"
                name="EmployeeType"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={selectedEmployeeType}
                onChange={(e) => {
                  const selectedType = e.target.value;
                  setSelectedEmployeeType(selectedType);
                  const selectedEmployee = employeeTypes.find(
                    (entry) => entry.EmployeeTypeId === selectedType
                  );
                  formik.setValues({
                    ...formik.values,
                    EmployeeTypeId: selectedType,
                    EmployeeType: selectedEmployee ? selectedEmployee.ShortName : "",
                  });
                }}
              >
                <option value="">Select Type</option>
                {employeeTypes.map((entry) => (
                  <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                    {entry.EmployeeType}
                  </option>
                ))}
              </select>
              </div>
              <div className="py-0">
                <p className="font-semibold text-[13px]">
                  Employee Type Group
                </p>
                <select
                  id="EmployeeTypeGroup"
                  name="EmployeeTypeGroup"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.EmployeeTypeGroup}
                  onChange={formik.handleChange}
                >
                  <option value={formik.values.EmployeeTypeGroup}>
                    {formik.values.EmployeeTypeGroup}
                  </option>
                  <option value="">Select Group Type</option>
                  <option value="Worker">Worker</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="py-0">
                <p className="mb-0 capitalize font-semibold text-[13px]">
                  Remark
                </p>
                <input
                  id="Remark"
                  type="text"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                />
              </div>
          <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th
                  colSpan="6"
                  className="bg-blue-900 text-white font-semibold border-white border-2"
                >
                  Deduction Heads
                </th>
              </tr>
              <tr>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Select
                </th>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                  Deduction <br /> Head
                </th>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Short <br /> Name
                </th>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Calculation <br /> Type
                </th>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Calculation <br /> Value
                </th>
                <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Formula
                </th>
              </tr>
            </thead>
            <tbody>
    {heads.map((item, index) => (
      <tr key={index} className={`${item.Selected ? "" : "bg-gray-100"} `}>
        <td>
          <label className="capitalize font-semibold text-[11px]">
            <input
              type="checkbox"
              className="w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg"
              checked={item.Selected}
              onChange={() => handleCheckboxChange(index)}
            />
          </label>
        </td>
        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
          {item.DeductionHead}
        </td>
        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
          {item.ShortName}
        </td>
        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
          {item.CalculationType}
        </td>
        <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
          {item.CalculationType === "Amount" ? (
            // Display CalculationValue when CalculationType is "amount"
            <input
              type="number"
              className="w-16 py-1 rounded-md text-center"
              value={item.CalculationValue}
              onChange={(e) =>
                handldCalculationValueChange(index, e.target.value)
              }
            />
          ) : (
            <input
              type="number"
              className="w-16 py-1 rounded-md text-center"
              onChange={(e) =>
                handldCalculationValueChange(index, e.target.value)
              }
            />
          )}
        </td>
        <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
          <input
            type="text"
            className=" w-20 py-1 rounded-md text-center"
            value={item.Formula}
            // onChange={(e) => handleFormulaChange(index, e.target.value)}
          />
        </td>
      </tr>
    ))}
  </tbody>
          </table>
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
}

export default EmployeeTypeDeductionModal