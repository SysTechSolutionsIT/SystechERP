import { useFormik } from 'formik'
import React from 'react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

const OutDoorAttendanceEntryModal = ({visible, onClick}) => {
    const formik = useFormik({
        initialValues:{
          ApprovalFlag: "",
          AttendanceID: "",
          AttendanceDate: "",
          FYear: "",
          EmployeeType: "",
          EmployeeName: "",
          Shift: "",
          InTime: "",
          OutTime: "",
          JobType: "",
          SanctionBy: "",
          Status: ""
        },
        onSubmit: (values) =>{
          console.log(values)
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
  
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
            <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                <p className="text-white text-[13px] font-semibold">
                  Out Door Attendance Entry
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
                      <p className="text-[13px] font-semibold">Approval Flag</p>
                      <input
                          id="ApprovalFlag"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.ApprovalFlag}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Attendance ID</p>
                      <input
                          id="AttendanceID"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.AttendanceID}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Attendance Date</p>
                      <input
                          id="AttendanceDate"
                          type="date"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.AttendanceDate}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">FYear</p>
                      <input
                          id="FYear"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.FYear}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Employee Type</p>
                      <input
                          id="EmployeeType"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.EmployeeType}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Employee Name</p>
                      <input
                          id="EmployeeName"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.EmployeeName}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Shift</p>
                      <input
                          id="Shift"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.Shift}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">In Time</p>
                      <input
                          id="InTime"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.InTime}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Out Time</p>
                      <input
                          id="OutTime"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.OutTime}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Job Type</p>
                      <input
                          id="JobType"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.JobType}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="text-[13px] font-semibold">Sanction By</p>
                      <input
                          id="SanctionBy"
                          type="number"
                          className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                          value={formik.values.SanctionBy}
                          onChange={formik.handleChange}
                      />
                  </div>
                  <div>
                      <p className="capitalize font-semibold text-[13px]">Status</p>
                      <label className="capitalize font-semibold text-[11px]">
                      <input
                          id="Status"
                          type="checkbox"
                          checked={isStatusChecked}
                          value={formik.values.Status}
                          className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                          onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                      />
                      Active
                      </label>
                  </div>
                </div>
              </div>  
              <div className="flex gap-10 justify-center">
                <button
                    type="submit"
                    className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                >
                    Save
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
  )
}

export default OutDoorAttendanceEntryModal