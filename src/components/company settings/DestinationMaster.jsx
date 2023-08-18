import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import DestinationModal from './DestinationModal';

export const destData = [
    {
        ID: 1,
        Name: "Pune",
        ContractorName: "Company Employee",
        Distance: 0,
        EmployeeFare: 0
    },
    {
        ID: 2,
        Name: "NA",
        ContractorName: "Company Employee",
        Distance: 0,
        EmployeeFare: 0
    },
];

const DestinationMaster = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = (title, searchWord) => {
        const newFilter = destData.filter((item) => {
            const value = item[title];
            return value && value.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    return (
        <div className="p-8">
            <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
                Destination Master
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
                        Copy
                    </button>
                    <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
                        CSV
                    </button>
                    <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
                        Excel
                    </button>
                    <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
                        PDF
                    </button>
                    <button className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg">
                        Print
                    </button>
                    <button className="flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-2 px-4 rounded-lg">
                        Column Visibility
                        <Icon icon="fe:arrow-up" className="mt-1.5 ml-2" rotate={2} />
                    </button>
                </div>
                <button
                    className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={() => setModalOpen(true)}
                >
                    Add Destination
                </button>
            </div>
            <DestinationModal
                visible={isModalOpen}
                onClick={() => setModalOpen(false)}
            />
            <div className="my-4">
                <table className="w-full table-auto">
                    <thead className='text-center'>
                        <tr className="bg-blue-200">
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Actions</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">ID</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Destination Name</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Contractor Name</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Distance</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Employee Fare</th>
                        </tr>
                        <tr className='bg-white'>
                            <th className="border-2"></th>
                            <th className="p-2 font-semibold text-black border-2 ">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-16 border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) =>
                                        handleSearchChange("ID", e.target.value)
                                    }
                                />
                            </th>
                            <th className="p-2 font-semibold text-black border-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) =>
                                        handleSearchChange("Name", e.target.value)
                                    }
                                />
                            </th>
                            <th className="p-2 font-semibold text-black border-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) =>
                                        handleSearchChange("ContractorName", e.target.value)
                                    }
                                />
                            </th>
                            <th className="p-2 font-semibold text-black border-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) =>
                                        handleSearchChange("Distance", e.target.value)
                                    }
                                />
                            </th>
                            <th className="p-2 font-semibold text-black border-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) =>
                                        handleSearchChange("EmployeeFare", e.target.value)
                                    }
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {filteredData.length > 0 ? filteredData.slice(0).reverse().map((entry, index) => (
                            <tr key={index}>
                                <td className="px-2 border-2">
                                    <div className="flex items-center gap-2 text-center justify-center">
                                        <Icon className='cursor-pointer' icon="lucide:eye" color="#556987" width="27" height="27" />
                                        <Icon className='cursor-pointer' icon="mdi:edit" color="#556987" width="27" height="27" />
                                        <Icon className='cursor-pointer' icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                    </div>
                                </td>
                                <td className="px-4 border-2 whitespace-normal">{entry.ID}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.Name}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.ContractorName}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.Distance}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.EmployeeFare}</td>
                            </tr>
                        )) : (
                            destData.slice(0).reverse().map((entry, index) => (
                                <tr key={index}>
                                    <td className="px-2 border-2">
                                        <div className="flex items-center gap-2 text-center justify-center">
                                            <Icon className='cursor-pointer' icon="lucide:eye" color="#556987" width="27" height="27" />
                                            <Icon className='cursor-pointer' icon="mdi:edit" color="#556987" width="27" height="27" />
                                            <Icon className='cursor-pointer' icon="material-symbols:delete-outline" color="#556987" width="27" height="27" />
                                        </div>
                                    </td>
                                    <td className="px-4 border-2 whitespace-normal text-center">{entry.ID}</td>
                                    <td className="px-4 border-2 whitespace-normal">{entry.Name}</td>
                                    <td className="px-4 border-2 whitespace-normal">{entry.ContractorName}</td>
                                    <td className="px-4 border-2 whitespace-normal text-right">₹ {entry.Distance}</td>
                                    <td className="px-4 border-2 whitespace-normal text-right">₹ {entry.EmployeeFare}</td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DestinationMaster