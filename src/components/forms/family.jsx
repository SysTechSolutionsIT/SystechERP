import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";


const Family = ({ ID, name }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false)
  const [PersonName, setPersonName] = useState("");
  const [Relation, setRelation] = useState("");
  const [Education, setEducation] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Address, setAddress] = useState("");
  const [CellNo, setCellNo] = useState("");
  const [EmailId, setEmailID] = useState("");
  const [Nomminee, setNomminee] = useState("");
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
    },
    onSubmit: async (values) => {
      const personString = familyMembers
      .map((entry) => entry.PersonName)
      .join(", ")
      .replace(/,\s+/g, ',');
    const relationString = familyMembers
      .map((entry) => entry.Relation)
      .join(", ")
      .replace(/,\s+/g, ',');
    const eduString = familyMembers
      .map((entry) => entry.Education)
      .join(", ")
      .replace(/,\s+/g, ',');
    const occString = familyMembers
      .map((entry) => entry.Occupation)
      .join(", ")
      .replace(/,\s+/g, ',');
    const addString = familyMembers
      .map((entry) => entry.Address)
      .join(", ")
      .replace(/,\s+/g, ',');
    const cellString = familyMembers
      .map((entry) => entry.CellNo)
      .join(", ")
      .replace(/,\s+/g, ',');
    const emailString = familyMembers
      .map((entry) => entry.EmailId)
      .join(", ")
      .replace(/,\s+/g, ',');
    const nomString = familyMembers
      .map((entry) => entry.Nominee)
      .join(", ")
      .replace(/,\s+/g, ',');
    

      const combinedData = {
        EmployeeId : values.EmployeeId,
        PersonName: personString,
        Relation: relationString,
        Education: eduString,
        Occupation: occString,
        Address: addString,
        CellNo: cellString,
        EmailId: emailString,
        Nominee: nomString,
        IUFlag:"U"
      };

      console.log("Submitted data:", combinedData);
      updateFamily(combinedData)
    },
  });

  const updateFamily = async (data) =>{
    try {
      const response = await axios.post(
        `http://localhost:5500/employee/family/FnAddUpdateDeleteRecord`,
        data,
        {
          params :{ EmployeeId: ID}, 
          headers: {Authorization: `Bearer ${token}`},
        }
      );
        alert("Family data updated successfully");
    } catch (error) {
      console.error("Error while updating Family data: ", error.message);
    }
  }

  useEffect(() => {
    fetchFamilyData();
  }, [token]);

  const fetchFamilyData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/family/FnShowParticularData`,
        {
          params :{ EmployeeId: ID}, 
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      console.log(data);
      const splitData = SplitData(data)
      setFamilyMembers(splitData);
      console.log('After split', splitData)
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  }

  const SplitData = (data) => {
    const personRows = data.PersonName.split(",");
    const relationRows = data.Relation.split(",");
    const eduRows = data.Education.split(",");
    const occRows = data.Occupation.split(",");
    const addRows = data.Address.split(",");
    const cellRows = data.CellNo.split(",");
    const emailRows = data.EmailId.split(",");
    const nomineeRows = data.Nominee.split(",");
  
    // Create a new array to store the rows of the table.
    const rows = [];
  
    // Iterate over the data arrays and create a new row object for each element.
    for (let i = 0; i < personRows.length; i++) {
      const row = {
        PersonName: personRows[i],
        Relation: relationRows[i],
        Education: eduRows[i],
        Occupation: occRows[i],
        Address: addRows[i],
        CellNo: cellRows[i],
        EmailId: emailRows[i],
        Nominee: nomineeRows[i],
      };
  
      rows.push(row);
    }
    return rows;
  };

  const handleDeleteEntry = (index) => {
    const updatedFamilyData = [...familyMembers];
    updatedFamilyData.splice(index, 1);
    setFamilyMembers(updatedFamilyData);
  };

  const AddFamily = ({visible, name, ID, onClick}) =>{
    const formik = useFormik({
      initialValues:{
        EmployeeId: ID,
        PersonName: "",
        Relation: "",
        Education: "",
        Occupation: "",
        Address: "",
        CellNo: "",
        EmailId: "",
        Nominee: "",
      },
      onSubmit: (values) => {
        const updatedData = {
        PersonName: values.PersonName,
        Relation: values.Relation,
        Education: values.Education,
        Occupation: values.Occupation,
        Address: values.Address,
        CellNo: values.CellNo,
        EmailId: values.EmailId,
        Nominee: values.Nominee,
        }
        setFamilyMembers([...familyMembers, updatedData])
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
                Fmaily Data
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
                    Person Name
                  </p>
                  <input
                    id="PersonName"
                    type="text"
                    value={formik.values.PersonName}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Relation
                  </p>
                  <input
                    id="Relation"
                    type="text"
                    value={formik.values.Relation}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Education
                  </p>
                  <input
                    id="Education"
                    type="text"
                    value={formik.values.Education}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Occupation
                  </p>
                  <input
                    id="Occupation"
                    type="text"
                    value={formik.values.Occupation}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Address
                  </p>
                  <input
                    id="Address"
                    type="text"
                    value={formik.values.Address}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Cell No
                  </p>
                  <input
                    id="CellNo"
                    type="number"
                    value={formik.values.CellNo}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Email ID
                  </p>
                  <input
                    id="EmailId"
                    type="text"
                    value={formik.values.EmailId}
                    className={`w-full mt-1 px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Nominee
                  </p>
                  <input
                    id="Nominee"
                    type="text"
                    value={formik.values.Nominee}
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
      <div className="grid grid-cols-2 gap-x-4">
        <div className="py-1">
          <p className="mb-1 capitalize font-semibold text-[13px]">
            Employee ID
          </p>
          <input
            id="EmployeeId"
            type="text"
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
      <AddFamily visible={isModalOpen} ID={ID} onClick={() => setModalOpen(false)}/>
      <div className="grid gap-4 justify-between">
        <div className="my-1 rounded-2xl bg-white p-2 pr-8">
          <table className="text-center text-[11px]  rounded-lg justify-center whitespace-normal">
            <thead>
              <tr>
              <th className="px-1 text-[13px] font-bold text-black border-2 border-gray-400">
                  Actions
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Person Name
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Relation
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Education
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Occupation
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Address
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  CellNo
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Email ID
                </th>
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px]">
                  Nominee
                </th>
              </tr>
            </thead>
            {familyMembers.length > 0 && familyMembers.map((item, index) => (
              <tbody className="justify-between">
                <tr key={index}>
                    <td className="px-2 border-2">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <Icon icon="material-symbols:delete-outline" color="#556987" width="20" height="20" 
                         onClick={() => handleDeleteEntry(index)}/>
                      </div>
                    </td>
                  <td className="px-4 border-2 whitespace-normal w-1/2 text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].PersonName`}
                      value={item.PersonName}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Relation`}
                      value={item.Relation}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Education`}
                      value={item.Education}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Occupation`}
                      value={item.Occupation}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Address`}
                      value={item.Address}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].CellNo`}
                      value={item.CellNo}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px]">
                    <input
                      type="text"
                      name={`familyMembers[${index}].EmailId`}
                      value={item.EmailId}
                      />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-center text-[11px">
                    <input
                      type="text"
                      name={`familyMembers[${index}].Nominee`}
                      value={item.Nomminee}
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
          <button className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        onClick={(e) =>{
          e.preventDefault()
          setModalOpen(true)
        }}>
          Add
        </button>
        </div>
      </div>
    </form>
  );
};

export default Family;
