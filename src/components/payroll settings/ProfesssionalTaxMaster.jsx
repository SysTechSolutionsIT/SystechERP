import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import ProfesionalTaxModal from './ProfesionalTaxModal';
import ViewPT from './ViewPT';

export const TaxData = [
    {
      ProfessionalTaxId: 1,
      Gender: 'Male',
      UpperLimit: 5000,
      LowerLimit: 1000,
      PTAmount: 200,
      PTAmountFebruary: 220,
      Remark: 'Employee A',
      Status: 'Active',
    },
    {
      ProfessionalTaxId: 2,
      Gender: 'Female',
      UpperLimit: 6000,
      LowerLimit: 1200,
      PTAmount: 180,
      PTAmountFebruary: 200,
      Remark: 'Employee B',
      Status: 'Inactive',
    },
    {
      ProfessionalTaxId: 3,
      Gender: 'Male',
      UpperLimit: 5500,
      LowerLimit: 1100,
      PTAmount: 210,
      PTAmountFebruary: 230,
      Remark: 'Employee C',
      Status: 'Active',
    },
    {
        ProfessionalTaxId: 4,
        Gender: 'Female',
        UpperLimit: 6500,
        LowerLimit: 1300,
        PTAmount: 190,
        PTAmountFebruary: 210,
        Remark: 'Employee D',
        Status: 'Inactive',
      },
      {
        ProfessionalTaxId: 5,
        Gender: 'Male',
        UpperLimit: 4800,
        LowerLimit: 960,
        PTAmount: 220,
        PTAmountFebruary: 240,
        Remark: 'Employee E',
        Status: 'Active',
      },
      {
        ProfessionalTaxId: 6,
        Gender: 'Female',
        UpperLimit: 7000,
        LowerLimit: 1400,
        PTAmount: 180,
        PTAmountFebruary: 200,
        Remark: 'Employee F',
        Status: 'Active',
      },
      {
        ProfessionalTaxId: 7,
        Gender: 'Male',
        UpperLimit: 5200,
        LowerLimit: 1040,
        PTAmount: 240,
        PTAmountFebruary: 260,
        Remark: 'Employee G',
        Status: 'Inactive',
      },
      {
        ProfessionalTaxId: 8,
        Gender: 'Female',
        UpperLimit: 5800,
        LowerLimit: 1160,
        PTAmount: 200,
        PTAmountFebruary: 220,
        Remark: 'Employee H',
        Status: 'Active',
      },
      {
        ProfessionalTaxId: 9,
        Gender: 'Male',
        UpperLimit: 5400,
        LowerLimit: 1080,
        PTAmount: 230,
        PTAmountFebruary: 250,
        Remark: 'Employee I',
        Status: 'Active',
      },
      {
        ProfessionalTaxId: 10,
        Gender: 'Female',
        UpperLimit: 6200,
        LowerLimit: 1240,
        PTAmount: 210,
        PTAmountFebruary: 230,
        Remark: 'Employee J',
        Status: 'Inactive',
      },
  ];
  

const ProfesssionalTaxMaster = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
  
    const handleSearchChange = (title, searchWord) => {
        const newFilter = TaxData.filter((item) => {
          const value = item[title];
      
          if (typeof value === 'string' || typeof value === 'number') {
            // Check if the value is a string or a number
            const valueString = String(value); // Convert to string if it's a number
            return valueString.toLowerCase().includes(searchWord.toLowerCase());
          }
      
          return false; // Ignore other data types
        });
      
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };
      
  
    const [PTView, setPTView] = useState(false);
    const [edit, setEdit] = useState(false);
    const [PTId, setPTId] = useState();
  
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
      const allRows = [...TaxData];
  
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
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 sm:whitespace-nowrap text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="mr-auto text-[15px] whitespace-nowrap">
            Payroll Settings / Professional Tax Master
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
      <ProfesionalTaxModal
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
                  Gender
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Upper Limit
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Lower Limit
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  PT Amount
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  PT Amount Feb. 
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Status
                </th>
              </tr>
              <tr>
                <th className="border-2"></th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="number"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{
                      maxWidth: getColumnMaxWidth("ProfessionalTaxId") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("ProfessionalTaxId", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Gender") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("Gender", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("UpperLimit") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("UpperLimit", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("LowerLimit") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("LowerLimit", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("PTAmount") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("PTAmount", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("PTAmountFeburary") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("PTAmountFeburary", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("Status") + "px" }}
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
                        <div className="flex gap-2 text-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setPTView(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setPTId(result.ProfessionalTaxId); // Pass ID to VEModal
                            }}
                          />
                          <ViewPT
                            visible={PTView}
                            onClick={() => setPTView(false)}
                            edit={edit}
                            ID={PTId}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setPTView(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setPTId(result.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewPT
                            visible={PTView}
                            onClick={() => setPTView(false)}
                            edit={edit}
                            ID={PTId}
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
                        {result.ProfessionalTaxId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Gender}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.UpperLimit}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.LowerLimit}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.PTAmount}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.PTAmountFebruary}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Status}
                      </td>
                    </tr>
                  ))
                : TaxData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-2 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setPTView(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setPTId(entry.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewPT
                            visible={PTView}
                            onClick={() => setPTView(false)}
                            edit={edit}
                            ID={PTId}
                          />
                          <Icon
                            icon="mdi:edit"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setPTView(true); // Open VEModal
                              setEdit(true); // Disable edit mode for VEModal
                              setPTId(entry.DeductionHeadId); // Pass ID to VEModal
                            }}
                          />
                          <ViewPT
                            visible={PTView}
                            onClick={() => setPTView(false)}
                            edit={edit}
                            ID={PTId}
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
                        {entry.ProfessionalTaxId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Gender}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.UpperLimit}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.LowerLimit}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.PTAmount}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.PTAmountFebruary}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Status}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProfesssionalTaxMaster