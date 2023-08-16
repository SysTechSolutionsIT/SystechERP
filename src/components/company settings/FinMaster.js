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
    <div className="p-4">
      <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
        Financial Year Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
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
        <button className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20">
          Add Company
        </button>
      </div>

      <div className="grid gap-4">
        <div className="my-8 rounded-2xl bg-white p-4">
          <table className="min-w-full text-center">
            <thead className="border-b-2">
              <tr>
                <th className="p-2 font-semibold text-black">Actions</th>
                <th className="p-2 font-semibold text-black">
                  Financial Year ID
                </th>
                <th className="p-2 font-semibold text-black">Name</th>
                <th className="p-2 font-semibold text-black">ShortName</th>
                <th className="p-2 font-semibold text-black">Year Close</th>
                <th className="p-2 font-semibold text-black">Status</th>
              </tr>
              <tr>
                <th></th>
                <th className="p-2 font-semibold text-black ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-28 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("FinID", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-28 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) => handleSearchChange("Name", e.target.value)}
                  />
                </th>
                <th className="p-2 font-semibold text-black">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("ShortName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32  border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("YearClose", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32  border-2 border-slate-500 rounded-lg justify-center text-center"
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
                      <td>
                        <div className="flex items-center">
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
                      <td className="p-2">{result.ID}</td>
                      <td className="p-2">{result.Name}</td>
                      <td className="p-2">{result.ShortName}</td>
                      <td className="p-2">{result.SectorDetails}</td>
                      <td className="p-2">{result.NatureOfBusiness}</td>
                      <td className="p-2">{result.Status}</td>
                      <td className="p-2">{result.CreatedBy}</td>
                      <td className="p-2">{result.CreatedOn}</td>
                      <td className="p-2">{result.ModifiedBy}</td>
                    </tr>
                  ))
                : finData.map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-2">
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
                      <td className="p-2">{entry.FinID}</td>
                      <td className="p-2">{entry.Name}</td>
                      <td className="p-2">{entry.ShortName}</td>
                      <td className="p-2">{entry.YearClose}</td>
                      <td className="p-2">{entry.Status}</td>
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
