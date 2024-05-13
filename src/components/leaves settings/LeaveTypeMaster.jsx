import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import ViewLeave from "./ViewLeave";
import AddLeave from "./AddLeave";
import axios from "axios";
import { useAuth, useDetails } from "../Login";
import NoDataNotice from "../NoDataNotice";

const LeaveTypeMaster = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [leaveData, setLeaveData] = useState([]);
  const { token } = useAuth();
  const { fYear } = useDetails();
  const [Employees, setEmployees] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [FinancialYears, setFinancialYears] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeTypeId, setEmployeeTypeId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeGroup, setEmployeeTypeGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  //View and Edit
  const [LVE, setLVE] = useState(false);
  const [edit, setEdit] = useState(false);
  const [LeaveId, setLeaveId] = useState();

  const deleteLeaveType = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Leave Type?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }
    try {
      const response = await axios.post(
        "http://localhost:5500/leave-type/FnAddUpdateDeleteRecord",
        {
          LeaveTypeId: DeleteId,
          IUFlag: "D",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Leave Type Deleted");
      fetchLeaveType();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchLeaveType = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/leave-type/FnShowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setLeaveData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchLeaveType();
  }, [token, isModalOpen]);

  //Hamburger Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({
    LeaveType: true,
    ShortName: true,
    DefaultBalance: true,
    MaxPerMonth: true,
    PaidFlag: true,
    CarryForwardFlag: true,
    Remarks: false,
  });

  const columnNames = {
    LeaveType: "Leave Type",
    ShortName: "Short Name",
    DefaultBalance: "Default Balance",
    MaxPerMonth: "Max Per Month",
    PaidFlag: "Paid Flag",
    CarryForwardFlag: "Carry Forward Flag",
    Remarks: "Remarks",
  };

  const handleSearchChange = (title, searchWord) => {
    const newFilter = leaveData.filter((item) => {
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
  //Toggle
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

  //Menu
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
    const allRows = [...leaveData, ...filteredData];

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

  useEffect(() => {
    const selectedEmployeeType = employeeTypes.find(
      (type) => type.EmployeeTypeId === employeeTypeId
    );

    if (selectedEmployeeType) {
      setEmployeeType(selectedEmployeeType.ShortName);
    }
  }, [employeeTypeId, employeeTypes]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployees();
  }, [token]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnAllEmployeeLeaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token, isModalOpen]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  useEffect(() => {
    const fetchFinancialYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/financials/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Financial Years", data);
        setFinancialYears(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchFinancialYears();
  }, [token]);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const addLeaveBalancesForAllEmployees = async (employeesData) => {
    try {
      const currentYear = new Date().getFullYear();

      const leaveBalancesPayload = employeesData
        .map((employee) => {
          const {
            EmployeeId,
            EmployeeTypeId,
            EmployeeTypeGroupId,
            EmployeeName,
          } = employee;
          const selectedEmployeeType = employeeTypes.find(
            (type) => type.EmployeeTypeId === EmployeeTypeId
          );

          const employeeType = selectedEmployeeType
            ? selectedEmployeeType.ShortName
            : "";

          return LeaveTypes.map(
            ({ LeaveTypeId, ShortName, DefaultBalance }) => ({
              FYear: fYear,
              EmployeeId: EmployeeId,
              EmployeeTypeId: EmployeeTypeId,
              EmployeeType: employeeType,
              EmployeeTypeGroup: EmployeeTypeGroupId,
              LeaveTypeId: LeaveTypeId,
              LeaveTypeDesc: ShortName,
              Month: new Date().getMonth() + 1,
              Year: currentYear,
              LeaveBalanceDate: formattedDate,
              EmployeeName: EmployeeName,
              OpeningBalance: DefaultBalance,
              LeaveEarned1: 0,
              LeaveEarned2: 0,
              LeaveEarned3: 0,
              LeaveEarned4: 0,
              LeaveEarned5: 0,
              LeaveEarned6: 0,
              LeaveEarned7: 0,
              LeaveEarned8: 0,
              LeaveEarned9: 0,
              LeaveEarned10: 0,
              LeaveEarned11: 0,
              LeaveEarned12: 0,
              SanctionLeaveDays: 0,
              LeaveBalance: DefaultBalance,
              Remark: "",
              IUFlag: "I",
            })
          );
        })
        .flat();

      console.log(leaveBalancesPayload);

      const confirmAdd = window.confirm(
        "Are you sure you want to generate leaves for all employees?"
      );

      if (!confirmAdd) return;

      const response = await axios.post(
        "http://localhost:5500/leave-balance/FnAddUpdateDeleteRecord",
        leaveBalancesPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Leave Balances Generated");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="mr-auto text-[15px]">
          Leaves Management / Leave Type Master
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-white border-2 border-white text-blue-900 text-[13px] font-semibold py-0 px-4 rounded-lg hover:bg-blue-900 hover:text-white hover:ease-in-out duration-300"
            onClick={() => addLeaveBalancesForAllEmployees(Employees)}
          >
            Generate Leaves
          </button>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
          >
            Column Visibility
            <Icon
              icon="fe:arrow-down"
              className={`mt-1.5 ml-2 ${
                showDropdown ? "rotate-180" : ""
              } cursor-pointer`}
            />
          </button>
          {showDropdown && (
            <div
              ref={menuRef}
              className="absolute top-32 bg-white border border-gray-300 shadow-md rounded-lg p-2 z-50"
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
      <AddLeave visible={isModalOpen} onClick={() => setModalOpen(false)} />
      {leaveData.length === 0 ? (
        <div className="flex justify-center items-center">
          <NoDataNotice Text="No Leave Type Data Yet" visible={isModalOpen} />
        </div>
      ) : (
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
                        className="p-2 font-semibold text-black border-2 whitespace-normal"
                      >
                        <input
                          type="text"
                          placeholder={`Search `}
                          className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px] whitespace-normal"
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
                              setLVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setLeaveId(result.LeaveTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setLVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setLeaveId(result.LeaveTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteLeaveType(result.LeaveTypeId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.LeaveTypeId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 text-[11px] border-2 whitespace-normal text-left${
                              columnVisibility[columnName] ? "" : "hidden"
                            }`}
                          >
                            {result[columnName]}
                          </td>
                        ) : (
                          <td key={columnName} className="hidden"></td>
                        )
                      )}
                    </tr>
                  ))
                ) : filteredData.length === 0 &&
                  leaveData &&
                  leaveData.length > 0 ? (
                  leaveData.map((entry, index) => (
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
                              setLVE(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setLeaveId(entry.LeaveTypeId); // Pass ID to VEModal
                            }}
                          />

                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => {
                              setLVE(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setLeaveId(entry.LeaveTypeId); // Pass ID to VEModal
                            }}
                          />
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => deleteLeaveType(entry.LeaveTypeId)}
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {entry.LeaveTypeId}
                      </td>
                      {selectedColumns.map((columnName) =>
                        columnVisibility[columnName] ? (
                          <td
                            key={columnName}
                            className={`px-4 text-[11px] border-2 whitespace-normal ${
                              columnVisibility[columnName] ? "" : "hidden"
                            }`}
                          >
                            {entry[columnName]}
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
      <ViewLeave
        visible={LVE}
        onClick={() => setLVE(false)}
        edit={edit}
        ID={LeaveId}
      />
    </div>
  );
};

export default LeaveTypeMaster;
