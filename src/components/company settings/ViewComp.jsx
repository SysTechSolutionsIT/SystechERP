import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const VEModal = ({ visible, onClick, edit, ID }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [singleBranchCheck, setSingleBranchCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      companyId: "",
      companyName: "",
      shortName: "",
      sectorDetails: "",
      status: statusCheck,
      natureOfBusiness: "",
      logo: null,
      singleBranch: singleBranchCheck,
      modifiedBy: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // compData.push(values);
      const updatedData = {
        id: values.id,
        name: values.name,
        shortName: values.shortName,
        sectorDetails: values.sectorDetails,
        status: values.status,
        natureOfBusiness: values.natureOfBusiness,
        logo: values.logo,
        logoName: values.logoName,
        singleBranch: values.singleBranch,
        modifiedBy: values.modifiedBy,
        modifiedOn: new Date(),
      };

      // Send a PUT request to update the data
      axios
        .put(`http://localhost:5500/companies/update/${ID}`, updatedData)
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
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
      const response = await axios.get(`http://localhost:5500/companies/${ID}`);
      console.log("Response Object", response);
      const data = response.data.company;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  // console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        companyId: details.id,
        name: details.name,
        shortName: details.shortName,
        sectorDetails: details.sectorDetails,
        status: details.status,
        natureOfBusiness: details.natureOfBusiness,
        logo: null, // You might want to handle file inputs differently
        singleBranch: singleBranchCheck,
        modifiedBy: details.modifiedBy,
      });
    }
  }, [details]);

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
                  id="companyId"
                  type="number"
                  placeholder="Enter Company ID"
                  value={details?.id || ""}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
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
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Nature of Business
                </p>
                <textarea
                  id="natureOfBusiness"
                  placeholder="Enter Nature of Business"
                  value={formik.values.natureOfBusiness}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={formik.values.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={() => {
                      console.log("Status checkbox clicked");
                      setStatusCheck(!statusCheck);
                      console.log("Status after updating", statusCheck);
                    }}
                  />
                  Active
                </label>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Logo</p>
                {edit ? ( // If edit is true, render the input field and logoName
                  <>
                    <input
                      id="logo"
                      type="file"
                      placeholder="Upload File"
                      className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                      onChange={formik.handleChange}
                    />
                    <p className="text-[11px]">{details?.logoName}</p>
                  </>
                ) : (
                  // If edit is false, just display the logoName
                  <p className="text-[11px]">{details?.logoName}</p>
                )}
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Single Branch
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="singleBranch"
                    type="checkbox"
                    checked={singleBranchCheck}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                    onChange={() => setSingleBranchCheck(!singleBranchCheck)}
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
                    id="modifiedBy"
                    placeholder="Enter Updater"
                    value={formik.values.modifiedBy}
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
