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
                <div className="bg-gray-50">
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
          <Route path="/three-fields-master" element={<ThreeFieldsMaster />} />
          <Route path="/two-fields-master" element={<TwoFieldsMaster />} />
          <Route path="/employee-master" element={<EmployeeMaster/>}/>
          <Route path="/add-employee" element={<EMPTabs/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
