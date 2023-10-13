import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import AdvanceRequestModal from "./AdvanceRequestModal";
import { useAuth } from "../Login";
import axios from "axios";

export const advanceData = [
  // Item 1
  {
    ApprovalFlag: true,
    AdvanceId: 1,
    AdvanceDate: "2023-09-04",
    Employee: "John Doe",
    AdvanceType: "Office",
    AdvanceStatus: "Pending",
    Project: "Project ABC",
    Amount: 1000,
    Installment: 3,
    AdvanceStartingMonth: "September",
    AdvanceStartingYear: 2023,
    Purpose: "Equipment Purchase",
    Status: "Active",
    Remark: "Approval pending from manager",
  },
  // Item 2
  {
    ApprovalFlag: false,
    AdvanceId: 2,
    AdvanceDate: "2023-09-05",
    Employee: "Jane Smith",
    AdvanceType: "Personal",
    AdvanceStatus: "Repayment",
    Project: "",
    Amount: 500,
    Installment: 1,
    AdvanceStartingMonth: "August",
    AdvanceStartingYear: 2023,
    Purpose: "Vacation",
    Status: "Active",
    Remark: "Pending repayment",
  },
  // Item 3
  {
    ApprovalFlag: true,
    AdvanceId: 3,
    AdvanceDate: "2023-09-06",
    Employee: "Alice Johnson",
    AdvanceType: "Office",
    AdvanceStatus: "Partial Repayment",
    Project: "Project XYZ",
    Amount: 1500,
    Installment: 2,
    AdvanceStartingMonth: "October",
    AdvanceStartingYear: 2023,
    Purpose: "Travel Expenses",
    Status: "Active",
    Remark: "Partial repayment in progress",
  },
  // Item 4
  {
    ApprovalFlag: true,
    AdvanceId: 4,
    AdvanceDate: "2023-09-07",
    Employee: "Bob Anderson",
    AdvanceType: "Personal",
    AdvanceStatus: "Pending",
    Project: "",
    Amount: 750,
    Installment: 1,
    AdvanceStartingMonth: "September",
    AdvanceStartingYear: 2023,
    Purpose: "Education Fees",
    Status: "Active",
    Remark: "Awaiting approval",
  },
  // Item 5
  {
    ApprovalFlag: false,
    AdvanceId: 5,
    AdvanceDate: "2023-09-08",
    Employee: "Eva Williams",
    AdvanceType: "Office",
    AdvanceStatus: "Repayment",
    Project: "Project DEF",
    Amount: 1200,
    Installment: 4,
    AdvanceStartingMonth: "November",
    AdvanceStartingYear: 2023,
    Purpose: "Software Licenses",
    Status: "Active",
    Remark: "Repayment initiated",
  },
];

const AdvanceRequest = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { token } = useAuth();

  // const [PTView, setPTView] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const [PTId, setPTId] = useState();

  // Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Menu outside click
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
    const allRows = [...advanceData];

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

  const [columnVisibility, setColumnVisibility] = useState({
    AdvanceDate: true,
    Employee: true,
    AdvanceType: true,
    AdvanceStatus: true,
    Project: true,
    Amount: true,
    Installment: true,
    Status: true,
  });
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

  // API
  const [advanceReq, setAdvanceReq] = useState([]);

  useEffect(() => {
    fetchRequestData();
  }, []);

  const fetchRequestData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/advance-request/get", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setAdvanceReq(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error);
    }
  };
  console.log(advanceReq);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...advanceReq];

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
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 sm:whitespace-nowrap text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="mr-auto text-[15px] whitespace-nowrap">
            Payroll Settings / Advance Request
          </div>
          <div className="relative sticky lg:ml-96 sm:ml-64">
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
          </div>
          {showDropdown && (
            <div className="absolute top-[16%] lg:ml-[42%] sm:mr-[20%] bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]">
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
              onClick={() => setModalOpen(true)}
            >
              Add Company
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2 lg:mr-[210px] sm:mr-[60px]">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-28 lg:right-38 bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
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

      <AdvanceRequestModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Approval Flag
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 ${columnVisibility[columnName] ? "" : "hidden"
                      }`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="p-2 font-bold text-black border-2 " />
                <th className="p-2 font-bold text-black border-2 " />
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
                      {result.ApprovalFlag}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      {result.id}
                    </td>
                    {selectedColumns.map((columnName) => (
                      <td
                        key={columnName}
                        className={`px-4 border-2 whitespace-normal text-[11px] text-left${columnVisibility[columnName] ? "" : "hidden"
                          }`}
                      >
                        {result[columnName]}
                      </td>
                    ))}
                  </tr>
                ))
                : advanceReq.length > 0 && advanceReq.map((result, index) => (
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
                      {result.ApprovalFlag ? "Approved" : "Unapproved"}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      {result.id}
                    </td>
                    {selectedColumns.map((columnName) => (
                      <td
                        key={columnName}
                        className={`px-4 border-2 whitespace-normal text-left text-[11px]${columnVisibility[columnName] ? "" : "hidden"
                          }`}
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
    </div>
  );
};

export default AdvanceRequest;
