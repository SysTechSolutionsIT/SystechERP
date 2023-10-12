import React from 'react'
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";


const AddEmployee = ({visible, onClick}) => {
    const {token} = useAuth()
    const formik = useFormik({
        initialValues: {
            EmployeeType: "",
            EmployeeName: "",
            CellNo: "",
            EmailId: "",
            Status: "",
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
  

if(!visible) return null
  return (
    <form onSubmit={formik.handleSubmit}>
        <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
        <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Add Employee
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
          <div className="grid grid-cols-2 gap-4">
          <div>
                      <p
                        className="mb-1 font-semibold text-[13px]"
                      >
                      Employee Type
                      </p>
                      <select
                        id="EmployeeType"
                        name="EmployeeType"
                        className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                        value={formik.values.EmployeeType}
                        onChange={formik.handleChange}
                      >
                      <option value=''>Select Type</option>
                      <option value='Permenant'>Permenant</option>
                      <option value='Probation'>Probation</option>
                      <option value='Contract'>Contract</option>
                      </select>
            </div>
            <div>
                <p className="capatilize font-semibold text-[13px] mb-1 ">
                  Employee Name
                </p>
                <input
                  id="EmployeeName"
                  type="text"
                  value={formik.values.EmployeeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
            </div>
            <div>
                <p className="capatilize font-semibold text-[13px] mb-1 ">
                  Cell No.
                </p>
                <input
                  id="CellNo"
                  type="number"
                  value={formik.values.CellNo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
            </div>
            <div>
                <p className="capatilize font-semibold text-[13px] mb-1 ">
                  Email Id
                </p>
                <input
                  id="EmailId"
                  type="text"
                  value={formik.values.EmailId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
            </div>
            <div>
                <p className="capatilize font-semibold text-[13px] ">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="Status"
                    type="checkbox"
                    checked={isStatusChecked}
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
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
        </div>
    </form>
  )
}

export default AddEmployee