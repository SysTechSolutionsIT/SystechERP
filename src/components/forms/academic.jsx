import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const Academic = ({ ID, name }) => {
  const [academicData, setAcademicData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false)
  const [Qualification, setQualification] = useState("");
  const [Institute, setInstitute] = useState("");
  const [Specialization, setSpecialization] = useState("");
  const [Grades, setGrades] = useState("");
  const [PassingYear, setPassingYear] = useState("");
  const [Languages, setLanguages] = useState("");
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
      EmployeeName: name,
    },
    onSubmit: async (values) => {
      const qualString = academicData
        .map((entry) => entry.Qualification)
        .join(", ")
        .replace(/,\s+/g, ','); 
      const instString = academicData
        .map((entry) => entry.Institute)
        .join(", ")
        .replace(/,\s+/g, ','); 
      const specializationString = academicData
        .map((entry) => entry.Specialization)
        .join(", ")
        .replace(/,\s+/g, ','); 
      const gradesString = academicData
        .map((entry) => entry.Grades)
        .join(", ")
        .replace(/,\s+/g, ','); 
      const passString = academicData
        .map((entry) => entry.PassingYear)
        .join(", ")
        .replace(/,\s+/g, ','); 
      const LangString = academicData
        .map((entry) => entry.Languages)
        .join(", ")
        .replace(/,\s+/g, ','); 

      const combinedData = {
        Qualification: qualString,
        Institute: instString,
        Specialization: specializationString,
        Grades: gradesString,
        PassingYear: passString,
        Languages: LangString,
      };

      console.log("Submitted data:", combinedData);
      try {
        const response = await axios.patch(
          `http://localhost:5500/employee/academic/update/${ID}`,
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
          alert("Academic data updated successfully");
        }
      } catch (error) {
        console.error("Error while updating Academic data: ", error.message);
      }
    },
  });

  useEffect(() => {
    fetchAcademicData();
  }, [token]);

  const fetchAcademicData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/academic/get/${ID}`,
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
      setAcademicData(splitData);
      console.log("after split", splitData);

    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Split data into rows
  const SplitData = (data) => {
    const qualiRows = data.Qualification.split(",");
    const instRows = data.Institute.split(",");
    const specRows = data.Specialization.split(",");
    const gradeRows = data.Grades.split(",");
    const passRows = data.PassingYear.split(",");
    const langRows = data.Languages.split(",");
  
    // Create a new array to store the rows of the table.
    const rows = [];
  
    // Iterate over the data arrays and create a new row object for each element.
    for (let i = 0; i < qualiRows.length; i++) {
      const row = {
        Qualification: qualiRows[i] ,
        Institute: instRows[i] ,
        Specialization: specRows[i],
        Grades: gradeRows[i],
        PassingYear: passRows[i],
        Languages: langRows[i],
      };
  
      rows.push(row);
    }
    return rows;
  };

  const handleDeleteEntry = (index) => {
    const updatedAcademicData = [...academicData];
    updatedAcademicData.splice(index, 1);
    setAcademicData(updatedAcademicData)
  };

  const AddAcademic = ({visible, name, ID, onClick}) =>{
    const formik = useFormik({
      initialValues:{
        EmployeeId: ID,
        Qualification:"",
        Institute:"",
        Specialization:"",
        Grades:"",
        PassingYear:"",
        Languages:""
      },
      onSubmit: (values) => {
        const updatedData = {
        Qualification: values.Qualification,
        Institute: values.Institute,
        Specialization: values.Specialization,
        Grades: values.Grades,
        PassingYear: values.PassingYear,
        Languages: values.Languages
        }
        setAcademicData([...academicData, updatedData])
        onClick()
      }
    })

    if(!visible) return null
    return(
      <form>
          <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
          <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
              <p className="text-white text-[15px] font-semibold text-center">
                Academic Data
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
                    Qualification
                  </p>
                  <input
                    id="Qualification"
                    type="text"
                    value={formik.values.Qualification}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Institute
                  </p>
                  <input
                    id="Institute"
                    type="text"
                    value={formik.values.Institute}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Specialization
                  </p>
                  <input
                    id="Specialization"
                    type="text"
                    value={formik.values.Specialization}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Grades
                  </p>
                  <input
                    id="Grades"
                    type="text"
                    value={formik.values.Grades}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    PassingYear
                  </p>
                  <input
                    id="PassingYear"
                    type="text"
                    value={formik.values.PassingYear}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Languages
                  </p>
                  <input
                    id="Languages"
                    type="text"
                    value={formik.values.Languages}
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
          <AddAcademic ID={ID} name={name} visible={isModalOpen} onClick={() => setModalOpen(false)}/>
          <div className="gap-4 justify-between">
            <div className="my-1 rounded-2xl bg-white p-2 pr-8">
              <table className="text-center h-auto text-[11px] rounded-lg justify-center whitespace-normal">
                <thead>
                  <tr>
                    <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                      Actions
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Qualification
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Institute
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Specialization
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Grades
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Passing Year
                    </th>
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                      Languages
                    </th>
                  </tr>
                </thead>
                <tbody>
                {academicData.length > 0 && academicData.map((item, index) => (
                  <tr key={index}>
                  <td className="px-2 border-2">
                    <div className="flex items-center gap-2 text-center justify-center">
                      <Icon icon="material-symbols:delete-outline" color="#556987" width="20" height="20" 
                       onClick={() => handleDeleteEntry(index)}/>
                    </div>
                  </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].Qualification`}
                        value={item.Qualification}
                        onChange={formik.handleChange}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].Institute`}
                        value={item.Institute}
                        onChange={formik.handleChange}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].Specialization`}
                        value={item.Specialization}
                        onChange={formik.handleChange}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].Grades`}
                        value={item.Grades}
                        onChange={formik.handleChange}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].PassingYear`}
                        value={item.PassingYear}
                        onChange={formik.handleChange}
                      />
                    </td>
                    <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                      <input
                        type="text"
                        name={`academicData[${index}].Languages`}
                        value={item.Languages}
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
            <button className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
            onClick={(e) =>{
              e.preventDefault()
              setModalOpen(true)
            }}>
              Add
            </button>
          </div>
        </div>
      </formik>
    </form>
  );
};

export default Academic;
