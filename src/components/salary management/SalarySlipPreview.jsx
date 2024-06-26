import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useAuth } from "../Login";
import { Icon } from "@iconify/react";

const SalarySlipPreview = ({ visible, EmployeeId, displayMonth, displayYear, onClick }) => {
  const { token } = useAuth();
  const [salaryData, setSalaryData] = useState({});
  const [employeeNames, setEmployeeNames] = useState([]);
  const [EmployeeName, setEmployeeName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salaryResponse, employeeResponse] = await Promise.all([
          axios.get("http://localhost:5500/salary-processing/FnSalraySlipData", {
            params: { EmployeeId, AMonth: displayMonth, AYear: displayYear },
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5500/employee/personal/FnEmployeeNamesAndIds", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const salaryData = salaryResponse.data[0];
        setSalaryData(salaryData);
        const employeeData = employeeResponse.data;
        const employee = employeeData.find((emp) => emp.EmployeeId === EmployeeId);
        if (employee) {
          setEmployeeName(employee.EmployeeName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, EmployeeId, displayMonth, displayYear]);

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const displayMonthName = monthNames[displayMonth - 1]; // assuming displayMonth is 1-based

  const exportToPDF = async () => {
    if (loading) return;
  
    const input = document.getElementById("salary-slip-content");
    const footerContent = `
        <div id="footer" style="background-color: #495475; color: white; text-align: center; padding: 16px;">
            <p>Flat No A/7, SuryaLok Nagri, Waiduwadi, Hadapsar, Pune 411013</p>
            <p>Cell: 09850164441 | Land line: 020-26812190</p>
            <p>E-Mail ID: Sandeep.patil@systechsolutions.co.in | Web: www.systechsolutions.co.in</p>
        </div>`;
  
    // Get computed styles to calculate padding
    const computedStyle = window.getComputedStyle(input);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
  
    // Calculate scale factor to fit content within page boundaries at high resolution
    const contentWidth = input.offsetWidth + paddingRight + paddingLeft;
    const contentHeight = input.offsetHeight + paddingTop + paddingBottom;
    const pdfWidth = 210; // Width of A4 in mm
    const pdfHeight = 297; // Height of A4 in mm
    const pdfAspectRatio = pdfWidth / pdfHeight;
  
    const contentAspectRatio = contentWidth / contentHeight;
    let imgWidth, imgHeight;
  
    if (contentAspectRatio > pdfAspectRatio) {
      imgWidth = pdfWidth;
      imgHeight = (pdfWidth / contentWidth) * contentHeight;
    } else {
      imgHeight = pdfHeight;
      imgWidth = (pdfHeight / contentHeight) * contentWidth;
    }
  
    const canvas = await html2canvas(input, {
      scale: 2, // Scale to render content at high resolution
      logging: true, // Enable logging (optional)
      useCORS: true, // Enable CORS to handle image loading issues (optional)
    });
  
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG format for higher quality
  
    // Add the salary slip content image to the PDF
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
  
    // Add footer content to PDF
    const footerTempDiv = document.createElement('div');
    footerTempDiv.innerHTML = footerContent;
    document.body.appendChild(footerTempDiv);
  
    // Add footer content to PDF
    const footerCanvas = await html2canvas(footerTempDiv, {
      scale: 2, // Scale to render content at high resolution
      logging: true, // Enable logging (optional)
      useCORS: true, // Enable CORS to handle image loading issues (optional)
    });
  
    const footerImgData = footerCanvas.toDataURL("image/jpeg", 1.0);
    const footerImgHeight = footerCanvas.height * (pdfWidth / footerCanvas.width);
  
    // Remove footer content from document body
    document.body.removeChild(footerTempDiv);
  
    // Add the footer image to the PDF
    pdf.addImage(footerImgData, "JPEG", 0, pdfHeight - footerImgHeight, pdfWidth, footerImgHeight);
  
    // Save the PDF
    pdf.save(`${EmployeeId}_${EmployeeName}_${displayMonthName}_${displayYear}.pdf`);
};

    
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-[210mm] h-[95%] p-4 overflow-auto rounded-lg">
        <div className="flex justify-end">
          <Icon icon="maki:cross" color="red" className="cursor-pointer" onClick={onClick} />
        </div>
        <div id="salary-slip-content" className="p-4">
          <div className="flex justify-center mb-4">
            <img src="./SalarySlipHeader.png" alt="Header" className="h-40 w-full object-contain" />
          </div>
          <div className="text-center mb-4">
            <h1 className="font-bold text-2xl">PAY SLIP</h1>
          </div>
          <span className="flex text-[10px] justify-center items-center whitespace-nowrap">
            <p>PAY SLIP FOR THE MONTH OF</p>
            <p className="font-bold capitalize ml-2">{displayMonthName}</p>
          </span>
          <div className="grid grid-cols-2 gap-4 mt-2 text-[10px] border border-black">
            <div className="border-r border-black pl-1 pb-2 ">
              <p>Name: {EmployeeName}</p>
              <p>Employee Code: {salaryData.EmployeeId}</p>
              <p>Designation: {salaryData.Designation}</p>
              <p>Department: {salaryData.Departments}</p>
              <p>Location: {salaryData.Location}</p>
              <p>Date of Joining: {salaryData.DOJ}</p>
            </div>
            <div className=" border-black pl-1 pb-2">
              <p>Payment Mode: {salaryData.PaymentMode}</p>
              <p>Bank Name: {salaryData.BankName}</p>
              <p>Bank A/C No.: {salaryData.BankAcNo}</p>
              <p>PF No./ UAN No.: {salaryData.PF}</p>
              <p>ESI No: {salaryData.ESI}</p>
              <p>PAN No: {salaryData.PAN}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 mt-4 text-[10px] border border-black">
            <div className="border-r border-black pl-1 pb-2">
              <p>Worked Days: {salaryData.WorkedDays}</p>
              <p>LWP: {salaryData.LWP}</p>
            </div>
            <div className=" border-black pl-1 pb-2 grid grid-cols-3">
              <p>Leave Type</p>
              <p>Enjoyed</p>
              <p>Balance</p>
              <p></p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 text-[10px] border border-black">
            <div className="border-r border-black pl-1 pb-2">
              <h2 className="font-bold justify-center text-center mt-1">EARNINGS</h2>
              <p>Basic+DA: {salaryData.BasicDA1}</p>
              <p>HRA: {salaryData.HRA1}</p>
              <p>Conveyance Allowances: {salaryData.CA1}</p>
              <p>Others: {salaryData.Statutory_Bonus1}</p>
              <p>Personal Allowance: {salaryData.Personal_Allowance1}</p>
              <p>Over Time: {salaryData.OT}</p>
              <p>Incentive: {salaryData.IncentiveSiteAllowance}</p>
              <p>Salary Difference: {salaryData.SalaryDiff}</p>
              <p>Total Earnings: {salaryData.Sal_Gross}</p>
            </div>
            <div className='pl-1 pb-2'> 
              <h2 className="font-bold justify-center text-center mt-1">DEDUCTIONS</h2>
              <p>ESI (From employee): {salaryData.ESI}</p>
              <p>PF (From employee): {salaryData.PF}</p>
              <p>Professional Tax: {salaryData.PT}</p>
              <p>Advance: {salaryData.Advance}</p>
              <p>Salary TDS: {salaryData.Salary_TDS}</p>
              <p>Insurance: {salaryData.Insurance}</p>
              <p>MLWF: {salaryData.MLWF}</p>
              <p>Total Deductions: {salaryData.Total_Deduction}</p>
            </div>
          </div>
          <div className="text-left mt-4">
            <p className="font-bold">Net Pay: {salaryData.Net_Pay}</p>
          </div>
          {/* <div id="footer" className="bg-[#495475] text-white text-center py-4 ">
          <p>Flat No A/7, SuryaLok Nagri, Waiduwadi, Hadapsar, Pune 411013</p>
          <p>Cell: 09850164441 | Land line: 020-26812190</p>
          <p>E-Mail ID: Sandeep.patil@systechsolutions.co.in | Web: www.systechsolutions.co.in</p>
        </div> */}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={exportToPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipPreview;
