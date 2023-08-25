import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import FinancialModal from "./FinancialModal";
import VEFModal from "./ViewFin";

export const finData = [
  {
    FinID: 1,
    Name: "Systech Solutions Pvt. Ltd",
    ShortName: "SYS",
    YearClose: 2021,
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    Status: "Active",
  },
  {
    FinID: 2,
    Name: "TechCorp Inc.",
    ShortName: "TCI",
    YearClose: 2021,
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    Status: "Active",
  },
  {
    FinID: 3,
    Name: "Global Finance Group",
    ShortName: "GFG",
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 4,
    Name: "Investment Innovators Ltd.",
    ShortName: "IIL",
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 5,
    Name: "Capital Ventures International",
    ShortName: "CVI",
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 6,
    Name: "Alpha Financial Services",
    ShortName: "AFS",
    StartDate: 22 / 1 / 22,
    EndDate: 10 / 8 / 22,
    Remark: "text",
    YearClose: 2021,
    Status: "Active",
  },
];

const FinMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [veFin, setFin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Fid, setFid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = finData.filter((item) => {
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
    Name: true,
    ShortName: true,
    YearClose: true,
    Status: true,
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
    const allRows = [...finData, ...filteredData];

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
          <div className="mr-auto">Company Settings / Financial Master</div>
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
            Add Record
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
      <FinancialModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4 justify-center">
        <div className="my-4 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 "></th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-semibold text-black border-2"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
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
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setFin(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setFid(result.FinID); // Pass ID to VEModal
                            }}
                          />
                          <VEFModal
                            visible={veFin}
                            onClick={() => setFin(false)}
                            edit={edit}
                            ID={Fid}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setFin(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setFid(result.FinID); // Pass ID to VEModal
                            }}
                          />
                          <VEFModal
                            visible={veFin}
                            onClick={() => setFin(false)}
                            edit={edit}
                            ID={Fid}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.FinID}
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
                : finData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setFin(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setFid(entry.FinID); // Pass ID to VEModal
                            }}
                          />
                          <VEFModal
                            visible={veFin}
                            onClick={() => setFin(false)}
                            edit={edit}
                            ID={Fid}
                          />

                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setFin(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setFid(entry.FinID); // Pass ID to VEModal
                            }}
                          />
                          <VEFModal
                            visible={veFin}
                            onClick={() => setFin(false)}
                            edit={edit}
                            ID={Fid}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.FinID}
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

export default FinMaster;
