import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
// import { DesignData } from './DesignationMaster';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useAuth } from '../Login';

const ViewDesignation = ({ visible, onClick, edit, ID }) => {
    const [details, setDetails] = useState([]);
    const { token } = useAuth()

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

    const formik = useFormik({
        initialValues: {
            DesignationId:"",
            DesignationName: "",
            ReportDesignationName: "",
            Remark: ""
        },
        onSubmit: (values) => {
            console.log(values);
            const updatedData = {
            DesignationId: values.DesignationId,
            DesignationName: values.DesignationName,
            ReportDesignationName: values.ReportDesignationName,
            Remark: values.Remark,
            IUFlag: "U"
            }

            updateDesignation(updatedData)
        },
    });

    const updateDesignation = async (data) =>{
        try{
            const response = axios.post(`http://localhost:5500/d9e7x2a1/FnAddUpdateDeleteRecord`, data, {
                params: {DesignationId: ID},    
                headers:{Authorization: `Bearer ${token}`}
            })
            alert('Designation Updated')
        } catch (error){
            console.error('Error', error);
        }
    }

    useEffect(() => {
        const fetchDesignation = async() =>{
            try{
                const response = await axios.get(`http://localhost:5500/d9e7x2a1/FnShowParticularData`,{
                    params: {DesignationId: ID},    
                    headers:{Authorization: `Bearer ${token}`}
                  })
                const data = response.data
                console.log(data)
                setDetails(data)
                setStatusChecked(data.Status)
            } catch(error){
                console.error('Error', error);
            }
        }

        fetchDesignation()
    }, [ID]);

    useEffect(() =>{
        if (details){
            formik.setValues({
            DesignationId: details.DesignationId,
            DesignationName: details.DesignationName,
            ReportDesignationName: details.ReportDesignationName,
            Remark: details.Remark
            })
        }
    }, [details])



    if (!visible) return null;
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
                <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
                    <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                        <p className="text-white text-[13px] font-semibold">
                            Designation Master
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
                                <p className="text-[13px] font-semibold">Designation ID</p>
                                <input
                                    type="number"
                                    placeholder="Enter Designation ID"
                                    value={details?.DesignationId}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Designation Name</p>
                                <input
                                    id="DesignationName"
                                    type="text"
                                    placeholder="Enter Designation Name"
                                    value={formik.values.DesignationName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] font-semibold">Report Designation</p>
                                <select
                                    id="ReportDesignationName"
                                    value={formik.values.ReportDesignationName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                >
                                    <option value="">Select Report Designation</option>
                                    <option value={formik.values.ReportDesignationName}>{formik.values.ReportDesignationName}</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="HR">HR</option>
                                    <option value="User">User</option>
                                </select>
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
                            <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Status
                      </p>
                      <div className="flex items-center text-[13px]">
                        <input
                          type="checkbox"
                          id="Status"
                          name="Status"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={formik.values.Status}
                          onChange={(event) => handleCheckboxChange('status', setStatusChecked, event)}
                        />
                        <label
                          htmlFor="activeCheckbox"
                          className="ml-2 text-gray-700 text-[13px]"
                        >
                          Active
                        </label>
                      </div>
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

export default ViewDesignation