import React from 'react'

const NoDataNotice = ({ Text, visible }) => {
    if (visible) return null
    return (
      <div className="fixed inset-0 flex items-center justify-center w-full pointer-events-none">
        <div className="absolute bg-gray-200 p-4 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[16px] font-semibold">{Text}</p>
          </div>
        </div>
      </div>
    );
  };  

export default NoDataNotice