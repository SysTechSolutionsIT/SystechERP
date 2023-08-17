import React from 'react'
import { Icon } from '@iconify/react';
import BankModal from './BankModal';
import { useState } from 'react';

export const bankData = [
  {
    bankId: "0001",
    bankName: "Bank A",
    branchName: "Branch A",
    branchAddress: "Address A",
    accountType: "Savings",
    accountNo: "12345678",
    ifscCode: "ABCD123456",
    swiftCode: "SWIFT123",
    registeredEmail: "email@example.com",
    registeredContact: "+123456789",
    currencyType: "USD",
    bankGst: "GST123",
    authPersonCount: 3,
    remark: "Remark for Bank A",
  },
  {
    bankId: "0002",
    bankName: "Bank B",
    branchName: "Branch B",
    branchAddress: "Address B",
    accountType: "Checking",
    accountNo: "98765432",
    ifscCode: "EFGH567890",
    swiftCode: "SWIFT567",
    registeredEmail: "email2@example.com",
    registeredContact: "+987654321",
    currencyType: "EUR",
    bankGst: "GST456",
    authPersonCount: 2,
    remark: "Remark for Bank B",
  },
  {
    bankId: "0003",
    bankName: "Bank C",
    branchName: "Branch C",
    branchAddress: "Address C",
    accountType: "Savings",
    accountNo: "55555555",
    ifscCode: "WXYZ123456",
    swiftCode: "SWIFT789",
    registeredEmail: "email3@example.com",
    registeredContact: "+9876543210",
    currencyType: "GBP",
    bankGst: "GST789",
    authPersonCount: 1,
    remark: "Remark for Bank C",
  },
  {
    bankId: "0004",
    bankName: "Bank D",
    branchName: "Branch D",
    branchAddress: "Address D",
    accountType: "Checking",
    accountNo: "44444444",
    ifscCode: "PQRS567890",
    swiftCode: "SWIFT101",
    registeredEmail: "email4@example.com",
    registeredContact: "+1122334455",
    currencyType: "AUD",
    bankGst: "GST101",
    authPersonCount: 2,
    remark: "Remark for Bank D",
  },
  {
    bankId: "0005",
    bankName: "Bank E",
    branchName: "Branch E",
    branchAddress: "Address E",
    accountType: "Savings",
    accountNo: "77777777",
    ifscCode: "LMNO123456",
    swiftCode: "SWIFT111",
    registeredEmail: "email5@example.com",
    registeredContact: "+9988776655",
    currencyType: "JPY",
    bankGst: "GST111",
    authPersonCount: 1,
    remark: "Remark for Bank E",
  },
];

const BankMaster = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const handleModalClose = () =>{
        setModalOpen(false)
    }
  return (
    <div className='p-8'>
    <div className='bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg'>
      Bank Master
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
      <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg mr-20' onClick={()=> setModalOpen(true)}>
        Add Bank
      </button>
      <BankModal visible={isModalOpen} onClick={handleModalClose}/>
    </div>
    <div className='grid gap-4'>
            <div className='my-8 rounded-2xl bg-white p-4 pr-12'>

                <table className='min-w-full text-center'>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='p-4 font-semibold text-black'>Actions</th>
                            <th className='p-4 font-semibold text-black'>Bank ID</th>
                            <th className='p-4 font-semibold text-black'>Bank Name</th>
                            <th className='p-4 font-semibold text-black'>Branch Name</th>
                            <th className='p-4 font-semibold text-black'>Account Type</th>
                            <th className='p-4 font-semibold text-black'>Account No</th>
                            <th className='p-4 font-semibold text-black'>IFSC Code</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {bankData.map((entry, index) => (
                            <tr key={index}>
                                <td>
                                <div className="flex items-center gap-2  text-center justify-center">
                                    <Icon icon="lucide:eye" color="#556987" width="27" height="27" />
                                    <Icon icon="mdi:edit" color="#556987" width="27" height="27"/>
                                    <Icon icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                    </div>
                                </td>
                                <td className='p-4'>{entry.bankId}</td>
                                <td className='p-4'>{entry.bankName}</td>
                                <td className='p-4'>{entry.branchName}</td>
                                <td className='p-4'>{entry.accountType}</td>
                                <td className='p-4'>{entry.accountNo}</td>
                                <td className='p-4'>{entry.ifscCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default BankMaster