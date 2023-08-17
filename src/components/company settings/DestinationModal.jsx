import { useFormik } from 'formik'
import React, { useState } from 'react'
import { destData } from './DestinationMaster'

const DestinationModal = ({ visible, onClick }) => {
    const formik = useFormik({
        initialValues: {
            ID: "",
            Name: "",
            ContractorName: "",
            Distance: "",
            EmployeeFare: ""
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
                <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
                    <div className="bg-blue-900 text-white text-center font-semibold text-lg py-4 px-8 rounded-lg">
                        Destination Master
                    </div>
                    <div className="py-4">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <p className='capatilize font-semibold'>Destination ID</p>
                                <input
                                    id="ID"
                                    type="number"
                                    placeholder="Enter Destination ID"
                                    value={formik.values.ID}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='capatilize font-semibold'>Destination Name</p>
                                <input
                                    id="Name"
                                    type="text"
                                    placeholder="Enter Destination Name"
                                    value={formik.values.Name}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='capatilize font-semibold'>Contractor Name</p>
                                <select
                                    id="ContractorName"
                                    value={formik.values.ContractorName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select Contractor Name</option>
                                    <option value="Company Employee">Company Employee</option>
                                </select>
                            </div>
                            <div>
                                <p className='capatilize font-semibold'>Distance(Km)</p>
                                <input
                                    id="Distance"
                                    type="number"
                                    placeholder="Enter Distance"
                                    value={formik.values.Distance}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='capatilize font-semibold'>Employee Fare</p>
                                <input
                                    id="EmployeeFare"
                                    type="number"
                                    placeholder="Enter Employee Fare"
                                    value={formik.values.EmployeeFare}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className='capatilize font-semibold'>Remarks</p>
                                <input
                                    id="remark"
                                    type="text"
                                    placeholder="Enter Remarks"
                                    value={formik.values.remark}
                                    className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg `}
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

export default DestinationModal