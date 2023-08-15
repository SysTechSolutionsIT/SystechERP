import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EMPTabs from "./components/employee/emptabs";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import CompMaster from "./components/company settings/master";
import BankMaster from "./components/company settings/BankMaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element={
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 mx-auto">
              <Header />
              <div className="bg-gray-50"><Outlet /></div>
            </main>
          </div>
        }>
          <Route path='/company-masters' element={<CompMaster/>} />
          <Route path='/bank-master' element={<BankMaster/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
