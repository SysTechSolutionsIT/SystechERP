import React from "react";
import Academic from "../forms/academic";
import Family from "../forms/family";
import Personal from "../forms/personal";
import Professional from "../forms/professional";
import { Icon } from "@iconify/react";

export default function EMPTabs() {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex font-[Inter] justify-center ">
        <div className="">
          <ul className="flex mb-0 list-none flex-wrap pt-0 pb-4 flex-row">
          <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 " +
                  (openTab === 1
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    :"hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                PERSONAL PROFILE
              </p>
            </li>
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 2
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}

              >
                FAMILY PROFILE
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 3
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}

              >
                WORK PROFILE
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 4
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}

              >
                ACADEMIC PROFILE
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-0 py-1 px-1.5 rounded-lg " +
                  (openTab === 5
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg font-semibold")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}

              >
                PROFESSIONAL PROFILE
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
                TRAINING PROFILE
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
                ASSET PROFILE
              </p>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <Personal />
                </div>

                {/* Family Profile Tab */}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <Family/>
                </div>

                {/* Work Profile Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <p>
                    Vivamus vel elit ac elit congue eleifend. Quisque nec ligula
                    et tortor tincidunt volutpat. Nunc et tristique purus. Fusce
                    non lorem et odio tristique sodales.
                  </p>
                </div>

                {/* Academic Profile Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <Academic/>
                </div>

                {/* Professional Profile Tab */}
                <div className={openTab === 5 ? "block" : "hidden"}>
                  <Professional/>
                </div>

                {/* Training Profile Tab */}
                <div className={openTab === 6 ? "block" : "hidden"}>
                  <p>
                    Suspendisse cursus mauris ut magna posuere, ut posuere justo
                    tincidunt. Nam ac nunc et augue bibendum ultrices. Duis non
                    ex nec purus interdum tincidunt.
                  </p>
                </div>

                {/* Asset Profile Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>
                  <p>
                    Aenean a justo et dui placerat convallis. Curabitur vel
                    lectus in tellus rhoncus ultrices. Nulla facilisi. Aliquam
                    id arcu in nisi pharetra gravida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
