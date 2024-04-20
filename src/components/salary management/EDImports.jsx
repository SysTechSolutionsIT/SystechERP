import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";

const EDImports = () => {
  const formik = useFormik({
    initialValues: {
      LBID: "",
      Fyear: "",
      month: "",
      year: "",
      LBDate: "",
      EmpType: "",
      Remarks: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Added Successfully");
    },
  });

  //For File Upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can implement your upload logic here.
    if (selectedFile) {
      // For demonstration purposes, you can display the file name.
      alert(`Selected file: ${selectedFile.name}`);
    } else {
      alert("No file selected.");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  const salHead = ["Salary Head", "Earning Head", "Deduction Heads"];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-200 w-[90%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Import Employeewise Earning & Deduction Heads
            </p>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="month"
                  className="mb-1 font-semibold text-[13px]"
                >
                  Month
                </label>
                <select
                  id="month"
                  className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="mb-1 font-semibold text-[13px]"
                >
                  Year
                </label>
                <select
                  id="year"
                  className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                >
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="salaryHeads"
                  className="mb-1 font-semibold text-[13px]"
                >
                  Salary Heads
                </label>
                <select
                  id="salaryHeads"
                  className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                >
                  {salHead.map((sal, index) => (
                    <option key={index} value={sal}>
                      {sal}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">File</p>
                <input
                  id="file"
                  type="file"
                  placeholder="Enter Financial Year"
                  value={formik.values.file}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
            </button>
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36">
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EDImports;
