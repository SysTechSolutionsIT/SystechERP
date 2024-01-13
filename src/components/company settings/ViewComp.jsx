import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const VEModal = ({ visible, onClick, edit, ID }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [singleBranchCheck, setSingleBranchCheck] = useState(false);
  const [details, setDetails] = useState([]);
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
      Logo: "",
      CreatedBy: "",
      CreatedByName: "",
      ModifiedBy: "",
      ModifiedByName: "",
      Status: "",
      SingleCompany: "",
      CreatedOn: "",
      ModifiedOn: "",
      FieldId: "",
      FieldName: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // compData.push(values);
      const updatedData = {
        CompanyId: ID,
        CompanySectorId: "",
        CompanySector: values.CompanySector,
        CompanyName: values.CompanyName,
        ShortName: values.ShortName,
        NatureOfBusiness: values.NatureOfBusiness,
        Logo : values.Logo,
        CreatedBy: values.CreatedBy,
        CreatedByName: values.CreatedByName,
        ModifiedBy: values.ModifiedBy,
        ModifiedByName: values.ModifiedByName,
        IUFlag: "U",
        AcFlag: "Y",
        SingleCompany: values.SingleCompany,
        CreatedOn: values.createdAt,
        ModifiedOn: values.updatedAt,
        FieldId: "",
        FieldName: values.FieldName,
      };

      // Send a PUT request to update the data
      axios
        .post(
          `http://localhost:5500/companies/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { CompanyId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchCompData();
  }, [ID]);
  console.log(ID);
  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/companies/FnShowParticularData",
        {
          params: { CompanyId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.error("Error while fetching company data: ", error.message);
    }
  };
  console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        CompanyId: details.CompanyId,
        CompanySectorId: details.CompanySectorId,
        CompanySector: details.CompanySector,
        CompanyName: details.CompanyName,
        ShortName: details.ShortName,
        NatureOfBusiness: details.NatureOfBusiness,
        Logo: details.Logo,
        CreatedBy: details.CreatedBy,
        CreatedByName: details.CreatedByName,
        ModifiedBy: details.ModifiedBy,
        ModifiedByName: details.ModifiedByName,
        AcFlag: details.AcFlag,
        SingleCompany: details.SingleCompany,
        CreatedOn: details.createdAt,
        ModifiedOn: details.updatedAt,
        FieldId: details.FieldId,
        FieldName: details.FieldName,
      });
    }
  }, [details]);

  const [isStatusChecked, setStatusChecked] = useState(0);
  const [isSingleBranchChecked, setSingleBranchChecked] = useState(0);
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
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
    params: {CompanyId: ID},  
    headers: {Authorization: `Bearer ${token}`}
    })
    .then(res=> console.log(res))
    .catch(err => console.error(err))
  }

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

  useEffect(() =>{
    const fetchLogo = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/companies/get-upload',{
          params: {CompanyId: ID},  
          headers: {Authorization: `Bearer ${token}`}
        })
        const data = response.data.Logo
        console.log('Image Data', data.Logo)
        setPreviewImage(`http://localhost:5500/company-logo/${data}`)

      } catch (error) {
        console.error('Error')
      }
    }
    fetchLogo()
  },[details])

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
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
                  Company ID
                </p>
                <input
                  id="CompanyId"
                  type="number"
                  placeholder="Enter Company ID"
                  value={details.CompanyId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
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
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Nature of Business
                </p>
                <textarea
                  id="NatureOfBusiness"
                  placeholder="Enter Nature of Business"
                  value={formik.values.NatureOfBusiness}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Logo</p>
                <input
                  id="Logo"
                  type="file"
                  placeholder="Upload File"
                  onChange={(e) => {
                    handleFileChange(e)
                    handleImageChange(e);
                  }}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]"
                />

                {previewImage && (
                  <div className="mt-4">
                    <p className="font-semibold text-[13px]">Current Logo Preview:</p>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover border border-gray-300 rounded-lg mt-2"
                    />
                  </div>
                )}
                <button
                type="button"
                onClick={() => handleUpload()}
                className="bg-blue-900 text-white font-semibold rounded-lg w-24 h-8 mt-2 text-[11px] hover:bg-white hover:text-black hover:ease-linear"
              >
                Upload Logo
              </button>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Single Branch
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="SingleCompany"
                    type="checkbox"
                    checked={formik.values.SingleCompany}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={(event) =>
                      handleCheckboxChange(
                        "SingleCompany",
                        setStatusChecked,
                        event
                      )
                    }
                  />
                  Active
                </label>
              </div>
              {edit && ( // Only show the "Save" button if edit is true
                <div>
                  <p className="capatilize font-semibold text-[13px]">
                    Modified By
                  </p>
                  <input
                    id="ModifiedBy"
                    placeholder="Enter Updater"
                    value={formik.values.ModifiedBy}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                    disabled={!edit}
                  />
                </div>
              )}
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              {edit && ( // Only show the "Save" button if edit is true
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                >
                  Save
                </button>
              )}
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

export default VEModal;
