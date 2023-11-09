import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import GatePassModal from "./AddEmpGatePass";
// import VEModal from "./ViewComp";
// import axios from "axios";
import { useAuth } from "../Login";

const GateEntryMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal

  const { token } = useAuth();

  //View and Edit
  const [VE, setVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [GateID, setGateID] = useState();

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    ApprovalFlag: true,
    GatepassId: true,
    GatepassDate: true,
    FYear: true,
    EmployeeId: true,
    EmployeeName: true,
    EmployeeType: true,
    InTime: true,
    OutTime: true,
    GatepassType: true,
    Purpose: true,
    RejectReason: true,
    SanctionBy: true,
    Status: true,
  });

  const columnNames = {
    ApprovalFlag: "ApprovalFlag",
    GatepassId: "GatepassId",
    GatepassDate: "GatepassDate",
    FYear: "FYear",
    EmployeeId: "EmployeeId",
    EmployeeName: "EmployeeName",
    EmployeeType: "EmployeeType",
    InTime: "InTime",
    OutTime: "OutTime",
    GatepassType: "GatepassType",
    Purpose: "Purpose",
    RejectReason: "RejectReason",
    SanctionBy: "SanctionBy",
    Status: "Status",
  };

  const dummyData = [
    {
      ApprovalFlag: true,
      GatepassId: "GP123",
      GatepassDate: "2023-11-06",
      FYear: 2023,
      EmployeeId: 1,
      EmployeeName: "John Doe",
      EmployeeType: "Full-time",
      InTime: "08:00 AM",
      OutTime: "05:00 PM",
      GatepassType: "Business",
      Purpose: "Meeting with clients",
      RejectReason: "",
      SanctionBy: "Manager",
      Status: "Approved",
    },
    {
      ApprovalFlag: false,
      GatepassId: "GP456",
      GatepassDate: "2023-11-07",
      FYear: 2023,
      EmployeeId: 2,
      EmployeeName: "Jane Smith",
      EmployeeType: "Part-time",
      InTime: "10:00 AM",
      OutTime: "02:00 PM",
      GatepassType: "Personal",
      Purpose: "Medical appointment",
      RejectReason: "Insufficient information",
      SanctionBy: "Supervisor",
      Status: "Rejected",
    },
    {
      ApprovalFlag: true,
      GatepassId: "GP789",
      GatepassDate: "2023-11-08",
      FYear: 2023,
      EmployeeId: 3,
      EmployeeName: "Robert Johnson",
      EmployeeType: "Contractor",
      InTime: "09:30 AM",
      OutTime: "04:30 PM",
      GatepassType: "Business",
      Purpose: "Training session",
      RejectReason: "",
      SanctionBy: "Manager",
      Status: "Approved",
    },
  ];

  //Toggle
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

  //Max Searchbar width
  const getColumnMaxWidth = (columnName) => {
    let maxWidth = 0;
    const allRows = [...dummyData, ...filteredData];

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

  //For API
  //   const [companies, setCompanies] = useState([]);

  //   useEffect(() => {
  //     fetchCompData();
  //   }, [token]);

  //   const fetchCompData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5500/companies/", {
  //         headers: { authorization: `Bearer ${token}` },
  //       });
  //       console.log("Response Object", response);
  //       const data = response.data.companies;
  //       console.log(data);
  //       setCompanies(data);
  //     } catch (error) {
  //       console.log("Error while fetching course data: ", error.message);
  //     }
  //   };
  //   console.log(companies);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...dummyData];

    const newFilter = searchData.filter((item) => {
      // Check if the item matches the search term in any of the selected columns
      const matches = selectedColumns.some((columnName) => {
        const newCol = columnName.charAt(0).toLowerCase() + columnName.slice(1);
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
  // Deleting Entry
  //   const deleteComp = async (ID) => {
  //     alert("Are you sure you want to delete this bank?");
  //     try {
  //       const apiUrl = `http://localhost:5500/companies/delete/${ID}`;

  //       const response = await axios.delete(apiUrl, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 204) {
  //         console.log(`Record with ID ${ID} deleted successfully.`);
  //         alert("Record Deleted");
  //         window.location.reload();
  //       } else {
  //         console.error(`Failed to delete record with ID ${ID}.`);
  //       }
  //     } catch (error) {
  //       console.error("Error deleting record:", error);
  //     }
  //   };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="text-[15px]">
          Attendance Management / Employee Gate Pass Entry
        </div>
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
      <GatePassModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />

      <div className="grid gap-2 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8 ">
          <table className="min-w-full text-center whitespace-normal z-0">
            <thead className="border-b-2">
              <tr className="">
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className="w-auto text-[13px] px-1 font-bold text-black border-2 border-gray-400 whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                  >
                    {columnNames[columnName]}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 " />
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-bold text-black border-2 text-[11px]"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-auto text-[11px] h-6 border-2 border-slate-500 rounded-lg justify-center text-center whitespace-normal"
                      style={{ maxWidth: getColumnMaxWidth(columnName) + "px" }}
                      onChange={(e) =>
                        handleSearchChange(columnName, e.target.value)
                      }
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {filteredData.length > 0
                ? filteredData.map((result, key) => (
                    <tr key={key}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="luGateIDe:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setGateID(result.id); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setGateID(result.id); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            //   onClick={() => deleteComp(result.id)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.GatepassId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-[11px] text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {columnName === "Status"
                            ? result.status === 1
                              ? "Active"
                              : "Inactive"
                            : result[
                                columnName.charAt(0).toLowerCase() +
                                  columnName.slice(1)
                              ]}
                        </td>
                      ))}
                    </tr>
                  ))
                : //dummyData.length > 0 &&
                  dummyData.map((result, key) => (
                    <tr key={key}>
                      {/* ... Rest of the table data */}
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="luGateIDe:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setGateID(result.GatepassId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(true); // Enable edit mode for VEModal
                              setGateID(result.GatepassId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            //   onClick={() => deleteComp(result.id)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.GatepassId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-[11px] text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {columnName === "Status"
                            ? result.Status
                              ? "Active"
                              : "Inactive"
                            : columnName === "ApprovalFlag"
                            ? result.ApprovalFlag
                              ? "Active"
                              : "Inactive"
                            : result[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <VEModal
        visible={VE}
        onClick={() => setVE(false)}
        edit={edit}
        ID={GateID}
      /> */}
    </div>
  );
};

export default GateEntryMaster;
