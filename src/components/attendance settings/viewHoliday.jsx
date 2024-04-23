import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { HolidayData } from "./Holidaymaster";
import axios from "axios";
import { useAuth } from "../Login";

const ViewHoliday = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const [state, setState] = useState(false);
  const { token } = useAuth();
  const formik = useFormik({
    initialValues: {
      HolidayDate: "",
      HolidayType: "",
      HolidayDescription: "",
      FYear: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
      AcFlag: "",
    },
    onSubmit: async (values) => {
      const formData = {
        HolidayId: ID,
        HolidayDate: values.HolidayDate,
        HolidayType: values.HolidayType,
        HolidayDescription: values.HolidayDescription,
        FYear: values.FYear,
        AcFlag: "Y",
        IUFlag: "U",
        ModifiedOn: new Date(),
        Remark: values.Remark,
      };
      onClick();
      console.log(formData);
      axios
        .post(
          `http://localhost:5500/s3f9n7v2/FnAddUpdateDeleteRecord`,
          formData,
          {
            params: { HolidayId: ID },
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
    fetchHolidayData();
  }, [ID]);
  console.log(ID);
  const fetchHolidayData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/s3f9n7v2/FnShowParticularData`,
        {
          params: { HolidayId: ID },
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
  // console.log("ID:", ID);
  console.log(details);

  useEffect(() => {
    if (details) {
      formik.setValues({
        HolidayDate: details.HolidayDate,
        HolidayType: details.HolidayType,
        HolidayDescription: details.HolidayDescription,
        FYear: details.FYear,
        Remark: details.Remark,
      });
    }
  }, [details]);

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
                <p className="text-[13px] font-semibold">Holiday ID</p>
                <input
                  id="HolidayId"
                  type="text"
                  placeholder="Enter Holiday ID"
                  value={details?.HolidayId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Holiday Description</p>
                <input
                  id="HolidayDescription"
                  type="text"
                  placeholder="Enter Holiday Description"
                  value={formik.values.HolidayDescription}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Holiday Date</p>
                <input
                  id="HolidayDate"
                  type="date"
                  placeholder="Enter Holiday Date"
                  value={formik.values.HolidayDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Holiday Type
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="HolidayType"
                      value="Paid"
                      checked={formik.values.HolidayType === "Paid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="HolidayType"
                      value="Unpaid"
                      checked={formik.values.HolidayType === "Unpaid"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Unpaid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="HolidayType"
                      value="weekOff"
                      checked={formik.values.HolidayType === "weekOff"}
                      onChange={formik.handleChange}
                      className="mr-2"
                      disabled={!edit}
                    />
                    Week-Off
                  </label>
                </div>
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

export default ViewHoliday;
