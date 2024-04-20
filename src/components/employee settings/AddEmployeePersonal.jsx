import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";
import TwoFieldsModal from "../company settings/TwoFieldsModal";


export default function AddEmployeePersonal() {
  const { token } = useAuth();
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [EmpTypeId, setEmpTypeId] = useState();
  const [isModalOpen, setModalOpen] = useState(false)
  const [MMId, setMMId] = useState();

  const formik = useFormik({
    initialValues: {
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
      AcFlag: "Y",
      IUFlag: "I",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      addEmpPersonal();
      addEmpWork()
      addEmpSal()
      addEmpPro()
      addEmpAcademic()
      addEmpFam()
      alert("Employee Personal Details Added Successfully. Please add further details in the edit section.");
      window.location.reload()
    },
  });

  formik.values.EmployeeName = `${formik.values.FirstName} ${formik.values.LastName}`;

  useEffect(() =>{
    setEmpTypeId(formik.values.EmployeeTypeId)
    console.log('Current EMP TYPE ID', EmpTypeId)
  }, [formik.values.EmployeeTypeId])

  const addEmpPersonal = async () => {
    try {
      const personal = await axios.post(
        "http://localhost:5500/employee/personal/FnAddUpdateDeleteRecord",
        formik.values,
        {
          params:{EmployeeTypeId: EmpTypeId},
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  const addEmpWork = async () =>{
    try {
      const work = await axios.post(
        "http://localhost:5500/employee/work/FnAddUpdateDeleteRecord",
        {
          DOJ: "",
          DOL: "",
          ContractorId: "", 
          DeptGroupId: "", 
          DeptId: "", 
          SubDeptId: "", 
          DesgId: "", 
          ReportingTo: "", 
          WeeklyOff: "", 
          ShiftId: "", 
          BandId: "", 
          ZoneId: "", 
          GradeId: "", 
          CostCenterId: "", 
          BondApplicable: "",
          BondAttachment: "",
          CurrentJob: "",
          Remark: "",
          AcFlag: "Y",
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: "",
        },
        {
          params:{EmployeeTypeId: EmpTypeId}, // Specify the content type
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error('Error Initializing work', error);
    }
  }
  const addEmpSal = async () =>{
    try {
      const salary = await axios.post(
        "http://localhost:5500/employee/salary/FnAddUpdateDeleteRecord",
        {
            GradeId: "",
            BandId: "",
            CTC: "",
            GrossSalary: "",
            OTFlag: "",
            OTAmount: "",
            PFFlag: "",
            PFNo: "",
            PFDate: "",
            ESICFlag: "",
            ESICNo: "",
            ESICDate: "",
            UANNo: "",
            MLWFFlag: "",
            MLWFNo: "",
            GratuityApplicable: "",
            GratuityAmount: "",
            Remark: "",
            AcFlag: "Y",
            IUFlag: "I",
            CreatedBy: "",
            CreatedOn: "",
            ModifiedBy: "",
            ModifiedOn: ""         
        },
        {
          params:{EmployeeTypeId: EmpTypeId}, // Specify the content type
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type

          },
        }
      );
    } catch (error) {
      console.error('Error initializing salary', error);
    }
  }
  const addEmpPro = async () =>{
    try {
      const professional = await axios.post(
        "http://localhost:5500/employee/professional/FnAddUpdateDeleteRecord",
        {
          Employer: "",
          Experience: "",
          Designation: "",
          JobResponsibility: "",
          Salary: "",
          CVFile: "",
          SalarySlipFile: "",
          AcFlag: "Y",
          IUFlag: "I",
          Remark: "",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          params:{EmployeeTypeId: EmpTypeId}, // Specify the content type
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type

          },
        }
      );
    } catch (error) {
      console.error('Error initializing professional', error);
    }
  }
  const addEmpAcademic = async () =>{
    try {
      const academic = await axios.post(
        "http://localhost:5500/employee/academic/FnAddUpdateDeleteRecord",
        {
          Qualification: "",
          Institute: "",
          Specialization: "",
          GradePercent: "",
          PassingYear: "",
          Remark: "",
          AcFlag: "Y",
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          params:{EmployeeTypeId: EmpTypeId}, // Specify the content type
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type

          },
        }
      );
    } catch (error) {
      console.error('Error initializing academic', error);
    }
  }
  const addEmpFam = async () =>{
    try {
      const family = await axios.post(
        "http://localhost:5500/employee/family/FnAddUpdateDeleteRecord",
        {
          Relation: "",
          Education: "",
          Occupation: "",
          Address: "",
          CellNo: "",
          EmailId: "",
          Nominee: "",
          Remark: "",
          AcFlag: "Y",
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          params:{EmployeeTypeId: EmpTypeId}, // Specify the content type
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type

          },
        }
      );
    } catch (error) {
      console.error('Error intializing family', error);
    }
  }


  useEffect(() =>{
    const fetchEmployeeTypes = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
        { headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployeeTypes(data)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeTypes()
  },[token, isModalOpen])

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
  }, [token, isModalOpen]);

  const [sals, setSalutation] = useState([]);
  useEffect(() => {
    const fetchSalutationsData = async () => {
      const CID = 4;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Salutations", data);
        setSalutation(data);
      } catch (error) {
        console.error("Error fetching sals:", error);
      }
    };
    fetchSalutationsData();
  }, [token, isModalOpen]);

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
  }, [token, isModalOpen]);

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
  }, [token,isModalOpen ]);

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
  }, [token, isModalOpen]);

  const [employeeTypeGroup, setEmployeeTypeGroup] = useState([]);

  useEffect(() => {
    const fetchEmpTypeData = async () => {
      const CID = 1;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: CID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('Employee Group Response', response)
        const groupData = response.data;
  
        if (Array.isArray(groupData)) { // Check if groupData is an array
          setEmployeeTypeGroup(groupData);
        } else {
          console.error("API response is not an array:", groupData);
        }
      } catch (error) {
        console.error("Error fetching emptype:", error);
      }
    };
  
    fetchEmpTypeData();
  }, [token, isModalOpen]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-0 font-[Inter]">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-x-4">
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Employee ID
              </p>
              <input
                id="EmployeeId"
                type="text"
                placeholder="Auto Generated"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                disabled={true}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Employee Type *</p>
              <select
                id="EmployeeTypeId"
                name="EmployeeTypeId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeId}
                onChange={formik.handleChange}
              >
                    <option value="">Select Type</option>
                    {employeeTypes.map((entry) => (
                    <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                      {entry.EmployeeType}
                    </option>
                    ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px] ">
                Employee Photo
              </p>
              <input
                id="EmployeePhoto"
                type="file"
                placeholder="Upload File"
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
              />
            </div>
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">
                Salutations
              </p>
              <div className="flex items-center">
                {sals.length > 0 ? (
                  <select
                    id="Salutation"
                    name="Salutation"
                    value={formik.values.Salutation}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Salutation</option>
                    {sals.map((entry) => (
                      <option key={entry.FieldId} value={entry.FieldId}>
                        {entry.FieldDetails}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                    No available entries
                  </p>
                )}
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(4);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">
                Employee Type Group *
              </p>
              <div className="flex items-center">
                <select
                  id="EmployeeTypeGroupId"
                  name="EmployeeTypeGroupId"
                  value={formik.values.EmployeeTypeGroupId}
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  onChange={formik.handleChange}
                  >
                  <option value="">Select Employee Type Group</option>
                  {Array.isArray(employeeTypeGroup) &&  employeeTypeGroup.map((entry) => (
                    <option key={entry.FieldId} value={entry.FieldId}>
                      {entry.FieldDetails}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(1);
                  }}
                />
              </div>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Date of Birth *
              </p>
              <input
                id="DOB"
                type="date"
                value={formik.values.DOB}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                First Name *
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
                Middle Name *
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
                Last Name *
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
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">
                Category
              </p>
              <div className="flex items-center">
                {categories.length > 0 ? (
                  <select
                    id="CategoryId"
                    name="CategoryId"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Categories</option>
                    {categories.map((entry) => (
                      <option key={entry.FieldId} value={entry.FieldId}>
                        {entry.FieldDetails}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                    No available entries
                  </p>
                )}
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(8);
                  }}
                />
              </div>
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
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">
                Religion
              </p>
              <div className="flex items-center">
                {Religion.length > 0 ? (
                  <select
                    id="ReligionId"
                    name="ReligionId"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Religion</option>
                    {Religion.map((entry) => (
                      <option key={entry.FieldId} value={entry.FieldId}>
                        {entry.FieldDetails}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                    No available entries
                  </p>
                )}
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(7);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">
                Reference
              </p>
              <div className="flex items-center">
                {Reference.length > 0 ? (
                  <select
                    id="ReligionId"
                    name="ReligionId"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Department Group</option>
                    {Reference.map((entry) => (
                      <option key={entry.FieldId} value={entry.FieldId}>
                        {entry.FieldDetails}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                    No available entries
                  </p>
                )}
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(6);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="capatilize font-semibold text-[13px] mb-1">Caste</p>
              <div className="flex items-center">
                {Caste.length > 0 ? (
                  <select
                    id="CasteId"
                    name="CasteId"
                    value={formik.values.CasteId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Caste</option>
                    {Caste.map((entry) => (
                      <option key={entry.FieldId} value={entry.FieldId}>
                        {entry.FieldDetails}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                    No available entries
                  </p>
                )}
                <Icon
                  icon="flat-color-icons:plus"
                  width="24"
                  height="24"
                  className="ml-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setMMId(9);
                  }}
                />
              </div>
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
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
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
      <TwoFieldsModal
              visible={isModalOpen}
              onClick={() => setModalOpen(false)}
              MasterID={MMId}
            />
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        >
          Submit details
        </button>
      </div>
    </form>
  );
}
