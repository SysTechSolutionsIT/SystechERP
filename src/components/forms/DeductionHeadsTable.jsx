import React from 'react'
import { useEffect, useState } from 'react';
import { useAuth } from '../Login';
import axios from 'axios';

export const deductionHeadsData = [
    {
      Selected: true,
      EarningHead: 'Basic Salary',
      ShortName: 'A',
      CalculationType: 'Formula',
      CalculationValue: '',
      Formula: '0.6 * TotalSalary',
    },
    {
      Selected: false,
      EarningHead: 'Overtime Pay',
      ShortName: 'B',
      CalculationType: 'Amount',
      CalculationValue: 150,
      Formula: '',
    },
    {
      Selected: true,
      EarningHead: 'Bonus',
      ShortName: 'C',
      CalculationType: 'Amount',
      CalculationValue: 500,
      Formula: '',
    },
    {
      Selected: true,
      EarningHead: 'Commission',
      ShortName: 'D',
      CalculationType: 'Formula',
      CalculationValue: '',
      Formula: '0.1 * Sales',
    },
    {
      Selected: true,
      EarningHead: 'Health Allowance',
      ShortName: 'AA',
      CalculationType: 'Amount',
      CalculationValue: 200,
      Formula: '',
    },
    {
      Selected: false,
      EarningHead: 'Travel Reimbursement',
      ShortName: 'BB',
      CalculationType: 'Amount',
      CalculationValue: 300,
      Formula: '',
    },
    {
      Selected: true,
      EarningHead: 'Incentives',
      ShortName: 'CC',
      CalculationType: 'Formula',
      CalculationValue: '',
      Formula: '0.05 * TotalSales',
    },
    {
      Selected: true,
      EarningHead: 'Allowance',
      ShortName: 'DD',
      CalculationType: 'Amount',
      CalculationValue: 100,
      Formula: '',
    },
    {
      Selected: true,
      EarningHead: 'Profit Sharing',
      ShortName: 'EE',
      CalculationType: 'Formula',
      CalculationValue: '',
      Formula: '0.15 * NetProfit',
    },
    {
      Selected: false,
      EarningHead: 'Stock Options',
      ShortName: 'FF',
      CalculationType: 'Formula',
      CalculationValue: '',
      Formula: '0.02 * StockPrice',
    },
  ];

const DeductionHeadsTable = ({ID}) => {
  console.log('ID in deduciton', ID)
  const { token } = useAuth()
  const [details, setDetails] = useState([])
  const [heads, setHeads] = useState([])
  useEffect(() =>{
    const fetchHeadsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/deduction-heads/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setHeads(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error);
      }
    };
    fetchHeadsData()
  }, [token])

  useEffect(() => {
    const fetchEmpSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/salary/FnShowParticularData`,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpSalary();
  }, [ID, token]);

  const calculateValue = (formula, salary) => {
    try {
      const totalEarning = details.GrossSalary;

      if (!formula) {
        // If the formula is empty, return the corresponding calculation value from the heads array
        // Assuming there is a property like CalculationValue in the heads array
        return heads.find(item => item.CalculationType === "Amount")?.CalculationValue || salary;
      }

      const modifiedFormula = formula.replace('P1', salary).replace('P2', details.GrossSalary * (50/100)).replace('P3', totalEarning);
      // Use eval to evaluate the modified formula
      return eval(modifiedFormula);
    } catch (error) {
      console.error("Error in formula calculation: ", error);
      return "Error";
    }
  };


  return (
        <div className="gap-4 justify-between">
            <div className="my-1 rounded-2xl bg-white p-2 pr-8">
            <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
                <thead>
                    <tr>
                        <th colSpan='6' className='bg-blue-900 text-white font-semibold border-white border-2'>
                            Deduction Heads
                        </th>
                    </tr>
                    <tr>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                                Select
                        </th>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white '>
                            Deduction <br/> Head
                        </th>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Short <br/> Name
                        </th>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Calculation <br/> Type
                        </th>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Calculation <br/> Value
                        </th>
                        <th className='text-[11px]  font-semibold border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Formula
                        </th>
                    </tr>
                </thead>
                <tbody>
                {heads.map((item, index) => (
                <tr key={index} className={`${item.Selected ? '' : 'bg-gray-100'} `}>
                    <td>
                    <label className="capitalize font-semibold text-[11px]">
                        <input
                        type="checkbox"
                        className='w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg'
                        checked={item.Selected}
                        />
                    </label>
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.DeductionHead}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.ShortName}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.CalculationType}
                    </td>
                    <td className='px-2 border-2 whitespace-normal text-left text-[11px]'>
                    <input 
                    type='text'
                    className='w-16 py-1 rounded-md text-center'
                    value={calculateValue(item.Formula, details.GrossSalary)}/>
                    </td>
                    <td className='px-2 border-2 whitespace-normal text-left text-[11px]'>
                    <input 
                    type='text'
                    className=' w-20 py-1 rounded-md text-center'
                    value={item.Formula}/>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            </div>
  )
}

export default DeductionHeadsTable