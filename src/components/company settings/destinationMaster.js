import { Icon } from '@iconify/react'
import React from 'react'

const DestinationMaster = () => {
    const destData = [
        {
            ID: 1,
            Name: "Pune",
            ContractorName: "Company Employee",
            Distance: 0,
            EmployeeFare: 0
        },
        {
            ID: 2,
            Name: "NA",
            ContractorName: "Company Employee",
            Distance: 0,
            EmployeeFare: 0
        },
    ];


    return (
        <div className='p-8'>
            <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
                Company Master
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
                                <th className='p-4 font-semibold text-black'>Destination ID</th>
                                <th className='p-4 font-semibold text-black'>DestinationName</th>
                                <th className='p-4 font-semibold text-black'>Contractor Name</th>
                                <th className='p-4 font-semibold text-black'>Distance</th>
                                <th className='p-4 font-semibold text-black'>Employee Fare</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {destData.slice(0).reverse().map((entry, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <Icon icon="lucide:eye" color="#556987" width="27" height="27" />
                                            <Icon icon="mdi:edit" color="#556987" width="27" height="27" />
                                            <Icon icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                        </div>
                                    </td>
                                    <td className='p-4'>{entry.ID}</td>
                                    <td className='p-4'>{entry.Name}</td>
                                    <td className='p-4'>{entry.ContractorName}</td>
                                    <td className='p-4'>{entry.Distance}</td>
                                    <td className='p-4'>{entry.EmployeeFare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DestinationMaster