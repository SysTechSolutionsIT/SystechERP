import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const Documents = ({ ID, name }) => {
  const [DocData, setDocData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
      Document: "",
      DocumentName: "",
      IUFlag: "",
      Remarks: "",
    },
    onSubmit: async (values) => {
      const combinedData = {
        EmployeeId: ID,
        Document: values.Document,
        DocumentName: values.DocumentName,
        Remarks: values.Remarks,
      };
      console.log("Submitted data:", combinedData);
      updateDocs(combinedData);
    },
  });

  const updateDocs = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5500/employee/documents/FnAddUpdateDeleteRecord`,
        data,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Documents updated successfully");
    } catch (error) {
      console.error("Error while updating Documents: ", error.message);
    }
  };

  useEffect(() => {
    fetchDocData();
  }, [token]);

  const fetchDocData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/academic/FnShowParticularData`,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setDocData(data);
    } catch (error) {
      console.log("Error while fetching academic data: ", error.message);
    }
  };

  const handleDeleteEntry = (index) => {
    const updatedDocData = [...DocData];
    updatedDocData.splice(index, 1);
    setDocData(updatedDocData);
  };

  const AddDoc = ({ visible, onClick, ID }) => {
    const { token } = useAuth();
    const [uploadedImage, setUploadedImage] = useState(null);

    const formik = useFormik({
      initialValues: {
        EmployeeId: ID,
        Document: "",
        DocumentName: "",
        IUFlag: "I",
        Remarks: "",
      },
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        addDocs();
        // resetForm()
      },
    });

    const addDocs = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5500/employee/documents/FnAddUpdateDeleteRecord",
          formik.values,
          {
            params: { EmployeeId: ID },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Job Responsibility Added");
      } catch (error) {
        console.error("Error", error);
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setUploadedImage(file);
    };
    const handleUpload = () => {
      const formdata = new FormData();
      formdata.append("file", uploadedImage);
      try {
        const response = axios.post(
          "http://localhost:5500/employee/documents/upload",
          formdata,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.message === "Success") alert("Logo Uploaded");
        else alert("Logo Upload Failed, Please refresh and try again");
      } catch (error) {
        console.error("Error", error);
      }
    };

    if (!visible) return null;
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
          <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
            <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
              <p className="text-white text-[13px] font-semibold">
                Document Master
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
                  <p className="text-[13px] font-semibold">Document Name</p>
                  <input
                    id="DocumentName"
                    type="text"
                    placeholder="Enter Document Name"
                    value={formik.values.DocumentName}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold">Document</p>
                  <div>
                    <input
                      id="Document"
                      type="file"
                      placeholder="Upload File"
                      onChange={(e) => {
                        handleFileChange(e);
                        // handleImageChange(e);
                      }}
                      className="w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]"
                    />

                    {/* {previewImage && (
                    <div className="mt-4">
                      <p className="font-semibold text-[13px]">Current Logo Preview:</p>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover border border-gray-300 rounded-lg mt-2"
                      />
                    </div>
                  )} */}
                    <button
                      type="button"
                      onClick={handleUpload}
                      className="bg-blue-900 text-white font-semibold rounded-lg w-24 h-8 mt-2 text-[11px] hover:bg-white hover:text-black hover:ease-linear"
                    >
                      Upload Document
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-semibold">Remarks</p>
                  <input
                    id="Remarks"
                    type="text"
                    placeholder="Enter Remarks"
                    value={formik.values.Remarks}
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <formik onSubmit={formik.handleSubmit}>
        <div className="p-4 bg-white font-[Inter]">
          <div className="grid grid-cols-3 gap-x-4">
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Employee ID
              </p>
              <input
                id="EmployeeId"
                type="number"
                value={ID}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Employee Name
              </p>
              <input
                id="EmployeeName"
                type="text"
                value={name}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <AddDoc
            ID={ID}
            name={name}
            visible={isModalOpen}
            onClick={() => setModalOpen(false)}
          />
          <div className="gap-4 justify-between">
            <div className="my-1 rounded-2xl bg-white p-2 pr-8">
              <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
                <thead>
                  <tr>
                    <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                      Actions
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Doc Name
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DocData.length > 0 &&
                    DocData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-2 border-2">
                          <div className="flex items-center gap-2 text-center justify-center">
                            <Icon
                              icon="material-symbols:delete-outline"
                              color="#556987"
                              width="20"
                              height="20"
                              onClick={() => handleDeleteEntry(index)}
                            />
                          </div>
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          <input
                            type="text"
                            name={`DocData[${index}].DocumentName`}
                            value={item.DocumentName}
                            onChange={formik.handleChange}
                          />
                        </td>
                        <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                          <input
                            type="text"
                            name={`DocData[${index}].Remarks`}
                            value={item.Remarks}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex mt-5 justify-center gap-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
            >
              Save Details
            </button>
            <button
              className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </formik>
    </form>
  );
};

export default Documents;
