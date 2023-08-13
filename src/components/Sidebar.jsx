import React, { useState } from 'react'
import { Icon } from '@iconify/react';

const Sidebar = () => {

    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [open, setOpen] = useState(true)

    const toggleSubMenu = () => {
        setSubMenuOpen(prevState => !prevState);
    }

    return (
        <div className='flex'>
            <div className={`${open ? 'w-[250px]' : 'w-[85px] overflow-hidden'} bg-blue-900 sidebar bottom-0 lg:left-0 p-2 overflow-y-hidden overflow-x-hidden text-center border-0 border-radius-xl ease-in-out duration-300`}>
                <div className='text-white-100 text-xl fixed'>
                    <div className='p-2.5 mt-1 flex items-center'>
                        <img src='/apple-icon.png' alt='icon' />
                        {open && (
                            <h1 className='font-[Inter] font-bold text-white justify-center text-[20px] ml-3 whitespace-nowrap'>Systech ERP</h1>
                        )}
                    </div>
                    <hr className='text-gray-600 my-2' />

                    <div>
                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="ic:round-dashboard" color="white" width="30" height="30" />
                            {open && (
                                <div className="flex justify-between w-full items-center">
                                    <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Dashboard</span>
                                </div>)}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="clarity:employee-group-line" color="white" width="30" height="30" />
                            {open && (
                                <div className="flex justify-between w-full items-center" onClick={toggleSubMenu}>
                                    <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>HRM</span>
                                    <span className={`text-sm ${isSubMenuOpen ? '' : 'rotate-180'} ease-linear duration-200`} id="arrow">
                                        <Icon icon="iconamoon:arrow-up-2" color="white" width="30" height="30" />
                                    </span>
                                </div>
                            )}
                        </div>
                        {isSubMenuOpen && (
                            <div className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto ease-linear duration-200" id="submenu">
                                <h1 className="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Employee List</h1>
                                <h1 className="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Attendance</h1>
                                <h1 className="font-[Inter] text-white font-semibold text-[15px] cursor-pointer p-2 hover:bg-gray-300 hover:bg-opacity-25 rounded-md mt-1">Compliances</h1>
                            </div>
                        )}

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="radix-icons:calendar" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Allocations</span>
                            )}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Finance</span>
                            )}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="eos-icons:project-outlined" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Projects</span>
                            )}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="bx:purchase-tag-alt" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Purchase</span>
                            )}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="streamline:shipping-transfer-cart-package-box-fulfillment-cart-warehouse-shipping-delivery" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Store</span>
                            )}
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white'>
                            <Icon icon="ep:sell" color="white" width="30" height="30" />
                            {open && (
                                <span className='font-[Inter] font-semibold text-[15px] ml-4 text-white-200'>Sales</span>
                            )}
                        </div>
                    </div>
                    <div className={`mt-5 w-full px-2.5 pb-3 flex relative ${open ? 'ml-40' : 'ml-5'} ease-in-out duration-200 bg-gray-200 bg-opacity-20 items-center rounded-lg cursor-pointer`} onClick={() => setOpen((prev) => !prev)}>
                        <Icon icon="streamline:interface-arrows-button-left-double-arrow-arrows-double-left" color="white" width="28" height="28" rotate={`${open ? '' : '2'}`} className='mt-4 cursor-pointer ease-in-out duration-300' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar