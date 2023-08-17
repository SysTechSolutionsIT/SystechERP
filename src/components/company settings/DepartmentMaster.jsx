import React from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import DepartmentModal from './DepartmentModal';

export const departments = [
    {
      deptID: 1,
      deptName: "Payroll Department",
      companyBranchName: "Main Office",
      parentDept: "Human Resource department",
      deptType: "Sub",
      deptGroup: "Engineering",
      deptHead: "John Doe",
      deptSubHead: "Jane Smith",
      costCenter: "Floor 3",
      standardStaffStrength: 50,
      standardWorkerStrength: 30,
      remark: "Handles engineering projects",
      status: true,
    },
    {
      deptID: 2,
      deptName: "Times Keeping Department",
      companyBranchName: "Main Office",
      parentDept: "Human Resource Department",
      deptType: "Sub",
      deptGroup: "HR",
      deptHead: "Alice Johnson",
      deptSubHead: "Bob Brown",
      costCenter: "Floor 4",
      standardStaffStrength: 25,
      standardWorkerStrength: 20,
      remark: "Manages HR activities",
      status: true,
    },
    {
      deptID: 3,
      deptName: "Accounts Department",
      companyBranchName: "Main Office",
      parentDept: "Finance Department",
      deptType: "Sub",
      deptGroup: "IT",
      deptHead: "Michael Clark",
      deptSubHead: "Emily White",
      costCenter: "Floor 5",
      standardStaffStrength: 40,
      standardWorkerStrength: 35,
      remark: "Handles IT infrastructure",
      status: true,
    },
    {
      deptID: 4,
      deptName: "Sales",
      companyBranchName: "Main Office",
      parentDept: "NA",
      deptType: "main",
      deptGroup: "Sales",
      deptHead: "Alex Turner",
      deptSubHead: "Olivia Green",
      costCenter: "Floor 2",
      standardStaffStrength: 45,
      standardWorkerStrength: 40,
      remark: "Manages sales operations",
      status: true,
    },
    {
      deptID: 5,
      deptName: "Finance",
      companyBranchName: "Main Office",
      parentDept: "NA",
      deptType: "main",
      deptGroup: "Finance",
      deptHead: "William Brown",
      deptSubHead: "Sophia Martinez",
      costCenter: "Floor 6",
      standardStaffStrength: 30,
      standardWorkerStrength: 25,
      remark: "Handles financial operations",
      status: true,
    },
  ];

  

const DepartmentMaster = () => {

    const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className='p-8'>
    <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
      Cost Center Master
    </div>
    <div className='flex justify-between items-center mt-4'>
      <div className='flex gap-2'>
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg'>
          Copy
        </button>
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg'>
          CSV
        </button>
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg'>
          Excel
        </button>
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg'>
          PDF
        </button>
        <button className='bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg'>
          Print
        </button>
        <button className='flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-2 px-4 rounded-lg'>
          Column Visibility
        <Icon icon="fe:arrow-up" className='mt-1.5 ml-2'  rotate={2}/>
        </button>
      </div>
      <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20' onClick={()=> setModalOpen(true)}>
        Add Department
      </button>
    </div>
    <DepartmentModal visible={isModalOpen} onClick={()=> setModalOpen(false)}/>
    <div className='grid gap-4'>
            <div className='my-4 rounded-2xl bg-white p-4 pr-12'>

                <table className='min-w-full text-center rounded-lg'>
                    <thead>
                        <tr className='bg-blue-200'>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Actions</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Department ID</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Department Name</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Branch Name</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Department Type</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Parent Department</th>
                            <th className='px-1 font-semibold text-black border-2 border-gray-400'>Department Head Name</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {departments.map((entry, index) => (
                            <tr key={index}>
                                <td className='px-2 border-2'>
                                <div className="flex items-center gap-2 text-center justify-center">
                                    <Icon icon="lucide:eye" color="#556987" width="20" height="20" />
                                    <Icon icon="mdi:edit" color="#556987" width="20" height="20"/>
                                    <Icon icon="material-symbols:delete-outline" color="#556987" width="20" height="20" />
                                    </div>
                                </td>
                                <td className='px-4 border-2'>{entry.deptID}</td>
                                <td className='px-4 border-2'>{entry.deptName}</td>
                                <td className='px-4 border-2'>{entry.companyBranchName}</td>
                                <td className='px-4 border-2'>{entry.deptType}</td>
                                <td className='px-4 border-2'>{entry.parentDept}</td>
                                <td className='px-4 border-2'>{entry.deptHead}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default DepartmentMaster