import React from 'react'
import { useFormik } from 'formik'
import { useState } from 'react';

export const ProfessionalData = [
  {
    Employer: 'ABC Corporation',
    Experience: '5 years',
    Designation: 'Senior Software Engineer',
    JobResponsibility: 'Lead development team, code review, system design',
    Salary: '₹1,00,000',
  },
  {
    Employer: 'XYZ Tech',
    Experience: '3 years',
    Designation: 'Frontend Developer',
    JobResponsibility: 'Develop user interfaces, collaborate with design team',
    Salary: '₹80,000',
  },
  {
    Employer: 'Tech Innovators',
    Experience: '7 years',
    Designation: 'Data Scientist',
    JobResponsibility: 'Analyze data, build predictive models',
    Salary: '₹1,20,000',
  },
];


const Professional = () => {
  const [professionalData, setProfessionalData] = useState([...ProfessionalData])
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

    const handleAddRow = () => {
      const newEntry = {
        Employer: '',
        Experience: '',
        Designation: '',
        JobResponsibility: '',
        Salary: '',
      };
      setProfessionalData([...professionalData, newEntry]); // Update the professionalData state
    };

  return (
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
                        <th className='text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Employer
                        </th>
                        <th className='text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white '>
                            Experience
                        </th>
                        <th className='text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Designation
                        </th>
                        <th className='text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Job Responsibility
                        </th>
                        <th className='text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Salary
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {ProfessionalData.map((item, index) =>(
                      <tr>
                      <td className='text-[11px] border-2 cursor-pointer font-normal border-r-2 border-white py-1 px-2 bg-red-600 rounded-md text-white'>
                        Remove 
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Employer}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Experience}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Designation}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.JobResponsibility}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                        <input
                        type='text'
                        value={item.Salary}
                        onChange={formik.handleChange}/>
                      </td>
                      </tr>
                    ))}
                    </tbody>
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
    </formik>
  )
}

export default Professional