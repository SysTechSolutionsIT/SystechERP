import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import AdvanceApprovalModal from "./ApprovalModal";
import { useAuth } from "../Login";
import axios from "axios";
import RejectionModal from "./RejectionModal";
import NoDataNotice from "../NoDataNotice";



const AdvanceApproval = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const { token } = useAuth();
  
  // const [PTView, setPTView] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [AdvanceId, setAdvanceId] = useState();
  const [AdvanceAppr, setAdvanceAppr] = useState([]);

  // Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    ApprovalFlag:true,
    AdvanceDate: true,
    EmployeeId: true,
    EmployeeName: true,
    AdvanceType: true,
    FYear: true,
    AdvanceStatus: true,
    ProjectId: true,
    Amount: true,
    Installment: true,
    ApprovedBy: false,
    ApprovedAmount:false,
    ApprovedInstallments:false,
    RejectedBy: false,
    RejectReason: false
  });

  const columnNames = {
    ApprovalFlag:"Approval Flag",
    AdvanceDate: "Advance Date",
    EmployeeId: "Employee ID",
    EmployeeName: "Employee Name",
    AdvanceType: "Advance Type",
    FYear: "Financial Year",
    AdvanceStatus: "Advance Status",
    ProjectId: "Project",
    Amount: "Amount",
    Installment: "Installment",
    ApprovedBy: 'Approved By',
    ApprovedAmount:'Approved Amount',
    ApprovedInstallments:'Approved Installments',
    RejectedBy: 'Rejected By',
    RejectReason: 'Reject Reason'
  }

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
  const allRows = [...AdvanceAppr];

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

  useEffect(() => {
    fetchRequestData();
  }, [token, isModalOpen, isModal2Open]);

  const fetchRequestData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/a0bdhs87t/FnShowPendingData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setAdvanceAppr(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error);
    }
  };

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...AdvanceAppr];

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
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Payroll Settings / Advance Approval
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
      <AdvanceApprovalModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      {AdvanceAppr.length === 0 ? (
      <div className="flex justify-center items-center">
      <NoDataNotice Text='No Advance Approvals Yet' visible={isModalOpen}/>
      </div>
        ) : (
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Approval
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
                <th className="p-2 font-semibold text-black border-2" />
                <th className="p-2 font-semibold text-black border-2" />
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
                      <td className="px-2 text-[11px] border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            className="cursor-pointer"
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        <button
                          className="font-semibold px-2 rounded-lg text-white bg-green-500 border border-white"
                          onClick={() => {
                            setAdvanceId(result.AdvanceId);
                            setModalOpen(true);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="font-semibold px-2 rounded-lg text-white bg-red-500 border border-white"
                          onClick={() => {
                            setAdvanceId(result.AdvanceId);
                            setModal2Open(true);
                          }}
                        >
                          Reject
                        </button>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceId}
                      </td>
                      {selectedColumns.map((columnName) => (
                          columnVisibility[columnName] ? (
                              columnName === 'ApprovalFlag' ? (
                                  <td
                                      key={columnName}
                                      className={`px-4 border-2 whitespace-normal font-bold text-[15px] text-center capitalize ${
                                          result[columnName] === 'P' ? 'bg-yellow-500' :
                                          result[columnName] === 'R' ? 'bg-red-500' :
                                          result[columnName] === 'A' ? 'bg-green-600' : ''
                                      }`}
                                  >
                                      {result[columnName]}
                                  </td>
                              ) : (
                                  <td
                                      key={columnName}
                                      className={`px-4 border-2 whitespace-normal text-left text-[11px]`}
                                  >
                                      {result[columnName]}
                                  </td>
                              )
                          ) : (
                              <td key={columnName} className="hidden"></td>
                          )
                      ))}
                    </tr>
                  ))
                : AdvanceAppr.length > 0 &&
                  AdvanceAppr.map((result, index) => (
                    <tr key={index}>
                      <td className="px-2 text-[11px] border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            className="cursor-pointer"
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        <button
                        className="bg-green-600 text-white font-semibold py-1 px-2 rounded-lg text-[11px] hover:bg-white hover:border-green-500 hover:border-2 border-2 duration-300 hover:text-green-500"
                        onClick={() => {
                            setAdvanceId(result.AdvanceId);
                            setModalOpen(true);
                          }}
                        >
                          Approve
                        </button>
                        <button
                        className="bg-red-500 text-white font-semibold py-1 hover:bg-white hover:border-red-500 hover:border-2 border-2 duration-300 hover:text-red-500  px-3 rounded-lg text-[11px]"
                        onClick={() => {
                            setAdvanceId(result.AdvanceId);
                            setModal2Open(true);
                          }}
                        >
                          Reject
                        </button>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.AdvanceId}
                      </td>
                      {selectedColumns.map((columnName) => (
                          columnVisibility[columnName] ? (
                              columnName === 'ApprovalFlag' ? (
                                  <td
                                      key={columnName}
                                      className={`px-4 border-2 whitespace-normal font-bold text-[15px] text-center capitalize ${
                                          result[columnName] === 'P' ? 'bg-yellow-500' :
                                          result[columnName] === 'R' ? 'bg-red-500' :
                                          result[columnName] === 'A' ? 'bg-green-600' : ''
                                      }`}
                                  >
                                      {result[columnName]}
                                  </td>
                              ) : (
                                  <td
                                      key={columnName}
                                      className={`px-4 border-2 whitespace-normal text-left text-[11px]`}
                                  >
                                      {result[columnName]}
                                  </td>
                              )
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
        )}
      <AdvanceApprovalModal
            visible={isModalOpen}
            onClick={() => setModalOpen(false)}
            ID={AdvanceId}/>
      <RejectionModal
        visible={isModal2Open}
        onClick={() => setModal2Open(false)}
        ID={AdvanceId}
      />
    </div>
  );
};

export default AdvanceApproval;
