import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import DepartmentModal from "./DepartmentModal";
import VEDept from "./ViewDept";
import { useAuth } from "../Login";

const DepartmentMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [Employees, setEmployees] = useState([])
  const { token } = useAuth();

  const deleteDept = async (deptid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }

    try {
      const apiUrl = `http://localhost:5500/departmentmaster/FnAddUpdateDeleteRecord`;

      const response = await axios.post(
        apiUrl,
        {
          DepartmentId: deptid,
          IUFlag: "D",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log(`Department with ID ${deptid} deleted successfully.`);
        alert("Department Deleted");
        window.location.reload();
      } else {
        console.error(`Failed to delete Department with ID ${deptid}.`);
      }
    } catch (error) {
      console.error("Error deleting Department:", error);
    }
  };

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/departmentmaster/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setDepartments(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error.message);
      }
    };
    fetchDept();
  }, [token]);

  useEffect(() =>{
    const fetchEmployees = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/employee/personal/FnShowActiveData',
        { headers: { Authorization: `Bearer ${token}`}}
        )
        const data = response.data
        console.log('Employees', data)
        setEmployees(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchEmployees()
  },[token])

  const handleSearchChange = (title, searchWord) => {
    const newFilter = departments.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  
  const [columnVisibility, setColumnVisibility] = useState({
    DepartmentName: true,
    BranchName: false,
    ParentDeptId: true,
    DepartmentType: true,
    DepartmentGroupId: true,
    DepartmentHeadId: true,
    DepartmentSubHeadId: false,
    CostCenterId: false,
    DepartmentStdStaffStrength: false,
    DepartmentStdWorkerStrength: false,
    Remark: false,
    status: false,
  });

  const columnNames = {
    DepartmentName: "Department Name",
    BranchName: "Company Branch Name",
    ParentDeptId: "Parent Department",
    DepartmentType: "Department Type",
    DepartmentGroupId: "Department Group",
    DepartmentHeadId: "Department Head",
    DepartmentSubHeadId: "Department Sub-Head",
    CostCenterId: "Cost Center",
    DepartmentStdStaffStrength: "Standard Staff Strength",
    DepartmentStdWorkerStrength: "Standard Worker Strength",
    Remark: "Remarks",
    AcFlag: "Status",
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

  const [veDept, setVeDept] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Did, setDid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  //Menu click outside
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
    const allRows = [...departments, ...filteredData];

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
        <div className="text-[15px]">Company Settings / Department Master</div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`ml-2 ${
                showDropdown ? "rotate-180" : ""
              } cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
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
      <DepartmentModal
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
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                    <tr key={key}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setDid(result.DepartmentId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setDid(result.DepartmentId); // Pass ID to VEModal
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
                      <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                        {result.DepartmentId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                          >
                            {result[columnName]}
                          </td>
                        ) : null
                      )}
                    </tr>
                  ))
                : departments.map((result, index) => (
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
                              setVeDept(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setDid(result.DepartmentId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setDid(result.DepartmentId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteDept(result.DepartmentId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                        {result.DepartmentId}
                      </td>
                      {selectedColumns.map((columnName) => {
                    if (columnVisibility[columnName]) {
                        if (columnName === 'ParentDeptId') {
                            const parentDept = departments.find((parentDept) => parentDept.DepartmentId == result.DepartmentId);
                            return (
                                <td
                                    key={columnName}
                                    className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                    {parentDept?.DepartmentName}
                                </td>
                            );
                        } else if (columnName === 'DepartmentHeadId') {
                            const employee = Employees.find((employee) => employee.EmployeeId == result.DepartmentHeadId);
                            return (
                                <td
                                    key={columnName}
                                    className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                    {employee?.EmployeeName}
                                </td>
                            );
                        } 
                        else if (columnName === 'DepartmentSubHeadId') {
                          const employee = Employees.find((employee) => employee.EmployeeId == result.DepartmentSubHeadId);
                          return (
                              <td
                                  key={columnName}
                                  className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                              >
                                  {employee?.EmployeeName}
                              </td>
                          );
                        }
                        else {
                            return (
                                <td
                                    key={columnName}
                                    className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                                >
                                    {result[columnName]}
                                </td>
                            );
                        }
                    } else {
                        return <td key={columnName} className="hidden"></td>;
                    }
                })}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <VEDept
        visible={veDept}
        onClick={() => setVeDept(false)}
        edit={edit}
        ID={Did}
      />
    </div>
  );
};

export default DepartmentMaster;
