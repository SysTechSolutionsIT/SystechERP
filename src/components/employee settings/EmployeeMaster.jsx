import React from 'react'
import { Icon } from '@iconify/react'
import { useState, useRef, useEffect } from 'react';
import { employeeData } from './EmployeeData';
import { useNavigate } from 'react-router-dom';

const EmployeeMaster = () => {
    const [veCost, setVeCost] = useState(false);
    const [edit, setEdit] = useState(false);
    const [CCid, setCCid] = useState();
    const navigate = useNavigate()

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

    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = (title, searchWord) => {
      const newFilter = employeeData.filter((item) => {
        const value = item[title];
        return value && value.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

    const getColumnMaxWidth = (columnName) => {
        let maxWidth = 0;
        const allRows = [...employeeData];
    
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
    <>
    <div className="bg-blue-900 h-15 sm:h-10 ml-1 mt-1 w-[99%] sm: px-8 text-white font-semibold text-lg rounded-lg flex mb-2">
      <div className="flex items-center gap-4">
        <div className="mr-auto whitespace-nowrap">HRMS/ Employee Settings / Employee Master</div>
        <div className="flex">
        <button
            className="flex text-[13px] bg-white text-center text-blue-900 ml-96 pr-2 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-1 px-4 rounded-lg cursor-pointer"
            onClick={()=> navigate('/add-employee')}
          >
            Column Visibility
            <Icon
                icon="fe:arrow-down"
                className='mt-2 ml-2'
              />
          </button>
          <button
            className="text-white font-semibold h-9 sm:h-8 mt-0.5 ml-2 text-center sm:py-0 whitespace-nowrap px-4 rounded-lg text-[13px] border border-white hover:bg-white hover:text-blue-900 ease-linear duration-200"
            onClick={()=> navigate('/add-employee')}
          >
            Add Record
          </button>
        </div>
      </div>
      <div className="flex items-center mb-2 ml-4">
        <button
          className=" cursor-pointer mt-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon icon="carbon:menu" color="white" width="27" height="27" />
        </button>
        {menuOpen && (
            <div
              ref={menuRef}
              className="w-24 flex flex-col top-[150px] right-[60px] relative bg-white border border-gray-300 shadow-md rounded-lg p-1 items-center mb-2"
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
        <div className="grid gap-4">
        <div className="my-0 rounded-2xl bg-white p-2">
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
                  Employee Type
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Employee Name
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Cell No.
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Email ID
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
                      maxWidth: getColumnMaxWidth("EmployeeType") + "px",
                    }}
                    onChange={(e) =>
                      handleSearchChange("EmployeeType", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 whitespace-normal border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("EmployeeName") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("EmployeeName", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("CellNo") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("CellNo", e.target.value)
                    }
                  />
                </th>
                <th className="p-2 font-semibold text-black border-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-auto h-6 border-2 border-slate-500 rounded-lg justify-center text-center text-[13px]"
                    style={{ maxWidth: getColumnMaxWidth("EmailId") + "px" }}
                    onChange={(e) =>
                      handleSearchChange("EmailId", e.target.value)
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
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            onClick={() => {
                              setVeCost(true); // Open VEModal
                              setEdit(false); // Disable edit mode for VEModal
                              setCCid(result.EmployeeId); // Pass ID to VEModal
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
                              setCCid(result.EmployeeId); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                        {result.EmployeeId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.EmployeeType}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.EmployeeName}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-right text-[11px]">
                        {result.CellNo}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.EmailId}
                      </td>
                      <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                        {result.Status}
                      </td>
                    </tr>
                  ))
                : employeeData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-0 border-2">
                        <div className="flex items-center gap-2 text-center justify-center">
                          <Icon
                            icon="lucide:eye"
                            color="#556987"
                            width="20"
                            height="20"
                            // onClick={() => {
                            //   setVeCost(true); // Open VEModal
                            //   setEdit(false); // Disable edit mode for VEModal
                            //   setCCid(entry.EmployeeId); // Pass ID to VEModal
                            // }}
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
                              setCCid(entry.EmployeeId); // Pass ID to VEModal
                            }}
                          />
                          {/* <VECost
                            visible={veCost}
                            onClick={() => setVeCost(false)}
                            edit={edit}
                            ID={CCid}
                          /> */}
                          <Icon
                            icon="material-symbols:delete-outline"
                            color="#556987"
                            width="20"
                            height="20"
                          />
                        </div>
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-center text-[11px]">
                        {entry.EmployeeId}
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                        {entry.EmployeeType}
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                        {entry.EmployeeName}
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-right text-[11px]">
                        {entry.CellNo}
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                        {entry.EmailId}
                      </td>
                      <td className="px-2 border-2 whitespace-normal text-left text-[11px]">
                        {entry.Status}
                      </td>
                    </tr>
                  ))}
            </tbody>
            </table>
            </div>
            </div>
        </>
  )
}

export default EmployeeMaster