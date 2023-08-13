import React from 'react'
import { useFormik } from 'formik'

const Professional = () => {
    const formik = useFormik({
        initialValues:{
            EmployeeId:"",
            Employer:"",
            Experience:"",
            Designation:"",
            JobResponsibility:"",
            Salary:"",
            CV:"",
            SalarySlip:"",

        }
    })
  return (
    <formik onSubmit={formik.handleSubmit}>
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
            <p className='capatilize'>Employer</p>
            <input
                id="Employer"
                type="number"
                value={formik.values.Employer}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
            <div className=''>
            <p className='capatilize'>Experience</p>
            <input
                id="Experience"
                type="number"
                value={formik.values.Experience}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className=''>
            <p className='capatilize'>Designation</p>
            <input
                id="Designation"
                type="number"
                value={formik.values.Designation}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
              <div className=''>
            <p className='capatilize'>JobResponsibility</p>
            <input
                id="JobResponsibility"
                type="number"
                value={formik.values.JobResponsibility}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
              <div>
            <p className='capatilize'>Salary</p>
            <input
                id="Salary"
                type="number"
                value={formik.values.Salary}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
              <div>
            <p className='capatilize'>CV</p>
            <input
                id="CV"
                type="number"
                value={formik.values.CV}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
              <div>
            <p className='capatilize'>SalarySlip</p>
            <input
                id="SalarySlip"
                type="number"
                value={formik.values.SalarySlip}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
              </div>
        </div>
        </div>
    </formik>
  )
}

export default Professional