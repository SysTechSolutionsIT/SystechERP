import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const TwoFieldsModal = ({ visible, onClick, MasterID }) => {
  const { token } = useAuth();
  const [MNames, setMNames] = useState([]);
  const formik = useFormik({
    initialValues: {
      MasterNameId: "",
      FieldDetails: "",
      AcFlag: "Y",
      IUFlag: "I",
      Remark: "",
      CreatedOn: new Date(),
    },
    onSubmit: (values) => {
      console.log(values);
      addField(values);
    },
  });

  // Getting Master Names
  useEffect(() => {
    fetchMasterNamesData();
  }, [token]);

  const fetchMasterNamesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/master-names/FnshowActiveData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setMNames(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };
  const addField = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/two-field/FnAddUpdateDeleteRecord",
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
        alert("Two Fields added successfully");
        // Handle successful response
        onClick();
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.log(`Error: `, error.message);
      // Handle network error
    }
  };
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Two Fields Master
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
              <div>
                <p className="text-[13px] font-semibold">Master Name</p>
                <select
                  id="MasterNameId"
                  name="MasterNameId"
                  className="w-full px-4 py-1.5 font-normal text-[11px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.MasterNameId || MasterID || ""}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  {MNames.map((entry) => (
                    <option key={entry.MasterId} value={entry.MasterId}>
                      {entry.MasterName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Field Details</p>
                <input
                  id="FieldDetails"
                  type="text"
                  placeholder="Enter Field Details"
                  value={formik.values.FieldDetails}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
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
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
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

export default TwoFieldsModal;
