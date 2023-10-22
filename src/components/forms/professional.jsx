import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";

export const ProfessionalData = [
  {
    Employer: "ABC Corporation",
    Experience: "5 years",
    Designation: "Senior Software Engineer",
    JobResponsibility: "Lead development team, code review, system design",
    Salary: "₹1,00,000",
  },
  {
    Employer: "XYZ Tech",
    Experience: "3 years",
    Designation: "Frontend Developer",
    JobResponsibility: "Develop user interfaces, collaborate with design team",
    Salary: "₹80,000",
  },
  {
    Employer: "Tech Innovators",
    Experience: "7 years",
    Designation: "Data Scientist",
    JobResponsibility: "Analyze data, build predictive models",
    Salary: "₹1,20,000",
  },
];

const Professional = ({ ID, name }) => {
  const [professionalData, setProfessionalData] = useState([]);
  const [newEmployer, setNewEmployer] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newJobResponsibility, setNewJobResponsibility] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [row, setRow] = useState([]);
  const { token } = useAuth();
  console.log(ID);

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
      EmployeeName: name,
    },
    onSubmit: async (values) => {
      const employerString = professionalData
        .map((entry) => entry.Employer)
        .join(", ");
      const experienceString = professionalData
        .map((entry) => entry.Experience)
        .join(", ");
      const designationString = professionalData
        .map((entry) => entry.Designation)
        .join(", ");
      const jobResponsibilityString = professionalData
        .map((entry) => entry.JobResponsibility)
        .join(", ");
      const salaryString = professionalData
        .map((entry) => entry.Salary)
        .join(", ");

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
          combinedData, // Combined data
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
        console.error(
          "Error while updating professional data: ",
          error.message
        );
      }
    },
  });

  const handleAddRow = () => {
    const newEntry = {
      Employer: newEmployer,
      Experience: newExperience,
      Designation: newDesignation,
      JobResponsibility: newJobResponsibility,
      Salary: newSalary,
    };

    professionalData.push(newEntry);
    setProfessionalData([...professionalData]);
    console.log(professionalData);

    // Reset the state variables for the new row.
    setNewEmployer("");
    setNewExperience("");
    setNewDesignation("");
    setNewJobResponsibility("");
    setNewSalary("");
  };

  // Function to remove a row from the table
  const handleRemoveRow = (index) => {
    const updatedData = [...professionalData];
    updatedData.splice(index, 1);
    setProfessionalData(updatedData);
  };

  //API CALL

  useEffect(() => {
    fetchProfData();
  }, []);

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
      setProfessionalData(data);
      // const rows = SplitData();
      // setProfessionalData([...rows]);
      // console.log("after split", professionalData);
    } catch (error) {
      console.log(
        "Error while fetching professional data data: ",
        error.message
      );
    }
  };

  // Split data into rows
  const SplitData = () => {
    const empRows = professionalData.Employer.split(",");
    const expRows = professionalData.Experience.split(",");
    const desgRows = professionalData.Designation.split(",");
    const jobRows = professionalData.JobResponsibility.split(",");
    const salRows = professionalData.Salary.split(",");

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
    console.log(rows);
    // Return the rows array.
    return rows;
  };

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
      </div>

      <div className="gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th
                  className="text-[13px] font-normal border-2 border-white py-1 px-2 bg-blue-500 rounded-md cursor-pointer text-white"
                  onClick={handleAddRow}
                >
                  Add
                </th>
                <th className="text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Employer
                </th>
                <th className="text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white ">
                  Experience
                </th>
                <th className="text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Designation
                </th>
                <th className="text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Job Responsibility
                </th>
                <th className="text-[13px]  font-normal border-r-2 border-white py-1 px-2 bg-blue-900 text-white">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {professionalData.length > 0 &&
                professionalData.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="text-[11px] border-2 cursor-pointer font-normal border-r-2 border-white py-1 px-2 bg-red-600 rounded-md text-white"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Employer`}
                        value={professionalData.Employer}
                        onChange={(e) => setNewEmployer(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Experience`}
                        value={professionalData.Experience}
                        onChange={(e) => setNewExperience(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Designation`}
                        value={professionalData.Designation}
                        onChange={(e) => setNewDesignation(e.target.value)}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].JobResponsibility`}
                        value={professionalData.JobResponsibility}
                        onChange={(e) =>
                          setNewJobResponsibility(e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`professionalData[${index}].Salary`}
                        value={professionalData.Salary}
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
        <button
          type="submit"
          className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        >
          Save Details
        </button>
      </div>
    </form>
  );
};

export default Professional;
