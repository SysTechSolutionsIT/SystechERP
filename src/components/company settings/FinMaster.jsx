import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import FinancialModal from "./FinancialModal";
import VEFModal from "./ViewFin";
import axios from "axios";
import { useAuth } from "../Login";
import NoDataNotice from "../NoDataNotice";

const FinMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [veFin, setFin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Fid, setFid] = useState();

  const { token } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    Name: true,
    StartDate: true,
    EndDate: true,
    ShortName: true,
    YearClose: true,
    Remark: false,
  });

  const columnNames = {
    Name: "Financial Year",
    StartDate: "Start Date",
    EndDate: "End Date",
    ShortName: "Short Name",
    YearClose: "Year Close",
    Remark: "Remark",
  };

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
    const allRows = [...Fins, ...filteredData];

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
  const [Fins, setFins] = useState([]);

  useEffect(() => {
    fetchFinData();
  }, [token, isModalOpen]);

  const fetchFinData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/financials/FnShowActiveData"
      );
      if (response.status === 200) {
        const data = response.data;
        setFins(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(
        "Error while fetching financial year data: ",
        error.message
      );
    }
  };
  console.log(Fins);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = Fins.filter((item) => {
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

  //Editing Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get only the date part
  };

  //Deletion
  const deleteRecord = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }

    try {
      const apiUrl = `http://localhost:5500/financials/FnAddUpdateDeleteRecord`;

      const response = await axios.post(
        apiUrl,
        {
          FYearId: DeleteId,
          IUFlag: "D",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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


    const convertDate = (dateStr) => {
      // Convert string to Date object
      const dateObj = new Date(dateStr);
      
      // Extract day, month, and year
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // Months are zero-based
      const year = dateObj.getFullYear();
      
      // Return formatted date with dash separators
      return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">Company Settings / Financial Master</div>
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
            <div
              ref={menuRef}
              className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50 top-[calc(100% + 10px)]"
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
      <FinancialModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      {Fins.length === 0 ? (
        <div className="flex justify-center items-center">
          <NoDataNotice Text="No Financial Year Data Yet" visible={isModalOpen} />
        </div>
      ) : (
      <div className="grid gap-2 justify-between">
        <div className="rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 text-[13px] ${
                      columnVisibility[columnName] ? "" : "hidden"
                    }`}
                  >
                    {columnNames[columnName]}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="border-2"></th>
                {selectedColumns.map(
                  (columnName) =>
                    columnVisibility[columnName] && (
                      <th
                        key={columnName}
                        className="p-2 font-bold text-black border-2 "
                        style={{
                          maxWidth: getColumnMaxWidth(columnName) + "px",
                        }} // Set your preferred min-width
                      >
                        <input
                          type="text"
                          placeholder={`Search `}
                          className="w-full h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
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
              {filteredData.length > 0 ? (
                filteredData.map((result, key) => (
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
                            setFin(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setFid(result.FYearId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setFin(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setFid(result.FYearId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteRecord(result.FYearId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.CompanyId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                        {columnName === "StartDate" || columnName === "EndDate" ? (
                          convertDate(result[columnName])
                        ) : (
                          result[columnName] === "1" ? "Yes" :
                          result[columnName] === "0" ? "No" :
                          result[columnName] === null ? "N/A" :
                          result[columnName]
                        )}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData.length === 0 &&
                Fins &&
                Fins.length > 0 ? (
                Fins.map((result, key) => (
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
                            setFin(true); // Open VEModal
                            setEdit(false); // Disable edit mode for VEModal
                            setFid(result.FYearId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => {
                            setFin(true); // Open VEModal
                            setEdit(true); // Disable edit mode for VEModal
                            setFid(result.FYearId); // Pass ID to VEModal
                          }}
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteRecord(result.FYearId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.CompanyId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                        {columnName === "StartDate" || columnName === "EndDate" ? (
                          convertDate(result[columnName])
                        ) : (
                          result[columnName] === "1" ? "Yes" :
                          result[columnName] === "0" ? "No" :
                          result[columnName] === null ? "N/A" :
                          result[columnName]
                        )}
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
      )}
      <VEFModal
        visible={veFin}
        onClick={() => setFin(false)}
        edit={edit}
        ID={Fid}
      />
    </div>
  );
};

export default FinMaster;
