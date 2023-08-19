import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CostCenterModal from "./CostCenterModal";

export const costCenters = [
  {
    costCenterID: "0003",
    costCenterName: "Human Resources",
    status: "Y",
  },
  {
    costCenterID: "0004",
    costCenterName: "IT Department",
    status: "Y",
  },
  {
    costCenterID: "0005",
    costCenterName: "Operations",
    status: "N",
  },
  {
    costCenterID: "0006",
    costCenterName: "Research and Development",
    status: "Y",
  },
  {
    costCenterID: "0007",
    costCenterName: "Customer Service",
    status: "Y",
  },
  {
    costCenterID: "0008",
    costCenterName: "Production",
    status: "N",
  },
  {
    costCenterID: "0009",
    costCenterName: "Quality Assurance",
    status: "Y",
  },
  {
    costCenterID: "0010",
    costCenterName: "Supply Chain",
    status: "Y",
  },
  {
    costCenterID: "0011",
    costCenterName: "Legal",
    status: "N",
  },
  {
    costCenterID: "0012",
    costCenterName: "Public Relations",
    status: "Y",
  },
];

const CostCenterMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = costCenters.filter((item) => {
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
        Cost Center Master
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Copy
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            CSV
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Excel
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            PDF
          </button>
          <button
            className="bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg"
            style={{ fontSize: "13px" }}
          >
            Print
          </button>
        </div>
        <button
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20"
          onClick={() => setModalOpen(true)}
          style={{ fontSize: "13px" }}
        >
          Add
        </button>
      </div>
      <CostCenterModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4">
        <div className="my-2 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center">
            <thead>
              <tr className="bg-blue-200">
                <th
                  className=" w-16 px-1 font-semibold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Actions
                </th>
                <th
                  className=" w-10 px-1 font-semibold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  CC ID
                </th>
                <th className="w-28 px-1 font-semibold text-black text-[13px] border-2 border-gray-400">
                  Cost Center Name
                </th>
                <th
                  className="w-10 px-1 font-semibold text-black border-2 border-gray-400"
                  style={{ fontSize: "13px" }}
                >
                  Status
                </th>
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2 ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-20  h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("costCenterID", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("costCenterName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-20 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                    onChange={(e) =>
                      handleSearchChange("status", e.target.value)
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
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.costCenterID}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.costCenterName}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.status}
                      </td>
                    </tr>
                  ))
                : costCenters.map((entry, index) => (
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
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.costCenterID}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.costCenterName}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.status}
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

export default CostCenterMaster;
