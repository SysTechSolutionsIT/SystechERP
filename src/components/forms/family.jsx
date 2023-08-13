import React from 'react'
import { useFormik } from 'formik'
const Family = () => {
    const formik = useFormik({
        initialValues: {
            EmployeeId:"",
            EmployeeName:"",
            PersonName:"",
            Relation:"",
            Education:"",
            Occupation:"",
            Address:"",
            CellNo:"",
            EmailId:"",
            Nomminee:"",

        },
        onSubmit: (values) => {
          console.log(values);
        },
      });

  return (
    <form onSubmit={formik.handleSubmit}>
    <div>
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
              <div className='w-full col-span-3'>
                <p className='font-bold'>Family Members:</p>
              </div>
              <div>
              <p>Person Name</p>
              <input
              id="PersonName"
              value={formik.values.PersonName}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Relation</p>
              <input
              id="Relation"
              value={formik.values.Relation}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Education</p>
              <input
              id="Education"
              value={formik.values.Education}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Occupation</p>
              <input
              id="Occupation"
              value={formik.values.Occupation}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div className='col-span-2'>
          <p>Address</p>
              <input
              id="Address"
              value={formik.values.Address}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Phone No.</p>
              <input
              id="CellNo"
              value={formik.values.CellNo}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Email ID</p>
              <input
              id="EmailId"
              value={formik.values.EmailId}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
          <div>
          <p>Nomine</p>
              <input
              id="Nomine"
              value={formik.values.Nomine}
              className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
              onChange={formik.onChange}
              />
          </div>
        </div>
        <div className='mt-5 border-b border-[1px] rounded-sm border-blue-900'></div>
      </div>
    </div>
    </form>
  )
}

export default Family