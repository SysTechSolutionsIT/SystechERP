import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import DesignationModal from './DesignationModal';
import ViewDesignation from './ViewDesignation';
import { useAuth } from '../Login';

export const DesignData = [
  {
    ID: 1,
    Name: "ADMINISTRATOR",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 2,
    Name: "PROJECT MANAGER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 3,
    Name: "HMI MANAGER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 4,
    Name: "ACCOUNT HEAD",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 5,
    Name: "SR.LEAD ENGINEER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 6,
    Name: "PURCHASE MANAGER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 7,
    Name: "LEAD ENGINEER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 8,
    Name: "SALES MANAGER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 9,
    Name: "SR. TECHNICIAN",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 10,
    Name: "SR. PROJECT ENGINEER",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  },
  {
    ID: 11,
    Name: "OFFICE BOY",
    ReportDesignationName: "ADMINISTRATOR",
    Status: "Y"
  }
]

const DesignationMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [DesignData, setDesignData] = useState([])
  const {token} = useAuth()

  useEffect(() =>{
    const fetchDesignations = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/designation-master/FnShowActiveData", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data
        setDesignData(data)
      } catch(error){
        console.error('Error', error);
      }
    }
    fetchDesignations()
  },[token])

  const deleteDesignation = async(DeleteId) =>{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Employee Type?"
    );

    if (!confirmDelete) {
      return;
    }
    try{
      const response = await axios.post(`http://localhost:5500/designation-master/FnAddUpdateDeleteRecord`,
        {
          DesignationId: DeleteId,
          IUFlag:"D"
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
      })
      alert('Designation Deleted')
      window.location.reload()
    } catch (error){
      console.error('Error', error);
    }
  }

  const handleSearchChange = (title, searchWord) => {
    const newFilter = DesignData.filter((item) => {
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
    DesignationName: true,
    ReportDesignationId: true
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

  const [veDesign, setVeDesign] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setid] = useState();

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
    const allRows = [...DesignData, ...filteredData];

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
          HRM / Employee Settings / Designation Master
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
                    checked={columnVisibility[columnName]}
                    onChange={() => toggleColumn(columnName)}
                  />
                  <span
                    className={
                      columnVisibility[columnName]
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
      <DesignationModal
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
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] capitalize whitespace-normal${columnVisibility[columnName] ? "" : "hidden"
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
                ? filteredData.map((result, index) => (
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
                            setVeDesign(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setid(result.DesignationId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeDesign(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setid(result.DesignationId); // Pass ID to VEModal
                          }}
                        />
                        {/* <ViewDesignation
                          visible={veDesign}
                          onClick={() => setVeDesign(false)}
                          edit={edit}
                          ID={id}
                        /> */}
                        <Icon
                          className="cursor-pointer"
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={()=> deleteDesignation(result.DesignationId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                      {result.DesignationId}
                    </td>
                    {selectedColumns.map((columnName) => (
                      <td
                        key={columnName}
                        className={`px-4 text-[11px] border-2 whitespace-normal text-left${columnVisibility[columnName] ? "" : "hidden"
                          }`}
                      >
                        {result[columnName]}
                      </td>
                    ))}
                  </tr>
                ))
                : DesignData.map((result, index) => (
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
                            setVeDesign(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setid(result.DesignationId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={() => {
                            setVeDesign(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setid(result.DesignationId); // Pass ID to VEModal
                          }}
                        />
                        {/* <ViewDesignation
                          visible={veDesign}
                          onClick={() => setVeDesign(false)}
                          edit={edit}
                          ID={id}
                        /> */}
                        <Icon
                          className="cursor-pointer"
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          onClick={()=> deleteDesignation(result.DesignationId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                      {result.DesignationId}
                    </td>
                    {selectedColumns.map((columnName) => (
                      <td
                        key={columnName}
                        className={`px-4 text-[11px] border-2 whitespace-normal ${columnName === "EmployeeFare" && "text-right"
                          } ${columnVisibility[columnName] ? "" : "hidden"}`}
                      >
                        {result[columnName]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div> 
      <ViewDesignation
                          visible={veDesign}
                          onClick={() => setVeDesign(false)}
                          edit={edit}
                          ID={id}
                        />
    </div>
  );
}

export default DesignationMaster