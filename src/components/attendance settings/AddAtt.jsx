import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { DeviceData } from "./AttDevice";
import axios from "axios";
import { useAuth } from "../Login";

const AddAtt = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      DeviceName: "",
      IpAddress: "",
      PortNo: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      createdOn: new Date(),
    },
    onSubmit: async (values) => {
      const formData = {
        DeviceName: values.DeviceName,
        IpAddress: values.IpAddress,
        PortNo: values.PortNo,
        Remark: values.Remark,
        AcFlag: "Y",
        IUFlag: "I",
        createdOn: new Date(),
      };

      console.log(formData);
      try {
        const response = await axios.post(
          "http://localhost:5500/device/FnAddUpdateDeleteRecord",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          alert("Record added successfully");
          onClick();
          window.location.reload();
          // Handle successful response
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
          // Handle error response
        }
      } catch (error) {
        console.error("Error:", error.message);
        // Handle network error
      }
    },
  });

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Holiday Master
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
                <p className="text-[13px] font-semibold">Device Name</p>
                <input
                  id="DeviceName"
                  type="text"
                  placeholder="Enter Device Name"
                  value={formik.values.DeviceName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">IP Address</p>
                <input
                  id="IpAddress"
                  type="text"
                  placeholder="Enter IP Address"
                  value={formik.values.IpAddress}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Port No</p>
                <input
                  id="PortNo"
                  type="text"
                  placeholder="Enter Port No"
                  value={formik.values.PortNo}
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

export default AddAtt;
