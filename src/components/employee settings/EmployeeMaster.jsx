import React from 'react'
import { Icon } from '@iconify/react'
import { useState, useRef, useEffect } from 'react';
import { employeeData } from './EmployeeData';
import { useNavigate } from 'react-router-dom';

const EmployeeMaster = () => {
    const [veCost, setVeCost] = useState(false);
    const [edit, setEdit] = useState(false);
    const [CCid, setCCid] = useState();
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [columnVisibility, setColumnVisibility] = useState({
      EmployeeType: true,

      EmployeeName: true,
      CellNo: true,
      EmailId: true,
      Status: true,
    });

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

    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = (title, searchWord) => {
      const newFilter = employeeData.filter((item) => {
        const value = item[title];
        return value && value.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

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
  
    //Menu
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
  

    const getColumnMaxWidth = (columnName) => {
        let maxWidth = 0;
        const allRows = [...employeeData];
    
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
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-clip overflow-clip">
      <div className="flex items-center gap-4 whitespace-normal">
      <div className="mr-auto text-[15px] whitespace-normal min-w-fit">
            HRMS / Employee Settings / Employee Master
          </div>
        <div className="sticky ">
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
            </div>
          {showDropdown && (
            <div className="absolute top-[16%] lg:ml-[42%] sm:ml-[70%] bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
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

          <div className="min-w-[40%]">
            <button
              className="text-white font-semibold px-4 rounded-lg text-[13px] border border-white"
              onClick={() => navigate('/add-employee')}
            >
              Add Record
            </button>
            </div>
      </div>
        <div className="flex items-center">
          <button
            className=" cursor-pointerm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon className='' icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-28 lg:right-0 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
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
        <div className="grid gap-4 justify-between">
        <div className="my-0 rounded-2xl bg-white p-2">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Employee Type
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Employee Name
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Cell No.
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Email ID
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Status
                </th>
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2 " />
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{
                      maxWidth: getColumnMaxWidth("EmployeeType") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("EmployeeType", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 whitespace-normal border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("EmployeeName") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("EmployeeName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("CellNo") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("CellNo", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("EmailId") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("EmailId", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Status") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Status", e.target.value)
                    }
                  />
                </th>
              </tr>
              </thead>
              <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                    <tr key={key}>
                      <td className="px-4 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCCid(result.EmployeeId); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setCCid(result.EmployeeId); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.EmployeeId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-[11px] text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {result[columnName]}
                        </td>
                      ))}
                      </tr>
                    ))
                  : employeeData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 border-2">
                        <div className="flex items-center gap-2 text-center justify-center cur">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={()=>
                              navigate(`/view-employee/${entry.EmployeeId}`)
                            }
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              navigate(`/edit-employee/${entry.EmployeeId}`)
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-center text-[11px]">
                        {entry.EmployeeId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px]${
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
        </div>
  )
}

export default EmployeeMaster