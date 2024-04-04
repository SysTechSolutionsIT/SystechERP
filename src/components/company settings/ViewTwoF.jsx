import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";

const ViewTwoF = ({ visible, onClick, edit, ID }) => {
  const { token } = useAuth();
  const [details, setDetails] = useState([]);
  const [Mname, setMname] = useState();
  const formik = useFormik({
    initialValues: {
      FieldId: "",
      MasterNameId: "",
      FieldDetails: "",
      Remark: "",
    },
    onSubmit: (values) => {
      console.log(values);
      updateField(values);
    },
  });

  const updateField = async (values) => {
    try {
      const response = axios.post(
        `http://localhost:5500/two-field/FnAddUpdateDeleteRecord`,
        values,
        {
          params: { FieldId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Patch successful");
    } catch (error) {
      console.log("Error in patch ", error);
    }
  };

  useEffect(() => {
    fetchFieldData();
  }, [ID]);

  const fetchFieldData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/two-field/FnShowParticularData`,
        {
          params: { FieldId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setDetails(data);
      console.log("My2 field: in view", data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  //Fetching Master Name
  useEffect(() => {
    fetchMasterName();
  }, [details]);

  const fetchMasterName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/master-names/FnShowParticularData`,
        {
          params: { MasterId: details.MasterNameId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setMname(data);
    } catch (error) {
      console.log("Error while fetching masterName data: ", error.message);
    }
  };
  useEffect(() => {
    if (details) {
      formik.setValues({
        FieldId: details.FieldId,
        MasterNameId: details.MasterNameId,
        FieldDetails: details.FieldDetails,
        Remark: details.Remark,
      });
    }
  }, [details]);

  console.log("Formik ", formik.values);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%] overflow-y-scroll">
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
                <p className="text-[13px] font-semibold">Field ID</p>
                <input
                  id="FieldId"
                  type="text"
                  placeholder="Enter Field ID"
                  value={formik.values.FieldId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Master Name</p>
                <input
                  id="Mname"
                  type="text"
                  placeholder="Enter Master Name"
                  value={formik.values.MasterNameId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Field Details</p>
                <input
                  id="FieldDetails"
                  type="text"
                  placeholder="Enter Field Details"
                  value={formik.values.FieldDetails}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
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
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
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

export default ViewTwoF;
