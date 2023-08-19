import React from "react";
import { Icon } from "@iconify/react";
import BankModal from "./BankModal";
import { useState, useEffect } from "react";

export const bankData = [
  {
    bankId: "0001",
    bankName: "Bank A",
    branchName: "Branch A",
    branchAddress: "Address A",
    accountType: "Savings",
    accountNo: "12345678",
    ifscCode: "ABCD123456",
    swiftCode: "SWIFT123",
    registeredEmail: "email@example.com",
    registeredContact: "+123456789",
    currencyType: "USD",
    bankGst: "GST123",
    authPersonCount: 3,
    remark: "Remark for Bank A",
  },
  {
    bankId: "0002",
    bankName: "Bank B",
    branchName: "Branch B",
    branchAddress: "Address B",
    accountType: "Checking",
    accountNo: "98765432",
    ifscCode: "EFGH567890",
    swiftCode: "SWIFT567",
    registeredEmail: "email2@example.com",
    registeredContact: "+987654321",
    currencyType: "EUR",
    bankGst: "GST456",
    authPersonCount: 2,
    remark: "Remark for Bank B",
  },
  {
    bankId: "0003",
    bankName: "Bank C",
    branchName: "Branch C",
    branchAddress: "Address C",
    accountType: "Savings",
    accountNo: "55555555",
    ifscCode: "WXYZ123456",
    swiftCode: "SWIFT789",
    registeredEmail: "email3@example.com",
    registeredContact: "+9876543210",
    currencyType: "GBP",
    bankGst: "GST789",
    authPersonCount: 1,
    remark: "Remark for Bank C",
  },
  {
    bankId: "0004",
    bankName: "Bank D",
    branchName: "Branch D",
    branchAddress: "Address D",
    accountType: "Checking",
    accountNo: "44444444",
    ifscCode: "PQRS567890",
    swiftCode: "SWIFT101",
    registeredEmail: "email4@example.com",
    registeredContact: "+1122334455",
    currencyType: "AUD",
    bankGst: "GST101",
    authPersonCount: 2,
    remark: "Remark for Bank D",
  },
  {
    bankId: "0005",
    bankName: "Bank E",
    branchName: "Branch E",
    branchAddress: "Address E",
    accountType: "Savings",
    accountNo: "77777777",
    ifscCode: "LMNO123456",
    swiftCode: "SWIFT111",
    registeredEmail: "email5@example.com",
    registeredContact: "+9988776655",
    currencyType: "JPY",
    bankGst: "GST111",
    authPersonCount: 1,
    remark: "Remark for Bank E",
  },
];

const BankMaster = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    bankName: true,
    branchName: true,
    accountType: true,
    accountNo: true,
    ifscCode: true,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = bankData.filter((item) => {
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
      <div className="bg-blue-900 text-white font-bold text-lg py-4 px-8 w-full rounded-lg">
        Bank Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button
            className="bg-white text-blue-900 border border-blue-900 font-bold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Copy
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-bold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            CSV
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-bold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Excel
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-bold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            PDF
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-bold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Print
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-bold py-2 px-4 rounded-lg"
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
                      className="mr-2 "
                      checked={selectedColumns.includes(columnName)}
                      onChange={() => toggleColumn(columnName)}
                    />
                    <span
                      className={
                        selectedColumns.includes(columnName) ? "font-bold" : ""
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
          className="bg-blue-900 text-white font-bold py-2 px-4 rounded-lg mr-20"
          style={{ fontSize: "13px" }}
          onClick={() => setModalOpen(true)}
        >
          Add Bank
        </button>
        <BankModal visible={isModalOpen} onClick={handleModalClose} />
      </div>
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
                  className="px-1 font-bold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Bank ID
                </th>
                {selectedColumns.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 font-bold text-black border-2 border-gray-400 capitalize ${
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
                    className="w-20  h-5 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("bankId", e.target.value)
                    }
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
                      className="w-24 h-5 border-2 border-slate-500 rounded-lg justify-center text-center"
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
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
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
                        className="px-4 border-2 whitespace-normal text-center text-xs"
                        style={{ fontSize: "11px" }}
                      >
                        {result.bankId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left capitalize text-xs ${
                            columnVisibility[columnName] ? "" : "hidden"
                          }`}
                          style={{ fontSize: "11px" }}
                        >
                          {result[columnName]}
                        </td>
                      ))}
                    </tr>
                  ))
                : bankData.map((entry, index) => (
                    <tr key={index}>
                      <td className="border-2">
                        <div className="flex items-center gap-2  text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
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
                        {entry.bankId}
                      </td>
                      {selectedColumns.map((columnName) => (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left capitalize${
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

export default BankMaster;
