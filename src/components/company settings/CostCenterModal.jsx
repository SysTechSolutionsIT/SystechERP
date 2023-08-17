import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { costCenters } from './CostCenterMaster'

const CostCenterModal = ({visible, onClick}) => {

    const formik = useFormik({
        initialValues:{
          costCenterID: "",
          costCenterName: "",
          remark:"",
          status: ""
        },
        onSubmit:(values) =>{
            console.log(values)
            costCenters.push(values)
        },
    })

    const [status, setStatus] = useState(false);

    const handleStatusChange = () => {
      setStatus(!status);
    };


    if(!visible) return null
    return (
        <form onSubmit={formik.handleSubmit}>
        <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 text-white text-center font-semibold text-lg py-4 px-8 rounded-lg">
            Cost Center Master
          </div>
          <div className="py-4">
        <div className='grid grid-cols-2 gap-4'>
        <div>
            <p className='capatilize font-semibold'>Cost Center ID</p>
            <input
                id="costCenterID"
                type="number"
                placeholder="Cost Center ID"
                value={formik.values.costCenterID}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize font-semibold'>Cost Center Name</p>
            <input
                id="costCenterName"
                type="text"
                placeholder="Cost Center Name"
                value={formik.values.costCenterName}
                className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className='capatilize font-semibold'>Remark</p>
            <input
                id="remark"
                type="text"
                placeholder="Remarks"
                value={formik.values.remark}
                className={`w-full px-4 py-6 overflow-y-auto whitespace-normal font-normal focus:outline-gray-300 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
        </div>
        <div>
            <p className="capitalize font-semibold">Status</p>
            <label className="capitalize font-semibold">
            <input
                id="status"
                type="checkbox"
                checked={status}
                value={formik.values.status}
                className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                onChange={handleStatusChange}
            />
            Active
            </label>
        </div>
        </div>
        </div>
        <div className="flex gap-10 justify-center">
        <button type="submit" className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36'>
        Save
      </button>
      <button className='bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36' onClick={onClick}>
        Close
      </button>
        </div>
        </div>
        </div>
        </form>
  )
}

export default CostCenterModal