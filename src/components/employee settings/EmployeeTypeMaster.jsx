import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import EmployeeTypeModal from "./EmployeeTypeModal";
import ViewEmployeeType from "./ViewEmployeeType";
import { useAuth } from "../Login";

const EmployeeTypeMaster = () => {
  const { token } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [EmployeeTypeData, setEmployeeTypeData] = useState([]);

  useEffect(() => {
    const fetchEmpTypeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setEmployeeTypeData(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpTypeData();
  }, [token, isModalOpen]);

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

  const deleteEmpType = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Employee Type?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }
    try {
      const response = await axios.post(
        `http://localhost:5500/employee-type/FnAddUpdateDeleteRecord`,
        {
          EmployeeTypeId: DeleteId,
          IUFlag: "D",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Employee Type Deleted");
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSearchChange = (title, searchWord) => {
    const newFilter = EmployeeTypeData.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else if (searchWord !== "" && newFilter.length === 0) {
      setFilteredData(["NA"]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const [columnVisibility, setColumnVisibility] = useState({
    EmployeeType: true,
    EmployeeTypeGroup: true,
    PrefixEnabled: true,
    ShortName: true,
    Remark: false,
  });

  const columnNames = {
    EmployeeType: "Employee Type",
    EmployeeTypeGroup: "Employee Type Group",
    PrefixEnabled: 'ID Prefix Enabled',
    ShortName: "Employee ID Prefix",
    Remark: "Remarks",
  };

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

  const [veEType, setVeEType] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  //Menu click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false);
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
    const allRows = [...EmployeeTypeData, ...filteredData];

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

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          HRM / Employee Settings / Employee Type Master
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`mt-1.5 ml-2 ${
                showDropdown ? "rotate-180" : ""
              } cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div
              ref={menuRef}
              className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50"
            >
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
                    checked={columnVisibility[columnName]}
                    onChange={() => toggleColumn(columnName)}
                  />
                  <span
                    className={
                      columnVisibility[columnName] ? "font-semibold" : ""
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
      <EmployeeTypeModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg  whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className="w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
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
                <th className="border-2" />
                <th className="p-2 font-bold text-black border-2 whitespace-normal" />
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
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((result, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          className="cursor-pointer"
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeEType(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setid(result.EmployeeTypeId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeEType(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setid(result.EmployeeTypeId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => deleteEmpType(result.EmployeeTypeId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                      {result.EmployeeTypeId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "EmployeeTypeGroup" ? (
                            // Check if columnName is EmployeeTypeGroup
                            employeeTypeGroup.find((item) => item.FieldId == result[columnName])?.FieldDetails || "Unknown FieldName"
                          ) : (
                            // If not EmployeeTypeGroup, simply display the result
                            result[columnName]
                          )}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData.length === 0 &&
                EmployeeTypeData &&
                EmployeeTypeData.length > 0 ? (
                EmployeeTypeData.map((result, index) => (
                  <tr key={index}>
                    <td className="px-2 text-[11px] border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          className="cursor-pointer"
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeEType(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setid(result.EmployeeTypeId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeEType(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setid(result.EmployeeTypeId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => deleteEmpType(result.EmployeeTypeId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                      {result.EmployeeTypeId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "EmployeeTypeGroup" ? (
                            // Check if columnName is EmployeeTypeGroup
                            employeeTypeGroup.find((item) => item.FieldId == result[columnName])?.FieldDetails || "Unknown FieldName"
                          ) : (
                            // If not EmployeeTypeGroup, simply display the result
                            result[columnName]
                          )}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData[0] == "NA" ? (
                <tr>
                  <td className="text-center">No results</td>
                </tr>
              ) : (
                <tr>
                  <td className="hidden">No Results</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ViewEmployeeType
        visible={veEType}
        onClick={() => setVeEType(false)}
        edit={edit}
        ID={id}
      />
    </div>
  );
};

export default EmployeeTypeMaster;
