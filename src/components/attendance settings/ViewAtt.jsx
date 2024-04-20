import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { DeviceData } from "./AttDevice";
import axios from "axios";
import { useAuth } from "../Login";

const ViewAtt = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      DeviceName: "",
      IpAddress: "",
      PortNo: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
      modifiedOn: new Date(),
    },
    onSubmit: async (values) => {
      const formData = {
        DeviceId: ID,
        DeviceName: values.DeviceName,
        IpAddress: values.IpAddress,
        PortNo: values.PortNo,
        Remark: values.Remark,
        AcFlag: "Y",
        IUFlag: "U",
        modifiedOn: new Date(),
      };
      console.log(formData);
      axios
        .post(
          `http://localhost:5500/device/FnAddUpdateDeleteRecord`,
          formData,
          {
            params: { DeviceId: ID },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
          onClick();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchAttData();
  }, [ID]);
  console.log(ID);
  const fetchAttData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/device/FnShowParticularData`,
        {
          params: { DeviceId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        DeviceName: details.DeviceName,
        IpAddress: details.IpAddress,
        PortNo: details.PortNo,
        Remark: details.Remark,
      });
    }
  }, [details]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Att. Device Master
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
                <p className="text-[13px] font-semibold">Device ID</p>
                <input
                  id="DeviceId"
                  type="text"
                  placeholder="Enter Device ID"
                  value={details?.DeviceId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Device Name</p>
                <input
                  id="DeviceName"
                  type="text"
                  placeholder="Enter Device Name"
                  value={formik.values.DeviceName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
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
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Port No.</p>
                <input
                  id="PortNo"
                  type="text"
                  placeholder="Enter Port No."
                  value={formik.values.PortNo}
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

export default ViewAtt;
