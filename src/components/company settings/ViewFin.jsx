import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const VEFModal = ({ visible, onClick, edit, ID }) => {
  const [YearCloseCheck, setYearCloseCheck] = useState(false);
  const [AcFlagCheck, setAcFlagCheck] = useState(false);
  const [details, setDetails] = useState([]);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      Name: "",
      StartDate: "",
      EndDate: "",
      ShortName: "",
      YearClose: YearCloseCheck,
      Remark: "",
      IUFlag: "U",
    },
    onSubmit: (values) => {
      console.log(values);
      const YearClosed = YearCloseCheck === true;
      const updatedData = {
        FYearId: ID,
        Name: values.Name,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        ShortName: values.ShortName,
        YearClose: YearClosed, //YearCloseCheck was already part of formik.values
        Remark: values.Remark,
        IUFlag: "U",
      };

      axios
        .post(
          `http://localhost:5500/financials/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { FYearId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });
  useEffect(() => {
    fetchFinData();
  }, [ID]);

  console.log(ID);
  const fetchFinData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/financials/FnShowParticularData`,
        {
          params: { FYearId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.error("Error while fetching company data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        Name: details.Name,
        ShortName: details.ShortName,
        Remark: details.Remark,
        StartDate: details.StartDate ? new Date(details.StartDate).toISOString().split('T')[0] : '', // Format the date
        EndDate: details.EndDate ? new Date(details.EndDate).toISOString().split('T')[0] : '', // Format the date
        YearClose: details.YearClose,
      });
    }
  }, [details]);
  

  console.log("set details", details);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Financial Master
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
                  Financial Year ID
                </p>
                <input
                  id="FYearId"
                  type="number"
                  placeholder="Enter Financial Year ID"
                  value={details?.FYearId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Name</p>
                <input
                  id="Name"
                  type="text"
                  placeholder="Enter Name"
                  value={formik.values.Name}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Start Date
                </p>
                <input
                  id="StartDate"
                  type="date"
                  placeholder="Enter Start Date"
                  value={formik.values.StartDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">End Date</p>
                <input
                  id="EndDate"
                  type="date"
                  placeholder="Enter End Date"
                  value={formik.values.EndDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Short Name
                </p>
                <input
                  id="ShortName"
                  type="text"
                  placeholder="Enter Short Name"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Year Close
                </p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="YearClose"
                    type="checkbox"
                    checked={YearCloseCheck}
                    // Remove the 'value' attribute from the checkbox
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-blue-900 border border-gray-300 rounded-lg`}
                    onChange={() => setYearCloseCheck(!YearCloseCheck)}
                  />
                </label>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remark</p>
                <textarea
                  id="Remark"
                  placeholder="Enter Remark"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
            </div>
            <div className="flex mt-5 gap-10 justify-center">
              {edit && ( // Only show the "Submit" button if edit is true
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
                >
                  Submit
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

export default VEFModal;
