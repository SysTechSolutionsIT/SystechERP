import React from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react';
import CostCenterModal from './CostCenterModal';

export const costCenters = [
    {
      costCenterID: "0003",
      costCenterName: "Human Resources",
      status: "Y"
    },
    {
      costCenterID: "0004",
      costCenterName: "IT Department",
      status: "Y"
    },
    {
      costCenterID: "0005",
      costCenterName: "Operations",
      status: "N"
    },
    {
      costCenterID: "0006",
      costCenterName: "Research and Development",
      status: "Y"
    },
    {
      costCenterID: "0007",
      costCenterName: "Customer Service",
      status: "Y"
    },
    {
      costCenterID: "0008",
      costCenterName: "Production",
      status: "N"
    },
    {
      costCenterID: "0009",
      costCenterName: "Quality Assurance",
      status: "Y"
    },
    {
      costCenterID: "0010",
      costCenterName: "Supply Chain",
      status: "Y"
    },
    {
      costCenterID: "0011",
      costCenterName: "Legal",
      status: "N"
    },
    {
      costCenterID: "0012",
      costCenterName: "Public Relations",
      status: "Y"
    },
 ];

const CostCenterMaster = () => {
   
    const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className='p-8'>
    <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
      Cost Center Master
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
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold py-2 px-4 rounded-lg'>
          Column Visibility
        </button>
      </div>
      <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20' onClick={()=> setModalOpen(true)}>
        Add
      </button>
    </div>
    <CostCenterModal visible={isModalOpen} onClick={()=> setModalOpen(false)}/>
    <div className='grid gap-4'>
            <div className='my-8 rounded-2xl bg-white p-4 pr-12'>

                <table className='min-w-full text-center'>
                    <thead>
                        <tr>
                            <th className='p-4 font-bold text-black border-2'>Actions</th>
                            <th className='p-4 font-bold text-black border-2'>Cost Center ID</th>
                            <th className='p-4 font-bold text-black border-2'>Cost Center Name</th>
                            <th className='p-4 font-bold text-black border-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {costCenters.map((entry, index) => (
                            <tr key={index}>
                                <td className='border-2'>
                                <div className="flex items-center gap-2 text-center justify-center">
                                    <Icon icon="lucide:eye" color="#556987" width="27" height="27" />
                                    <Icon icon="mdi:edit" color="#556987" width="27" height="27"/>
                                    <Icon icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                    </div>
                                </td>
                                <td className='p-4 border-2'>{entry.costCenterID}</td>
                                <td className='p-4 border-2'>{entry.costCenterName}</td>
                                <td className='p-4 border-2'>{entry.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default CostCenterMaster