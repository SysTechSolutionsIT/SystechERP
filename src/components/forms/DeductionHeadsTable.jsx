import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";
import { useEmployeeType } from "./personal";

const DeductionHeadsTable = ({ ID }) => {
  console.log("ID in deduciton", ID);
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [ caderwiseDeductions, setCaderwiseDeductions ] = useState([])
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [details, setDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [checked, setChecked] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
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
        const data = response.data;
        console.log(data);
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };
    fetchHeadsData();
  }, [token]);

  useEffect(() => {
    const fetchEmpSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/salary/FnShowParticularData`,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDetails(data);
        console.log(data)
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpSalary();
  }, [ID, token]);

  useEffect(() => {
    const fetchCaderwiseDeduction = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/caderwise-deduction/FnShowParticularData',
        {
          params: { EmployeeTypeId: employeeTypeId },
          headers: { Authorization: `Bearer ${token}`}
        })
        const data = response.data
        console.log('Caderwise Deductions', data)
        setCaderwiseDeductions(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchCaderwiseDeduction()
  }, [token])

  useEffect(() => {
    const updatedHeads = heads.map(head => ({
      ...head,
      Selected: caderwiseDeductions.some(deduction => deduction.DeductionHeadID === head.DeductionHeadID)
    }));

    setHeads(updatedHeads);
  }, [caderwiseDeductions]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setEmployeeTypes(data);
        console.log("Employee Type Data", data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  const calculateValue = (formula, salary, calculationValue) => {
    try {
      const totalDeduction = salary;
      if (formula === null) {
        return calculationValue || 0;
      } else {
        const modifiedFormula = formula
          .replace("P1", salary)
          .replace("P2", totalDeduction * (50 / 100))
          .replace("P3", totalDeduction);
        const result = eval(modifiedFormula);
        return result;
      }
    } catch (error) {
      console.error("Error in formula calculation: ", error);
      return "Error";
    }
  };
  const handleCalculationValueChange = (index, newValue) => {
    const updatedHeads = [...heads];
    updatedHeads[index].CalculationValue = newValue;
    setHeads(updatedHeads);
  };

  const handleFormulaChange = (index, newValue) => {
    const updatedHeads = [...heads];
    updatedHeads[index].Formula = newValue;
    setHeads(updatedHeads);
  };

  const handleCheckboxChange = (index) => {
    const updatedHeads = [...heads];
    updatedHeads[index].Selected = !updatedHeads[index].Selected;
    setHeads(updatedHeads);
  };

  useEffect(() => {
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
          EmployeeType: employeeTypes?.ShortName,
          DeductionHeadId: DeductionHeadID,
          DeductionHead,
          DCalculationType: CalculationType,
          DCalculationValue: CalculationValue,
          Formula,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypes?.EmployeeTypeId,
          EmployeeTypeGroup: employeeTypes?.EmployeeTypeGroup,
          IUFlag: "U",
        })
      );
    setSelectedHeads(selectedHeadsData);
    console.log('Selected Heads', selectedHeads);
  }, [heads, employeeTypes, ID]);

  const addEmployeewiseDeduction = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-deductions/FnAddUpdateDeleteRecord",
        selectedHeads,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Employee-wise Deduction Heads Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="gap-4 justify-between">
      <div className="my-1 rounded-2xl bg-white p-2 pr-8">
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
              <tr
                key={index}
                className={`${item.Selected ? "" : "bg-gray-100"} `}
              >
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
                  <input
                    type="number"
                    className="w-16 py-1 rounded-md text-center"
                    value={calculateValue(
                      item.Formula,
                      details.GrossSalary,
                      item.CalculationValue
                    )}
                    onChange={(e) =>
                      handleCalculationValueChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                  <input
                    type="text"
                    className=" w-20 py-1 rounded-md text-center"
                    value={item.Formula}
                    onChange={(e) => handleFormulaChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-2 justify-center gap-4">
          <button
            type="submit"
            className="px-2 py-2 bg-blue-900 text-white text-xs rounded-md"
            onClick={addEmployeewiseDeduction}
          >
            Save Deduction Heads Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeductionHeadsTable;
