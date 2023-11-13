import React from "react";
import { Icon } from "@iconify/react";
import BankModal from "./BankModal";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ViewBank from "./ViewBank";
import { useAuth } from "../Login";

const BankMaster = () => {
  const { token } = useAuth();
  const [columnVisibility, setColumnVisibility] = useState({
    BankId: true,
    BankName: true,
    BranchName: true,
    AccountType: true,
    AccountNo: true,
    IFSCCode: true,
    SwiftCode: false,
    RegisteredEmailId: false,
    RegisteredContactNo: false,
    CurrencyType: false,
    BankGST: false,
    AuthorizedPersonCount: false,
    Remark: false,
    AuthorizedPerson1: false,
    AuthorizedPersonRole1: false,
    AuthorizedPerson2: false,
    AuthorizedPersonRole2: false,
    AuthorizedPerson3: false,
    AuthorizedPersonRole3: false,
    BranchAddress: false,
  });

  const columnNames = {
    BankId: "Bank ID",
    BankName: "Bank Name",
    BranchName: "Branch Name",
    AccountType: "Account Type",
    AccountNo: "Account No",
    IFSCCode: "IFSC Code",
    SwiftCode: "SWIFT Code",
    RegisteredEmailId: "Registered Email",
    RegisteredContactNo: "Registered Contact",
    CurrencyType: "Currency Type",
    BankGST: "Bank GST",
    AuthorizedPersonCount: "Authorized Person Count",
    Remark: "Remark",
    AuthorizedPerson1: "Auth Person 1",
    AuthorizedPersonRole1: "Auth Person 1 Operation",
    AuthorizedPerson2: "Auth Person 2",
    AuthorizedPersonRole2: "Auth Person 2 Operation",
    AuthorizedPerson3: "Auth Person 3",
    AuthorizedPersonRole3: "Auth Person 3 Operation",
  };

  const [banks, setBanks] = useState([]);

  const deleteBank = async (bankid) => {
    alert("Are you sure you want to delete this bank?");
    try {
      const apiUrl = `http://localhost:5500/bankmaster/delete-bank/${bankid}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        console.log(`Bank with ID ${bankid} deleted successfully.`);
        alert("Bank Deleted");
        window.location.reload();
      } else {
        console.error(`Failed to delete bank with ID ${bankid}.`);
      }
    } catch (error) {
      console.error("Error deleting bank:", error);
    }
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/bankmaster/FnShowAllData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setBanks(data);
      } catch (error) {
        console.log("Error while fetching bank data: ", error.message);
      }
    };
    fetchBanks();
  }, [token]);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = banks.filter((item) => {
      const value = item[title];
      return value && value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
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

  const [vebank, setVeBank] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bid, setBid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    const allRows = [...banks, ...filteredData];

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
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">Company Settings / Bank Master</div>
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
      <BankModal visible={isModalOpen} onClick={handleModalClose} />
      <div className="grid gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center rounded-lg whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400 whitespace-normal">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
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
                <th className="p-2 font-bold text-black border-2 whitespace-normal" />
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
            <tbody>
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
                              setVeBank(true);
                              setEdit(false);
                              setBid(result.BankId);
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeBank(true);
                              setEdit(true);
                              setBid(result.BankId);
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteBank(result.BankId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.BankId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                          >
                            {result[columnName]}
                          </td>
                        ) : null
                      )}
                    </tr>
                  ))
                : banks.length > 0 &&
                  banks.map((result, index) => (
                    <tr key={index}>
                      <td className="border-2">
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeBank(true);
                              setEdit(false);
                              setBid(result.BankId);
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setVeBank(true);
                              setEdit(true);
                              setBid(result.BankId);
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteBank(result.BankId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px] capitalize">
                        {result.BankId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                          >
                            {result[columnName]}
                          </td>
                        ) : (
                          <td key={columnName} className="hidden"></td>
                        )
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewBank
        visible={vebank}
        onClick={() => setVeBank(false)}
        edit={edit}
        ID={bid}
      />
    </div>
  );
};

export default BankMaster;
