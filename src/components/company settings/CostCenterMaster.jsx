import React from "react";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import CostCenterModal from "./CostCenterModal";
import VECost from "./ViewCost";
import axios from "axios";
import { useAuth, useDetails } from "../Login";

export const costCenters = [
  {
    cID: "0003",
    costCenterName: "Human Resources",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0004",
    costCenterName: "IT Department",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0005",
    costCenterName: "Operations",
    Remarks: "",
    status: "N",
  },
  {
    cID: "0006",
    costCenterName: "Research and Development",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0007",
    costCenterName: "Customer Service",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0008",
    costCenterName: "Production",
    Remarks: "",
    status: "N",
  },
  {
    cID: "0009",
    costCenterName: "Quality Assurance",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0010",
    costCenterName: "Supply Chain",
    Remarks: "",
    status: "Y",
  },
  {
    cID: "0011",
    costCenterName: "Legal",
    Remarks: "",
    status: "N",
  },
  {
    cID: "0012",
    costCenterName: "Public Relations",
    Remarks: "",
    status: "Y",
  },
];

const CostCenterMaster = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { token } = useAuth();
  const { companyId } = useDetails();
  console.log(companyId);
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

  //API
  //For API
  const [CC, setCC] = useState([]);

  useEffect(() => {
    fetchCompData();
  }, [token]);

  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/cost-center/FnShowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setCC(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  console.log(CC);

  const handleSearchChange = (searchWord) => {
    // Filter the data based on the search word in the "costCenterName" column
    const newFilteredData = CC.filter((item) =>
      item.cName.toLowerCase().includes(searchWord.toLowerCase())
    );

    // Update the filtered data
    setFilteredData(newFilteredData);
  };

  //For Deletion
  const deleteRecord = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }

    try {
      const apiUrl = `http://localhost:5500/cost-center/FnAddUpdateDeleteRecord`;

      const response = await axios.post(
        apiUrl,
        {
          CostCenterId: DeleteId,
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
  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">Company Settings / Cost Center Master</div>
        <div className="flex gap-4">
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
                                setCCid(result.CostCenterId); // Pass ID to VEModal
                              }}
                            />
                            <Icon
                              icon="mdi:edit"
                              color="#556987"
                              width="20"
                              height="20"
                              onClick={() => {
                                setVeCost(true); // Open VEModal
                                setEdit(false); // Disable edit mode for VEModal
                                setCCid(result.CostCenterId); // Pass ID to VEModal
                              }}
                            />
                            <Icon
                              icon="material-symbols:delete-outline"
                              color="#556987"
                              width="20"
                              height="20"
                              onClick={() => deleteRecord(result.CostCenterId)}
                            />
                          </div>
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                          {result.CostCenterId}
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          {result.CostCenterName}
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          {result.searchWordtatus ? "Active" : "Inactive"}
                        </td>
                      </tr>
                    ))
                  : CC &&
                    CC.length > 0 &&
                    CC.map((entry, index) => (
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
                              setCCid(entry.CostCenterId); // Pass ID to VEModal
                            }}
                            />
                            <Icon
                              icon="mdi:edit"
                              color="#556987"
                              width="20"
                              height="20"
                              onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCCid(entry.CostCenterId); // Pass ID to VEModal
                            }}
                            />
                            <Icon
                              icon="material-symbols:delete-outline"
                              color="#556987"
                              width="20"
                              height="20"
                              onClick={() => deleteRecord(entry.CostCenterId)}
                            />
                          </div>
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                          {entry.CostCenterId}
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          {entry.CostCenterName}
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          {entry.Status ? "Active" : "Inactive"}
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
