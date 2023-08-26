import { useFormik } from 'formik'
import React, { useState } from 'react'
import { destData } from './DestinationMaster'
import { Icon } from '@iconify/react'

const DestinationModal = ({ visible, onClick }) => {
    const formik = useFormik({
        initialValues: {
            ID: "",
            Name: "",
            ContractorName: "",
            Distance: "",
            EmployeeFare: "",
            remark: ""
        },
        onSubmit: (values) => {
            console.log(values)
            destData.push(values)
            alert('Added Successfully')
        },
    })

    const [status, setStatus] = useState(false);

    const handleStatusChange = () => {
        setStatus(!status);
    };

    if (!visible) return null
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
                <div className="bg-white w-[50%] p-4 rounded-lg">
                    <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                        <p className='text-white text-[13px] font-semibold'>Destination Master</p>
                        <Icon
                            icon="maki:cross"
                            color='white'
                            className='cursor-pointer'
                            onClick={onClick}
                        />
                    </div>
                    <div className="py-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='text-[13px] font-semibold'>Destination ID</p>
                                <input
                                    id="ID"
                                    type="number"
                                    placeholder="Enter Destination ID"
                                    value={formik.values.ID}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='text-[13px] font-semibold'>Destination Name</p>
                                <input
                                    id="Name"
                                    type="text"
                                    placeholder="Enter Destination Name"
                                    value={formik.values.Name}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='text-[13px] font-semibold'>Contractor Name</p>
                                <select
                                    id="ContractorName"
                                    value={formik.values.ContractorName}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select Contractor Name</option>
                                    <option value="Company Employee">Company Employee</option>
                                </select>
                            </div>
                            <div>
                                <p className='text-[13px] font-semibold'>Distance(Km)</p>
                                <input
                                    id="Distance"
                                    type="number"
                                    placeholder="Enter Distance"
                                    value={formik.values.Distance}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='text-[13px] font-semibold'>Employee Fare</p>
                                <input
                                    id="EmployeeFare"
                                    type="number"
                                    placeholder="Enter Employee Fare"
                                    value={formik.values.EmployeeFare}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='text-[13px] font-semibold'>Remarks</p>
                                <input
                                    id="remark"
                                    type="text"
                                    placeholder="Enter Remarks"
                                    value={formik.values.remark}
                                    className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Status</p>
                                <div className='flex items-center'>
                                    <input
                                        id="status"
                                        type="checkbox"
                                        checked={status}
                                        value={formik.values.status}
                                        className={` relative w-4 h-4 mr-2 peer shrink-0 appearance-none checked:bg-blue-800 border-2 border-blue-900 rounded-sm`}
                                        onChange={handleStatusChange}
                                    />
                                    <Icon
                                        className='absolute w-4 h-4 hidden peer-checked:block'
                                        icon="gg:check"
                                        color='white'
                                    />
                                    <label for='status' className="text-[11px] font-semibold">
                                        Active
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button type="submit" className='bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36'>
                            Save
                        </button>
                        <button className='bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36' onClick={onClick}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default DestinationModal