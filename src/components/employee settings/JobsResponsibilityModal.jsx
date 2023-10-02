import { useFormik } from 'formik';
import React, { useState } from 'react'
import { jobsRespData } from './JobsResponsibilityMaster';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useAuth } from '../Login';

const JobsResponsibilityModal = ({ visible, onClick }) => {
    const { token } = useAuth()
    const formik = useFormik({
        initialValues: {
            // ID: "",
            Name: "",
            Duration: "",
            Points: "",
            Status: "",
            Remark: ""
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            addJobRes()
            resetForm()
        },
    });

    const addJobRes = async() =>{
        try{
            const response = await axios.post("http://localhost:5500/job-responsibility/add", formik.values, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert('Job Responsibility Added')
        } catch(error){
            console.error('Error', error);
        }
    } 


    const [isStatusChecked, setStatusChecked] = useState(false)
    const handleCheckboxChange = (fieldName, setChecked, event) => {
      //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
        const checked = event.target.checked;
        setChecked(checked);
        formik.setValues({
          ...formik.values,
          [fieldName]: checked.toString(),
        });
      };

    if (!visible) return null;
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
                <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
                    <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                        <p className="text-white text-[13px] font-semibold">
                            Jobs Responsibility Master
                        </p>
                        <Icon
                            icon="maki:cross"
                            color="white"
                            className="cursor-pointer"
                            onClick={onClick}
                        />
                    </div>
                    <div className="py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[13px] font-semibold">Jobs Responsibility ID</p>
                                <input
                                    type="number"
                                    placeholder="Enter Jobs Responsibility ID"
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Jobs Responsibility Name</p>
                                <input
                                    id="Name"
                                    type="text"
                                    placeholder="Enter Jobs Responsibility Name"
                                    value={formik.values.Name}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Duration</p>
                                <input
                                    id="Duration"
                                    type="number"
                                    placeholder="Enter Duration"
                                    value={formik.values.Duration}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Points</p>
                                <input
                                    id="Points"
                                    type="number"
                                    placeholder="Enter Points"
                                    value={formik.values.Points}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Remarks</p>
                                <input
                                    id="Remark"
                                    type="text"
                                    placeholder="Enter Remarks"
                                    value={formik.values.Remark}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                            <p className="capitalize font-semibold text-[13px]">Status</p>
                            <label className="capitalize font-semibold text-[11px]">
                            <input
                                id="Status"
                                type="checkbox"
                                checked={formik.values.Status}
                                value={formik.values.Status}
                                className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                                onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                            />
                            Active
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button
                            type="submit"
                            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                        >
                            Save
                        </button>
                        <button
                            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                            onClick={onClick}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default JobsResponsibilityModal