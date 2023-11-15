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
import { useFormik } from "formik";
import AddEmployeePersonal from "./AddEmployeePersonal";

const AddEmployee = ({ visible, onClick }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  if (!visible) return null;
  return (
       <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-none h-full p-2 rounded-lg">
      <div className="flex font-[Inter] justify-center relative top-[0px]">
        <div>
          <ul className="flex mb-0 list-none flex-wrap pt-0 pb-4 flex-row border-b-2 border-blue-900">
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  "inline-block p-0 py-1 px-1.5 rounded-lg text-white " +
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
                  <AddEmployeePersonal/>
                </div>

                {/* Work Profile Tab */}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <Work />
                </div>

                {/* Salary Structure Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <SalaryStructure />
                </div>

                {/* Professional Profile Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <Professional />
                </div>

                {/* Academic Profile Tab */}
                <div className={openTab === 5 ? "block" : "hidden"}>
                  <Academic />
                </div>

                {/* Family Profile Tab */}
                <div className={openTab === 6 ? "block" : "hidden"}>
                  <Family />
                </div>

                {/* Documents Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>Docs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        </div>
  );
};

export default AddEmployee;
