import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";
import axios from "axios";
import { useFormik } from "formik";

const AddMasterModal = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      MasterName: "",
      AcFlag: "Y",
      IUFlag: "I",
    },
    onSubmit: (values) => {
      const updatedData = {
        MasterName: values.MasterName,
        AcFlag: "Y",
        IUFlag: "I",
      };
      console.log(values);
      updateMasterName(updatedData);
      onClose();
    },
  });

  const updateMasterName = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5500/master-names/FnAddUpdateDeleteRecord`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      if (response.data) {
        alert("MasterName updated successfully");
      } else {
        console.error("Failed to update Master Name. Response:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Add New Master Name
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Master Name </p>
                <input
                  id="MasterName"
                  type="text"
                  placeholder="Enter Master Name"
                  value={formik.values.MasterName}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMasterModal;
