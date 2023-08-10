import React, { useState } from 'react'
import { Icon } from '@iconify/react';

const Sidebar = () => {

    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [collapseSidebar, setCollapseSidebar] = useState(false)

    const toggleSubMenu = () => {
        setSubMenuOpen(prevState => !prevState);
    }

  return (
    <div className='bg-blue-900 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center border-0 border-radius-xl'>
        <div className='text-white-100 text-xl'>
            <div className='p-2.5 mt-1 flex items-center'>
            <img src='/apple-icon.png'/>
            <h1 className='font-[Inter] font-bold text-white justify-center text-[20px] ml-3 whitespace-nowrap'>Systech ERP</h1>
            <Icon icon="maki:cross" color="white" className='ml-20 cursor-pointer' onClick={()=> setCollapseSidebar((prev) => (!prev))}/>
            </div>
        <hr className='text-gray-600 my-2'/>

        <div>
            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="ic:round-dashboard" color="white"  width="30" height="30" />
                <div class="flex justify-between w-full items-center">
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Dashboard</span>
                </div>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="clarity:employee-group-line" color="white" width="30" height="30" />
                <div class="flex justify-between w-full items-center" onClick={toggleSubMenu}>
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>HRM</span>
                 <span className={`text-sm ${isSubMenuOpen ? '' : 'rotate-180'} ease-linear duration-200`} id="arrow">                
                 <Icon icon="iconamoon:arrow-up-2" color="white" width="30" height="30"/>
                </span>
                </div>
            </div>
            {isSubMenuOpen && (
            <div class=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto ease-linear duration-200" id="submenu">
                <h1 class="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Employee List</h1>
                <h1 class="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Attendance</h1>
                <h1 class="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Compliances</h1>
            </div>
            )}

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="radix-icons:calendar" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Allocations</span>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Finance</span>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="eos-icons:project-outlined" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Projects</span>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="bx:purchase-tag-alt" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Purchase</span>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="streamline:shipping-transfer-cart-package-box-fulfillment-cart-warehouse-shipping-delivery" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Store</span>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                <Icon icon="ep:sell" color="white" width="30" height="30" />
                 <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Sales</span>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Sidebar