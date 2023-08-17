import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

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

  return (
    <div className="p-8">
      <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
        Financial Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Copy
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            CSV
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Excel
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            PDF
          </button>
          <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
            Print
          </button>
          <button className="flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-2 px-4 rounded-lg">
            Column Visibility
            <Icon icon="fe:arrow-up" className="mt-1.5 ml-2" rotate={2} />
          </button>
        </div>
        <button
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20"
          // onClick={() => setModalOpen(true)}
        >
          Add Company
        </button>
      </div>
      {/* <DepartmentModal
      visible={isModalOpen}
      onClick={() => setModalOpen(false)}
    /> */}
      <div className="grid gap-4">
        <div className="my-4 rounded-2xl bg-white p-4 pr-12">
          <table className="min-w-full text-center rounded-lg">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  FY ID
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Name
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  ShortName
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Year Close
                </th>
                <th className="px-1 font-semibold text-black border-2 border-gray-400">
                  Status
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
                      handleSearchChange("FinID", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) => handleSearchChange("Name", e.target.value)}
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("ShortName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32  border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("YearClose", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("Status", e.target.value)
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
                        {result.FinID}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {result.Name}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {result.ShortName}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {result.YearClose}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {result.Status}
                      </td>
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
                        {entry.FinID}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {entry.Name}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {entry.ShortName}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {entry.YearClose}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left">
                        {entry.Status}
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

export default FinMaster;
