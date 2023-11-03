import { useFormik } from 'formik'
import React from 'react'

const ManualAttendanceEntryModal = () => {
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
  return (
    <div>ManualAttendanceEntryModal</div>
  )
}

export default ManualAttendanceEntryModal