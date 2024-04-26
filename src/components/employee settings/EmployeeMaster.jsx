import React from "react";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
// import { employeeData } from "./EmployeeData";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { useAuth } from "../Login";
import axios from "axios";

const EmployeeMaster = () => {
  const { token } = useAuth();
  const [employeeData, setEmployeeData] = useState([]);
  const [veCost, setVeCost] = useState(false);
  const [edit, setEdit] = useState(false);
  const [CCid, setCCid] = useState();
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeWork, setEmployeeWork] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState({
    EmployeeName: true,
    EmployeeTypeGroupId: true,
    Salutation: false,
    LastName: false,
    FirstName: false,
    MiddleName: false,
    MEmployeeName: false,
    AadharCardNo: false,
    PANNo: false,
    PassportNo: false,
    PassportIssueDate: false,
    PassportExpireDate: false,
    CurrentAddress: false,
    CurrentPincode: false,
    PermanentAddress: false,
    PermanentPincode: false,
    DOB: false,
    EmailId1: true,
    EmailId2: false,
    PhoneNo: false,
    CellNo1: true,
    CellNo2: false,
    BankId1: false,
    AccountNo1: false,
    IFSCCode1: false,
    BankId2: false,
    AccountNo2: false,
    IFSCCode2: false,
    MaritalStatus: false,
    ReferenceId: false,
    DestinationId: false,
    ReligionId: false,
    CategoryId: false,
    CasteId: false,
    EmployeePhoto: false,
    Gender: false,
    BloodGroup: false,
    DrivingLicence: false,
    FinanceAccountNo: false,
    Remark: false,
  });

  const columnNames = {
    EmployeeName: "Employee Name",
    EmployeeTypeGroupId: "Employee Type",
    Salutation: "Salutation",
    LastName: "Last Name",
    FirstName: "First Name",
    MiddleName: "Middle Name",
    MEmployeeName: "MEmployee Name",
    AadharCardNo: "Adhar Card No.",
    PANNo: "PAN No.",
    PassportNo: "Passport No.",
    PassportIssueDate: "Passport Issue Date",
    PassportExpireDate: "Passport Expire Date",
    CurrentAddress: "Current Address",
    CurrentPincode: "Current Pincode",
    PermanentAddress: "Permanent Address",
    PermanentPincode: "Permanent Pincode",
    DOB: "DOB",
    EmailId1: "Email ID 1",
    EmailId2: "Email ID 2",
    PhoneNo: "Phone No.",
    CellNo1: "Cell No 1",
    CellNo2: "Cell No 2",
    BankId1: "Bank ID 1",
    AccountNo1: "Account No 1",
    IFSCCode1: "IFSC Code 1",
    BankId2: "Bank ID 2",
    AccountNo2: "Account No 2",
    IFSCCode2: "IFSC Code 2",
    MaritalStatus: "Marital Status",
    ReferenceId: "Reference",
    DestinationId: "Destination",
    ReligionId: "Religion",
    CategoryId: "Category",
    CasteId: "Caste",
    EmployeePhoto: "Photo",
    Gender: "Gender",
    BloodGroup: "Blood Group",
    DrivingLicence: "Driving Liscence",
    FinanceAccountNo: "Finance Account No",
    Remark: "Remark",
  };

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

  const fetchEmpData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/employee/personal/FnShowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setEmployeeData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchEmpWork = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/employee/work/FnShowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setEmployeeWork(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchEmpWork();
    fetchEmpData();
  }, [token, isModalOpen]);

  const [employeeTypeGroup, setEmployeeTypeGroup] = useState([]);
  useEffect(() => {
    const fetchEmpTypeData = async () => {
      const CID = 1;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("empTypeData", data);
        setEmployeeTypeGroup(data);
      } catch (error) {
        console.error("Error fetching emptype:", error);
      }
    };
    fetchEmpTypeData();
  }, [token, isModalOpen]);

  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (title, searchWord) => {
    const newFilter = employeeData.filter((item) => {
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
    const allRows = [...employeeData, ...filteredData];

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

  //Deletion
  const deleteEmp = async (DeleteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return; // If the user cancels deletion, do nothing
    }

    delEmpPersonal(DeleteId);
    delEmpWork(DeleteId);
    delEmpSal(DeleteId);
    delEmpPro(DeleteId);
    delEmpAcademic(DeleteId);
    delEmpFam(DeleteId);
  };

  const delEmpPersonal = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/personal/FnAddUpdateDeleteRecord",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Record Deleted Successfully") {
        console.log(`personal del successful`);
      } else {
        console.error(`personal del not successful.`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const delEmpWork = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/work/FnAddUpdateDeleteRecord",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Record Deleted Successfully") {
        console.log(`work del successful`);
      } else {
        console.error(`work del unsuccessful`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const delEmpSal = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/salary-structure/FnDeleteEmployeeSalary",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Record Deleted Successfully") {
        console.log(`sal del successful`);
      } else {
        console.error(`sal del unsuccessful`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const delEmpPro = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/professional/FnAddUpdateDeleteRecord",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Record Deleted Successfully") {
        console.log(`pro del successful`);
      } else {
        console.error(`pro del unsuccessful`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const delEmpAcademic = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/academic/FnAddUpdateDeleteRecord",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Record Deleted Successfully") {
        console.log(`aca del successful`);
      } else {
        console.error(`aca del unsuccessful`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const delEmpFam = async (DeleteId) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/family/FnAddUpdateDeleteRecord",
        {
          IUFlag: "D",
        },
        {
          params: { EmployeeId: DeleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
        <div className="text-[15px]">
          HRM / Employee Settings / Employee Master
        </div>
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
      <AddEmployee visible={isModalOpen} onClick={() => setModalOpen(false)} />

      <div className="grid gap-4 justify-between">
        <div className="my-0 rounded-2xl bg-white p-2">
          <table className="min-w-full text-center  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className=" px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
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
                <th className="p-2 font-semibold text-black border-2 " />
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
                          onClick={() =>
                            navigate(`/view-employee/${result.EmployeeId}`)
                          }
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/v6w2s4h8/${result.EmployeeId}`)
                          }
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteEmp(result.EmployeeId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.EmployeeId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "EmployeeTypeGroupId"
                            ? // Check if columnName is EmployeeTypeGroupId
                              employeeTypeGroup.find(
                                (item) => item.FieldId === result[columnName]
                              )?.FieldDetails || "Unknown FieldName"
                            : // If not EmployeeTypeGroupId, handle boolean and null values
                            result[columnName] === true
                            ? "Yes"
                            : result[columnName] === false
                            ? "No"
                            : result[columnName] === null
                            ? "N/A"
                            : result[columnName]}
                        </td>
                      ) : (
                        <td key={columnName} className="hidden"></td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredData.length === 0 &&
                employeeData &&
                employeeData.length > 0 ? (
                employeeData.map((result, key) => (
                  <tr key={key}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon
                          icon="lucide:eye"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/view-employee/${result.EmployeeId}`)
                          }
                        />
                        <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/v6w2s4h8/${result.EmployeeId}`)
                          }
                        />
                        <Icon
                          icon="material-symbols:delete-outline"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => deleteEmp(result.EmployeeId)}
                        />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-[11px] text-center">
                      {result.EmployeeId}
                    </td>
                    {selectedColumns.map((columnName) =>
                      columnVisibility[columnName] ? (
                        <td
                          key={columnName}
                          className={`px-4 border-2 whitespace-normal text-left text-[11px] capitalize`}
                        >
                          {columnName === "EmployeeTypeGroupId"
                            ? // Check if columnName is EmployeeTypeGroupId
                              employeeTypeGroup.find(
                                (item) => item.FieldId === result[columnName]
                              )?.FieldDetails || "Unknown FieldName"
                            : // If not EmployeeTypeGroupId, handle boolean and null values
                            result[columnName] === true
                            ? "Yes"
                            : result[columnName] === false
                            ? "No"
                            : result[columnName] === null
                            ? "N/A"
                            : result[columnName]}
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
      {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
    </div>
  );
};

export default EmployeeMaster;
