import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import TwoFieldsModal from "./TwoFieldsModal";
import ViewTwoF from "./ViewTwoF";
import axios from "axios";
import { useAuth } from "../Login";

const TwoFieldsMaster = () => {
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

  const [MNames, setMNames] = useState([]);
  useEffect(() => {
    fetchMasterNamesData();
  }, [token]);

  const fetchMasterNamesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/master-names/FnshowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      const tempMap = {};
      data.forEach((item) => {
        tempMap[item.MasterId] = item.MasterName;
      });
      console.log("temp map", tempMap);
      setMNames(tempMap);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  const [columnVisibility, setColumnVisibility] = useState({
    FieldDetails: true,
    MasterNameId: true,
    AcFlag: true,
  });

  const columnNames = {
    FieldDetails: "Field Details",
    MasterNameId: "Master Name",
    AcFlag: "Status",
  };

  // Getting Master Names

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
        setShowDropdown(false);
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
    const allRows = [...fields, ...filteredData];

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
    fetchTwoFieldData();
  }, [token, isModalOpen]);

  const fetchTwoFieldData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/two-field/FnshowActiveData",
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
    const newFilter = fields.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else if (searchWord !== "" && newFilter.length === 0) {
      setFilteredData(["NA"]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Company Settings / Two Field Master
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
            <div
              ref={menuRef}
              className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50"
            >
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
      <TwoFieldsModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="gap-4 justify-between flex">
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
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 " />
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
              {filteredData.length > 0 ? (
                filteredData.map((result, key) => (
                  <tr key={key}>
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
                            setid(result.FieldId); // Pass ID to VEModal
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
                            setid(result.FieldId); // Pass ID to VEModal
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
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.FieldId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "MasterNameId"
                            ? MNames[result[columnName]]
                            : result[columnName]}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData.length === 0 && fields && fields.length > 0 ? (
                fields.map((result, key) => (
                  <tr key={key}>
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
                            setid(result.FieldId); // Pass ID to VEModal
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
                            setid(result.FieldId); // Pass ID to VEModal
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
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.FieldId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "MasterNameId"
                            ? MNames[result[columnName]]
                            : result[columnName]}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData[0] == "NA" ? (
                <tr>
                  <td className="text-center">No results</td>
                </tr>
              ) : (
                <tr>
                  <td className="hidden">No Results</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ViewTwoF
        visible={veTf}
        onClick={() => setVeTf(false)}
        edit={edit}
        ID={id}
      />
    </div>
  );
};

export default TwoFieldsMaster;
