import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import FinancialModal from "./FinancialModal";
import VEFModal from "./ViewFin";

export const finData = [
  {
    FinID: 1,
    Name: "Systech Solutions Pvt. Ltd",
    ShortName: "SYS",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 2,
    Name: "TechCorp Inc.",
    ShortName: "TCI",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 3,
    Name: "Global Finance Group",
    ShortName: "GFG",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 4,
    Name: "Investment Innovators Ltd.",
    ShortName: "IIL",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 5,
    Name: "Capital Ventures International",
    ShortName: "CVI",
    YearClose: 2021,
    Status: "Active",
  },
  {
    FinID: 6,
    Name: "Alpha Financial Services",
    ShortName: "AFS",
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

  return (
    <div className="p-8">
      <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
        Financial Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Copy
          </button>
          <button className="bg-white  text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            CSV
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Excel
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            PDF
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Print
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-2 px-4 rounded-lg"
              style={{ fontSize: "13px" }}
            >
              Column Visibility
              <Icon
                icon="fe:arrow-down"
                className={`mt-1.5 ml-2 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>
            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-md rounded-lg p-2">
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
                    className="flex items-center capitalize text-xs"
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
                          ? "font-semibold text-xs"
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
        </div>
        <button
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20"
          style={{ fontSize: "13px" }}
        >
          Add Record
        </button>
      </div>
      <FinancialModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4">
        <div className="my-4 rounded-2xl bg-white p-4 pr-12">
          <table className="min-w-full text-center rounded-lg">
            <thead>
              <tr className="bg-blue-200">
                <th
                  className="px-1 font-bold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Actions
                </th>
                <th
                  className=" w-24 px-1 font-bold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  FY ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                    style={{ fontSize: "13px" }}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-20  h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("FinID", e.target.value)
                    }
                  />
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-semibold text-black border-2"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-32 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
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
                              setFid(result.ID); // Pass ID to VEModal
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
                              setFid(result.ID); // Pass ID to VEModal
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
                      <td
                        className="px-4 border-2 whitespace-normal text-center"
                        style={{ fontSize: "11px" }}
                      >
                        {result.FinID}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                          style={{ fontSize: "11px" }}
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
                              setFid(entry.ID); // Pass ID to VEModal
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
                              setFid(entry.ID); // Pass ID to VEModal
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
                      <td
                        className="px-4 border-2 whitespace-normal text-center"
                        style={{ fontSize: "11px" }}
                      >
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
    </div>
  );
};

export default FinMaster;
