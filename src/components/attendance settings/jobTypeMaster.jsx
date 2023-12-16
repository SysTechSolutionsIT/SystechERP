import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import AddJob from "./AddJob";
import ViewJob from "./ViewJob";
import { useAuth } from "../Login";
import axios from "axios";

export const JobTypeData = [
  {
    jobID: 1,
    jobTypeName: "Developer",
    shortname: "DEV",
    ratePerDay: 150,
    rateGroup: "A",
    category: "position",
    position: "Frontend",
    remark: "Experienced in React",
    status: "active",
  },
  {
    jobID: 2,
    jobTypeName: "Designer",
    shortname: "DSN",
    ratePerDay: 120,
    rateGroup: "B",
    category: "position",
    position: "UI/UX",
    remark: "Skilled in Adobe Creative Suite",
    status: "active",
  },
  {
    jobID: 3,
    jobTypeName: "Manager",
    shortname: "MGR",
    ratePerDay: 200,
    rateGroup: "A",
    category: "position",
    position: "Project",
    remark: "Strong leadership skills",
    status: "inactive",
  },
  {
    jobID: 4,
    jobTypeName: "Analyst",
    shortname: "ANA",
    ratePerDay: 130,
    rateGroup: "C",
    category: "standard",
    position: null,
    remark: "Data analysis expertise",
    status: "active",
  },
  {
    jobID: 5,
    jobTypeName: "Tester",
    shortname: "TST",
    ratePerDay: 140,
    rateGroup: "B",
    category: "position",
    position: "Quality Assurance",
    remark: "Thorough testing methodology",
    status: "active",
  },
];

const JobTypeMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal

  const { token } = useAuth();
  //View and Edit
  const [JVE, setJVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Jid, setJid] = useState();

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    JobTypeName: true,
    ShortName: true,
    RateGroup: true,
    RatePerDay: true,
    Category: true,
    Position: true,
    Remark: true,
  });

  const columnNames = {
    JobTypeName: "Job Name",
    ShortName: "Short Name",
    RateGroup: "Rate Group",
    RatePerDay: "Rate Per Day",
    Category: "Category",
    Position: "Position",
    Remark: "Remark",
  };

  //Toggle
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
    const allRows = [...JobTypeData, ...filteredData];

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
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetchJobData();
  }, [token]);

  const fetchJobData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/job-type/FnShowActiveData",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setJob(data);
    } catch (error) {
      console.log("Error while fetching job data: ", error.message);
    }
  };
  console.log(job);

  //Searching -- api
  const handleSearchChange = (title, searchWord) => {
    const searchData = [...job];

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
  const deleteRecord = async (ID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }
    try {
      const apiUrl = `http://localhost:5500/job-type/FnAddUpdateDeleteRecord`;

      const response = await axios.post(
        apiUrl,
        {
          JobTypeId: ID,
          IUFlag: "D",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Record Deleted Successfully") {
        console.log(`Record with ID ${ID} deleted successfully.`);
        alert("Record Deleted");
        window.location.reload();
      } else {
        console.error(`Failed to delete record with ID ${ID}.`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">Attendance Settings / Job Type Master</div>
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
      <AddJob visible={isModalOpen} onClick={() => setModalOpen(false)} />

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
                              setJVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setJid(result.JobTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setJVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setJid(result.JobTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteRecord(result.JobTypeId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.JobTypeId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                          >
                            {columnName === "status"
                              ? result[columnName]
                                ? "Active"
                                : "Inactive"
                              : result[columnName]}
                          </td>
                        ) : null
                      )}
                    </tr>
                  ))
                : job.length > 0 &&
                  job.map((result, index) => (
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
                              setJVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setJid(result.JobTypeId); // Pass ID to VEModal
                            }}
                          />

                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setJVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setJid(result.JobTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteRecord(result.JobTypeId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.JobTypeId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] ${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                        >
                          {columnName === "status"
                            ? result[columnName]
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
      <ViewJob
        visible={JVE}
        onClick={() => setJVE(false)}
        edit={edit}
        ID={Jid}
      />
    </div>
  );
};

export default JobTypeMaster;
