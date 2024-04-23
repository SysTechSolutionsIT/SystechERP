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
  const { empid, name, fYear } = useDetails();
  const [workDetails, setWorkDetails] = useState([]);
  const [WeekOffCounts, setWeekOffCounts] = useState([]);
  const [weeklyOffId, setWeeklyOffId] = useState();
  const [FinancialYears, setFinancialYears] = useState([]);
  const [FinalManualAttData, setFinalManualAttData] = useState([]);
  const [managerId, setManagerId] = useState();
  const [managerName, setManagerName] = useState();

  const [tableData, setTableData] = useState([]);

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "P",
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
      TBSanctionBy: "",
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
    if (managerId == null) {
      alert("No reporting manager found. Application not submitted.");
    } else {
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
    }
  };

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

        if (data === null) {
          // Display an alert to add a manager
          alert("Please add a manager.");
        } else {
          // Set the manager data
          setManagerId(data);
        }
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
  }, [token, setManagerId]);

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

  // const filteredEmployees = Details.filter((employee) =>
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
    }; // Use 'long' for full day names
    const formatter = new Intl.DateTimeFormat("en-UK", options);
    for (
      let AttendanceDate = fromDate;
      AttendanceDate <= toDate;
      AttendanceDate.setDate(AttendanceDate.getDate() + 1)
    ) {
      const formattedDate = formatter
        .format(AttendanceDate)
        .replace(/\//g, "-"); // Replace slashes with dashes
      const [weekday, datePart] = formattedDate.split(", "); // Extract weekday and AttendanceDate
      const JobType = highlightWeeklyOffRows(weekday).JobType; // Determine JobType based on weekday
      const rowData = {
        AttendanceDate: datePart, // Assign date
        checkbox: true,
        AttendanceDay: weekday, // Assign weekday
        JobType: JobType, // Set JobType based on highlightWeeklyOffRows logic
      };
      data.push(rowData);
    }
    setTableData(data);
    const finalData = data.map((row) => ({
      ...row,
      EmployeeId: empid,
      FYear: formik.values.FYear,
      EmployeeTypeId: Details.EmployeeTypeId,
      ShiftId: formik.values.ShiftId,
      IUFlag: "I",
      ApprovalFlag: "P",
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

  const highlightWeeklyOffRows = (date, jobTypeFromDropdown) => {
    // Check if weeklyOffId is valid and WeekOffCounts is populated
    console.log("Entering highlightWeeklyOffRows function with date:", date);
    if (weeklyOffId && WeekOffCounts && WeekOffCounts.length > 0) {
      // Find the work detail matching the weeklyOffId
      const workDetail = WeekOffCounts.find(
        (count) => count.WeeklyOffId === weeklyOffId
      );
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
        let JobType = isWeeklyOff ? "Weekly Off" : "Present"; // Assuming 'Present' is the default JobType value
        console.log("JobType:", JobType);
        // If a job type is selected from the dropdown for an Absent day, use it
        if (jobTypeFromDropdown && jobTypeFromDropdown !== "Present") {
          JobType = jobTypeFromDropdown;
        }
        // Find the corresponding job from the Jobs array
        const job = Jobs.find((job) => job.JobTypeName === JobType);
        console.log("job:", job);
        console.log(job.JobTypeName);
        // Return the appropriate style based on whether it's a weekly off day and JobType is present
        if (isWeeklyOff) {
          return {
            backgroundColor: "rgb(205, 205, 0)",
            JobType: job.JobTypeName,
          };
        } else if (job && job.JobTypeId === 1) {
          // Assuming JobTypeId 1 corresponds to 'Present'
          return {
            backgroundColor: "rgb(102, 204, 0)",
            JobType: job.JobTypeName,
          };
        } else if (job && job.JobTypeName === "Absent") {
          // Condition for Absent job type
          return { backgroundColor: "red", JobType: job.JobTypeName };
        } else {
          return { JobType: job.JobTypeName };
        }
      }
    }
    // Return empty style object if conditions are not met
    console.log("Function did not execute the main logic.");
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
                    name="FYear"
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
                      name="TBSanctionBy"
                      value={managerId}
                      disabled
                    >
                      {managerName ? managerName : "Enter Reporting employee"}
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
              <th className="text-[13px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                Checkbox
              </th>
              <tr>
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
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  style={highlightWeeklyOffRows(row.AttendanceDay, row.JobType)}
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
