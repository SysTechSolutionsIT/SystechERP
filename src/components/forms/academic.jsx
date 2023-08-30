import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react';

export const qualificationsArray = [
    {
      Qualification: 'Bachelor of Science',
      Institute: 'University of ABC',
      Specialization: 'Computer Science',
      Grades: 'A',
      PassingYear: '2022',
      Languages: 'English, French',
    },
    {
      Qualification: 'Master of Business Administration',
      Institute: 'XYZ Business School',
      Specialization: 'Marketing',
      Grades: 'B',
      PassingYear: '2021',
      Languages: 'English, Spanish',
    },
    {
      Qualification: 'Diploma in Graphic Design',
      Institute: 'Design Institute',
      Specialization: 'Graphic Design',
      Grades: 'A+',
      PassingYear: '2023',
      Languages: 'English',
    },
    // Add more qualifications as needed
  ];

  
const Academic = () => {
    const [academicData, setAcademicData] = useState([...qualificationsArray])
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
    
    const handleAddRow = () => {
        const newEntry = {
            Qualification:"",
            Institute:"",
            Specialization:"",
            Grades:"",
            PassingYear:"",
            Languages:"",
        };
        setAcademicData([...academicData, newEntry]); // Update the professionalData state
      };

  return (
    <form onSubmit={formik.handleSubmit}>
        <formik onSubmit={formik.handleSubmit}>
      <div className='p-4 bg-white font-[Inter]'>
        <div className='grid grid-cols-3 gap-x-4'>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Employee ID</p>
              <input
                id="EmployeeId"
                type="number"
                value={formik.values.EmployeeId}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Employee Name</p>
              <input
                id="EmployeeName"
                type="text"
                value={formik.values.EmployeeName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        </div>
       <div className="gap-4 justify-between">
            <div className="my-1 rounded-2xl bg-white p-2 pr-8">
            <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
                <thead>
                    <tr>
                    <th className='text-[13px] font-normal border-2 border-white py-1 px-2 bg-blue-500 rounded-md cursor-pointer text-white'
                    onClick={handleAddRow}>
                            Add
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Qualification
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Institute
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Specialization
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Grades
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Passing Year
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Languages
                        </th>
                    </tr>
                    </thead>
                    {qualificationsArray.map((item, index) =>(
                      <tr>
                      <td className='text-[11px] border-2 cursor-pointer font-normal border-r-2 border-white py-1 px-2 bg-red-600 rounded-md text-white'>
                        Remove 
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Qualification}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Institute}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Specialization}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Grades}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.PassingYear}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Languages}
                        onChange={formik.handleChange}/>
                      </td>
                      </tr>
                    ))}
                    </table>
                    </div>
                    </div>
                    <div className="flex mt-5 justify-center gap-4">
                      <button
                        type="submit"
                        className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
                      >
                        Save Details
                      </button>
                    </div>
                    </div>
    </formik>
    </form>
  )
}

export default Academic