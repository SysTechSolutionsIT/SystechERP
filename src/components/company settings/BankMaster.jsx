import React from "react";
import { Icon } from "@iconify/react";
import BankModal from "./BankModal";
import { useState } from "react";

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
  return (
    <div className="p-8">
      <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
        Bank Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg">
            Copy
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg">
            CSV
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg">
            Excel
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg">
            PDF
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg">
            Print
          </button>
        </div>
        <button
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20"
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
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Bank ID
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Bank Name
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Branch Name
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Account Type
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Account No
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  IFSC Code
                </th>
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2 ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("bankId", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("bankName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("branchName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32  border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("accountType", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("accountNo", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("ifscCode", e.target.value)
                    }
                  />
                </th>
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
                    <td className="px-4 border-2 whitespace-normal text-center">
                      {result.bankId}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {result.bankName}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {result.branchName}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {result.accountType}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {result.accountNo}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {result.ifscCode}
                    </td>
                  </tr>
                ))
                : bankData.map((entry, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-2  text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="27"
                          height="27"
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="27"
                          height="27"
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="27"
                          height="27"
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-center">
                      {entry.bankId}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {entry.bankName}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {entry.branchName}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {entry.accountType}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {entry.accountNo}
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left">
                      {entry.ifscCode}
                    </td>
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
