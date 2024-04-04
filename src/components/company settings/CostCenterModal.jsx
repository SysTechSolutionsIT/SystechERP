import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth, useDetails } from "../Login";

const CostCenterModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const { companyId } = useDetails();
  console.log("IDs: ", companyId);

  const formik = useFormik({
    initialValues: {
      CostCenterName: "",
      Remark: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        const formData = {
          CompanyId: companyId,
          CostCenterName: values.CostCenterName,
          Remark: values.Remark,
          AcFlag: "Y",
          IUFlag: "I",
          CreatedOn: new Date(),
          ModifiedOn: "",
        };

        const response = await axios.post(
          "http://localhost:5500/cost-center/FnAddUpdateDeleteRecord",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } //Send the extracted form data
        );

        console.log(response);
        alert("Cost Center Added Successfully");
        onClick();
        window.location.reload();
      } catch (error) {
        console.error("Error", error);
      }
    },
  });

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Cost Center Master
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
                <p className="capatilize font-semibold  text-[13px]">
                  Cost Center Name
                </p>
                <input
                  id="CostCenterName"
                  type="text"
                  placeholder="Cost Center Name"
                  value={formik.values.CostCenterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
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
    </form>
  );
};

export default CostCenterModal;
