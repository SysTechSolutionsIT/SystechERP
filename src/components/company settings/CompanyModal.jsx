import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const CompanyModal = ({ visible, onClick }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [singleBranchCheck, setSingleBranchCheck] = useState(false);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      sectorDetails: "",
      status: statusCheck,
      createdBy: "",
      natureOfBusiness: "",
      logo: null,
      singleBranch: singleBranchCheck,
    },
    onSubmit: async (values) => {
      console.log(values);
      const status = statusCheck === true;
      const singleBranch = singleBranchCheck === true;

      // Create a FormData object to send the form data with the file
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("shortName", values.shortName);
      formData.append("sectorDetails", values.sectorDetails);
      formData.append("status", status);
      formData.append("singleBranch", singleBranch);
      formData.append("createdBy", values.createdBy);
      formData.append("natureOfBusiness", values.natureOfBusiness);
      formData.append("logo", values.logo); // Append the selected file

      try {
        // Send the POST request to your server
        const response = await axios.post(
          "http://localhost:5500/companies/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for file upload
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          // The company was created successfully
          window.alert("Company created successfully!");

          // Close the modal
          onClick();
          window.location.reload();
        } else {
          // An error occurred while creating the company
          console.log("Error creating company:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle any network or server error
        window.alert("An error occurred. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("logo", file);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Company Master
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
                <p className="capatilize font-semibold text-[13px]">
                  Company Name
                </p>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Company Name"
                  value={formik.values.name}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Short Name
                </p>
                <input
                  id="shortName"
                  type="text"
                  placeholder="Enter Company Short Name"
                  value={formik.values.shortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Sector
                </p>
                <input
                  id="sectorDetails"
                  type="text"
                  placeholder="Enter Company Sector"
                  value={formik.values.sectorDetails}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Nature of Business
                </p>
                <input
                  id="natureOfBusiness"
                  placeholder="Enter Nature of Business"
                  value={formik.values.natureOfBusiness}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Created By
                </p>
                <input
                  id="createdBy"
                  type="text"
                  placeholder="Enter Creator"
                  value={formik.values.createdBy}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={statusCheck}
                    className={`w-5 h-5 mr-2 mt-4 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={() => {
                      setStatusCheck(!statusCheck); // Toggle between true and false
                    }}
                  />
                  Active
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Logo</p>
                <input
                  id="logo"
                  type="file"
                  placeholder="Upload File"
                  // value={formik.values.logo}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Single Branch
                </p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="singleBranch"
                    type="checkbox"
                    checked={singleBranchCheck}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={() => setSingleBranchCheck(!singleBranchCheck)}
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
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
      </div>
    </form>
  );
};

export default CompanyModal;
