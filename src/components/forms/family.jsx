import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';

export const family = [
  {
    PersonName: "John Doe",
    Relation: "Father",
    Education: "Bachelor of Arts",
    Occupation: "Engineer",
    Address: "123 Main Street, Anytown, CA 12345",
    CellNo: "123-456-7890",
    EmailId: "john.doe@example.com",
    Nomminee: "Jane Doe",
  },
  {
    PersonName: "Jane Doe",
    Relation: "Mother",
    Education: "Master of Science",
    Occupation: "Doctor",
    Address: "456 Elm Street, Anytown, CA 12345",
    CellNo: "555-678-9012",
    EmailId: "jane.doe@example.com",
    Nomminee: "John Doe",
  },
  {
    PersonName: "Peter Smith",
    Relation: "Brother",
    Education: "High School Diploma",
    Occupation: "Truck Driver",
    Address: "789 Oak Street, Anytown, CA 12345",
    CellNo: "987-654-3210",
    EmailId: "peter.smith@example.com",
    Nomminee: "John Doe",
  },
  {
    PersonName: "Mary Jones",
    Relation: "Sister",
    Education: "Associate's Degree",
    Occupation: "Teacher",
    Address: "1011 Main Street, Anytown, CA 12345",
    CellNo: "234-567-8901",
    EmailId: "mary.jones@example.com",
    Nomminee: "Jane Doe",
  },
  {
    PersonName: "Bill Brown",
    Relation: "Friend",
    Education: "PhD",
    Occupation: "Scientist",
    Address: "1234 Elm Street, Anytown, CA 12345",
    CellNo: "345-678-9012",
    EmailId: "bill.brown@example.com",
    Nomminee: "John Doe",
  },
];

const Family = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      EmployeeId: "",
      EmployeeName: "",
      PersonName: "",
      Relation: "",
      Education: "",
      Occupation: "",
      Address: "",
      CellNo: "",
      EmailId: "",
      Nomminee: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAddFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      {
        PersonName: "",
        Relation: "",
        Education: "",
        Occupation: "",
        Address: "",
        CellNo: "",
        EmailId: "",
        Nomminee: "",
      },
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
       <div className='grid grid-cols-2 gap-x-4'>
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
        <div className="grid gap-4 justify-between">
            <div className="my-1 rounded-2xl bg-white p-2 pr-8">
            <table className="text-center text-[11px]  rounded-lg justify-center whitespace-normal">
                <thead>
                    <tr>
                    <th className='text-[13px] font-normal border-2 border-white py-1 px-2 bg-blue-500 rounded-md cursor-pointer text-white'>
                            Add
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Person Name
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white '>
                            Relation
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Education
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Occupation
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Address
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            CellNo
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Email ID
                        </th>
                        <th className='text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white'>
                            Nominee
                        </th>
                    </tr>
                    </thead>
                    {family.map((item, index) =>(
                    <tbody className='justify-between'>
                      <tr>
                      <td className='text-[11px] border-2 cursor-pointer font-normal border-r-2 border-white py-1 px-2 bg-red-600 rounded-md text-white'>
                        Remove 
                      </td>
                      <td className='px-4 border-2 whitespace-normal w-1/2 text-center text-[11px]'>
                        <input
                        id='PersonName'
                        type='text'
                        value={item.PersonName}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='Relation'
                        type='text'
                        value={item.Relation}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='Education'
                        type='text'
                        value={item.Education}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='Occupation'
                        type='text'
                        value={item.Occupation}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='Address'
                        type='text'
                        value={item.Address}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='CellNo'
                        type='text'
                        value={item.CellNo}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px]'>
                        <input
                        id='EmailId'
                        type='text'
                        value={item.EmailId}
                        onChange={formik.handleChange}/>
                      </td>
                      <td className='px-4 border-2 whitespace-normal text-center text-[11px'>
                        <input
                        id='Nomminee'
                        type='text'
                        value={item.Nomminee}
                        onChange={formik.handleChange}/>
                      </td>
                      </tr>
                    </tbody>
                    ))}
        </table>
        </div>
        </div>
    </form>
  );
}

export default Family;
