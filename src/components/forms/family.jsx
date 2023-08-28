import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';

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
      <div>
        <div className='p-8'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <p className='text-[13px] font-semibold capatilize'>Employee ID</p>
              <input
                id="EmployeeId"
                type="number"
                value={formik.values.EmployeeId}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className='col-span-2'>
              <p className='text-[13px] font-semibold capatilize'>Employee Name</p>
              <input
                id="EmployeeName"
                type="number"
                value={formik.values.EmployeeName}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className='w-full col-span-3'>
              <p className='text-[15px] font-bold underline'>Family Members:</p>
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Person Name</p>
              <input
                id="PersonName"
                type='text'
                value={formik.values.PersonName}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Relation</p>
              <input
                id="Relation"
                type='text'
                value={formik.values.Relation}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Education</p>
              <input
                id="Education"
                type='text'
                value={formik.values.Education}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Occupation</p>
              <input
                id="Occupation"
                type='text'
                value={formik.values.Occupation}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className='col-span-2'>
              <p className='text-[13px] font-semibold'>Address</p>
              <input
                id="Address"
                type='text'
                value={formik.values.Address}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Phone No.</p>
              <input
                id="CellNo"
                type='text'
                value={formik.values.CellNo}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Email ID</p>
              <input
                id="EmailId"
                type='text'
                value={formik.values.EmailId}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <p className='text-[13px] font-semibold'>Nomine</p>
              <input
                id="Nomminee"
                type='text'
                value={formik.values.Nomminee}
                className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className='mt-5 border-b border-[1px] rounded-sm border-blue-900'></div>
          {familyMembers.map((member, index) => (
            <div key={index} className='pt-2'>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <p className='text-[13px] font-semibold'>Person Name</p>
                  <input
                    name={`familyMembers[${index}].PersonName`}
                    type='text'
                    value={member.PersonName}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Relation</p>
                  <input
                    name={`familyMembers[${index}].Relation`}
                    type='text'
                    value={member.Relation}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Education</p>
                  <input
                    name={`familyMembers[${index}].Education`}
                    type='text'
                    value={member.Education}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Occupation</p>
                  <input
                    name={`familyMembers[${index}].Occupation`}
                    type='text'
                    value={member.Occupation}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className='col-span-2'>
                  <p className='text-[13px] font-semibold'>Address</p>
                  <input
                    name={`familyMembers[${index}].Address`}
                    type='text'
                    value={member.Address}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Phone No.</p>
                  <input
                    name={`familyMembers[${index}].CellNo`}
                    type='text'
                    value={member.CellNo}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Email ID</p>
                  <input
                    name={`familyMembers[${index}].EmailId`}
                    type='text'
                    value={member.EmailId}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className='text-[13px] font-semibold'>Nomine</p>
                  <input
                    name={`familyMembers[${index}].Nomminee`}
                    type='text'
                    value={member.Nomminee}
                    className={`w-full px-4 py-2 font-normal text-[13px] focus:outline-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            <div className='mt-5 border-b border-[1px] rounded-sm border-blue-900'></div>
            </div>

          ))}
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              className='px-4 text-[13px] py-1 mt-2 bg-blue-900 text-white text-lg rounded-md'
              onClick={handleAddFamilyMember}
            >
              Add +
            </button>
          </div>
          <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
          >
            Save Details
          </button>
        </div>
        </div>
      </div>
    </form>
  );
}

export default Family;
