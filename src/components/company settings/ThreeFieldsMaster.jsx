import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import ThreeFieldsModal from "./ThreeFieldsModal";
import ViewThreeF from "./ViewThreeF";
import axios from "axios";
import { useAuth } from "../Login";

export const ThreeFData = [
  {
    ID: 2,
    MasterName: "CompanySector",
    FieldDetails1: "Information Technology",
    FieldDetails2: "Graphics",
    Status: "Y",
  },
];

const ThreeFieldsMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { token } = useAuth();

  // View and Edit
  const [veTf, setVeTf] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setid] = useState();

  // Hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    masterName: true,
    fieldDetails1: true,
    fieldDetails2: true,
    remark: true,
    Status: true,
  });

  // Toggle
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
    const allRows = [...ThreeFData, ...filteredData];

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

  // API
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchThreeFieldData();
  }, []);

  const fetchThreeFieldData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/threefieldmaster/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setFields(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  console.log(fields);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...fields];
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

  //For Deletion
  const deleteRecord = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }

    try {
      const apiUrl = `http://localhost:5500/threefieldmaster/delete/${DeleteId}`;

      const response = await axios.post(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === "Record Deleted Successfully") {
        console.log(`Record with ID ${DeleteId} deleted successfully.`);
        alert("Record Deleted");
        window.location.reload();
      } else {
        console.error(`Failed to delete record with ID ${DeleteId}.`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Company Settings / Three Field Master
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
            Add Entry
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
      <ThreeFieldsModal
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
                              setVeTf(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setid(result.id); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeTf(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setid(result.id); // Pass ID to VEModal
                            }}
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
                      <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                        {result.id}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 text-[11px] border-2 whitespace-normal text-left${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {
                            result[
                              columnName.charAt(0).toLowerCase() +
                                columnName.slice(1)
                            ]
                          }
                        </td>
                      ))}
                    </tr>
                  ))
                : fields.length > 0 &&
                  fields.map((result, index) => (
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
                              setVeTf(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setid(result.id); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            className="cursor-pointer"
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeTf(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setid(result.id); // Pass ID to VEModal
                            }}
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
                      <td className="px-4 text-[11px] text-center border-2 whitespace-normal">
                        {result.id}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 text-[11px] border-2 whitespace-normal ${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {
                            result[
                              columnName.charAt(0).toLowerCase() +
                                columnName.slice(1)
                            ]
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewThreeF
        visible={veTf}
        onClick={() => setVeTf(false)}
        edit={edit}
        ID={id}
      />
    </div>
  );
};

export default ThreeFieldsMaster;
