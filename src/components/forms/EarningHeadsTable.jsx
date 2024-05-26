import React, { useEffect, useState } from "react";
import { useAuth } from "../Login";
import axios from "axios";
import { useEmployeeType } from "./personal";

const EarningHeadsTable = ({ ID }) => {
  const { token } = useAuth();
  const { employeeTypeId } = useEmployeeType();
  const [caderwiseEarnings, setCaderwiseEarnings] = useState([]);
  const [selectedHeads, setSelectedHeads] = useState([]);
  const [details, setDetails] = useState([]);
  const [heads, setHeads] = useState([]);
  const [basicSalaryAmount, setBasicSalaryAmount] = useState();
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Designation, setDesignation] = useState();
  const [SalaryParameters, setSalaryParameters] = useState([]);
  const [comparisonDone, setComparisonDone] = useState(false)
  const [isFilled, setIsFilled] = useState(Array(caderwiseEarnings.length).fill(false)); // Array to track whether each input is filled or not
const [inputValues, setInputValues] = useState(Array(caderwiseEarnings.length).fill("")); // Array to track the input values

  useEffect(() => {
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
    const fetchCaderwiseEarning = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/caderwise-earning/FnShowParticularData",
          {
            params: { EmployeeTypeId: employeeTypeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const caderwiseData = response.data;
        console.log("Caderwise Data:", caderwiseData); // Added logging

        const employeeWiseResponse = await axios.get(
          "http://localhost:5500/employee-wise-earnings/FnShowParticularData",
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const employeeWiseData = employeeWiseResponse.data;
        console.log("Employee Wise Data:", employeeWiseData); // Added logging

        if (employeeWiseData.length > 0) {
          setCaderwiseEarnings(employeeWiseData);
        } else {
          setCaderwiseEarnings(caderwiseData);
        }
        console.log("Earning for the employee", caderwiseEarnings);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchCaderwiseEarning();
  }, [token, ID, employeeTypeId]);

  
  useEffect(() => {
    if (!comparisonDone && heads.length > 0 && caderwiseEarnings.length > 0) {
      // Compare EarningHeadId of heads with caderwiseEarnings
      const updatedHeads = heads.map((head) => ({
        ...head,
        Selected: caderwiseEarnings.some(
          (earning) => earning.EarningHeadId === head.EarningHeadId
        ),
      }));
      setHeads(updatedHeads);
      setComparisonDone(true); // Set comparisonDone to true after comparison
    }
  }, [heads, caderwiseEarnings, comparisonDone]);

  useEffect(() => {
    const updatedHeads = heads.map((head) => {
      console.log("Mapping Head:", head); // Added logging
      const calculationValue = calculateValue(
        head.Formula,
        details ? details.GrossSalary : 0,
        basicSalaryAmount,
        head.CalculationValue,
        head.EarningHeadId,
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
    // Fetch designation data
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
        console.log("Designation:", data); // Log the designation value
        console.log("Is DESG equal to 'TE'?", data === 'TE'); // Log the result of comparison
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
          "http://localhost:5500/earning-heads/FnFetchSalaryParameters",
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
    EarningHeadId,
    allSalaryParameters,
    Designation,
    FormulaType
  ) => {
    console.log("EarningHeadId in calculate value:", EarningHeadId); // Added logging

    try {
      if (formula === null) {
        return calculationValue || 0;
      } else {
        const modifiedFormula = replacePlaceholders(
          formula,
          salary,
          basicSalary,
          calculationValue,
          EarningHeadId,
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
    EarningHeadId,
    allSalaryParameters,
    Designation
  ) => {
    let modifiedFormula = formula
      .replace("DESG", `'${Designation}'`)
      .replace(/\bP1\b/g, salary)
      .replace(/\bP2\b/g, basicSalary)
      .replace(/\bP3\b/g, calculationValue);

    const earningHeadData = allSalaryParameters.find(
      (param) => param.EarningHeadId === EarningHeadId
    );

    if (earningHeadData) {
      for (let i = 1; i <= 10; i++) {
        const paramName = `SalaryParameter${i}`;
        const value = earningHeadData[paramName] || "0";
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
      result = Math.ceil(result)
      console.log("Designation formula result:", result);
    } else if (FormulaType == "CF") {
      // Handle CF formula
      result = eval(modifiedFormula);
      result = Math.ceil(result)
      console.log("Conditional formula result:", result);
    } else if (FormulaType == "PF") {
      // Handle PF formula
      console.log("Percentage formula");
      result = eval(modifiedFormula);
      result = Math.ceil(result); // Round to ceiling value
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

    // Log the parsed expression
    console.log("Parsed Expression:", parsedExpression);

    // Evaluate the expression
    try {
        const result = eval(parsedExpression);
        console.log("Evaluation Result:", result); // Log the evaluation result
        return result;
    } catch (error) {
        throw new Error("Error evaluating expression: " + error.message);
    }
};


const evaluateDesgFormula = (formula, designation) => {
  try {
      // Replace 'DESG' with the actual designation value
      const replacedFormula = formula.replace(/'DESG'/g, `'${designation}'`);
      
      console.log("Comparison result:", replacedFormula == 'TE' ? 1 : 0); // Log the comparison result

      if (replacedFormula !== 'TE') {
          // Evaluate the next condition if the designation does not match 'TE'
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

          return evaluatePart(replacedFormula);
      } else {
          // Return 0 if the designation matches 'TE'
          return 0;
      }
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
      updatedHeads[index].EarningHeadId,
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
          EarningHeadId,
          EarningHead,
          CalculationType,
          CalculationValue,
          Formula,
          FormulaType,
        }) => ({
          EmployeeType: employeeTypes?.ShortName,
          EarningHeadId: EarningHeadId,
          EarningHead,
          ECalculationType: CalculationType,
          ECalculationValue:
            CalculationType === "Amount"
              ? CalculationValue
              : calculateValue(
                  Formula,
                  details ? details.GrossSalary : 0,
                  basicSalaryAmount,
                  details.CalculationValue,
                  details.EarningHeadId,
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

  const addEmployeewiseEarning = async () => {
    try {
      const response = axios.post(
        "http://localhost:5500/employee-wise-earnings/FnAddUpdateDeleteRecord",
        selectedHeads,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Employee-wise Earning Heads Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="justify-between">
      <div className="my-1 rounded-2xl bg-white p-2 pr-8">
        <table className="w-full text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
          <thead>
            <tr>
              <th
                colSpan="6"
                className="bg-blue-900 text-white font-semibold border-white border-2"
              >
                Earning Heads
              </th>
            </tr>
            <tr>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Select
              </th>
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                Earning <br /> Head
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
              <th className="text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white w-[30%]">
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
                  {item.EarningHead}
                </td>
                <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.ShortName}
                </td>
                <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.CalculationType}
                </td>
                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
  {caderwiseEarnings.length > 0 && item.CalculationType === "Amount" ? (
    <input
      type="number"
      className="py-1 rounded-md text-center w-full"
      value={
        isFilled[index]
          ? inputValues[index]
          : caderwiseEarnings.find(
              (earning) => earning.EarningHeadId === item.EarningHeadId
            )?.ECalculationValue || ""
      }
      onChange={(e) => {
        const newValue = e.target.value !== "" ? parseFloat(e.target.value) : 0;
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
        if (!isFilled[index]) {
          const newIsFilled = [...isFilled];
          newIsFilled[index] = true;
          setIsFilled(newIsFilled);
        }
        handleCalculationValueChange(index, newValue);
      }}
    />
  ) : (
    <input
      type="number"
      className="py-1 rounded-md text-center w-full"
      value={calculateValue(
        item.Formula,
        details ? details.GrossSalary : 0,
        basicSalaryAmount,
        item.CalculationValue,
        item.EarningHeadId,
        SalaryParameters,
        Designation,
        item.FormulaType
      )}
      onChange={(e) =>
        handleCalculationValueChange(
          index,
          e.target.value !== "" ? parseFloat(e.target.value) : 0 // Convert to float and set to 0 if empty
        )
      }
    />
  )}
</td>

                <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                  <input
                    type="text"
                    className=" w-full py-1 px-2 rounded-md text-center"
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
            onClick={addEmployeewiseEarning}
          >
            Submit Earning Heads Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default EarningHeadsTable;
