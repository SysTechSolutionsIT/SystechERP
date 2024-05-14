import React, { useEffect, useState } from "react";
import "./SalarySlipPreview.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import html2pdf from 'html2pdf.js';
import axios from "axios";
import { useAuth, useDetails } from "../Login";
import { Icon } from "@iconify/react";

const SalarySlipPreview = (visible, handleClose, displayMonth, displayYear) => {
  // const SalarySlipPreview = () => {

  //   const report = new JsPDF('portrait','pt','a4');
  //   report.html(document.querySelector('#report')).then(() => {
  //       report.save('report.pdf');
  //   });}

  // const exportToPDF = () => {
  //   const element = document.getElementById('content'); // Replace 'content' with the ID of the container element for your React content
  //   html2pdf().from(element).save('report.pdf');
  // };
  const { token } = useAuth();

  const exportToPDF = () => {
    const input = document.getElementById("content"); // Replace 'content' with the ID of the container element for your React content

    const pdf = new jsPDF("p", "mm", "a4"); // Set the page size and orientation as per your requirements

    html2canvas(input)
      .then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Adjust the scale to fit the content within the PDF page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const scale = Math.min(
          pageWidth / contentWidth,
          pageHeight / contentHeight
        );

        const canvasWidth = contentWidth * scale;
        const canvasHeight = contentHeight * scale;

        const imageData = canvas.toDataURL("image/png");
        pdf.addImage(imageData, "PNG", 0, 0, canvasWidth, canvasHeight);
        pdf.save("content.pdf");
      })
      .catch((error) => {
        console.error("Error exporting to PDF:", error);
      });
  };

  const [SalaryData, setSalaryData] = useState([]);

  const FetchSalaryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/salary-processing/month-wise-salary",
        {
          params: {
            AMonth: displayMonth,
            AYear: displayYear,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setSalaryData(data);
      console.log("Salary Slip Data:", data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    FetchSalaryData();
  }, [token, displayMonth, displayYear]);

  // Create an object to store the vitals values
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
      <div className="bg-gray-200 w-[90%] py-2 px-4 rounded-lg h-[80%] bg-white">
        <div className="justify-end flex">
          <Icon
            icon="maki:cross"
            color="red"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="">
          <div className="flex justify-start w-[90%] top-0">
            <img src="./SalarySlipHeader.png" className="h-40 w-full" />
          </div>
          <div className="flex flex-col justify-center items-center text-black">
            <h1 className="font-bold text-[20px]">PAYSLIP</h1>
          </div>
          <div>
            <p> PAY SLIP FOR THE MONTH OF &nbsp;&nbsp;&nbsp; </p>
            <p className="text-black">{displayMonth}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {" "}
            {/* Start of the 2 column layout */}
            <div className="pr-4">
              {" "}
              {/* Left column */}
              <p className="mb-2">Name: {SalaryData.EmployeeName}</p>
              <p className="mb-2">Employee Code: {SalaryData.EmployeeId}</p>
              <p className="mb-2">Designation: Look into emptype submission</p>
              <p className="mb-2">Department: {SalaryData?.DeptId}</p>
              <p className="mb-2">Location: {SalaryData?.BranchId}</p>
              <p className="mb-2">
                Date of Joining: fetch from emp work profile
              </p>
            </div>
            <div className="pl-4 border-l border-gray-300">
              {" "}
              {/* Right column */}
              {/* Content for the right column goes here */}
            </div>
          </div>
          <div className="flex flex-col h-full w-[90%]">
            <div className="flex justify-end">
              <img src="./SalarySlipFooter.png" />
            </div>
            <footer className=" flex flex-col bg-[#495477] w-full px-4 justify-between">
              <p className="text-white text-[18px]  text-center ">
                Flat No A/7, SuryaLok Nagri, Waiduwadi, Hadapsar, Pune 411013, |
                Cell : 09850164441 | Land line : 020-26812190
              </p>

              <p className="text-white text-[18px] text-center">
                <br /> E-Mail ID : Sandeep.patil@systechsolutions.co.in | Web
                :www.systechsolutions.co.in
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipPreview;
