import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import DestinationModal from './DestinationModal'

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

    const [columnVisibility, setColumnVisibility] = useState({
        Name: true,
        ContractorName: true,
        Distance: true,
        EmployeeFare: true
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([
        ...Object.keys(columnVisibility),
    ]);

    const toggleColumn = (columnName) => {
        if (selectedColumns.includes(columnName)) {
            setSelectedColumns((prevSelected) =>
                prevSelected.filter((col) => col !== columnName)
            );
        } else {
            setSelectedColumns((prevSelected) => [...prevSelected, columnName]);
        }
    };

    useEffect(() => {
        console.log("Selected Columns:", selectedColumns);
    }, [selectedColumns]);

    const selectAllColumns = () => {
        setSelectedColumns([...Object.keys(columnVisibility)]);
    };

    const deselectAllColumns = () => {
        setSelectedColumns([]);
    };

    return (
        <div className="p-8">
            <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
                Destination Master
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                    <button
                        className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
                        style={{ fontSize: "13px" }}
                    >
                        Copy
                    </button>
                    <button
                        className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
                        style={{ fontSize: "13px" }}
                    >
                        CSV
                    </button>
                    <button
                        className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
                        style={{ fontSize: "13px" }}
                    >
                        Excel
                    </button>
                    <button
                        className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
                        style={{ fontSize: "13px" }}
                    >
                        PDF
                    </button>
                    <button
                        className="bg-white text-blue-900 border border-blue-900 font-semibold hover:bg-blue-900 hover:text-white ease-in-out duration-200 py-2 px-4 rounded-lg"
                        style={{ fontSize: "13px" }}
                    >
                        Print
                    </button>
                    <div className="relative">
                        <button
                            className="flex bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold py-2 px-4 rounded-lg"
                            style={{ fontSize: "13px" }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            Column Visibility
                            <Icon icon="fe:arrow-up" className="mt-1.5 ml-2" rotate={2} />
                        </button>
                        {showDropdown && (
                            <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-md rounded-lg p-2">
                                <div className="flex items-center mb-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 underline mr-2"
                                        onClick={selectAllColumns}
                                    >
                                        Select All
                                    </button>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 underline"
                                        onClick={deselectAllColumns}
                                    >
                                        Deselect All
                                    </button>
                                </div>
                                {Object.keys(columnVisibility).map((columnName) => (
                                    <label
                                        key={columnName}
                                        className="flex items-center capitalize text-xs"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedColumns.includes(columnName)}
                                            onChange={() => toggleColumn(columnName)}
                                        />
                                        <span
                                            className={
                                                selectedColumns.includes(columnName)
                                                    ? "font-semibold text-xs"
                                                    : ""
                                            }
                                        >
                                            {columnName}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg"
                    style={{ fontSize: "13px" }}
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
                            <th
                                className="px-1 text-[13px] font-semibold text-black border-2 border-gray-400"
                            >
                                Actions
                            </th>
                            <th
                                className="px-1 text-[13px] font-semibold text-black border-2 border-gray-400"
                            >
                                ID
                            </th>
                            {selectedColumns.map((columnName) => (
                                <th
                                    key={columnName}
                                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400 ${columnVisibility[columnName] ? "" : "hidden"}`}
                                >
                                    {columnName}
                                </th>
                            ))}
                            {/* <th className="px-1 font-semibold text-black border-2 border-gray-400">Destination Name</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Contractor Name</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Distance</th>
                            <th className="px-1 font-semibold text-black border-2 border-gray-400">Employee Fare</th> */}
                        </tr>
                        <tr className='bg-white'>
                            <th className="border-2"></th>
                            <th className="p-2 font-semibold text-black border-2">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-20 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                                    onChange={(e) => handleSearchChange("FinID", e.target.value)}
                                />
                            </th>
                            {selectedColumns.map((columnName) => (
                                <th
                                    key={columnName}
                                    className="p-2 font-semibold text-black border-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-32 h-6 border-2 border-slate-500 rounded-lg justify-center text-center"
                                        onChange={(e) => handleSearchChange(columnName, e.target.value)}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {filteredData.length > 0 ? filteredData.slice(0).reverse().map((entry, index) => (
                            <tr key={index}>
                                <td className="px-2 border-2">
                                    <div className="flex items-center gap-2 text-center justify-center">
                                        <Icon
                                            className='cursor-pointer'
                                            icon="lucide:eye" color="#556987"
                                            width="20"
                                            height="20"
                                        />
                                        <Icon
                                            className='cursor-pointer'
                                            icon="mdi:edit"
                                            color="#556987"
                                            width="20"
                                            height="20"
                                        />
                                        <Icon
                                            className='cursor-pointer'
                                            icon="material-symbols:delete-outline"
                                            color="#556987"
                                            width="20"
                                            height="20"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 text-[11px] text-center border-2 whitespace-normal">{entry.ID}</td>
                                {selectedColumns.map((columnName) => (
                                    <td
                                        key={columnName}
                                        className={`px-4 text-[11px] border-2 whitespace-normal text-left${columnVisibility[columnName] ? "" : "hidden"}`}
                                    >
                                        {entry[columnName]}
                                    </td>
                                ))}
                                {/* <td className="px-4 border-2 whitespace-normal">{entry.Name}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.ContractorName}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.Distance}</td>
                                <td className="px-4 border-2 whitespace-normal">{entry.EmployeeFare}</td> */}
                            </tr>
                        )) : (
                            destData.slice(0).reverse().map((entry, index) => (
                                <tr key={index}>
                                    <td className="px-2 text-[11px] border-2">
                                        <div className="flex items-center gap-2 text-center justify-center">
                                            <Icon
                                                className='cursor-pointer'
                                                icon="lucide:eye"
                                                color="#556987"
                                                width="20"
                                                height="20"
                                            />
                                            <Icon
                                                className='cursor-pointer'
                                                icon="mdi:edit"
                                                color="#556987"
                                                width="20"
                                                height="20"
                                            />
                                            <Icon
                                                className='cursor-pointer'
                                                icon="material-symbols:delete-outline"
                                                color="#556987"
                                                width="20"
                                                height="20"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 text-[11px] text-center border-2 whitespace-normal">{entry.ID}</td>
                                    {selectedColumns.map((columnName) => (
                                        <td
                                            key={columnName}
                                            className={`px-4 text-[11px] border-2 whitespace-normal ${(columnName === "EmployeeFare") && "text-right"} ${columnVisibility[columnName] ? "" : "hidden"}`}
                                        >
                                            {(columnName === "EmployeeFare") && (
                                                '₹'
                                            )}
                                            {entry[columnName]}
                                        </td>
                                    ))}
                                    {/* <td className="px-4 border-2 whitespace-normal text-center">{entry.ID}</td>
                                    <td className="px-4 border-2 whitespace-normal">{entry.Name}</td>
                                    <td className="px-4 border-2 whitespace-normal">{entry.ContractorName}</td>
                                    <td className="px-4 border-2 whitespace-normal text-right">₹ {entry.Distance}</td>
                                    <td className="px-4 border-2 whitespace-normal text-right">₹ {entry.EmployeeFare}</td> */}
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