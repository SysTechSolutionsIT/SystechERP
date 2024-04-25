import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login';
import axios from 'axios'; 
import { Icon } from '@iconify/react';

const DeductionImportModal = ({ visible, onClick, edit }) => {
    const { token } = useAuth();
    const [allEmployees, setAllEmployees] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const formik = useFormik({
    initialValues: {
      EmployeeId: "",
      EmployeeName:'',
      DeductionHeadID: "",
      AMonth: "",
      AYear: "",
      Amount: "",
    },
    onSubmit: (values, {resetForm}) => {
      const updatedData = {
        EmployeeId: values.EmployeeId,
        DeductionHeadId: values.DeductionHeadID,
        AMonth: values.AMonth,
        AYear: values.AYear,
        Amount: values.Amount,
        IUFlag:'I'
      };

      addMonthlyDeductionImport(updatedData)
      resetForm()
      onClick()
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmployees = allEmployees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [heads, setHeads] = useState([]);

  useEffect(() => {
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/deduction-heads/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };

    fetchHeadsData();
  }, [token, visible]);

  function generateSelectWithOptions(optionsArray) {
    const optionsHTML = optionsArray.map((option) => (
      <option key={option.DeductionHeadID} value={option.DeductionHeadID}>
        {option.DeductionHead}
      </option>
    ));

    return <>{optionsHTML}</>;
  }


  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setAllEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchAllEmployees();
  }, [token, visible]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const addMonthlyDeductionImport = async(data) =>{
    try {
        const response = await axios.post('http://localhost:5500/monthly-deduction-import/FnAddUpdateDeleteRecord',
        data,
        {
            headers: { Authorization: `Bearer ${token}`}
        })
        alert('Monthly Deduction Import Added')
    } catch (error) {
        console.error('Error', error);
    }
  }

  if (!visible) return null;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] overflow-y-scroll max-h-fit p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Monthly Deduction Head Imports
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-semibold">
                  Employee Name
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="EmployeeName"
                      name="EmployeeName"
                      value={formik.values.EmployeeName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputChange(e);
                      }}
                      onFocus={() => setSearchTerm("")}
                      className="w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      placeholder={
                        formik.values.EmployeeId
                          ? formik.values.EmployeeName
                          : "Search Employee Name"
                      }
                    />

                    {searchTerm && (
                      <div
                        className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        {filteredEmployees.length > 0 ? (
                          filteredEmployees.map((entry, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                formik.setValues({
                                  ...formik.values,
                                  EmployeeId: entry.EmployeeId,
                                  EmployeeName: entry.EmployeeName
                                });
                                setSearchTerm("");
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                            >
                              {entry.EmployeeName}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">
                            No matching results
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          <div className='mt-1'>
                <p className="capitalize font-semibold text-[13px]">
                  Deduction Head
                </p>
                <select
                  id="DeductionHeadID"
                  className="w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  value={formik.values.DeductionHeadID}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Deduction Head to Import</option>
                  {generateSelectWithOptions(heads)}
                </select>
            </div>
            <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Amount
                </p>
                <input
                  id="Amount"
                  type="number"
                  value={formik.values.Amount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">AMonth</p>
                <select
                  id="AMonth"
                  value={formik.values.AMonth}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]"
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">AYear</p>
                <select
                  id="AYear"
                  value={formik.values.AYear}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 10 }, (_, i) => currentYear + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DeductionImportModal;
