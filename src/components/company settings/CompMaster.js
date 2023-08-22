import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CompanyModal from "./CompanyModal";
import VEModal from "./ViewComp";
export const compData = [
  {
    ID: 1,
    Name: "Systech Solutions Pvt. Ltd",
    ShortName: "SYS",
    SectorDetails: "Automation",
    NatureOfBusiness: "Electrical Automission",
    Status: "Active",
    CreatedBy: "User123",
    CreatedOn: "2023-08-15",
    ModifiedBy: "User123",
  },
  {
    ID: 2,
    Name: "5S Innovations LLP",
    ShortName: "5SL",
    SectorDetails: "Information Technology",
    NatureOfBusiness: "B2B",
    Status: "Active",
    CreatedBy: "User456",
    CreatedOn: "2023-08-15",
    ModifiedBy: "User456",
  },
  {
    ID: 3,
    Name: "Healtech",
    ShortName: "HLT",
    SectorDetails: "Healthcare",
    NatureOfBusiness: "Software Service",
    Status: "Active",
    CreatedBy: "User789",
    CreatedOn: "2023-08-14",
    ModifiedBy: "User789",
  },
  {
    ID: 4,
    Name: "Company D",
    ShortName: "Co. D",
    SectorDetails: "Retail",
    NatureOfBusiness: "E-commerce",
    Status: "InActive",
    CreatedBy: "User123",
    CreatedOn: "2023-08-14",
    ModifiedBy: "User123",
  },
  {
    ID: 5,
    Name: "Company E",
    ShortName: "Co. E",
    SectorDetails: "Manufacturing",
    NatureOfBusiness: "ZZZZ",
    Status: "Inactive",
    CreatedBy: "User456",
    CreatedOn: "2023-08-13",
    ModifiedBy: "User456",
  },
];

const CompMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [VE, setVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Cid, setCid] = useState();

  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    ShortName: true,
    SectorDetails: true,
    NatureOfBusiness: true,
    Status: true,
    CreatedBy: true,
    CreatedOn: true,
    ModifiedBy: true,
  });

  const handleSearchChange = (title, searchWord) => {
    const newFilter = compData.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
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

  return (
    <div className="p-4">
      <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
        Company Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Copy
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            CSV
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Excel
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            PDF
          </button>
          <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
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
                    className="flex items-center capitalize"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 "
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
            className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
            onClick={() => setModalOpen(true)}
          >
            Add Company
          </button>
        </div>
      </div>
      <CompanyModal visible={isModalOpen} onClick={() => setModalOpen(false)} />

      <div className="grid gap-2">
        <div className="my-4 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center">
            <thead className="border-b-2">
              <tr>
                <th
                  className="px-1 font-bold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Actions
                </th>
                <th
                  className="w-24 px-1 font-bold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Company ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
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
                    onChange={(e) => handleSearchChange("ID", e.target.value)}
                  />
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className="p-2 font-bold text-black border-2"
                  >
                    <input
                      type="text"
                      placeholder={`Search `}
                      className="w-24 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
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
                              setVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCid(result.ID); // Pass ID to VEModal
                            }}
                          />
                          <VEModal
                            visible={VE}
                            onClick={() => setVE(false)}
                            edit={edit}
                            ID={Cid}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setCid(result.ID); // Pass ID to VEModal
                            }}
                          />
                          <VEModal
                            visible={VE}
                            onClick={() => setVE(false)}
                            edit={edit}
                            ID={Cid}
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
                        {result.ID}
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
                : compData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCid(entry.ID); // Pass ID to VEModal
                            }}
                          />
                          <VEModal
                            visible={VE}
                            onClick={() => setVE(false)}
                            edit={edit}
                            ID={Cid}
                          />

                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setCid(entry.ID); // Pass ID to VEModal
                            }}
                          />
                          <VEModal
                            visible={VE}
                            onClick={() => setVE(false)}
                            edit={edit}
                            ID={Cid}
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
                        {entry.ID}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                          style={{ fontSize: "11px" }}
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

export default CompMaster;
