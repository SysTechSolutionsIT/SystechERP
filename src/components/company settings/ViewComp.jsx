import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { compData } from "./CompMaster";

const VEModal = ({ visible, onClick, edit, ID }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [singleBranchCheck, setSingleBranchCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      companyId: "",
      companyName: "",
      shortName: "",
      companySector: "",
      status: statusCheck,
      natureOfBusiness: "",
      logo: "",
      singleBranch: singleBranchCheck,
    },
    onSubmit: (values) => {
      console.log(values);
      compData.push(values);
    },
  });

  useEffect(() => {
    const selectedCompany = compData.find((company) => company.ID === ID);
    if (selectedCompany) {
      setDetails(selectedCompany);
    }
  }, [ID]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 text-white text-center font-semibold text-lg py-4 px-8 rounded-lg">
            Company Master
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
                  value={details.ID}
                  className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Name
                </p>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Enter Company Name"
                  value={details.Name}
                  className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
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
                  value={details.ShortName}
                  className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg`}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Sector
                </p>
                <input
                  id="companySector"
                  type="text"
                  placeholder="Enter Company Sector"
                  value={details.SectorDetails}
                  className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg `}
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
                  value={details.NatureOfBusiness}
                  className={`w-full px-4 py-2 text-[11px] border-blue-900 focus:outline-gray-300 border-2 rounded-lg break-words`}
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
                    checked={statusCheck}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg  border-blue-900`}
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
                <p className="capatilize font-semibold text-[13px]">Logo</p>
                <input
                  id="logo"
                  type="file"
                  placeholder="Upload File"
                  value={details.File}
                  className={`w-full px-4 py-2 font-[10px] bg-white focus:outline-gray-300 border-2 rounded-lg border-blue-900`}
                  onChange={formik.handleChange}
                />
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
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg  border-blue-900 text-[11px]`}
                    onChange={() => setSingleBranchCheck(!singleBranchCheck)}
                  />
                  Active
                </label>
              </div>
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
