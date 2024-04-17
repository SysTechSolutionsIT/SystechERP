import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "../Login";
import axios from "axios";

const ManualAttendanceEntryModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [Details, setDetails] = useState([]);
  const [Fins, setFins] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Shifts, setShift] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const { empid, name } = useDetails()
  const [workDetails, setWorkDetails] = useState([])
  const [WeekOffCounts, setWeekOffCounts] = useState([])
  const [weeklyOffId, setWeeklyOffId] = useState()

  const [tableData, setTableData] = useState([]);

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "P",
      AttendanceFlag: "",
      FromDate: "",
      ToDate: "",
      AttendanceDate: new Date().toISOString().split('T')[0],
      FYear: "",
      EmployeeTypeId: "",
      AMonth: new Date().getMonth() + 1, 
      AYear: new Date().getFullYear(), 
      EmployeeId: "",
      EmployeeTypeGroup: "",
      ShiftId: "",
      InTime: "",
      OutTime: "",
      JobTypeId: "",
      SanctionBy: "",
      AcFlag: "Y",
      IUFlag: "I",
      Remark: "",
      CreatedOn: new Date(),
    },
    onSubmit: (values) => {
      const updatedData = {
        ApprovalFlag: "P",
        AttendanceFlag: values.AttendanceFlag,
        FYear: formik.values.FYear,
        AttendanceDate: formik.values.AttendanceDate,
        EmployeeId: empid,
        EmployeeTypeId: formik.values.EmployeeTypeId,
        AMonth: formik.values.AMonth,
        AYear: formik.values.AYear,
        EmployeeTypeGroup: formik.values.EmployeeTypeGroup,
        ShiftId: formik.values.ShiftId,
        InTime: new Date(),
        OutTime: null,
        JobTypeId: formik.values.JobTypeId,
        SanctionBy: formik.values.SanctionBy,
        ACFlag: "Y",
        IUFlag: "I",
        Remark: formik.values.Remark,
        CreatedOn: new Date(),
      };
      console.log(updatedData);
      addAttendance(updatedData);
    },
  });

  const addAttendance = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/manual-attendance/FnAddUpdateDeleteRecord",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      alert("Data Added Successfully");
      onClick();
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowActiveData`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, [token, visible]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token, visible]);

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        if (empid) {
          const response = await axios.get(
            `http://localhost:5500/employee/work/FnShowParticularData`,
            {
              params: { EmployeeId: empid },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          console.log("Work details data", response);
          setWorkDetails(data);
          setWeeklyOffId(data.WeeklyOff)
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchWorkDetails();
  }, [empid, token, visible]);

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/k8g2d4j9/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setShift(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchShift();
  }, [token, visible]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/job-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setJobs(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchJobs();
  }, [token, visible]);

  const handleEmployeeTypeChange = (e) => {
    const selectedEmployeeTypeId = e.target.value;
    formik.handleChange(e);
    const selectedEmployeeType = employeeTypes.find(
      (entry) => entry.EmployeeTypeId === selectedEmployeeTypeId
    );
    formik.setFieldValue(
      "EmployeeTypeGroup",
      selectedEmployeeType?.EmployeeTypeGroup || ""
    );
  };

  useEffect(() => {
    fetchFinData();
  }, [token, visible]);

  const fetchFinData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/financials/FnShowActiveData"
      );
      if (response.status === 200) {
        const data = response.data;
        setFins(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(
        "Error while fetching financial year data: ",
        error.message
      );
    }
  };

  useEffect(() => {
    const fetchWeeklyOffCounts = async () => {
      try {
        if (formik.values.FromDate && formik.values.ToDate) {
          const fromDate = new Date(formik.values.FromDate);
          const toDate = new Date(formik.values.ToDate);
          const fromMonth = fromDate.getMonth() + 1; // Adjust month to be 1-based
          const toMonth = toDate.getMonth() + 1; // Adjust month to be 1-based
          
          const response = await axios.get(
            "http://localhost:5500/weekly-off/GetWeeklyOffCountByMonth",
            {
              params: {
                fromMonth: fromMonth,
                toMonth: toMonth,
              },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setWeekOffCounts(response.data);
          console.log("Weekly Off Counts Response:", response.data);
        }
      } catch (error) {
        console.error("Error while fetching weekly off count data:", error);
      }
    };
  
    fetchWeeklyOffCounts();
  }, [formik.values.FromDate, formik.values.ToDate, token, visible]);
  

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmployees = Details.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateTableData = () => {
    // Function to generate table data based on selected date range
    const fromDate = new Date(formik.values.FromDate);
    const toDate = new Date(formik.values.ToDate);
    const data = [];
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }; // Use 'long' for full day names
    const formatter = new Intl.DateTimeFormat('en-UK', options);
    for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
        const formattedDate = formatter.format(date);
        const [weekday, datePart] = formattedDate.split(', '); // Extract weekday and date
        const jobType = highlightWeeklyOffRows(weekday).jobType; // Determine jobType based on weekday
        const rowData = {
            date: datePart, // Assign date
            checkbox: true,
            day: weekday, // Assign weekday
            jobType: jobType, // Set jobType based on highlightWeeklyOffRows logic
        };
        data.push(rowData);
    }
    setTableData(data);
};


  useEffect(() => {
    // useEffect to generate table data when FromDate or ToDate change
    if (formik.values.FromDate && formik.values.ToDate) {
      generateTableData();
    }
  }, [formik.values.FromDate, formik.values.ToDate]);

  const handleCheckboxChange = (index) => {
    // Function to handle checkbox state change
    const newData = [...tableData];
    newData[index].checkbox = !newData[index].checkbox;
    setTableData(newData);
  };

  const highlightWeeklyOffRows = (date) => {
    // Check if weeklyOffId is valid and WeekOffCounts is populated
    console.log("Entering highlightWeeklyOffRows function with date:", date);
    if (weeklyOffId && WeekOffCounts && WeekOffCounts.length > 0) {
        // Find the work detail matching the weeklyOffId
        const workDetail = WeekOffCounts.find((count) => count.WeeklyOffId === weeklyOffId);
        console.log("workDetail:", workDetail);
        // Check if workDetail exists
        if (workDetail) {
            // Extract weekly off days for the found work detail
            const weeklyOffDays = workDetail.OffDays;
            console.log("weeklyOffDays:", weeklyOffDays);
            // Check if the given date is a weekly off day
            const isWeeklyOff = weeklyOffDays && weeklyOffDays.includes(date);
            console.log("isWeeklyOff:", isWeeklyOff);
            // Determine the job type
            const jobType = isWeeklyOff ? 'Weekly Off' : 'Present'; // Assuming 'Present' is the default JobType value
            console.log("jobType:", jobType);
            // Find the corresponding job from the Jobs array
            const job = Jobs.find(job => job.JobTypeName === jobType);
            console.log("job:", job);
            console.log(job.JobTypeName)
            // Return the appropriate style based on whether it's a weekly off day and jobType is present
            if (isWeeklyOff) {
                return { backgroundColor: 'rgb(205, 205, 0)', jobType: job.JobTypeName };
            } else if (job && job.JobTypeId === 1) { // Assuming JobTypeId 1 corresponds to 'Present'
                return { backgroundColor: 'rgb(102, 204, 0)', jobType: job.JobTypeName };
            } else {
                return { jobType: job.JobTypeName };
            }
        }
    }
    // Return empty style object if conditions are not met
    console.log("Function did not execute the main logic.");
    return { jobType: 'Present' }; // Assuming "Present" is the default JobType value
};




  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Manual Attendance Entry
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-semibold">From Date</p>
                <input
                  id="FromDate"
                  type="date"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.FromDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">To Date</p>
                <input
                  id="ToDate"
                  type="date"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.ToDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <input
                  id="EmployeeId"
                  name="EmployeeId"
                  value={name}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  readOnly
                />
              </div>
              <div>
                <p className="font-semibold text-[13px]">Shift</p>
                <select
                  id="ShiftId"
                  name="ShiftId"
                  className="w-full px-4 py-2 font-normal text-[11px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.ShiftId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Shift</option>
                  {Shifts.map((entry) => (
                    <option key={entry.ShiftId} value={entry.ShiftId}>
                      {entry.ShiftName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Render the table */}
          <table className="w-full mt-4 text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th
                  className="bg-blue-900 text-[13px] text-white font-semibold border-white border-2"
                >
                  Dates
                </th>
                <th className="text-[13px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Checkbox
                </th>
                <th className="text-[13px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                  Day
                </th>
                <th className="text-[13px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Job Type
                </th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
                <tr key={index} style={highlightWeeklyOffRows(row.day)} className='bg-white'>
                    <td className="border-2 whitespace-normal text-[11px]">{row.date}</td>
                    <td className="border-2 whitespace-normal text-[11px]">
                        <label className="capitalize font-semibold text-[11px]">
                            <input
                                type="checkbox"
                                className="w-3 h-3 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg"
                                checked={row.checkbox}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </label>
                    </td>
                    <td className="border-2 whitespace-normal text-[11px]">{row.day}</td>
                    <td className="border-2 whitespace-normal text-[11px]">
                        <select
                            className='border border-black rounded-md w-auto'
                            value={row.jobType}
                            onChange={(e) => {
                                const newData = [...tableData];
                                newData[index].jobType = e.target.value;
                                setTableData(newData);
                            }}
                        >
                            {Jobs.map((entry) => (
                                <option key={entry.JobTypeId} value={entry.JobTypeName}>
                                    {entry.JobTypeName}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            ))}
            </tbody>
          </table>
          {/* End of table */}
          <div className="flex mt-4 gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save Attendance
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ManualAttendanceEntryModal;
