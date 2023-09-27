import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import axios from 'axios';

const ViewEmployeeGrade = ({ visible, onClick, edit, ID }) => {
    const [details, setDetails] = useState([]);
    const formik = useFormik({
        initialValues: {
            ID: "",
            Name: "",
            Status: "",
            Remark: ""
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

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

      useEffect(() => {
        const fetchEmpGradeData = async () => {
          try {
            const response = await axios.get(`http://localhost:5500/employee-grade/get/${ID}`);
              const data = response.data;
              console.log('fetched data', data);
              setDetails(data);
          } catch (error) {
            console.error('Error', error);
          }
        };
        fetchEmpGradeData();
      }, [ID]);
      
      

    if (!visible) return null;
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
                <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
                    <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
                        <p className="text-white text-[13px] font-semibold">
                            Employee Grade Master
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
                                <p className="text-[13px] text-left font-semibold">Employee Grade ID</p>
                                <input
                                    type="number"
                                    placeholder="Enter Employee Grade ID"
                                    value={details?.id}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left font-semibold">Employee Grade Name</p>
                                <input
                                    type="text"
                                    placeholder="Enter Employee Grade Name"
                                    value={details?.Name}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left font-semibold">Remarks</p>
                                <input
                                    type="text"
                                    placeholder="Enter Remarks"
                                    value={details?.Remark}
                                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                                    onChange={formik.handleChange}
                                    disabled={!edit}
                                />
                            </div>
                            <div>
                                <p className="text-[13px] text-left font-semibold">Status</p>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={details?.Status}
                                        className={`relative w-4 h-4 mr-2 peer shrink-0 checked:appearance-none checked:bg-blue-900 border-2 border-blue-900 rounded-sm`}
                                        onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                                        disabled={!edit}
                                    />
                                    <Icon
                                        className="absolute w-4 h-4 hidden peer-checked:block"
                                        icon="gg:check"
                                        color="white"
                                    />
                                    <label for="status" className="text-[11px] font-semibold">
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

export default ViewEmployeeGrade