import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

const LeaveApp = () => {
  const employeeFields = [
    "Employee Id",
    "Employee Name",
    "Leave Type",
    "Leave Balance",
    "Opening Balance",
    "Leaves Taken",
    "Leaves Earned1",
    "Leaves Earned2",
    "Leaves Earned3",
    "Leaves Earned4",
    "Leaves Earned5",
    "Leaves Earned6",
    "Leaves Earned7",
    "Leaves Earned8",
    "Leaves Earned9",
    "Leaves Earned10",
    "Leaves Earned11",
    "Leaves Earned12",
  ];

  return (
    <div className="top-25 min-w-[40%]">
      <div className="bg-blue-900 h-15 p-2 ml-2 px-8 text-white font-semibold text-lg rounded-lg flex items-center justify-between mb-1 sm:overflow-x-clip">
        <div className="text-center text-[15px] whitespace-normal min-w-fit items-center">
          Leave Application
        </div>
      </div>
      <div className="grid gap-2 justify-between mt-2">
        <div className="my-1 rounded-2xl  p-2 pr-8 ">
          <table className="min-w-full text-center whitespace-normal z-0">
            <thead className="border-b-2">
              <tr className="">
                <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                  Add
                </th>
                {employeeFields.map((columnName) => (
                  <th
                    key={columnName}
                    className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApp;
