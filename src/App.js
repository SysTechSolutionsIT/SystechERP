import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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
import EMPTabs from "./components/employee settings/emptabs";
import JobTypeMaster from "./components/attendance settings/jobTypeMaster";
import ShiftMaster from "./components/attendance settings/shiftMaster";
import WeeklyOffMaster from "./components/attendance settings/WeeklyOffMaster";
import HolidayMaster from "./components/attendance settings/Holidaymaster";
import EmployeeTypeMaster from "./components/employee settings/EmployeeTypeMaster";
import DeviceMaster from "./components/attendance settings/AttDevice";
import EarningHeadsMaster from "./components/payroll settings/EarningHeadsMaster";
import DeductionHeadsMaster from "./components/payroll settings/DeductionHeadsMaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
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
          <Route path="/company-masters" element={<CompMaster />} />
          <Route path="/financial-masters" element={<FinMaster />} />
          <Route path="/company-configurations" element={<CompConfig />} />
          <Route path="/bank-master" element={<BankMaster />} />
          <Route path="/costcenter-master" element={<CostCenterMaster />} />
          <Route path="/department-master" element={<DepartmentMaster />} />
          <Route path="/destination-master" element={<DestinationMaster />} />
          <Route path="/three-field-master" element={<ThreeFieldsMaster />} />
          <Route path="/two-field-master" element={<TwoFieldsMaster />} />
          <Route path="/employee-master" element={<EmployeeMaster />} />
          <Route path="/add-employee" element={<EMPTabs />} />
          <Route path="/shift-master" element={<ShiftMaster />} />
          <Route path="/holiday-master" element={<HolidayMaster />} />
          <Route path="/weeklyoff-master" element={<WeeklyOffMaster />} />
          <Route path="/attDevice-master" element={<DeviceMaster />} />
          <Route path="/job-type-master" element={<JobTypeMaster />} />
          <Route path="/leave-type-master" element={<LeaveTypeMaster />} />
          <Route path="/edit-employee/:empid" element={<EMPTabs />} />
          <Route
            path="/employee-type-master"
            element={<EmployeeTypeMaster />}
          />
          <Route path="/earning-heads-master" element={<EarningHeadsMaster/>}/>
          <Route path="/deduction-heads-master" element={<DeductionHeadsMaster/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
