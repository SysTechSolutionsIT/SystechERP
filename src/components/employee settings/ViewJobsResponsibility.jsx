import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { jobsRespData } from './JobsResponsibilityMaster';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useAuth } from '../Login';

const ViewJobsResponsibility = ({ visible, onClick, edit, ID }) => {
    const [StatusCheck, setStatusCheck] = useState(false);
    const [details, setDetails] = useState([]);
    const { token } = useAuth()

    const formik = useFormik({
        initialValues: {
            JobResponsibilityId:"",
            JobResponsibilityName: "",
            Duration: "",
            Points: "",
            Remark: ""
        },
        onSubmit: (values) => {
            console.log(values);
            const updatedData = {
                JobResponsibilityId: values.JobResponsibilityId,
                JobResponsibilityName: values.JobResponsibilityName,
                Duration: values.Duration,
                Points: values.Points,
                Remark: values.Remark,
                IUFlag: "U"
            }
            updateJobRes(updatedData)
        },
    });

    const updateJobRes = async (data) =>{
        try{
            const response = axios.post(`http://localhost:5500/job-responsibility/FnAddUpdateDeleteRecord`, data, {
                params: {JobResponsibilityId: ID},    
                headers:{Authorization: `Bearer ${token}`}
            })
            alert('Job Responsibility Updated')
        } catch(error){
            console.error('Error', error);
        }
    }

    useEffect(() => {
        const fetchJobRes = async() =>{
            try{
                const response = await axios.get(`http://localhost:5500/job-responsibility/FnShowParticularData`, {
                params: {JobResponsibilityId: ID},    
                headers:{Authorization: `Bearer ${token}`}
                })
                const data = response.data
                setDetails(data)
                console.log(data)
            } catch(error){
                console.error('Error', error);            }
        }

        fetchJobRes()
    }, [ID]);

    useEffect(() =>{
        if (details){
            formik.setValues({
                JobResponsibilityId: details.JobResponsibilityId,
                JobResponsibilityName: details.JobResponsibilityName,
                Duration: details.Duration,
                Points: details.Points,
                Remark: details.Remark
            })
        }
    }, [details])

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
                                    value={details?.JobResponsibilityId}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Jobs Responsibility Name</p>
                                <input
                                    id="JobResponsibilityName"
                                    type="text"
                                    placeholder="Enter Jobs Responsibility Name"
                                    value={formik.values.JobResponsibilityName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    disabled={!edit}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button
                            type="submit"
                            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
                        >
                            Submit
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

export default ViewJobsResponsibility