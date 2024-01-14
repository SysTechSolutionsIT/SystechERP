import React, { useEffect, useState } from "react";
import { Button, FormFloating } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth, useDetails } from "../Login";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

export const EmployeeTypeContext = createContext();

export const useEmployeeType = () => {
  return useContext(EmployeeTypeContext);
};

export const EmployeeTypeProvider = ({ children }) => {
  const [employeeTypeId, setEmployeeTypeId] = useState("");

  const handleSetEmployeeId = (newEmployeeTypeId) => {
    setEmployeeTypeId(newEmployeeTypeId);
    Cookies.set("employeeTypeId", newEmployeeTypeId);
  };

  useEffect(() => {
    const savedEmployeeTypeId = Cookies.get("employeeTypeId");
    if (savedEmployeeTypeId) {
      setEmployeeTypeId(savedEmployeeTypeId);
    }
  }, []);
  return (
    <EmployeeTypeContext.Provider
      value={{ employeeTypeId, setEmployeeTypeId: handleSetEmployeeId }}
    >
      {children}
    </EmployeeTypeContext.Provider>
  );
};

export default function Personal({ ID }) {
  const { token } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null)
  const [details, setdetails] = useState([]);
  const { employeeTypeId, setEmployeeTypeId } = useEmployeeType();
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeGroup, setEmployeeTypeGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhoto, setEmployeePhoto] = useState("");
  const { fYear } = useDetails();

  const formik = useFormik({
    initialValues: {
      EmployeeId: "",
      EmployeeName: "",
      EmployeeTypeId: "",
      EmployeeTypeGroupId: "",
      Salutation: "",
      LastName: "",
      FirstName: "",
      MiddleName: "",
      MEmployeeName: "",
      AadharCardNo: "",
      PANNo: "",
      PassportNo: "",
      PassportIssueDate: "",
      PassportExpireDate: "",
      CurrentAddress: "",
      CurrentPincode: "",
      PermanentAddress: "",
      PermanentPincode: "",
      DOB: "",
      EmailId1: "",
      EmailId2: "",
      PhoneNo: "",
      CellNo1: "",
      CellNo2: "",
      BankId1: "",
      AccountNo1: "",
      IFSCCode1: "",
      BankId2: "",
      AccountNo2: "",
      IFSCCode2: "",
      MaritalStatus: "",
      ReferenceId: "",
      DestinationId: "",
      ReligionId: "",
      CategoryId: "",
      CasteId: "",
      EmployeePhoto: "",
      Gender: "",
      BloodGroup: "",
      DrivingLicence: "",
      FinanceAccountNo: "",
      Remark: "",
      IUFlag: "U",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values, { resetForm }) => {
      const updatedData = {
        EmployeeId: values.EmployeeId,
        EmployeeName: values.EmployeeName,
        EmployeeTypeId: values.EmployeeTypeId,
        EmployeeTypeGroupId: values.EmployeeTypeGroupId,
        Salutation: values.Salutation,
        LastName: values.LastName,
        FirstName: values.FirstName,
        MiddleName: values.MiddleName,
        MEmployeeName: values.MEmployeeName,
        AadharCardNo: values.AadharCardNo,
        PANNo: values.PANNo,
        PassportNo: values.PassportNo,
        PassportIssueDate: values.PassportIssueDate,
        PassportExpireDate: values.PassportExpireDate,
        CurrentAddress: values.CurrentAddress,
        CurrentPincode: values.CurrentPincode,
        PermanentAddress: values.PermanentAddress,
        PermanentPincode: values.PermanentPincode,
        DOB: values.DOB,
        EmailId1: values.EmailId1,
        EmailId2: values.EmailId2,
        PhoneNo: values.PhoneNo,
        CellNo1: values.CellNo1,
        CellNo2: values.CellNo2,
        BankId1: values.BankId1,
        AccountNo1: values.AccountNo1,
        IFSCCode1: values.IFSCCode1,
        BankId2: values.BankId2,
        AccountNo2: values.AccountNo2,
        IFSCCode2: values.IFSCCode2,
        MaritalStatus: values.MaritalStatus,
        ReferenceId: values.ReferenceId,
        DestinationId: values.DestinationId,
        ReligionId: values.ReligionId,
        CategoryId: values.CategoryId,
        CasteId: values.CasteId,
        EmployeePhoto: values.EmployeePhoto,
        Gender: values.Gender,
        BloodGroup: values.BloodGroup,
        DrivingLicence: values.DrivingLicence,
        FinanceAccountNo: values.FinanceAccountNo,
        Remark: values.Remark,
        IUFlag: "U",
        CreatedBy: values.CreatedBy,
        CreatedOn: values.CreatedOn,
        ModifiedBy: values.ModifiedBy,
        ModifiedOn: values.ModifiedOn,
      };
      console.log("Updated data", updatedData);
      updateEmpPersonal(updatedData);
    },
  });

  // Patch
  const updateEmpPersonal = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5500/employee/personal/FnAddUpdateDeleteRecord`,
        data,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      if (response.data) {
        alert("Employee details updated successfully");
      } else {
        console.error(
          "Failed to update employee details. Response:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowPerticularData`,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setdetails(data);
      console.log("EMP type id in personal", employeeTypeId);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPhotoData();
  }, [ID]);
  const fetchPhotoData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowImageData`,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const imageBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(imageBlob);
      setEmployeePhoto(imageUrl);
    } catch (error) {
      console.log("Error while fetching image data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
  }, [ID]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  //Fetching category

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      const CID = 8;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Category", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCategoryData();
  }, [token]);

  const [Religion, setReligion] = useState([]);
  useEffect(() => {
    const fetchReligionData = async () => {
      const CID = 7;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Religion", data);
        setReligion(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchReligionData();
  }, [token]);

  const [Reference, setReference] = useState([]);
  useEffect(() => {
    const fetchReferenceData = async () => {
      const CID = 6;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Reference", data);
        setReference(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchReferenceData();
  }, [token]);

  const [Caste, setCaste] = useState([]);
  useEffect(() => {
    const fetchCasteData = async () => {
      const CID = 9;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("caste", data);
        setCaste(data);
      } catch (error) {
        console.error("Error fetching caste:", error);
      }
    };
    fetchCasteData();
  }, [token]);
  

  useEffect(() => {
    if (details) {
      formik.setValues({
        EmployeeId: details.EmployeeId,
        EmployeeName: details.EmployeeName,
        EmployeeTypeId: details.EmployeeTypeId,
        EmployeeTypeGroupId: details.EmployeeTypeGroupId,
        Salutation: details.Salutation,
        LastName: details.LastName,
        FirstName: details.FirstName,
        MiddleName: details.MiddleName,
        MEmployeeName: details.MEmployeeName,
        AadharCardNo: details.AadharCardNo,
        PANNo: details.PANNo,
        PassportNo: details.PassportNo,
        PassportIssueDate: details.PassportIssueDate,
        PassportExpireDate: details.PassportExpireDate,
        CurrentAddress: details.CurrentAddress,
        CurrentPincode: details.CurrentPincode,
        PermanentAddress: details.PermanentAddress,
        PermanentPincode: details.PermanentPincode,
        DOB: details.DOB,
        EmailId1: details.EmailId1,
        EmailId2: details.EmailId2,
        PhoneNo: details.PhoneNo,
        CellNo1: details.CellNo1,
        CellNo2: details.CellNo2,
        BankId1: details.BankId1,
        AccountNo1: details.AccountNo1,
        IFSCCode1: details.IFSCCode1,
        BankId2: details.BankId2,
        AccountNo2: details.AccountNo2,
        IFSCCode2: details.IFSCCode2,
        MaritalStatus: details.MaritalStatus,
        ReferenceId: details.ReferenceId,
        DestinationId: details.DestinationId,
        ReligionId: details.ReligionId,
        CategoryId: details.CategoryId,
        CasteId: details.CasteId,
        EmployeePhoto: details.EmployeePhoto,
        Gender: details.Gender,
        BloodGroup: details.BloodGroup,
        DrivingLicence: details.DrivingLicence,
        FinanceAccountNo: details.FinanceAccountNo,
        Remark: details.Remark,
        CreatedBy: details.CreatedBy,
        CreatedOn: details.CreatedOn,
        ModifiedBy: details.ModifiedBy,
        ModifiedOn: details.ModifiedOn,
      });
      setEmployeeId(details.EmployeeId);
      setEmployeeType(details.EmployeeType);
      setEmployeeTypeGroup(details.EmployeeTypeGroupId);
    }
  }, [details]);

  useEffect(() => {
    setEmployeeTypeId(details.EmployeeTypeId);
    console.log("Emp Type id in personal", employeeTypeId);
    console.log("Employee Photo:", details.EmployeePhoto);
  }, [details]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("EmployeePhoto", file);
  };

  const handleDLChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("DrivingLicense", file);
  };

  // Image Operations
  const blob = new Blob([employeePhoto], { type: "image/jpeg" }); // Assuming a JPEG image
  const url = URL.createObjectURL(blob);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file)
  };

  const handleUpload = () =>{
    const formdata = new FormData()
    formdata.append('image', uploadedImage)
    try {
      const response = axios.post('http://localhost:5500/employee/personal/upload', formdata,
      {
        params:{ EmployeeId: ID},
        headers:{ Authorization: `Bearer ${token}`}
      })
      if (response.status === 200) alert('Logo Uploaded')
      else alert('Logo Upload Failed, Please refresh and try again') 
    } catch (error) {
      console.error('Error', error);
    }
  }

    const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
  
      reader.readAsDataURL(file);
    }
  };

  useEffect(() =>{
    const fetchLogo = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/employee/personal/get-upload',{
          params: {EmployeeId: ID},  
          headers: {Authorization: `Bearer ${token}`}
        })
        const data = response.data
        console.log('Image Data', data)
        setPreviewImage(`http://localhost:5500/employee-photo/${data.EmployeePhoto}`)

      } catch (error) {
        console.error('Error')
      }
    }
    fetchLogo()
  },[details, token])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-0 font-[Inter] ">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-x-4">
            <div className="py-1 top-8">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Employee ID
              </p>
              <input
                id="EmployeeId"
                type="text"
                value={formik.values.EmployeeId}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                disabled={true}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Employee Type</p>
              <select
                id="EmployeeTypeId"
                name="EmployeeTypeId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeId}
                onChange={formik.handleChange}
              >
                <option value="">Select Type</option>
                {employeeTypes.map((entry) => (
                  <option
                    key={entry.EmployeeTypeId}
                    value={entry.EmployeeTypeId}
                  >
                    {entry.EmployeeType}
                  </option>
                ))}
              </select>
            </div>
            <div>
                <p className="capitalize font-semibold text-[13px]">Employee Photo</p>
                <input
                  id="EmployeePhoto"
                  type="file"
                  placeholder="Upload File"
                  onChange={(e) => {
                    handleFileChange(e)
                    handleImageChange(e);
                  }}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]"
                />

                {previewImage && (
                  <div className="mt-4">
                    <p className="font-semibold text-[13px]">Current Employee Photo Preview:</p>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-cover border border-gray-300 rounded-lg mt-2"
                    />
                  </div>
                )}
                <button
                type="button"
                onClick={handleUpload}
                className="bg-blue-900 text-white font-semibold rounded-lg w-24 h-8 mt-2 text-[11px] hover:bg-white hover:text-black hover:ease-linear"
              >
                Upload Employee Photo
              </button>
              </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Salutation</p>
              <select
                id="Salutation"
                name="Salutation"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Salutation}
                onChange={formik.handleChange}
              >
                <option value={formik.values.Salutation}>
                  {formik.values.Salutation}
                </option>
                <option value="">Select Salutation</option>
                <option value="Sir/Madam">Sir/Madam</option>
                <option value="Dear [Mr./Ms./Dr.] [Last Name]">
                  Dear [Mr./Ms./Dr.] [Last Name]
                </option>
                <option value="[Department] [Last Name]">
                  [Department] [Last Name]
                </option>
                <option value="[Job Title] [Last Name]">
                  [Job Title] [Last Name]
                </option>
                <option value="To Whom It May Concern">
                  To Whom It May Concern
                </option>
                <option value="Greetings [Mr./Ms./Dr.] [Last Name]">
                  Greetings [Mr./Ms./Dr.] [Last Name]
                </option>
              </select>
            </div>

            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">
                Employee Type Group
              </p>
              <select
                id="EmployeeTypeGroupId"
                name="EmployeeTypeGroupId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeGroupId}
                onChange={formik.handleChange}
              >
                <option value={formik.values.EmployeeTypeGroupId}>
                  {formik.values.EmployeeTypeGroupId}
                </option>
                <option value="">Select Group Type</option>
                <option value="Worker">Worker</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Date of Birth
              </p>
              <input
                id="DOB"
                type="DATE"
                value={formik.values.DOB}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                First Name
              </p>
              <input
                id="FirstName"
                type="text"
                value={formik.values.FirstName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Middle Name
              </p>
              <input
                id="MiddleName"
                type="text"
                value={formik.values.MiddleName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Last Name
              </p>
              <input
                id="LastName"
                type="text"
                value={formik.values.LastName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Current Address
              </p>
              <input
                id="CurrentAddress"
                type="text"
                value={formik.values.CurrentAddress}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Current Address Pincode
              </p>
              <input
                id="CurrentPincode"
                type="text"
                value={formik.values.CurrentPincode}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Permanent Address
              </p>
              <input
                id="PermanentAddress"
                type="text"
                value={formik.values.PermanentAddress}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Permanent Address Pincode
              </p>
              <input
                id="PermanentPincode"
                type="text"
                value={formik.values.PermanentPincode}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>

            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Phone</p>
              <input
                id="PhoneNo"
                type="text"
                value={formik.values.PhoneNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Cell 1
              </p>
              <input
                id="CellNo1"
                type="text"
                value={formik.values.CellNo1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Cell 2
              </p>
              <input
                id="CellNo2"
                type="text"
                value={formik.values.CellNo2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>

            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Email ID 1
              </p>
              <input
                id="EmailId1"
                type="text"
                value={formik.values.EmailId1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Email ID 2
              </p>
              <input
                id="EmailId2"
                type="text"
                value={formik.values.EmailId2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Bank ID 1
              </p>
              <input
                id="BankId1"
                type="text"
                value={formik.values.BankId1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Account No 1
              </p>
              <input
                id="AccountNo1"
                type="text"
                value={formik.values.AccountNo1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                IFSC Code 1
              </p>
              <input
                id="IFSCCode1"
                type="text"
                value={formik.values.IFSCCode1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Bank ID 2
              </p>
              <input
                id="BankId2"
                type="text"
                value={formik.values.BankId2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Account No 2
              </p>
              <input
                id="AccountNo2"
                type="text"
                value={formik.values.AccountNo2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                IFSC Code 2
              </p>
              <input
                id="IFSCCode2"
                type="text"
                value={formik.values.IFSCCode2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Category
              </p>
              <select
                id="CategoryId"
                name="CategoryId"
                className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                onChange={formik.handleChange}
              >
                <option value="">Select Type</option>
                {categories.map((entry) => (
                  <option key={entry.FieldId} value={entry.FieldId}>
                    {entry.FieldDetails}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Destination
              </p>
              <input
                id="DestinationId"
                type="text"
                value={formik.values.DestinationId}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Religion
              </p>
              <select
                id="ReligionId"
                name="ReligionId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                onChange={formik.handleChange}
              >
                <option value="">Select Type</option>
                {Religion.map((entry) => (
                  <option key={entry.FieldId} value={entry.FieldId}>
                    {entry.FieldDetails}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Reference</p>
              <select
                id="ReferenceId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                onChange={formik.handleChange}
              >
                <option value="">Select Type</option>
                {Reference.map((entry, index) => (
                  <option key={index} value={entry.FieldId}>
                    {entry.FieldDetails}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Caste</p>
              <select
                id="CasteId"
                name="CasteId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                onChange={formik.handleChange}
              >
                <option value="">Select Type</option>
                {Caste.map((entry) => (
                  <option key={entry.FieldId} value={entry.FieldId}>
                    {entry.FieldDetails}
                  </option>
                ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 text-[13px] font-semibold">Blood Group</p>
              <select
                id="BloodGroup"
                name="BloodGroup"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.BloodGroup}
                onChange={formik.handleChange}
              >
                <option value={formik.values.BloodGroup}>
                  {formik.values.BloodGroup}
                </option>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Gender
              </p>
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Male"
                  checked={formik.values.Gender === "Male"}
                  onChange={formik.handleChange}
                />
                <label className="text-[13px]">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Female"
                  checked={formik.values.Gender === "Female"}
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                <label className="text-[13px]">Female</label>
              </div>
            </div>
            <div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">
                  Marital Status
                </p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="Married"
                    checked={formik.values.MaritalStatus === "Married"}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Married</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="Unmarried"
                    checked={formik.values.MaritalStatus === "Unmarried"}
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Unmarried</label>
                </div>
              </div>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                MEmployee Name
              </p>
              <input
                id="MEmployeeName"
                type="text"
                value={formik.values.MEmployeeName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize mt-1 font-semibold text-[13px]">
                Aadhar Card No
              </p>
              <input
                id="AadharCardNo"
                type="text"
                value={formik.values.AadharCardNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                PAN Card No
              </p>
              <input
                id="PANNo"
                type="text"
                value={formik.values.PANNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Finance Account No
              </p>
              <input
                id="FinanceAccountNo"
                type="text"
                value={formik.values.FinanceAccountNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport No
              </p>
              <input
                id="PassportNo"
                type="text"
                value={formik.values.PassportNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport Issue Date
              </p>
              <input
                id="PassportIssueDate"
                type="date"
                value={formik.values.PassportIssueDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport Expiry Date
              </p>
              <input
                id="PassportExpireDate"
                type="date"
                value={formik.values.PassportExpireDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Driving License Photo
              </p>
              <input
                id="DrivingLicense"
                type="file"
                src={formik.values.DrivingLicence}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                onChange={handleDLChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Remark
              </p>
              <input
                id="Remark"
                type="text"
                value={formik.values.Remark}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        >
          Save details
        </button>
      </div>
    </form>
  );
}
