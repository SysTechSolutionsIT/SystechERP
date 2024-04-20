import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const VEBranch = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      CompanyId: "",
      BranchId: ID,
      BranchName: "",
      BranchShortName: "",
      BranchAddress: "",
      Remark: "",
      IUFlag: "U",
      AcFlag: "Y",
      ModifiedOn: new Date(),
    },
    onSubmit: async (values) => {
      const updatedData = {
        CompanyId: values.CompanyId,
        BranchId: ID,
        BranchName: values.BranchName,
        BranchShortName: values.BranchShortName,
        BranchAddress: values.BranchAddress,
        Remark: values.Remark,
        IUFlag: "U",
        AcFlag: "Y",
        ModifiedOn: new Date(),
      };
      axios
        .post(
          `http://localhost:5500/l3r2o5v7/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { BranchId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          alert("Data Updated");
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  //Fetching Particular company data
  useEffect(() => {
    fetchCompData();
  }, [details]);

  const fetchCompData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/companies/FnShowParticularData",
        {
          params: { CompanyId: details.CompanyId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setCompanies(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  // API
  useEffect(() => {
    fetchNewData();
  }, [ID]);

  const fetchNewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/l3r2o5v7/FnShowParticularData`,
        {
          params: { BranchId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        CompanyId: details.CompanyId,
        BranchId: details.BranchId,
        BranchName: details.BranchName,
        BranchShortName: details.BranchShortName,
        BranchAddress: details.BranchAddress,
        Remark: details.Remark,
      });
    }
  }, [details]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-clip h-fit">
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
                <input
                  type="text"
                  id="CompanyId"
                  value={companies.CompanyName}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
                  disabled={true}
                />
              </div>
              <div className="mb-2">
                <p className="text-[13px] font-semibold">Branch Id</p>
                <input
                  type="text"
                  id="BranchId"
                  value={formik.values.BranchId}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Branch Name</p>
                <input
                  id="BranchName"
                  placeholder="Enter Branch Name"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
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

export default VEBranch;
