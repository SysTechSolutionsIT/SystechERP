import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";
import { useEmployeeType } from "./personal";
import { useDebugValue } from "react";

const DeductionHeadsTable = ({ ID }) => {
  console.log("ID in deduciton", ID);
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [caderwiseDeductions, setCaderwiseDeductions] = useState([]);
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [details, setDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [checked, setChecked] = useState([]);
  const [basicSalaryAmount, setBasicSalaryAmount] = useState()
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Designation, setDesignation] = useState()
  const [SalaryParameters, setSalaryParameters] = useState([])

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
  }, [token, ID]);

  useEffect(() => {
    const fetchEmpSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/salary-structure/FnShowParticularData`,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpSalary();
  }, [ID, token]);

  useEffect(() => {
    const fetchCaderwiseDeduction = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/caderwise-deduction/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const caderwiseData = response.data;
        console.log("Caderwise data", caderwiseData);

        // Check if employee-wise entry exists
        const employeeWiseResponse = await axios.get(
          "http://localhost:5500/employee-wise-deductions/FnShowParticularData",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employeeWiseData = employeeWiseResponse.data;
        console.log("Employee wise data", employeeWiseData);

        if (employeeWiseData.length > 0) {
          console.log("Deduction heads have already been defined");
          setCaderwiseDeductions(employeeWiseData);
        } else {
          console.log("Mapping from Caderwise deductions");
          setCaderwiseDeductions(caderwiseData);
        }
        console.log("Deduction for the employee", caderwiseDeductions);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchCaderwiseDeduction();
  }, [token, ID, employeeTypeId]);

  useEffect(() => {
    const updatedHeads = heads.map((head) => ({
      ...head,
      Selected: caderwiseDeductions.some(
        (deduction) => deduction.DeductionHeadID === head.DeductionHeadID
      ) || head.Selected // Also check if the head was previously selected
    }));
  
    setHeads(updatedHeads);
  }, [caderwiseDeductions]);

  useEffect(() => {
    const updatedHeads = heads.map((head) => ({
      ...head,
      CalculationValue: calculateValue(
        head.Formula,
        details ? details.GrossSalary : 0,
        basicSalaryAmount,
        head.CalculationValue,
        head.DeductionHeadID,
        SalaryParameters,
        Designation
      )
    }));
    console.log('Updated heads:', updatedHeads); // Add this line
    setHeads(updatedHeads);
  }, [details, Designation, SalaryParameters]);  
  

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

  useEffect(() => {
    const fetchBasicSalary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/earning-heads/FnGetBasicSalary",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setBasicSalaryAmount(data)
        console.log("Basic Salary", data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBasicSalary();
  }, [token, ID]);


  useEffect(() => {
    const fetchDesignation = async() => {
      try {
        const response = await axios.get('http://localhost:5500/employee/salary-structure/FnGetEmployeeDesignation',
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}`}
        }
        )
        const data = response.data
        setDesignation(data)
        console.log('Designation', data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchDesignation()
  },[token, ID])

  useEffect(() =>{
    const fetchSalaryParameters = async() =>{
      try {
        const response = await axios.get('http://localhost:5500/deduction-heads/FnFetchSalaryParameters',
        {
          params: { EmployeeId: ID},
          headers: { Authorization: `Bearer ${token}`}
        })
        const data = response.data
        console.log('Salary Parameters', data)
        setSalaryParameters(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchSalaryParameters()
  }, [token, ID])

  const calculateValue = (formula, salary, basicSalary, calculationValue, deductionHeadID, allSalaryParameters, Designation) => {
    try {
        if (formula === null) {
            return calculationValue || 0; // Return the current calculation value or 0 if it's null
        } else {
            const modifiedFormula = replacePlaceholders(formula, salary, basicSalary, calculationValue, deductionHeadID, allSalaryParameters, Designation);
            const result = evaluateFormula(modifiedFormula);
            return result;
        }
    } catch (error) {
        console.error("Error in formula calculation: ", error);
        return 0; // Return 0 in case of error
    }
}

// Replace placeholders in the formula with actual values
const replacePlaceholders = (formula, salary, basicSalary, calculationValue, deductionHeadID, allSalaryParameters, Designation) => {
    let modifiedFormula = formula
        .replace("Designation", `'${Designation}'`)
        .replace(/SP\d+/g, match => {
            const paramIndex = parseInt(match.slice(2)); // Extract the parameter index
            const parameterValue = getSalaryParameter(paramIndex, allSalaryParameters); // Get the parameter value
            return parameterValue !== undefined ? parameterValue : match; // If parameter value exists, replace the placeholder; otherwise, keep it unchanged
        })
        .replace("P1", salary)
        .replace("P2", basicSalaryAmount)
        .replace("P3", calculationValue);

    return modifiedFormula;
}

// Evaluate the modified formula
const evaluateFormula = (modifiedFormula) => {
    const result = eval(modifiedFormula); // Evaluate the modified formula
    return result;
}

// Helper function to get the salary parameter value by index
const getSalaryParameter = (index, allSalaryParameters) => {
    const salaryParameters = allSalaryParameters.find(params => params.DeductionHeadID === index);
    if (salaryParameters) {
        return parseFloat(salaryParameters[`SalaryParameter${index}`]) || 0; // Get the parameter value or 0 if not found
    }
    return undefined; // Return undefined if salary parameters not found for the given DeductionHeadID
}




const handleCalculationValueChange = (index, newValue) => {
  const updatedHeads = [...heads];
  const calculatedValue = calculateValue(
    updatedHeads[index].Formula,
    details ? details.GrossSalary : 0,
    basicSalaryAmount,
    newValue, // Use the new value instead of details.CalculationValue
    updatedHeads[index].DeductionHeadID, // Use the DeductionHeadID from the updatedHeads array
    SalaryParameters,
    Designation
  );
  updatedHeads[index].CalculationValue = calculatedValue;
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
          DCalculationValue: CalculationType === 'Amount' ? 
            CalculationValue : calculateValue(
            Formula, 
            details ? details.GrossSalary : 0, 
            basicSalaryAmount,
            details.CalculationValue,
            details.DeductionHeadID,
            SalaryParameters,
            Designation),
          Formula,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypes?.EmployeeTypeId,
          EmployeeTypeGroup: employeeTypes?.EmployeeTypeGroup,
          IUFlag: "U",
        })
      );
    setSelectedHeads(selectedHeadsData);
    console.log("Selected Heads", selectedHeads);
  }, [heads, employeeTypes, ID]);

  const addEmployeewiseDeduction = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-deductions/FnAddUpdateDeleteRecord",
        selectedHeads,
        { params: { EmployeeId: ID},
          headers: { Authorization: `Bearer ${token}` } }
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
                      details ? details.GrossSalary : 0,
                      basicSalaryAmount,
                      details.CalculationValue,
                      details.DeductionHeadID,
                      SalaryParameters,
                      Designation
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
            type="button"
            className="px-2 py-2 bg-blue-900 text-white text-xs rounded-md"
            onClick={addEmployeewiseDeduction}
          >
            Submit Deduction Heads Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeductionHeadsTable;
