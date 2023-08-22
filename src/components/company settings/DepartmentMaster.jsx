import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import DepartmentModal from "./DepartmentModal";

export const departments = [
  {
    deptID: 1,
    deptName: "Payroll Department",
    companyBranchName: "Main Office",
    parentDept: "Human Resource department",
    deptType: "Sub",
    deptGroup: "Engineering",
    deptHead: "John Doe",
    deptSubHead: "Jane Smith",
    costCenter: "Floor 3",
    standardStaffStrength: 50,
    standardWorkerStrength: 30,
    remark: "Handles engineering projects",
    status: true,
  },
  {
    deptID: 2,
    deptName: "Times Keeping Department",
    companyBranchName: "Main Office",
    parentDept: "Human Resource Department",
    deptType: "Sub",
    deptGroup: "HR",
    deptHead: "Alice Johnson",
    deptSubHead: "Bob Brown",
    costCenter: "Floor 4",
    standardStaffStrength: 25,
    standardWorkerStrength: 20,
    remark: "Manages HR activities",
    status: true,
  },
  {
    deptID: 3,
    deptName: "Accounts Department",
    companyBranchName: "Main Office",
    parentDept: "Finance Department",
    deptType: "Sub",
    deptGroup: "IT",
    deptHead: "Michael Clark",
    deptSubHead: "Emily White",
    costCenter: "Floor 5",
    standardStaffStrength: 40,
    standardWorkerStrength: 35,
    remark: "Handles IT infrastructure",
    status: true,
  },
  {
    deptID: 4,
    deptName: "Sales",
    companyBranchName: "Main Office",
    parentDept: "NA",
    deptType: "main",
    deptGroup: "Sales",
    deptHead: "Alex Turner",
    deptSubHead: "Olivia Green",
    costCenter: "Floor 2",
    standardStaffStrength: 45,
    standardWorkerStrength: 40,
    remark: "Manages sales operations",
    status: true,
  },
  {
    deptID: 5,
    deptName: "Finance",
    companyBranchName: "Main Office",
    parentDept: "NA",
    deptType: "main",
    deptGroup: "Finance",
    deptHead: "William Brown",
    deptSubHead: "Sophia Martinez",
    costCenter: "Floor 6",
    standardStaffStrength: 30,
    standardWorkerStrength: 25,
    remark: "Handles financial operations",
    status: true,
  },
];

const DepartmentMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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
    deptName: true,
    companyBranchName: true,
    deptType: true,
    parentDept: true,
    deptHead: true,
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    ...Object.keys(columnVisibility),
  ]);

  const toggleColumn = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col !== columnName)
      );
    } else {
      setSelectedColumns((prevSelected) => [...prevSelected, columnName]);
    }
  };

  useEffect(() => {
    console.log("Selected Columns:", selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => {
    setSelectedColumns([...Object.keys(columnVisibility)]);
  };

  const deselectAllColumns = () => {
    setSelectedColumns([]);
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
    <>
      <div className="bg-blue-900 h-15 absolute top-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="mr-auto">Department Master</div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex text-[13px] bg-white text-blue-900 ml-96 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-1 px-4 rounded-lg cursor-pointer"
            >
              Column Visibility
              <Icon
                icon="fe:arrow-down"
                className={`mt-1.5 ml-2 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showDropdown && (
              <div className="absolute right-0 bg-white border border-gray-300 shadow-md rounded-lg p-2">
                <div className="flex items-center mb-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 underline mr-2"
                    onClick={selectAllColumns}
                  >
                    Select All
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 underline"
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
          </div>
          <button
            className="text-white font-semibold py-1 px-4 rounded-lg text-[13px] border border-white"
            onClick={() => setModalOpen(true)}
          >
            Add Dept.
          </button>
        </div>
        <div className="flex items-center mb-2 ml-4">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute top-8 right-0 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
            >
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Copy
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
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
      <DepartmentModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4 justify-center flex">
        <div className="my-4 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg  whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className="w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] capitalize whitespace-normal${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2" />
                <th className="p-2 font-bold text-black border-2 whitespace-normal" />
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-semibold text-black border-2 whitespace-normal"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px] whitespace-normal"
                      style={{ maxWidth: getColumnMaxWidth(columnName) + "px" }}
                      onChange={(e) =>
                        handleSearchChange(columnName, e.target.value)
                      }
                    />
                  </th>
                ))}
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
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setDid(result.ID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VEFModal
                            visible={veDept}
                            onClick={() => setVeDept(false)}
                            edit={edit}
                            ID={Did}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setDid(result.ID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VEFModal
                            visible={veDept}
                            onClick={() => setVeDept(false)}
                            edit={edit}
                            ID={Did}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                        {result.deptID}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] ${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {result[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))
                : departments.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setDid(entry.ID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VEFModal
                            visible={veDept}
                            onClick={() => setVeDept(false)}
                            edit={edit}
                            ID={Did}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeDept(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setDid(entry.ID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VEFModal
                            visible={veDept}
                            onClick={() => setVeDept(false)}
                            edit={edit}
                            ID={Did}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                        {entry.deptID}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] ${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {entry[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DepartmentMaster;
