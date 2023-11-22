import React, { useEffect, useState } from "react";
import Academic from "../forms/academic";
import Family from "../forms/family";
import Personal from "../forms/personal";
import Professional from "../forms/professional";
import Work from "../forms/work";
import SalaryStructure from "../forms/salary";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Login";
// import { useEmployeeData } from "./EmployeeMaster";

export default function EMPTabs() {
  const { employeeId } = useParams();
  console.log("in emp tabs: ", employeeId);

  const [openTab, setOpenTab] = React.useState(1);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // const { employeeId } = useEmployeeData(); // Accessing employeeId from the URL
  const { token } = useAuth();

  useEffect(() => {
    const fetchEmpName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/personal/FnShowPerticularData`,
          {
            params: { EmployeeId: employeeId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        if (data.EmployeeName) {
          setName(data.EmployeeName);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmpName();
  }, [employeeId]);

  return (
    <>
      {/* <EmployeeContext> */}
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg items-center justify-between mb-1 sm:overflow-x-auto">
        <div className="mr-auto text-[15px] whitespace-normal">
          HRMS / Employee Settings / Employee Master
        </div>
        <div className="flex gap-4">
          <button
            className="flex text-[13px] bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white duration-200 font-semibold px-4 rounded-lg cursor-pointer whitespace-nowrap"
            onClick={() => {
              navigate("/employee-master");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex font-[Inter] justify-center">
        <div>
          <ul className="flex mb-0 list-none flex-wrap pt-0 pb-4 flex-row border-b-2 border-blue-900">
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 " +
                  (openTab === 1
                    ? "text-s font-bold  text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                Personal Profile
              </p>
            </li>
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 2
                    ? "text-s font-bold  text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                Work Profile
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 3
                    ? "text-s font-bold  text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
              >
                Salary Structure
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 4
                    ? "text-s font-bold  text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
              >
                Professional Profile
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 5
                    ? "text-s font-bold  text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
              >
                Academic Profile
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 6
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
              >
                Family Profile
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 7
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(7);
                }}
              >
                Documents
              </p>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <Personal ID={employeeId} />
                </div>

                {/* Work Profile Tab */}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <Work ID={employeeId} name={name} />
                </div>

                {/* Salary Structure Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <SalaryStructure ID={employeeId} />
                </div>

                {/* Professional Profile Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <Professional ID={employeeId} name={name} />
                </div>

                {/* Academic Profile Tab */}
                <div className={openTab === 5 ? "block" : "hidden"}>
                  <Academic ID={employeeId} name={name} />
                </div>

                {/* Family Profile Tab */}
                <div className={openTab === 6 ? "block" : "hidden"}>
                  <Family ID={employeeId} name={name} />
                </div>

                {/* Documents Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>Docs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </EmployeeContext> */}
    </>
  );
}
