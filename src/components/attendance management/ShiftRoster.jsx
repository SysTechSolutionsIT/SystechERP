import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'

const ShiftRoster = () => {
    const formik = useFormik({
        initialValues:{
            RosterId:"",
            FromDate:"",
            ToDate:"",
            Month:"",
            Year:"",
            RosterDate:"",
            EmployeeType:"",
            DepartmentName:"",
            EmployeeName:"",
            FromShift:"",
            OneTo15Shift:"",
            FifteenTo31Shift:"",
            Remark:"",
            Status:"",
        }
    })

    const [isStatusChecked, setStatusChecked] = useState(false)

    const handleCheckboxChange = (fieldName, setChecked, event) => {
      //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
        const checked = event.target.checked;
        setChecked(checked);
        formik.setValues({
          ...formik.values,
          [fieldName]: checked.toString(),
        });
      };

const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const columns = [
        "Employee ID",
        "Employee Name",
        "Department Name",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31"
    ]

  return (
    <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center items-center h-full">
        <div className="bg-gray-200 w-[90%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Attendance Management/ Shift Roster
            </p>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Roster ID
                </p>
                <input
                  id="RosterId"
                  type="number"
                  value={formik.values.RosterId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  To Date
                </p>
                <input
                  id="FromDate"
                  type="date"
                  value={formik.values.FromDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  To Date
                </p>
                <input
                  id="ToDate"
                  type="date"
                  value={formik.values.ToDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="month"
                  className="mb-1 font-semibold text-[13px]"
                >
                  Month
                </label>
                <select
                  id="month"
                  className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Year
                </p>
                <input
                  id="Year"
                  type="date"
                  value={formik.values.Year}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Roster Date
                </p>
                <input
                  id="RosterDate"
                  type="date"
                  value={formik.values.RosterDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">Employee Type</p>
                <select
                  id="EmployeeType"
                  name="EmployeeType"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.EmployeeType}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Contract Staff">Contract Staff</option>
                  <option value="Trainee Staff">Trainee Staff</option>
                  <option value="Trainee Worker">Trainee Worker</option>
                  <option value="Worker">Worker</option>
                  <option value="Company Staff">Company Staff</option>
                </select>
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">Department Name</p>
                <select
                  id="DepartmentName"
                  name="DepartmentName"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.DepartmentName}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Contract Staff">Contract Staff</option>
                  <option value="Trainee Staff">Trainee Staff</option>
                  <option value="Trainee Worker">Trainee Worker</option>
                  <option value="Worker">Worker</option>
                  <option value="Company Staff">Company Staff</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Employee Name
                </p>
                <input
                  id="EmployeeName"
                  type="text"
                  value={formik.values.EmployeeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">From Shift</p>
                <select
                  id="FromShift"
                  name="FromShift"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.FromShift}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="G-9">G-9</option>
                  <option value="Night">Night</option>
                  <option value="Day">Day</option>
                </select>
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">1 To 15 Shift</p>
                <select
                  id="OneTo15Shift"
                  name="OneTo15Shift"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.OneTo15Shift}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="G-9">G-9</option>
                  <option value="Night">Night</option>
                  <option value="Day">Day</option>
                </select>
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">15 To 30 Shift</p>
                <select
                  id="FifteenTo31Shift"
                  name="FifteenTo31Shift"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.FifteenTo31Shift}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="G-9">G-9</option>
                  <option value="Night">Night</option>
                  <option value="Day">Day</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Remark
                </p>
                <input
                  id="Remark"
                  type="text"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                <input
                    id="Status"
                    type="checkbox"
                    checked={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                />
                Active
                </label>
            </div>
            </div>
            <div className="flex gap-2 justify-center mt-5">
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-24 h-fit">
              Fill
            </button>
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36 h-fit whitespace-nowrap">
              Single Employee
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-24 h-fit"
            >
              Save
            </button>
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-24 h-fit">
              Close
            </button>
          </div>
        </div>
          <div className="grid gap-2 justify-between mt-2">
            <div className="my-1 rounded-2xl  p-2 pr-8 ">
              <table className="min-w-full text-center whitespace-normal z-0">
                <thead className="border-b-2">
                  <tr className="">
                    {columns.map((columnName) => (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400`}
                      >
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
    </form>
  )
}

export default ShiftRoster