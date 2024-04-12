import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { destData } from "./DestinationMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const BranchModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [companies, setCompanies] = useState([]);
  const { companyId, setCompanyId } = useState(); //For selected company

  const formik = useFormik({
    initialValues: {
      CompanyId: "",
      BranchName: "",
      BranchShortName: "",
      BranchAddress: "",
      Remark: "",
      IUFlag: "I",
      AcFlag: "Y",
      CreatedOn: new Date(),
    },
    onSubmit: (values, {resetForm}) => {
      const updatedValues = {
        CompanyId: companyId,
        BranchName: values.BranchName,
        BranchShortName: values.BranchShortName,
        BranchAddress: values.BranchAddress,
        Remark: values.Remark,
        IUFlag: "I",
        AcFlag: "Y",
        CreatedOn: new Date(),
      };
      AddBranch(updatedValues);
      resetForm()
      onClick()
    },
  });

  const AddBranch = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/l3r2o5v7/FnAddUpdateDeleteRecord",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("Branch added successfully");
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.log(`Error: `, error.message);
      // Handle network error
    }
  };

  //Fetching Company Data for drop down
  useEffect(() => {
    fetchCompData();
  }, []);

  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/companies/FnShowActiveData"
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setCompanies(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
    console.log(selectedCompanyId);
    setCompanyId(selectedCompanyId);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Branch Master
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2">
                <p className="text-[13px] font-semibold">Company Name</p>
                <select
                  type="dropdown"
                  id="CompanyId"
                  required
                  onChange={() => handleCompanyChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.CompanyId} value={company.CompanyId}>
                      {company.CompanyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Branch Name</p>
                <input
                  id="BranchName"
                  placeholder="Enter Branch Name"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Branch Short Name</p>
                <input
                  id="BranchShortName"
                  type="text"
                  placeholder="Enter Branch Short Name"
                  value={formik.values.BranchShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Branch Address</p>
                <input
                  id="BranchAddress"
                  type="text"
                  placeholder="Enter Branch Address"
                  value={formik.values.BranchAddress}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
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
              Save
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BranchModal;
