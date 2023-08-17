import { Icon } from '@iconify/react'
import React from 'react'
import { Button } from "react-bootstrap";


const FinMaster = () => {
  const finData = [
    {
      FinID: 1,
      Name: "Systech Solutions Pvt. Ltd",
      ShortName: "SYS",
      YearClose: 2021,
      Status: "Active",
    },
    {
      FinID: 2,
      Name: "TechCorp Inc.",
      ShortName: "TCI",
      YearClose: 2021,
      Status: "Active",
    },
    {
      FinID: 3,
      Name: "Global Finance Group",
      ShortName: "GFG",
      YearClose: 2021,
      Status: "Active",
    },
    {
      FinID: 4,
      Name: "Investment Innovators Ltd.",
      ShortName: "IIL",
      YearClose: 2021,
      Status: "Active",
    },
    {
      FinID: 5,
      Name: "Capital Ventures International",
      ShortName: "CVI",
      YearClose: 2021,
      Status: "Active",
    },
    {
      FinID: 6,
      Name: "Alpha Financial Services",
      ShortName: "AFS",
      YearClose: 2021,
      Status: "Active",
    },
  ];  
    
      
    return (
        <div className='p-8'>
  <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
    Financial Year Master
  </div>
  <div className='flex justify-between items-center mt-4'>
    <div className='flex gap-4'>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Copy
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        CSV
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Excel
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        PDF
      </button>
      <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
        Print
      </button>
    </div>
    <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20'>
      Add Company 
    </button>
  </div>

            <div className='grid gap-4'>
            <div className='my-8 rounded-2xl bg-white p-4 pr-12'>

                <table className='min-w-full text-center'>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='p-4 font-semibold text-black'>Actions</th>
                            <th className='p-4 font-semibold text-black'>Financial Year ID</th>
                            <th className='p-4 font-semibold text-black'>Name</th>
                            <th className='p-4 font-semibold text-black'>ShortName</th>
                            <th className='p-4 font-semibold text-black'>Year Close</th>
                            <th className='p-4 font-semibold text-black'>Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {finData.map((entry, index) => (
                            <tr key={index}>
                                <td>
                                <div className="flex items-center gap-2 justify-center">
                                    <Icon icon="lucide:eye" color="#556987" width="27" height="27" />
                                    <Icon icon="mdi:edit" color="#556987" width="27" height="27"/>
                                    <Icon icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                    </div>
                                </td>
                                <td className='p-4'>{entry.FinID}</td>
                                <td className='p-4'>{entry.Name}</td>
                                <td className='p-4'>{entry.ShortName}</td>
                                <td className='p-4'>{entry.YearClose}</td>
                                <td className='p-4'>{entry.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default FinMaster