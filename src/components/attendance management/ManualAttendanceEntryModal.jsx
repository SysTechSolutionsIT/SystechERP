import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "../Login";
import axios from "axios";
import moment from "moment";

const ManualAttendanceEntryModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [Shifts, setShift] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const { empid, name, fYear } = useDetails();
  const [workDetails, setWorkDetails] = useState([]);
  const [WeekOffCounts, setWeekOffCounts] = useState([]);
  const [weeklyOffId, setWeeklyOffId] = useState();
  const [FinancialYears, setFinancialYears] = useState([]);
  const [FinalManualAttData, setFinalManualAttData] = useState([]);
  const [managerId, setManagerId] = useState();
  const [managerName, setManagerName] = useState();
  const [selectedShiftId, setSelectedShiftId] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [Holiday, setHoliday] = useState([]);


  const [tableData, setTableData] = useState([]);

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "MP",
      AttendanceFlag: "",
      FromDate: "",
      ToDate: "",
      AttendanceDate: new Date().toISOString().split("T")[0],
      FYear: fYear,
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
      TBSanctionBy: managerId,
      AcFlag: "Y",
      IUFlag: "I",
      Remark: "",
      CreatedOn: new Date(),
    },
    onSubmit: (values) => {
      const updatedData = {
        ApprovalFlag: "MP",
        AttendanceFlag: values.AttendanceFlag,
        FYear: fYear,
        AttendanceDate: formik.values.AttendanceDate,
        EmployeeId: empid,
        EmployeeTypeId: formik.values.EmployeeTypeId,
        AMonth: formik.values.AMonth,
        AYear: formik.values.AYear,
        EmployeeTypeGroup: formik.values.EmployeeTypeGroup,
        ShiftId: values.ShiftId,
        InTime: new Date(),
        OutTime: null,
        JobTypeId: formik.values.JobTypeId,
        TBSanctionBy: managerId,
        ACFlag: "Y",
        IUFlag: "I",
        Remark: formik.values.Remark,
        CreatedOn: new Date(),
      };
      console.log("Man Att data:", updatedData);
      AddManualAttendance();
    },
  });

  useEffect(() => {
    console.log("From Date", formik.values.FromDate);
    console.log("To Date", formik.values.ToDate);
  }, [formik.values.FromDate, formik.values.ToDate]);

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowPerticularData`,
        {
          params: { EmployeeId: empid },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object of Employee Personal", response);
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
          setWeeklyOffId(data.WeeklyOff);
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
        console.log("shifts", Shifts);
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
        console.log('Jobs', data);
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
    const fetchManager = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/work/FnFetchManager",
          {
            params: { EmployeeId: empid },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Manager:", data);
        setManagerId(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchManager();
  }, [token, visible]);

  useEffect(() => {
    const fetchManagerName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnFetchEmployeeName",
          {
            params: { EmployeeId: managerId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.EmployeeName;
        console.log("ManagerName", data);
        setManagerName(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchManagerName();
  }, [token, managerId]);

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

  // const filteredEmployees = details.filter((employee) =>
  //   employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const generateTableData = () => {
    // Function to generate table data based on selected date range
    const fromDate = new Date(formik.values.FromDate);
    const toDate = new Date(formik.values.ToDate);
    const data = [];
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-UK", options);

    for (
      let AttendanceDate = fromDate;
      AttendanceDate <= toDate;
      AttendanceDate.setDate(AttendanceDate.getDate() + 1)
    ) {
      const formattedDate = formatter
        .format(AttendanceDate)
        .replace(/\//g, "-");
      const [weekday, datePart] = formattedDate.split(", ");
      const JobType = highlightWeeklyOffRows(weekday).JobType;

      const rowData = {
        checkbox: true,
        AttendanceDate: datePart,
        AttendanceDay: weekday,
        JobType: JobType,
      };
      data.push(rowData);
    }

    // Set the state with the generated table data
    setTableData(data);

    // Map over the data to add additional fields and set the final data state
    const finalData = data.map((row) => ({
      ...row,
      EmployeeId: empid,
      FYear: fYear,
      EmployeeTypeId: details?.EmployeeTypeId, // Use optional chaining to avoid errors if details is null or undefined
      ShiftId: selectedShiftId,
      IUFlag: "I",
      TBSanctionBy: managerId,
      ApprovalFlag: "MP",
    }));

    setFinalManualAttData(finalData);

    console.log("Final table data:", finalData);
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

  const fetchLeaveApps = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/a5d3g2p6/FetchSanctionedLeaves",
        {
          params: {
            EmployeeId: empid,
            FromDate: formik.values.FromDate,
            ToDate: formik.values.ToDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log("Leaves data", data);
      setLeaves(data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchLeaveApps();
    fetchHolidayData()
  }, [token, visible, formik.values.FromDate, formik.values.ToDate]);


  const fetchHolidayData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/s3f9n7v2/fetch-holidays",
        {
          params: {
            FromDate: formik.values.FromDate,
            ToDate: formik.values.ToDate
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
        const data = response.data;
        setHoliday(data); 
        console.log('Holiday Data', Holiday)
    } catch (error) {
      console.error("Error while fetching company data: ", error.message);
    }
  };
  console.log(Holiday);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const highlightWeeklyOffRows = (day, date, jobTypeFromDropdown) => {
    // Check if weeklyOffId is valid and WeekOffCounts is populated
    if (weeklyOffId && WeekOffCounts && WeekOffCounts.length > 0) {
      // Find the work detail matching the weeklyOffId
      const workDetail = WeekOffCounts.find(
        (count) => count.WeeklyOffId === weeklyOffId
      );
      // Check if workDetail exists
      if (workDetail) {
        // Extract weekly off days for the found work detail
        const weeklyOffDays = workDetail.OffDays;
        // Check if the given day is a weekly off day
        const isWeeklyOff = weeklyOffDays && weeklyOffDays.includes(day);

        // Assuming 'leaves' is an array of leave dates like ['Wednesday, 10-04-2024', 'Thursday, 11-04-2024', ...]
        const LeaveDates = leaves.map((leave) => {
          const [, date] = leave.split(", "); // Split the leave string and get the date part
          return date; // Return only the date part
        });

        const isLeaveDay = leaves && LeaveDates.includes(date) ? true : false
        console.log('Is Leave Day', isLeaveDay)

        const isHoliday = Holiday && Holiday.includes(date) ? true : false
        console.log('Is Holiday', isHoliday)

        let JobType = '';

        if (isLeaveDay) {
          JobType = 'Leaves';
        } else if (isWeeklyOff) {
          JobType = 'Weekly Off';
        } else if (isHoliday) {
          JobType = 'Holiday';
        } else {
          // Ensure jobTypeFromDropdown has the correct value
          JobType = jobTypeFromDropdown || 'Present';
        }
        
        // Find the corresponding job from the Jobs array
        const job = Jobs.find((job) => job.JobTypeName === JobType);
        
        // Define default style
        let style = {
          JobType: JobType // Assigning the determined JobType
        };
        
        // Return the appropriate style based on the day's status
        if (isLeaveDay) {
          JobType = 'Leaves'
          style.backgroundColor = "rgb(191, 6, 171)";
        } else if (isHoliday) {
          JobType = 'Holiday'
          style.backgroundColor = "rgb(253, 139, 0)";
        } else if (isWeeklyOff) {
          JobType = 'Weekly Off'
          style.backgroundColor = "rgb(205, 205, 0)";
        } else if (job && job.JobTypeId === 1) {
          // Assuming JobTypeId 1 corresponds to 'Present'
          style.backgroundColor = "rgb(102, 204, 0)";
        } else if (job && job.JobTypeName === "Absent") {
          style.backgroundColor = "red";
        } else {
          // Handle unexpected cases, maybe log an error
          console.error("Unexpected condition occurred.");
        }
        
        return style;
      }
    }
    // Return empty style object if conditions are not met
    return { JobType: "Present" }; // Assuming "Present" is the default JobType value
  };

  const handleJobTypeChange = (index, newJobType) => {
    const newData = [...tableData];
    newData[index].JobType = newJobType;
    setTableData(newData);

    // Update final data as well
    const updatedFinalData = FinalManualAttData.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          JobType: newJobType,
        };
      }
      return row;
    });
    setFinalManualAttData(updatedFinalData);
  };

  const AddManualAttendance = async () => {
    if (managerId == null) {
      alert("No reporting manager found. Application not submitted.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5500/manual-attendance/FnAddUpdateDeleteRecord",
          FinalManualAttData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Manual Attendance Added Successfully");
        onClick();
      } catch (error) {
        console.error("Error adding Manual Att", error);
      }
    }
    console.log("Final Man Att data", FinalManualAttData);
  };

  const [maxDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  });

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
                <label className="text-[13px] font-semibold">
                  Financial Year
                </label>
                <div className="flex items-center">
                  <input
                    id="FYear"
                    value={fYear}
                    disabled
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  To be Sanctioned By
                </label>
                <div className="flex items-center">
                  <div className="relative w-full text-[13px]">
                    <textbox
                      type="text"
                      id="TBSanctionBy"
                      value={managerId}
                      className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      disabled
                    >
                      {managerName}
                    </textbox>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <input
                  id="EmployeeId"
                  name="EmployeeId"
                  value={name}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  disabled
                />
              </div>

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
                  max={maxDate}
                />
              </div>

              <div>
                <p className="font-semibold text-[13px]">Shift</p>
                <select
                  id="ShiftId"
                  className="w-full px-4 py-2 font-normal text-[11px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.ShiftId}
                  onChange={(e) => {
                    formik.handleChange(e); // Update formik state
                    setSelectedShiftId(e.target.value); // Update selectedShiftId state
                  }}
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
            <div className="flex items-center mt-3">
              <div className="inline-flex items-center mr-3">
                <div className="w-5 h-5 bg-green-500 mr-1"></div>
                <div className="text-[11px]">Present</div>
              </div>
              <div className="inline-flex items-center mr-3">
                <div className="w-5 h-5 bg-yellow-500 mr-1"></div>
                <div className="text-[11px]">Weekly Off</div>
              </div>
              <div className="inline-flex items-center mr-3">
                <div className="w-5 h-5 bg-red-500 mr-1"></div>
                <div className="text-[11px]">Absent</div>
              </div>
              <div className="inline-flex items-center">
                <div className="w-5 h-5 bg-purple-500 mr-1"></div>
                <div className="text-[11px]">Leaves</div>
              </div>
            </div>
          </div>
          {/* Render the table */}
          <table className="w-full mt-4 text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className="text-[13px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Checkbox
                </th>
                <th className="bg-blue-900 text-[13px] text-white font-semibold border-white border-2">
                  Date
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
              {tableData.map((row, index) => {
                return (
                  <tr
                    key={index}
                    style={highlightWeeklyOffRows(
                      row.AttendanceDay,
                      row.AttendanceDate,
                      row.JobType,
                    )} // Pass startDate and endDate if needed
                    className="bg-white"
                  >
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
                    <td className="border-2 whitespace-normal text-[11px]">
                      {row.AttendanceDate}
                    </td>
                    <td className="border-2 whitespace-normal text-[11px]">
                      {row.AttendanceDay}
                    </td>
                    <td className="border-2 whitespace-normal text-[11px]">
                      <select
                        className="border border-black rounded-md w-auto"
                        value={row.JobType}
                        onChange={(e) =>
                          handleJobTypeChange(index, e.target.value)
                        }
                      >
                        {Jobs.map((entry) => (
                          <option
                            key={entry.JobTypeId}
                            value={entry.JobTypeName}
                            selected={entry.JobTypeName === row.JobType}
                          >
                            {entry.JobTypeName}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* End of table */}
          <div className="flex mt-4 gap-10 justify-center">
            <button
              type="Button"
              onClick={AddManualAttendance}
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit Attendance
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
