import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const CompanyModal = ({ visible, onClick }) => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [logoName, setLogoName] = useState()
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      CompanyId: "",
      CompanySectorId: "",
      CompanySector: "",
      CompanyName: "",
      ShortName: "",
      NatureOfBusiness: "",
      Logo: logoName, // Updated to handle the logo as a file object
      AcFlag: "Y",
      CreatedBy: "",
      CreatedByName: "",
      ModifiedBy: null,
      ModifiedByName: "",
      IUFlag: "I",
      SingleCompany: false,
      CreatedOn: "",
      ModifiedOn: "",
      FieldId: "",
      FieldName: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      addCompany(values);
    },
  });

  const [isStatusChecked, setStatusChecked] = useState(0);
  const [isSingleBranchChecked, setSingleBranchChecked] = useState(0);

  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file)
  };

  const handleUpload = () =>{
    const formdata = new FormData()
    formdata.append('image', uploadedImage)
    axios.post('http://localhost:5500/companies/upload', formdata, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res=> console.log(res))
    .catch(err => console.error(err))
  }

  const addCompany = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/companies/FnAddUpdateDeleteRecord",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert('Company Added')
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
  
      reader.readAsDataURL(file);
  
      // Set the Logo field in Formik state
    }
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
                  id="CompanyName"
                  type="text"
                  placeholder="Enter Company Name"
                  value={formik.values.CompanyName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Company Short Name"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Sector
                </p>
                <input
                  id="CompanySector"
                  type="text"
                  placeholder="Enter Company Sector"
                  value={formik.values.CompanySector}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Nature of Business
                </p>
                <input
                  id="NatureOfBusiness"
                  placeholder="Enter Nature of Business"
                  value={formik.values.NatureOfBusiness}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Created By
                </p>
                <input
                  id="CreatedBy"
                  type="text"
                  placeholder="Enter Creator"
                  value={formik.values.CreatedBy}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Single Branch
                </p>
                <label className="capitalize font-semibold text-[13px]">
                  <input
                    id="SingleCompany"
                    type="checkbox"
                    checked={isSingleBranchChecked}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                    onChange={(event) =>
                      handleCheckboxChange(
                        "SingleCompany",
                        setSingleBranchChecked,
                        event
                      )
                    }
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
