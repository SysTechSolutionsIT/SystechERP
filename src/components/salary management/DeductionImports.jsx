import React from 'react'
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
// import DeductionHeadsModal from "./DeductionHeadsModal";
// import ViewDeductionHeads from "./ViewDeductionHeads";
import axios from "axios";
import { useAuth } from "../Login";
import DeductionImportModal from './DeductionImportModal';

const DeductionImports = () => {
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
      EmployeeId:true,
      DeductionHeadId:true,
      Amount:true,
      AMonth:true,
      AYear:true,
  });

  const columnNames = {
      EmployeeId:"Employee Name",
      DeductionHeadId:"Deduction Head",
      Amount:"Amount",
      AMonth:"Month",
      AYear:"Year",
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
      const allRows = [...heads];
  
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
    }, [token, isModalOpen]);
  
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/monthly-deduction-import/FnShowActiveData",
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
    console.log(heads);
  
    const handleSearchChange = (title, searchWord) => {
      const searchData = [...heads];
  
      const newFilter = searchData.filter((item) => {
        // Check if the item matches the search term in any selected columns
        const matches = selectedColumns.some((columnName) => {
          const newCol = columnName;
          const value = item[newCol];
          return (
            value &&
            value.toString().toLowerCase().includes(searchWord.toLowerCase())
          );
        });
        return matches;
      });
      // Update the filtered data
      setFilteredData(newFilter);
    };
  
    return (
      <div className="min-w-[40%]">
        {/* <DeductionHeadsModal
          visible={isModalOpen}
          onClick={() => setModalOpen(false)}
        /> */}
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
                  {selectedColumns.map((columnName) =>
                    columnVisibility[columnName] ? (
                      <th
                        key={columnName}
                        className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal`}
                      >
                        {columnNames[columnName]}
                      </th>
                    ) : null
                  )}
                </tr>
                <tr>
                  <th className="border-2">
                  <button
                        className="text-white bg-blue-900 font-semibold px-4 py-1 rounded-lg text-[13px] border border-white"
                        onClick={() => setModalOpen(true)}
                    >
                        Add
                    </button>
                  </th>
                  <th className="p-2 font-semibold text-black border-2" />
                  {selectedColumns.map((columnName) =>
                    columnVisibility[columnName] ? (
                      <th
                        key={columnName}
                        className="p-2 font-semibold text-black border-2"
                      >
                        <input
                          type="text"
                          placeholder={`Search `}
                          className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                          style={{
                            maxWidth: getColumnMaxWidth(columnName) + "px",
                          }}
                          onChange={(e) =>
                            handleSearchChange(columnName, e.target.value)
                          }
                        />
                      </th>
                    ) : null
                  )}
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
                                setEHid(result.MonthlyDeductionId); // Pass ID to VEModal
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
                                setEHid(result.MonthlyDeductionId); // Pass ID to VEModal
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
                          {result.MonthlyDeductionId}
                        </td>
                        {selectedColumns.map((columnName) =>
                          columnVisibility[columnName] ? (
                            <td
                              key={columnName}
                              className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                            >
                              {columnName === "ACFlag"
                                ? result[columnName] === "Y"
                                  ? "Active"
                                  : "Inactive"
                                : result[columnName]}
                            </td>
                          ) : null
                        )}
                      </tr>
                    ))
                  : heads.length > 0 &&
                    heads.map((result, index) => (
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
                                setEHid(result.MonthlyDeductionId); // Pass ID to VEModal
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
                                setEHid(result.MonthlyDeductionId); // Pass ID to VEModal
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
                          {result.MonthlyDeductionId}
                        </td>
                        {selectedColumns.map((columnName) =>
                          columnVisibility[columnName] ? (
                            <td
                              key={columnName}
                              className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                            >
                              {columnName === "ACFlag"
                                ? result[columnName] === "Y"
                                  ? "Active"
                                  : "Inactive"
                                : columnName === "CalculationValue"
                                ? result[columnName] || "N/A"
                                : columnName === "Formula"
                                ? result[columnName] || "N/A"
                                : columnName.startsWith("SalaryParameter")
                                ? result[columnName] || "N/A"
                                : result[columnName]}
                            </td>
                          ) : (
                            <td key={columnName} className="hidden"></td>
                          )
                        )}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <DeductionImportModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}/>
      </div>
    );  
}

export default DeductionImports