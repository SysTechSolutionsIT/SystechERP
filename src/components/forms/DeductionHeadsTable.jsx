import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";
import { useEmployeeType } from "./personal";

const DeductionHeadsTable = ({ ID }) => {
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [caderwiseDeductions, setCaderwiseDeductions] = useState([]);
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [details, setDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [basicSalaryAmount, setBasicSalaryAmount] = useState();
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Designation, setDesignation] = useState();
  const [SalaryParameters, setSalaryParameters] = useState([]);

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
        console.log("Heads Data:", data); // Added logging
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
        console.log("Employee Salary Details:", data); // Added logging
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
        console.log("Caderwise Data:", caderwiseData); // Added logging

        const employeeWiseResponse = await axios.get(
          "http://localhost:5500/employee-wise-deductions/FnShowParticularData",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employeeWiseData = employeeWiseResponse.data;
        console.log("Employee Wise Data:", employeeWiseData); // Added logging

        if (employeeWiseData.length > 0) {
          setCaderwiseDeductions(employeeWiseData);
        } else {
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
    const updatedHeads = heads.map((head) => {
      console.log("Mapping Head:", head); // Added logging
      const calculationValue = calculateValue(
        head.Formula,
        details ? details.GrossSalary : 0,
        basicSalaryAmount,
        head.CalculationValue,
        head.DeductionHeadId,
        SalaryParameters,
        Designation,
        head.FormulaType
      );

      return {
        ...head,
        CalculationValue: calculationValue,
      };
    });

    console.log("Updated Heads:", updatedHeads); // Added logging
    setHeads(updatedHeads);
  }, [details, Designation, SalaryParameters, token]);

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
        console.log("Employee Type Data:", data); // Added logging
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
        setBasicSalaryAmount(data);
        console.log("Basic Salary:", data); // Added logging
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBasicSalary();
  }, [token, ID]);

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/salary-structure/FnGetEmployeeDesignation",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDesignation(data);
        console.log("Designation:", data); // Added logging
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDesignation();
  }, [token, ID]);

  useEffect(() => {
    const fetchSalaryParameters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/deduction-heads/FnFetchSalaryParameters",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Salary Parameters:", data); // Added logging
        setSalaryParameters(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchSalaryParameters();
  }, [token, ID]);

  const calculateValue = (
    formula,
    salary,
    basicSalary,
    calculationValue,
    DeductionHeadId,
    allSalaryParameters,
    Designation,
    FormulaType
  ) => {
    console.log("DeductionHeadId in calculate value:", DeductionHeadId); // Added logging

    try {
      if (formula === null) {
        return calculationValue || 0;
      } else {
        const modifiedFormula = replacePlaceholders(
          formula,
          salary,
          basicSalary,
          calculationValue,
          DeductionHeadId,
          allSalaryParameters,
          Designation
        );
        const result = evaluateFormula(modifiedFormula, FormulaType);
        return result;
      }
    } catch (error) {
      console.error("Error in formula calculation: ", error);
      return 0;
    }
  };

  const replacePlaceholders = (
    formula,
    salary,
    basicSalary,
    calculationValue,
    DeductionHeadId,
    allSalaryParameters,
    Designation
  ) => {
    let modifiedFormula = formula
      .replace("DESG", `'${Designation}'`)
      .replace(/\bP1\b/g, salary)
      .replace(/\bP2\b/g, basicSalary)
      .replace(/\bP3\b/g, calculationValue);

    const deductionHeadData = allSalaryParameters.find(
      (param) => param.DeductionHeadId === DeductionHeadId
    );

    if (deductionHeadData) {
      for (let i = 1; i <= 10; i++) {
        const paramName = `SalaryParameter${i}`;
        const value = deductionHeadData[paramName] || "0";
        modifiedFormula = modifiedFormula.replace(
          new RegExp(`SP${i}`, "g"),
          value
        );
        // modifiedFormula = modifiedFormula.replace(/\bSP\b/g, value);
      }
    }

    console.log("Modified Formula:", modifiedFormula); // Added logging
    return modifiedFormula;
  };

  const evaluateFormula = (modifiedFormula, FormulaType) => {
    let result;
    let FlooredResult;
    if (FormulaType == "DC") {
      // Handle DC formula
      result = evaluateDesgFormula(modifiedFormula);
      console.log("Designation formula result:", result);
    } else if (FormulaType == "CF") {
      // Handle CF formula
      result = eval(modifiedFormula);
      console.log("Conditional formula result:", result);
    } else if (FormulaType == "PF") {
      // Handle PF formula
      console.log("Percentage formula");
      result = eval(modifiedFormula);
      console.log("Result in percentage formula:", result);
    } else {
      console.error("Unknown formula type");
    }
    FlooredResult = Math.floor(result);
    return FlooredResult;
    // return result;
  };
  //Evaluating Designation formula

  const evaluateExpression = (expression) => {
    let parsedExpression = expression.replace(/'/g, '"'); // Replace single quotes with double quotes for JS compatibility

    // Handle string equality comparisons
    parsedExpression = parsedExpression.replace(/==/g, "==="); // Ensure strict equality
    parsedExpression = parsedExpression.replace(/!=/g, "!=="); // Ensure strict inequality

    // Safeguard against injection attacks by only allowing valid characters
    // Adjust the regex to allow characters common in JavaScript expressions
    if (/[^-()\d/*+.?!=<>"':\sA-Za-z]/.test(parsedExpression)) {
      throw new Error("Invalid characters in expression");
    }

    try {
      return new Function("return " + parsedExpression)(); // Evaluate the expression using Function constructor
    } catch (error) {
      throw new Error("Error evaluating expression: " + error.message);
    }
  };

  // Revised evaluateDesgFormula function
  const evaluateDesgFormula = (formula) => {
    try {
      const evaluatePart = (part) => {
        // Split by the first occurrence of "?"
        const questionMarkIndex = part.indexOf("?");
        if (questionMarkIndex === -1) {
          // No ternary operator found, evaluate the expression directly
          return evaluateExpression(part);
        }

        // Split into condition, true case, and false case
        const condition = part.substring(0, questionMarkIndex).trim();
        const rest = part.substring(questionMarkIndex + 1).trim();

        // Find the corresponding ":"
        let colonIndex = rest.indexOf(":");
        let openQuestionMarks = 0;
        for (let i = 0; i < rest.length; i++) {
          if (rest[i] === "?") openQuestionMarks++;
          if (rest[i] === ":") {
            if (openQuestionMarks === 0) {
              colonIndex = i;
              break;
            } else {
              openQuestionMarks--;
            }
          }
        }

        if (colonIndex === -1) {
          throw new Error("Invalid ternary expression");
        }

        const trueCase = rest.substring(0, colonIndex).trim();
        const falseCase = rest.substring(colonIndex + 1).trim();

        if (evaluateExpression(condition)) {
          return evaluatePart(trueCase); // Recursively evaluate true case
        } else {
          return evaluatePart(falseCase); // Recursively evaluate false case
        }
      };

      return evaluatePart(formula);
    } catch (error) {
      console.error("Error evaluating formula:", error);
      return 0; // Return 0 on error
    }
  };

  const handleCalculationValueChange = (index, newValue) => {
    const updatedHeads = [...heads];
    const calculatedValue = calculateValue(
      updatedHeads[index].Formula,
      details ? details.GrossSalary : 0,
      basicSalaryAmount,
      newValue,
      updatedHeads[index].DeductionHeadId,
      SalaryParameters,
      Designation,
      updatedHeads[index].FormulaType
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
          DeductionHeadId,
          DeductionHead,
          CalculationType,
          CalculationValue,
          Formula,
          FormulaType,
        }) => ({
          EmployeeType: employeeTypes?.ShortName,
          DeductionHeadId: DeductionHeadId,
          DeductionHead,
          DCalculationType: CalculationType,
          DCalculationValue:
            CalculationType === "Amount"
              ? CalculationValue
              : calculateValue(
                  Formula,
                  details ? details.GrossSalary : 0,
                  basicSalaryAmount,
                  details.CalculationValue,
                  details.DeductionHeadId,
                  SalaryParameters,
                  Designation,
                  FormulaType
                ),
          Formula,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypes?.EmployeeTypeId,
          EmployeeTypeGroup: employeeTypes?.EmployeeTypeGroup,
          IUFlag: "U",
        })
      );
    setSelectedHeads(selectedHeadsData);
    console.log("Selected Heads", selectedHeadsData); // Added logging
  }, [heads, employeeTypes, ID]);

  const addEmployeewiseDeduction = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-deductions/FnAddUpdateDeleteRecord",
        selectedHeads,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
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
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white w-40">
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
                      item.CalculationValue, // Use item's CalculationValue
                      item.DeductionHeadId, // Use item's DeductionHeadId
                      SalaryParameters,
                      Designation,
                      item.FormulaType
                    )}
                    onChange={(e) =>
                      handleCalculationValueChange(index, e.target.value)
                    }
                  />
                </td>
                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                  <input
                    type="text"
                    className=" w-50 py-1 px-2 rounded-md text-center"
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
