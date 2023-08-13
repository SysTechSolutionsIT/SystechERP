import React from 'react'
import { useFormik } from 'formik'

const Academic = () => {
    const formik = useFormik({
        initialValues:{
            EmployeeId:"",
            EmployeeName:"",
            Qualification:"",
            Institute:"",
            Specialization:"",
            Grades:"",
            PassingYear:"",
            Languages:"",
        },
        onSubmit:(values) =>{
            console.log(values)
        },
    })
  return (
    <form onSubmit={formik.handleSubmit}>
        <div className='p-8'>
        <div className='grid grid-cols-3 gap-4'>
        <div>
            <p className='capatilize'>Employee ID</p>
            <input
                id="EmployeeId"
                type="number"
                value={formik.values.EmployeeId}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='col-span-2'>
            <p className='capatilize'>Employee Name</p>
            <input
                id="EmployeeName"
                type="number"
                value={formik.values.EmployeeName}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize'>Qualification</p>
            <input
                id="Qualification"
                type="number"
                value={formik.values.Qualification}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='col-span-2'>
            <p className='capatilize'>Institute</p>
            <input
                id="Institute"
                type="number"
                value={formik.values.Institute}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize'>Specialization</p>
            <input
                id="Specialization"
                type="number"
                value={formik.values.Specialization}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize'>Grades / Percentage</p>
            <input
                id="Grades"
                type="number"
                value={formik.values.Grades}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize'>PassingYear</p>
            <input
                id="PassingYear"
                type="number"
                value={formik.values.PassingYear}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='col-span-3'>
            <p className='capatilize'>Languages Known</p>
            <input
                id="Languages"
                type="number"
                value={formik.values.Languages}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        </div>
        </div>
    </form>
  )
}

export default Academic