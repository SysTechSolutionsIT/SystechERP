import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import ViewWeek from "./viewWeek";
import axios from "axios";
import AddWeek from "./AddWeek";
import { useAuth } from "../Login";

export const WeeklyOffData = [
  {
    weekID: 1,
    weeklyOff: "Sunday",
    remark: "Weekend",
    status: "active",
  },
  {
    weekID: 2,
    weeklyOff: "Saturday",
    remark: "Weekend",
    status: "active",
  },
  {
    weekID: 3,
    weeklyOff: "Wednesday",
    remark: "Midweek",
    status: "active",
  },
  {
    weekID: 4,
    weeklyOff: "Thursday",
    remark: "Midweek",
    status: "inactive",
  },
  {
    weekID: 5,
    weeklyOff: "Monday",
    remark: "",
    status: "active",
  },
  {
    weekID: 6,
    weeklyOff: "Tuesday",
    remark: "",
    status: "inactive",
  },
  {
    weekID: 7,
    weeklyOff: "Friday",
    remark: "Weekend",
    status: "active",
  },
  {
    weekID: 8,
    weeklyOff: "Thursday",
    remark: "",
    status: "inactive",
  },
];

const WeeklyOffMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal

  const { token } = useAuth();
  //View and Edit
  const [WVE, setWVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [weekID, setweekID] = useState();

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    weeklyOffName: true,
    remarks: false,
    status: true,
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
    const allRows = [...WeeklyOffData, ...filteredData];

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

  //API
  //For API
  const [Weeks, setWeeks] = useState([]);

  useEffect(() => {
    fetchCompData();
  }, []);

  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/weekly-off-master/get",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setWeeks(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  console.log(Weeks);

  const handleSearchChange = (title, searchWord) => {
    const searchData = [...Weeks];

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

  //Deletion
  const deleteRecord = async (weekID) => {
    alert("Are you sure you want to delete this bank?");
    try {
      const apiUrl = `http://localhost:5500/weekly-off-master/delete/${weekID}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        console.log(`record with ID ${weekID} deleted successfully.`);
        alert("record Deleted");
        window.location.reload();
      } else {
        console.error(`Failed to delete record with ID ${weekID}.`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">
          Attendance Settings / Week Off Master
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`ml-2 ${showDropdown ? "rotate-180" : ""} cursor-pointer`}
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
      <AddWeek visible={isModalOpen} onClick={() => setModalOpen(false)} />

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
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 capitalize whitespace-normal max-w-xs ${columnVisibility[columnName] ? "" : "hidden"
                          }`}
                      >
                        {columnName
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .split(" ")
                          .map((word, index) => (
                            <div key={index} className="whitespace-nowrap">
                              {word}
                            </div>
                          ))}
                      </th>
                    )
                )}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-bold text-black border-2 " />
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className="p-2 font-bold text-black border-2 text-[11px] capitalize"
                      >
                        <input
                          type="text"
                          placeholder={`Search `}
                          className="w-auto text-[11px] h-6 border-2 border-slate-500 rounded-lg justify-center text-center whitespace-normal"
                          style={{
                            maxWidth: getColumnMaxWidth(columnName) + "px",
                          }}
                          onChange={(e) =>
                            handleSearchChange(columnName, e.target.value)
                          }
                        />
                      </th>
                    )
                )}
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
                          className="cursor-pointer"
                          onClick={() => {
                            setWVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setweekID(result.weekID); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setWVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setweekID(result.weekID); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteRecord(result.weekID)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {result.weekID}
                    </td>
                    {selectedColumns.map(
                      (columnName) =>
                        columnVisibility[columnName] && (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-[11px] text-left${columnVisibility[columnName] ? "" : "hidden"
                              }`}
                          >
                            {columnName === "status"
                              ? result.status
                                ? "Active"
                                : "Inactive"
                              : result[columnName]}
                          </td>
                        )
                    )}
                  </tr>
                ))
                : Weeks.length > 0 &&
                Weeks.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setWVE(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setweekID(entry.weekID); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setWVE(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setweekID(entry.weekID); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteRecord(entry.weekID)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                      {entry.weekID}
                    </td>
                    {selectedColumns.map(
                      (columnName) =>
                        columnVisibility[columnName] && (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px]${columnVisibility[columnName] ? "" : "hidden"
                              }`}
                          >
                            {columnName === "status"
                              ? entry.status
                                ? "Active"
                                : "Inactive"
                              : entry[columnName]}
                          </td>
                        )
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewWeek
        visible={WVE}
        onClick={() => setWVE(false)}
        edit={edit}
        ID={weekID}
      />
    </div>
  );
};

export default WeeklyOffMaster;
