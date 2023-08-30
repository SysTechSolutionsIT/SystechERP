import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react';
import DeductionHeadsTable from './DeductionHeadsTable';
import EarningHeadsTable from './EarningHeadsTable';

const SalaryStructure = () => {
    const [isOTFlagChecked, setOTFlagChecked] = useState(false);
    const [isPFFlagChecked, setPFFlagChecked] = useState(false)
    const [isESICFlagChecked, setESICFlagChecked] = useState(false)
    const [isMLWFFlagChecked, setMLWFFlagChecked] = useState(false)
    const [isGratuatyApplicableChecked, setGratuatyApplicableChecked] = useState(false)
    const [isStatusChecked, setStatusCheched] = useState(false)

    const formik = useFormik({
        initialValues:{
            EmployeeId:"",
            EmployeeName:"",
            Grade:"",
            Band:"",
            Salary:"",
            CTC:"",
            OTFlag: isOTFlagChecked.toString(),
            OTAmount:"",
            PFFlag:"",
            PFNo:"",
            PFDate:"",
            ESICFlag:"",
            ESICNo:"",
            ESICDate:"",
            MLWFFlag:"",
            MLWFNo:"",
            GratuityApplicable:"",
            GratuityAmount:"",
            Remark:"",
            Status: isStatusChecked.toString()
        },
        onSubmit: (values) => {
            console.log(values);
          },
        });

        const handleCheckboxChange = (fieldName, setChecked, event) => {
            const checked = event.target.checked;
            setChecked(checked);
            formik.setValues({
              ...formik.values,
              [fieldName]: checked.toString(),
            });
          };

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <div className="py-1">
              <p className="mb-0.5 capitalize font-semibold text-[13px]">Grade</p>
              <select
                        id="Grade"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Grade}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Grade</option>
                      <option value="Grade 1">Grade 1</option>       
                      <option value="Grade 2">Grade 2</option> 
                      <option value="Grade 3">Grade 3</option>     
                      <option value="Grade 4">Grade 4</option> 
                      <option value="Grade 5">Grade 5</option>                           
                </select>
        </div>
        <div className="py-1">
              <p className="mb-0.5 capitalize font-semibold text-[13px]">Band</p>
              <select
                        id="Band"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.Band}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Band</option>
                      <option value="Band 1">Band 1</option>       
                      <option value="Band 2">Band 2</option> 
                      <option value="Band 3">Band 3</option>     
                      <option value="Band 4">Band 4</option> 
                      <option value="Band 5">Band 5</option>                           
                </select>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Salary</p>
              <input
                id="Salary"
                type="number"
                value={formik.values.Salary}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">CTC</p>
              <input
                id="CTC"
                type="number"
                value={formik.values.CTC}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">UANNo</p>
              <input
                id="UANNo"
                type="number"
                value={formik.values.UANNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='py-1'>
        <p className="mt-1 capitalize font-semibold text-[13px]">OT Flag</p>
        <label className="capitalize font-semibold text-[13px]">
            <input
            type="checkbox"
            className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
            checked={isOTFlagChecked}
            onChange={(event)=> handleCheckboxChange('OTFlag', setOTFlagChecked, event )}
            />
            Active
        </label>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">OT Amount</p>
              <input
                id="OTAmount"
                type="number"
                value={formik.values.OTAmount}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='py-1'>
        <p className="mt-1 capitalize font-semibold text-[13px]">PF Flag</p>
        <label className="capitalize font-semibold text-[13px]">
            <input
            type="checkbox"
            className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
            checked={isPFFlagChecked}
            onChange={(event)=> handleCheckboxChange('PFFlag', setPFFlagChecked, event )}
            />
            Active
        </label>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">PF No.</p>
              <input
                id="PFNo"
                type="number"
                value={formik.values.PFNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-0.5 capitalize font-semibold text-[13px]">PF Date</p>
              <input
                id="PFDate"
                type="date"
                value={formik.values.PFDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
                />
        </div>
        <div className='py-1'>
        <p className="mt-1 capitalize font-semibold text-[13px]">ESIC Flag</p>
        <label className="capitalize font-semibold text-[13px]">
            <input
            type="checkbox"
            className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
            checked={isESICFlagChecked}
            onChange={(event)=> handleCheckboxChange('ESICFlag', setESICFlagChecked, event )}
            />
            Active
        </label>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">ESIC No.</p>
              <input
                id="ESICNo"
                type="number"
                value={formik.values.ESICNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-0.5 capitalize font-semibold text-[13px]">ESIC Date</p>
              <input
                id="ESICDate"
                type="date"
                value={formik.values.ESICDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
                />
        </div>
        <div className='py-1'>
        <p className="mt-1 capitalize font-semibold text-[13px]">MLWF Flag</p>
        <label className="capitalize font-semibold text-[13px]">
            <input
            type="checkbox"
            className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
            checked={isMLWFFlagChecked}
            onChange={(event)=> handleCheckboxChange('MLWFFlag', setMLWFFlagChecked, event )}
            />
            Active
        </label>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">MLWF No.</p>
              <input
                id="MLWFNo"
                type="number"
                value={formik.values.MLWFNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='py-1'>
        <p className="mt-1 capitalize font-semibold text-[13px]">Gratuity Applicable</p>
        <label className="capitalize font-semibold text-[13px]">
            <input
            type="checkbox"
            className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
            checked={isGratuatyApplicableChecked}
            onChange={(event)=> handleCheckboxChange('GratuityApplicable', setGratuatyApplicableChecked, event )}
            />
            Active
        </label>
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Gratuity Amount</p>
              <input
                id="GratuityAmount"
                type="number"
                value={formik.values.GratuityAmount}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Remark</p>
              <input
                id="Remark"
                type="number"
                value={formik.values.Remark}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div className='py-1'>
                <p className=" mt-1 capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    type="checkbox"
                    checked={isStatusChecked}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={(event)=> handleCheckboxChange('Status', setStatusCheched, event )}
                  />
                  Active
                </label>
        </div>
        </div> 
        <div className='flex flex-wrap'>
        <EarningHeadsTable/>
        <DeductionHeadsTable/>
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
    </form>
  )
}

export default SalaryStructure