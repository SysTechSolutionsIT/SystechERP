import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./components/Login";
import { DetailsProvider } from "./components/Login";
import { EmployeeTypeProvider } from "./components/forms/personal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CompMaster from "./components/company settings/CompMaster";
import FinMaster from "./components/company settings/FinMaster";
import CompConfig from "./components/company settings/CompConfig";
import BankMaster from "./components/company settings/BankMaster";
import CostCenterMaster from "./components/company settings/CostCenterMaster";
import DepartmentMaster from "./components/company settings/DepartmentMaster";
import DestinationMaster from "./components/company settings/DestinationMaster";
import ThreeFieldsMaster from "./components/company settings/ThreeFieldsMaster";
import TwoFieldsMaster from "./components/company settings/TwoFieldsMaster";
import EmployeeMaster from "./components/employee settings/EmployeeMaster";
import EmployeeTypeMaster from "./components/employee settings/EmployeeTypeMaster";
import EmployeeGradeMaster from "./components/employee settings/EmployeeGradeMaster";
import EMPTabs from "./components/employee settings/emptabs";
import JobTypeMaster from "./components/attendance settings/jobTypeMaster";
import ShiftMaster from "./components/attendance settings/shiftMaster";
import WeeklyOffMaster from "./components/attendance settings/WeeklyOffMaster";
import HolidayMaster from "./components/attendance settings/Holidaymaster";
import DeviceMaster from "./components/attendance settings/AttDevice";
import EarningHeadsMaster from "./components/payroll settings/EarningHeadsMaster";
import DeductionHeadsMaster from "./components/payroll settings/DeductionHeadsMaster";
import LeaveBalance from "./components/leaves settings/LeaveBalance";
import LeaveApp from "./components/leaves settings/leaveApplication";
import EmpTypeEarningDeduction from "./components/payroll settings/EmpTypeEarningDeduction";
import ProfesssionalTaxMaster from "./components/payroll settings/ProfesssionalTaxMaster";
import LeaveApproval from "./components/leaves settings/LeaveApproval";
import DesignationMaster from "./components/employee settings/DesignationMaster";
import KRAMaster from "./components/employee settings/KRAMaster";
import AdvanceRequest from "./components/payroll settings/AdvanceRequest";
import EDImports from "./components/salary management/EDImports";
import SalProcessing from "./components/salary management/SalProcess";
import JobsResponsibilityMaster from "./components/employee settings/JobsResponsibilityMaster";
import LeaveTypeMaster from "./components/leaves settings/LeaveType";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import GateEntryMaster from "./components/attendance management/EmployeeGatePassEntry";
import ShiftRoster from "./components/attendance management/ShiftRoster";
import ManualAttendanceEntry from "./components/attendance management/ManualAttendanceEntry";
import ManualAttendanceApproval from "./components/attendance management/ManualAttendanceApproval";
import OutDoorAttendanceEntry from "./components/attendance management/OutDoorAttendanceEntry";
import OutDoorAttendanceApproval from "./components/attendance management/OutDoorAttendanceApproval";
import AdvanceApproval from "./components/payroll settings/AdvanceApprovalMaster";
import AdvanceRepayment from "./components/payroll settings/AdvanceRepayment";
import EmployeeTypeEarningMaster from "./components/payroll settings/EmployeeTypeEarningMaster";
import EmployeeTypeDeductionMaster from "./components/payroll settings/EmployeeTypeDeductionMaster";
import GatePassApproval from "./components/attendance management/GatePassApproval";
import DailyAttendanceProcessing from "./components/attendance management/DailyAttendanceProcessing";
import MonthlyAttendance from "./components/attendance management/MonthlyAttendance";
import UserRoles from "./components/company settings/UserRoles";
import BranchMaster from "./components/company settings/Branch Master";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DetailsProvider>
          <EmployeeTypeProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route
                element={
                  <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 mx-auto">
                      <Header />
                      <div className="bg-white">
                        <Outlet />
                      </div>
                    </main>
                  </div>
                }
              >
                <Route path="/j0hg2l4r" element={<Dashboard />} />
                <Route path="/y5ts9c4z" element={<CompMaster />} />
                <Route path="/q8wn1g6k" element={<FinMaster />} />
                <Route
                  path="/r3fz7k5b"
                  element={<CompConfig />}
                />
                <Route path="/i2p8s6xq" element={<BankMaster />} />
                <Route
                  path="/e9u0b7h3"
                  element={<CostCenterMaster />}
                />
                <Route
                  path="/m4c8n2p1"
                  element={<DepartmentMaster />}
                />
                <Route
                  path="/o7l5m1d9"
                  element={<DestinationMaster />}
                />
                <Route
                  path="/f2q1r9z3"
                  element={<ThreeFieldsMaster />}
                />
                <Route path="/a6o0w3x5" element={<TwoFieldsMaster />} />
                <Route path="/h7b8n1y4" element={<EmployeeMaster />} />
                <Route
                  path="/g9f3c2v1"
                  element={<LeaveBalance />}
                />
                <Route
                  path="/t5p7e1i2"
                  element={<EmployeeTypeMaster />}
                />
                <Route path="/l3r2o5v7" element={<BranchMaster />} />
                <Route
                  path="/u4y8i2x7"
                  element={<EmployeeGradeMaster />}
                />
                <Route
                  path="/d9e7x2a1"
                  element={<DesignationMaster />}
                />
                <Route path="/b3i7w1y8" element={<KRAMaster />} />
                <Route
                  path="/z6r4u2e9"
                  element={<JobsResponsibilityMaster />}
                />
                {/* <Route path="/add-employee" element={<EMPTabs />} /> */}
                <Route path="/k8g2d4j9" element={<ShiftMaster />} />
                <Route path="/s3f9n7v2" element={<HolidayMaster />} />
                <Route path="/x5r1c9j0" element={<WeeklyOffMaster />} />
                <Route path="/p2l4o8n9" element={<DeviceMaster />} />
                <Route path="/c7v2m8n5" element={<JobTypeMaster />} />
                <Route
                  path="/q1d9y3z6"
                  element={<LeaveTypeMaster />}
                />

                <Route
                  path="/v6w2s4h8/:employeeId"
                  element={<EMPTabs />}
                />

                <Route path="/j5t9l4n2" element={<ShiftRoster />} />
                <Route
                  path="/r7e2p6g1"
                  element={<ManualAttendanceEntry />}
                />
                <Route
                  path="/f0t4r1n5"
                  element={<DailyAttendanceProcessing />}
                />
                <Route
                  path="/z3x7y9b2"
                  element={<ManualAttendanceApproval />}
                />
                <Route
                  path="/q8c2j4m6"
                  element={<OutDoorAttendanceEntry />}
                />
                <Route
                  path="/s5e1p3g7"
                  element={<OutDoorAttendanceApproval />}
                />
                <Route
                  path="/i9u6l3b7"
                  element={<EarningHeadsMaster />}
                />
                <Route
                  path="/w2z8a6s3"
                  element={<DeductionHeadsMaster />}
                />
                <Route
                  path="/h7x4p8o3"
                  element={<ProfesssionalTaxMaster />}
                />
                <Route
                  path="/y9n2m4o7"
                  element={<EmpTypeEarningDeduction />}
                />
                <Route
                  path="/x8q5g2h1"
                  element={<EmployeeTypeEarningMaster />}
                />
                <Route
                  path="/u3v9y4z6"
                  element={<EmployeeTypeDeductionMaster />}
                />
                <Route
                  path="/k1j7o9r5"
                  element={<MonthlyAttendance />}
                />
                <Route path="/a0bdhs87t" element={<AdvanceRequest />} />
                <Route path="/a5d3g2p6" element={<LeaveApp />} />
                <Route path="/b8m4n9r1" element={<LeaveApproval />} />
                <Route path="/l6t3z9d1" element={<EDImports />} />
                <Route path="/o5v2w1t8" element={<SalProcessing />} />
                <Route path="/p7c9h3g2" element={<AdvanceApproval />} />
                <Route path="/n1m5z7t8" element={<UserRoles />} />
                <Route
                  path="/e4d6j7r9"
                  element={<GateEntryMaster />}
                />
                <Route
                  path="/q0f8x6m3"
                  element={<AdvanceRepayment />}
                />
                <Route
                  path="/r9w7v3k1"
                  element={<GatePassApproval />}
                />
              </Route>
            </Routes>
          </EmployeeTypeProvider>
        </DetailsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
