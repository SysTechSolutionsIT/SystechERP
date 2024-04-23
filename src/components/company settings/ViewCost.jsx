import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";

const VECost = ({ visible, onClick, edit, ID }) => {
  const [details, setDetails] = useState([]);
  const { token } = useAuth();
  console.log("Cost Center ID:", ID);

  const formik = useFormik({
    initialValues: {
      CostCenterId: "",
      CostCenterName: "",
      Remark: "",
    },
    onSubmit: async (values) => {
      const updatedData = {
        CostCenterId: ID,
        CostCenterName: values.CostCenterName,
        Remark: values.Remark,
        ModifiedOn: new Date(),
        IUFlag: "U",
      };
      axios
        .post(
          `http://localhost:5500/cost-center/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { CostCenterId: ID },
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

  // API

  useEffect(() => {
    if (details !== null) {
      // Check if details is not null before setting formik values
      formik.setValues({
        CostCenterId: details?.CostCenterId,
        CostCenterName: details?.CostCenterName,
        Remark: details?.Remark,
      });
    }
  }, [details]);

  useEffect(() => {
    fetchNewData();
  }, [ID]);

  const fetchNewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/cost-center/FnShowParticularData`,
        {
          params: { CostCenterId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details !== null) {
      // Check if details is not null before setting formik values
      formik.setValues({
        CostCenterId: details?.CostCenterId,
        CostCenterName: details?.CostCenterName,
        Remark: details?.Remark,
      });
    }
  }, [details]);

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
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
                  Cost Center ID
                </p>
                <input
                  id="CostCenterId"
                  type="number"
                  value={ID}
                  className={`w-full px-4 bg-white py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Cost Center Name
                </p>
                <input
                  id="CostCenterName"
                  type="text"
                  value={formik.values.CostCenterName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Remarks
                </p>
                <input
                  id="Remark"
                  type="text"
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

export default VECost;
