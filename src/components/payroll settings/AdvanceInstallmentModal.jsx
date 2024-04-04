import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../Login'

const AdvanceInstallmentModal = ({visible, onClick, edit, ID}) => {

  const [details, setDetails] = useState([])
  const [balanceAmount, setBalanceAmount] = useState()
  const { token } = useAuth()

  const formik = useFormik({
    initialValues:{
      FYear: "",
      AdvanceId: ID,
      AdvanceDate: "",
      EmployeeId: "",
      EmployeeName: "",
      AMonth: "",
      AYear: "",
      StartMonth: "",
      InstallmentAmount: "",
      RepaymentAmount: "",
      BalanceAmount: balanceAmount,
      RepaymentDate: "",
      RepaymentMonth: "",
      RepaymentYear: "",
      AdvanceType: "",
      Amount: "",
      Installment: "",
      Purpose: "",
      ProjectId: "",
      AdvanceStatus: "",
      ApprovalFlag: "",
      ApprovedAmount: "",
      ApprovedInstallments: "",
    },
    onSubmit: (values, {resetForm}) =>{
      const updatedData = {
        AdvanceId: ID,
        FYear: values.FYear,
        AdvanceDate: values.AdvanceDate,
        EmployeeId: values.EmployeeId,
        AMonth: values.AMonth,
        AYear: values.AYear,
        AdvanceType: values.AdvanceType,
        Amount: values.Amount,
        Installment: values.Installment,
        Purpose: values.Purpose,
        ProjectId: values.ProjectId,
        AdvanceStatus: values.AdvanceStatus,
        ApprovalFlag: values.ApprovalFlag,
        ApprovedAmount: values.ApprovedAmount,
        ApprovedInstallments: values.ApprovedInstallments, 
        Installment: values.Installment,
        InstallmentAmount: values.InstallmentAmount,
        RepaymentAmount: values.RepaymentAmount,
        BalanceAmount: balanceAmount,
        RepaymentDate: values.RepaymentDate,
        IUFlag:'I',
        AcFlag:'Y'
      }
      console.log(updatedData)
      addInstallmentDetails(updatedData)
    }
  })



  const addInstallmentDetails = async (data) =>{
    try {
      const response = await axios.post('http://localhost:5500/advance-installments/FnAddUpdateDeleteRecord', data,
      {
        headers: { Authorization: `Bearer ${token}`}
      })
      alert('Installment Added')
    } catch (error) {
      console.error('Error', error);
    }
  }

  useEffect(() =>{
    if(details){
      formik.setValues({
      FYear: details.FYear,
      AdvanceDate: details.AdvanceDate,
      EmployeeId: details.EmployeeId,
      EmployeeName: details.EmployeeName,
      AMonth: details.AMonth,
      AYear: details.AYear,
      AdvanceType: details.AdvanceType,
      Amount: details.Amount,
      Purpose: details.Purpose,
      ProjectId: details.ProjectId,
      AdvanceStatus: details.AdvanceStatus,
      ApprovalFlag: details.ApprovalFlag,
      ApprovedAmount: details.ApprovedAmount,
      ApprovedInstallments: details.ApprovedInstallments,  
      RepaymentAmount: details.ApprovedAmount / details.ApprovedInstallments
    })
    }
  },[details])

  useEffect(() =>{
    const FetchAdvanceDetails = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/advance-request/FnShowParticularRepaymentData',
        {
          params: { AdvanceId: ID},
          headers: { Authorization: `Bearer ${token}`}
        })

        const data = response.data
        setDetails(data)
        console.log('details data', data)
        
      } catch (error) {
        console.error('Error', error);
      }
    }
    FetchAdvanceDetails()
  },[ID])



  if (!visible) return null
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
      <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
        <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
          <p className="text-white text-[15px] font-semibold text-center">
            Advance Installments
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
                <p className="capatilize font-semibold  text-[13px]">
                  Employee ID
                </p>
                <input
                  id="EmployeeId"
                  type="text"
                  value={formik.values.EmployeeId}
                  readOnly
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Employee Name
                </p>
                <input
                  id="EmployeeName"
                  type="text"
                  value={formik.values.EmployeeName}
                  readOnly
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Installment No.
                </p>
                <input
                  id="Installment"
                  type="text"
                  value={formik.values.Installment}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Installment Amount
                </p>
                <input
                id="InstallmentAmount"
                type="text"
                value={formik.values.InstallmentAmount}
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                onChange={(event) => {
                  formik.handleChange(event); // Invoke handleChange with event parameter
                  const newBalanceAmount = formik.values.ApprovedAmount - event.target.value; // Calculate new balance amount
                  // Assuming setBalanceAmount is a state setter function for BalanceAmount
                  setBalanceAmount(newBalanceAmount); // Update BalanceAmount state
                }}
              />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Repayment Amount (Per Installment)
                </p>
                <input
                  id="RepaymentAmount"
                  type="text"
                  value={formik.values.RepaymentAmount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Balance Amount
                </p>
                <input
                  id="BalanceAmount"
                  type="text"
                  value={balanceAmount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Repayment Date
                </p>
                <input
                  id="RepaymentDate"
                  type="date"
                  value={formik.values.RepaymentDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Approved Amount
                </p>
                <input
                  id="ApprovedAmount"
                  type="text"
                  readOnly
                  value={formik.values.ApprovedAmount}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Approved Installments
                </p>
                <input
                  id="ApprovedInstallments"
                  type="text"
                  readOnly
                  value={formik.values.ApprovedInstallments}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
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

export default AdvanceInstallmentModal