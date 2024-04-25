import React, { useState } from 'react';
import DeductionImports from './DeductionImports';
import EarningImports from './EarningImports';

const EDImports = () => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState('Earning');

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
<div className=''>
  <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-y-clip">
    <div className="mr-auto text-[15px]">
      Salary Management / Earning-Deduction Imports
    </div>
    <p className='mr-5 text-white'>Select the Heads you want to Import: </p>
    <select className='bg-gray-200 rounded-lg' value={selectedOption} onChange={handleDropdownChange} style={{ color: '#333' }}>
      <option className='text-black' value="Earning">Earning Heads</option>
      <option value="Deduction">Deduction Heads</option>
    </select>
  </div>
  {selectedOption === 'Earning' ? <EarningImports /> : null}
  {selectedOption === 'Deduction' ? <DeductionImports /> : null}
</div>

  );
};

export default EDImports;
