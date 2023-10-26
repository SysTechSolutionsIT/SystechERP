import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import DeductionHeadsModal from "./DeductionHeadsModal";
import ViewDeductionHeads from "./ViewDeductionHeads";
import axios from "axios";
import { useAuth } from "../Login";

export const DeductionHeads = [
  {
    DeductionHeadId: 1,
    DeductionHead: "Income Tax",
    ShortName: "IT",
    CalculationType: "Percentage",
    Status: true,
  },
  {
    DeductionHeadId: 2,
    DeductionHead: "Health Insurance",
    ShortName: "HI",
    CalculationType: "Fixed Amount",
    Status: false,
  },
  {
    DeductionHeadId: 3,
    DeductionHead: "401(k) Contribution",
    ShortName: "401(k)",
    CalculationType: "Percentage",
    Status: true,
  },
  {
    DeductionHeadId: 4,
    DeductionHead: "Life Insurance Premium",
    ShortName: "Life Ins",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  {
    DeductionHeadId: 5,
    DeductionHead: "Employee Stock Purchase Plan",
    ShortName: "ESPP",
    CalculationType: "Percentage",
    Status: false,
  },
  {
    DeductionHeadId: 6,
    DeductionHead: "Union Dues",
    ShortName: "Union",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  {
    DeductionHeadId: 7,
    DeductionHead: "Childcare Expenses",
    ShortName: "Childcare",
    CalculationType: "Percentage",
    Status: false,
  },
  {
    DeductionHeadId: 8,
    DeductionHead: "Student Loan Repayment",
    ShortName: "Loan Repay",
    CalculationType: "Fixed Amount",
    Status: true,
  },
  // Add more deduction heads as needed
];

const DeductionHeadsMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { token } = useAuth();

  // View and Edit
  const [veDeductionH, setVeDeductionH] = useState(false);
  const [edit, setEdit] = useState(false);
  const [EHid, setEHid] = useState();

  // Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    ShortName: true,
    HeadPosition: true,
    CalculationType: true,
    CalculationValue: false,
    Formula: false,
    SalaryParameter1: false,
    SalaryParameter2: false,
    SalaryParameter3: false,
    SalaryParameter4: false,
    SalaryParameter5: false,
    SalaryParameter6: false,
    SalaryParameter7: false,
    SalaryParameter8: false,
    SalaryParameter9: false,
    SalaryParameter10: false,
    Status: true,
    Remark: false
  });

  const columnNames = {
    Name: "Name",
    ShortName: "Short Name",
    HeadPosition: "Head Position",
    CalculationType: "Calculation Type",
    CalculationValue: "Calculation Value",
    Formula: "Formula",
    SalaryParameter1: "Salary Parameter 1",
    SalaryParameter2: "Salary Parameter 2",
    SalaryParameter3: "Salary Parameter 3",
    SalaryParameter4: "Salary Parameter 4",
    SalaryParameter5: "Salary Parameter 5",
    SalaryParameter6: "Salary Parameter 6",
    SalaryParameter7: "Salary Parameter 7",
    SalaryParameter8: "Salary Parameter 8",
    SalaryParameter9: "Salary Parameter 9",
    SalaryParameter10: "Salary Parameter 10",
    Status: "Status",
    Remark: "Remarks",
  };

  // Menu click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Max Searchbar width
  const getColumnMaxWidth = (columnName) => {
    let maxWidth = 0;
    const allRows = [...DeductionHeads];

    allRows.forEach((row) => {
      const cellContent = row[columnName];
      const cellWidth = getTextWidth(cellContent, "11px"); // You can adjust the font size here
      maxWidth = Math.max(maxWidth, cellWidth);
    });

    return maxWidth + 10; // Adding some padding to the width
  };

  const getTextWidth = (text, fontSize) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = fontSize + " sans-serif";
    return context.measureText(text).width;
  };

  //Toggle columns
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    ...Object.keys(columnVisibility),
  ]);

  const toggleColumn = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  useEffect(() => {
    console.log("Selected Columns:", selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => {
    setSelectedColumns([...Object.keys(columnVisibility)]);
    setColumnVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      Object.keys(updatedVisibility).forEach((columnName) => {
        updatedVisibility[columnName] = true;
      });
      return updatedVisibility;
    });
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
    setColumnVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      Object.keys(updatedVisibility).forEach((columnName) => {
        updatedVisibility[columnName] = false;
      });
      return updatedVisibility;
    });
  };

  // API
  const [heads, setHeads] = useState([]);

  useEffect(() => {
    fetchHeadsData();
  }, []);

  const fetchHeadsData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/deduction-heads/get", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setHeads(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error);
    }
  };
  console.log(heads);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...heads];

    const newFilter = searchData.filter((item) => {
      // Check if the item matches the search term in any selected columns
      const matches = selectedColumns.some((columnName) => {
        const newCol = columnName;
        const value = item[newCol];
        return (
          value && value.toString().toLowerCase().includes(searchWord.toLowerCase())
        );
      })
      return matches;
    });
    // Update the filtered data
    setFilteredData(newFilter);
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Payroll Settings / Deduction Heads Master
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`mt-1.5 ml-2 ${showDropdown ? "rotate-180" : ""
                } cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50">
              {/* Dropdown content */}
              <div className="flex items-center mb-2">
                <button
                  className="text-blue-500 hover:text-blue-700 underline mr-2 text-[13px]"
                  onClick={selectAllColumns}
                >
                  Select All
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 underline text-[13px]"
                  onClick={deselectAllColumns}
                >
                  Deselect All
                </button>
              </div>
              {Object.keys(columnVisibility).map((columnName) => (
                <label
                  key={columnName}
                  className="flex items-center capitalize text-black text-[13px]"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedColumns.includes(columnName)}
                    onChange={() => toggleColumn(columnName)}
                  />
                  <span
                    className={
                      selectedColumns.includes(columnName)
                        ? "font-semibold"
                        : ""
                    }
                  >
                    {columnName}
                  </span>
                </label>
              ))}
            </div>
          )}

          <button
            className="text-white font-semibold px-4 rounded-lg text-[13px] border border-white"
            onClick={() => setModalOpen(true)}
          >
            Add
          </button>
          <div className="flex items-center">
            <button
              className=" cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon icon="carbon:menu" color="white" width="27" height="27" />
            </button>
            {menuOpen && (
              <div
                ref={menuRef}
                className="w-24 -ml-10 flex flex-col absolute lg:top-32 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center"
              >
                <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
                  Copy
                </button>
                <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2 z-50">
                  CSV
                </button>
                <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                  Excel
                </button>
                <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                  PDF
                </button>
                <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                  Print
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <DeductionHeadsModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  columnVisibility[columnName] ? (
                    <th
                      key={columnName}
                      className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal`}
                    >
                      {columnNames[columnName]}
                    </th>
                  ) : null
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2" />
                {selectedColumns.map((columnName) => (
                  columnVisibility[columnName] ? (
                    <th key={columnName} className="p-2 font-semibold text-black border-2">
                      <input
                        type="text"
                        placeholder={`Search `}
                        className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                        style={{ maxWidth: getColumnMaxWidth(columnName) + "px" }}
                        onChange={(e) => handleSearchChange(columnName, e.target.value)}
                      />
                    </th>
                  ) : null
                ))}
              </tr>
            </thead>
            <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                  <tr key={key}>
                    <td className="px-2 border-2">
                      <div className="flex gap-2 text-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setVeDeductionH(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setEHid(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setVeDeductionH(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setEHid(result.DeductionHeadId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {result.id}
                    </td>
                    {selectedColumns.map((columnName) => (
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "Status"
                            ? result[columnName]
                              ? "Active"
                              : "Inactive"
                            : result[columnName]}
                        </td>
                      ) : null
                    ))}
                  </tr>
                ))
                : heads.length > 0 && heads.map((result, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setVeDeductionH(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setEHid(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setVeDeductionH(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setEHid(result.id); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {result.id}
                    </td>
                    {selectedColumns.map((columnName) => (
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {
                            columnName === "Status"
                              ? result[columnName]
                                ? "Active"
                                : "Inactive"
                              : columnName === "CalculationValue"
                                ? result[columnName] || "N/A"
                                : columnName === "Formula"
                                  ? result[columnName] || "N/A"
                                  : columnName.startsWith("SalaryParameter")
                                    ? result[columnName] || "N/A"
                                    : result[columnName]
                          }


                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewDeductionHeads
        visible={veDeductionH}
        onClick={() => setVeDeductionH(false)}
        edit={edit}
        ID={EHid}
      />
    </div>
  );
};

export default DeductionHeadsMaster;
