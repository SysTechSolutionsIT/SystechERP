import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useAuth } from '../Login';

const ViewEmployeeType = ({ visible, onClick, edit, ID }) => {
    const [details, setDetails] = useState([]);
    const [isStatusChecked, setStatusChecked] = useState(false)
    const { token } = useAuth()

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
            EmployeeTypeId:"",
            EmployeeType: "",
            EmployeeTypeGroup: "",
            ShortName: "",
            Remark: ""
        },
        onSubmit: (values) => {
            console.log(values);

            const updatedData = {
                EmployeeTypeId: values.EmployeeTypeId,
                EmployeeType: values.EmployeeType,
                EmployeeTypeGroup: values.EmployeeTypeGroup,
                ShortName: values.ShortName,
                Remark: values.Remark,
                IUFlag:"U"
            }
            updateEmpType(updatedData)
        },
    });

    const updateEmpType = async(data) =>{
        try{
            const response = axios.post(`http://localhost:5500/employee-type/FnAddUpdateDeleteRecord`, data, {
                params:{EmployeeTypeId : ID},
                headers: { Authorization: `Bearer ${token}` },
            })
            alert('Employee Type Updated')
        } catch(error){
            console.error('Error', error);
        }
    }

    useEffect(() =>{
        const fetchEmpTypeData = async() =>{
          try{
            const response = await axios.get(`http://localhost:5500/employee-type/FnShowParticularData`, {
                params:{EmployeeTypeId : ID},
                headers: { Authorization: `Bearer ${token}` },
              })
            const data = response.data
            console.log(data)
            setDetails(data)
          }catch(error){
            console.error('Error', error)
          }
        }
        fetchEmpTypeData()
      },[ID])

    useEffect(() => {
        if (details){
            formik.setValues({
                EmployeeTypeId: details.EmployeeTypeId,
                EmployeeType: details.EmployeeType,
                EmployeeTypeGroup: details.EmployeeTypeGroup,
                ShortName: details.ShortName,
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
                            Employee Type Master
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
                                <p className="text-[13px] text-left py-1 font-semibold">Employee Type ID</p>
                                <input
                                    type="number"
                                    placeholder="Enter Employee Type ID"
                                    value={details?.EmployeeTypeId}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left py-1 font-semibold">Employee Type</p>
                                <input
                                    id="EmployeeType"
                                    type="text"
                                    placeholder="Enter Employee Type"
                                    value={formik.values.EmployeeType}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left py-1 font-semibold">Employee Type Group</p>
                                <select
                                    id="EmployeeTypeGroup"
                                    value={formik.values.EmployeeTypeGroup}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                >
                                    <option value={formik.values.EmployeeTypeGroup}>{formik.values.EmployeeTypeGroup}</option>
                                    <option value="">Select Employee Type Group</option>
                                    <option value="Worker">Worker</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-[13px] text-left py-1 font-semibold">Short Name</p>
                                <input
                                    id="ShortName"
                                    type="text"
                                    placeholder="Enter Short Name"
                                    value={formik.values.ShortName}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left py-1 font-semibold">Remarks</p>
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

export default ViewEmployeeType