import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";

const Professional = ({ ID, name }) => {
  const [professionalData, setProfessionalData] = useState([]);
  const [newEmployer, setNewEmployer] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newJobResponsibility, setNewJobResponsibility] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [isModalOpen, setModalOpen] = useState(false)
  const [row, setRow] = useState([]);
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
      EmployeeName: name,
    },
    onSubmit: async (values) => {
      const employerString = professionalData
        .map((entry) => entry.Employer)
        .join(", ")
        .replace(/,\s+/g, ','); // Remove whitespace after a comma
  
      const experienceString = professionalData
        .map((entry) => entry.Experience)
        .join(", ")
        .replace(/,\s+/g, ',');
  
      const designationString = professionalData
        .map((entry) => entry.Designation)
        .join(", ")
        .replace(/,\s+/g, ',');
  
      const jobResponsibilityString = professionalData
        .map((entry) => entry.JobResponsibility)
        .join(", ")
        .replace(/,\s+/g, ',');
  
      const salaryString = professionalData
        .map((entry) => entry.Salary)
        .join(", ")
        .replace(/,\s+/g, ',');
  
      const combinedData = {
        EmployeeName: name,
        Employer: employerString,
        Experience: experienceString,
        Designation: designationString,
        JobResponsibility: jobResponsibilityString,
        Salary: salaryString,
      };
  
      console.log("Submitted data:", combinedData);
      try {
        const response = await axios.patch(
          `http://localhost:5500/employee/professional/update/${ID}`,
          combinedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const updatedData = response.data;
          console.log("Updated data:", updatedData);
          alert("Professional data updated successfully");
        }
      } catch (error) {
        console.error("Error while updating professional data: ", error.message);
      }
    },
  });
  

  //API CALL

  useEffect(() => {
    fetchProfData();
  }, [token]);
  
  const fetchProfData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/professional/get/${ID}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
  
      // Split the data and store it in a separate variable
      const splitData = SplitData(data);
      
      setProfessionalData(splitData);
      console.log("after split", splitData);
    } catch (error) {
      console.log("Error while fetching professional data data: ", error.message);
    }
  };
  
  // Split data into rows
  const SplitData = (data) => {
    const empRows = data.Employer.split(",");
    const expRows = data.Experience.split(",");
    const desgRows = data.Designation.split(",");
    const jobRows = data.JobResponsibility.split(",");
    const salRows = data.Salary.split(",");
  
    // Create a new array to store the rows of the table.
    const rows = [];
  
    // Iterate over the data arrays and create a new row object for each element.
    for (let i = 0; i < empRows.length; i++) {
      const row = {
        Employer: empRows[i],
        Experience: expRows[i],
        Designation: desgRows[i],
        JobResponsibility: jobRows[i],
        Salary: salRows[i],
      };
  
      rows.push(row);
    }
    return rows;
  };

  const AddProfessional = ({visible, name, ID, onClick}) =>{
    const formik = useFormik({
        initialValues:{
            EmployeeId: ID,
            EmployeeName: name,
            Employer: "",
            Experience:"",
            Designation:"",
            JobResponsibility:"",
            Salary:""
        },
        onSubmit: (values) =>{
          const updatedData={
            Employer: values.Employer,
            Experience: values.Experience,
            Designation: values.Designation,
            Experience: values.Experience,
            JobResponsibility: values.JobResponsibility,
            Salary: values.Salary,
          }
          setProfessionalData([...professionalData, updatedData]);
          onClick();
        }
    })
  
  if(!visible) return null
  return(
    <form>
        <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
        <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Professional Data
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
                  Employee ID
                </p>
                <input
                  id="EmployeeId"
                  type="text"
                  value={formik.values.EmployeeId}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Employer
                </p>
                <input
                  id="Employer"
                  type="text"
                  value={formik.values.Employer}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Experience
                </p>
                <input
                  id="Experience"
                  type="text"
                  value={formik.values.Experience}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Designation
                </p>
                <input
                  id="Designation"
                  type="text"
                  value={formik.values.Designation}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Job Responsibility
                </p>
                <input
                  id="JobResponsibility"
                  type="text"
                  value={formik.values.JobResponsibility}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Salary
                </p>
                <input
                  id="Salary"
                  type="text"
                  value={formik.values.Salary}
                  className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            </div>
            <div className="flex gap-10 justify-center">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
        </div>
    </form>
  )
  }
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 bg-white font-[Inter]">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="py-1">
            <p className="mb-1 capitalize font-semibold text-[13px]">
              Employee ID
            </p>
            <input
              id="ID"
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
              id="name"
              type="text"
              value={name}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      <AddProfessional ID={ID} name={name} visible={isModalOpen} onClick={() => setModalOpen(false)}/>
      </div>
      <div className="gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Employer
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Experience
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Designations
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Job Responsibility
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {professionalData.length > 0 &&
                professionalData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon icon="lucide:eye" color="#556987" width="20" height="20" />
                        <Icon icon="mdi:edit" color="#556987" width="20" height="20" />
                        <Icon icon="material-symbols:delete-outline" color="#556987" width="20" height="20" />
                      </div>
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Employer`}
                        value={item.Employer}
                        onChange={(e) => setNewEmployer(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Experience`}
                        value={item.Experience}
                        onChange={(e) => setNewExperience(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Designation`}
                        value={item.Designation}
                        onChange={(e) => setNewDesignation(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].JobResponsibility`}
                        value={item.JobResponsibility}
                        onChange={(e) => setNewJobResponsibility(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Salary`}
                        value={item.Salary}
                        onChange={(e) => setNewSalary(e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-5 justify-center gap-4">
        <button type="submit" className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md">
          Save Details
        </button>
        <button className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        onClick={(e) =>{
          e.preventDefault()
          setModalOpen(true)
        }}>
          Add
        </button>
      </div>
    </form>
  );
};

export default Professional;