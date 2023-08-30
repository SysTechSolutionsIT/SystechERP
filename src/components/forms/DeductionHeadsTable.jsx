import React from 'react'

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

const DeductionHeadsTable = () => {
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
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                                Select
                        </th>
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white '>
                            Earning <br/> Head
                        </th>
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Short <br/> Name
                        </th>
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Calculation <br/> Type
                        </th>
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Calculation <br/> Value
                        </th>
                        <th className='text-[11px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white'>
                            Formula
                        </th>
                    </tr>
                </thead>
                <tbody>
                {deductionHeadsData.map((item, index) => (
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
                    {item.EarningHead}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.ShortName}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.CalculationType}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.CalculationValue}
                    </td>
                    <td className='px-4 border-2 whitespace-normal text-left text-[11px]'>
                    {item.Formula}
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