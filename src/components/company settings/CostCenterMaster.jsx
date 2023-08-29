import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import CostCenterModal from "./CostCenterModal";
import VECost from "./ViewCost";

export const costCenters = [
  {
    costCenterID: "0003",
    costCenterName: "Human Resources",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0004",
    costCenterName: "IT Department",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0005",
    costCenterName: "Operations",
    Remarks: "",
    status: "N",
  },
  {
    costCenterID: "0006",
    costCenterName: "Research and Development",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0007",
    costCenterName: "Customer Service",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0008",
    costCenterName: "Production",
    Remarks: "",
    status: "N",
  },
  {
    costCenterID: "0009",
    costCenterName: "Quality Assurance",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0010",
    costCenterName: "Supply Chain",
    Remarks: "",
    status: "Y",
  },
  {
    costCenterID: "0011",
    costCenterName: "Legal",
    Remarks: "",
    status: "N",
  },
  {
    costCenterID: "0012",
    costCenterName: "Public Relations",
    Remarks: "",
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

  const [veCost, setVeCost] = useState(false);
  const [edit, setEdit] = useState(false);
  const [CCid, setCCid] = useState();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    const allRows = [...costCenters];

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
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="mr-auto text-[15px] whitespace-normal">
            Company Settings / Cost Center Master
          </div>
          <div className="relative sticky lg:ml-96 sm:ml-8">
            <button
              className="text-white font-semibold py-1 px-4 rounded-lg text-[13px] border border-white"
              onClick={() => setModalOpen(true)}
            >
              Add Record
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2 mr-96">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="carbon:menu" color="white" width="27" height="27" />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col absolute lg:top-[16%] lg:right-[23%] bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
            >
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
                Copy
              </button>
              <button className="bg-white text-[13px] text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-1 px-4 rounded-lg mb-2">
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
      <CostCenterModal
        visible={isModalOpen}
        onClick={() => setModalOpen(false)}
      />
      <div className="grid gap-4  justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className=" w-auto px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  ID
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Cost Center Name
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Status
                </th>
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2 " />
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{
                      maxWidth: getColumnMaxWidth("costCenterName") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("costCenterName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("status") + "px" }}
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
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCCid(result.costCenterID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setCCid(result.costCenterID); // Pass ID to VEModal
                            }}
                          />
                          <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
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
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCCid(entry.costCenterID); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setCCid(entry.costCenterID); // Pass ID to VEModal
                            }}
                          />
                          <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
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
