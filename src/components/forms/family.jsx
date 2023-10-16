import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";

export const family = [
  {
    PersonName: "John Doe",
    Relation: "Father",
    Education: "Bachelor of Arts",
    Occupation: "Engineer",
    Address: "123 Main Street, Anytown, CA 12345",
    CellNo: "123-456-7890",
    EmailId: "john.doe@example.com",
    Nomminee: "Jane Doe",
  },
  {
    PersonName: "Jane Doe",
    Relation: "Mother",
    Education: "Master of Science",
    Occupation: "Doctor",
    Address: "456 Elm Street, Anytown, CA 12345",
    CellNo: "555-678-9012",
    EmailId: "jane.doe@example.com",
    Nomminee: "John Doe",
  },
  {
    PersonName: "Peter Smith",
    Relation: "Brother",
    Education: "High School Diploma",
    Occupation: "Truck Driver",
    Address: "789 Oak Street, Anytown, CA 12345",
    CellNo: "987-654-3210",
    EmailId: "peter.smith@example.com",
    Nomminee: "John Doe",
  },
  {
    PersonName: "Mary Jones",
    Relation: "Sister",
    Education: "Associate's Degree",
    Occupation: "Teacher",
    Address: "1011 Main Street, Anytown, CA 12345",
    CellNo: "234-567-8901",
    EmailId: "mary.jones@example.com",
    Nomminee: "Jane Doe",
  },
  {
    PersonName: "Bill Brown",
    Relation: "Friend",
    Education: "PhD",
    Occupation: "Scientist",
    Address: "1234 Elm Street, Anytown, CA 12345",
    CellNo: "345-678-9012",
    EmailId: "bill.brown@example.com",
    Nomminee: "John Doe",
  },
];

const Family = ({ ID, name }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [PersonName, setPersonName] = useState("");
  const [Relation, setRelation] = useState("");
  const [Education, setEducation] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Address, setAddress] = useState("");
  const [CellNo, setCellNo] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Nomminee, setNomminee] = useState("");
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
      EmployeeName: name,
    },
    onSubmit: async (values) => {
      const personString = familyMembers
        .map((entry) => entry.PersonName)
        .join(", ");
      const relationString = familyMembers
        .map((entry) => entry.Relation)
        .join(", ");
      const eduString = familyMembers
        .map((entry) => entry.Education)
        .join(", ");
      const occString = familyMembers
        .map((entry) => entry.Occupation)
        .join(", ");
      const addString = familyMembers.map((entry) => entry.Address).join(", ");
      const cellString = familyMembers.map((entry) => entry.CellNo).join(", ");
      const emailString = familyMembers
        .map((entry) => entry.EmailId)
        .join(", ");
      const nomString = familyMembers.map((entry) => entry.Nomminee).join(", ");

      const combinedData = {
        PersonName: personString,
        Relation: relationString,
        Education: eduString,
        Occupation: occString,
        Address: addString,
        CellNo: cellString,
        EmailId: emailString,
        Nomminee: nomString,
      };

      console.log("Submitted data:", combinedData);
      try {
        const response = await axios.patch(
          `http://localhost:5500/employee/family/update/${ID}`,
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
    fetchFamilyData();
  }, []);

  const fetchFamilyData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/family/get/${ID}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      setFamilyMembers(...data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  const handleAddFamilyMember = () => {
    const newEntry = {
      PersonName: PersonName,
      Relation: Relation,
      Education: Education,
      Occupation: Occupation,
      Address: Address,
      CellNo: CellNo,
      EmailId: EmailId,
      Nomminee: Nomminee,
    };
    familyMembers.push(newEntry);
    setFamilyMembers([...familyMembers]);
    console.log(familyMembers);

    setPersonName("");
    setRelation("");
    setEducation("");
    setOccupation("");
    setAddress("");
    setCellNo("");
    setEmailId("");
    setNomminee("");
  };

  const handleRemoveRow = (index) => {
    const updatedData = [...familyMembers];
    updatedData.splice(index, 1);
    setFamilyMembers(updatedData);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="py-1">
          <p className="mb-1 capitalize font-semibold text-[13px]">
            Employee ID
          </p>
          <input
            id="EmployeeId"
            type="number"
            value={formik.values.EmployeeId}
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
            value={formik.values.EmployeeName}
            className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="grid gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="text-center text-[11px]  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
                <th
                  className="text-[13px] font-normal border-2 border-white py-1 px-2 bg-blue-500 rounded-md cursor-pointer text-white"
                  onClick={handleAddFamilyMember}
                >
                  Add
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Person Name
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white ">
                  Relation
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Education
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Occupation
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Address
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  CellNo
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Email ID
                </th>
                <th className="text-[13px] font-normal border-r-2 border-white py-1 bg-blue-900 text-white">
                  Nominee
                </th>
              </tr>
            </thead>
            {familyMembers.map((item, index) => (
              <tbody className="justify-between">
                <tr key={index}>
                  <td
                    className="text-[11px] border-2 cursor-pointer font-normal border-r-2 border-white py-1 px-2 bg-red-600 rounded-md text-white"
                    onClick={() => handleRemoveRow(index)}
                  >
                    Remove
                  </td>
                  <td className="px-4 border-2 whitespace-normal w-1/2 text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].PersonName`}
                      value={familyMembers.PersonName}
                      onChange={(e) => setPersonName(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Relation`}
                      value={familyMembers.Relation}
                      onChange={(e) => setRelation(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Education`}
                      value={familyMembers.Education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Occupation`}
                      value={familyMembers.Occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Address`}
                      value={familyMembers.Address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].CellNo`}
                      value={familyMembers.CellNo}
                      onChange={(e) => setCellNo(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].EmailId`}
                      value={familyMembers.EmailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Nominee`}
                      value={familyMembers.Nomminee}
                      onChange={(e) => setNomminee(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="flex mt-5 justify-center gap-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
          >
            Save Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default Family;
