import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EMPTabs from "./components/employee/emptabs";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

function App() {
  return (
    // <div>
    //   <Sidebar/>
    //   <Header/>
    //   <EMPTabs/>
    // </div>
    <Router>
      <Routes>
        <Route element={
          <div className="flex">
            <Sidebar />
            <main className="flex-1 mx-auto">
              <Header />
              <div className="bg-gray-50 h-[calc(100vh - 56px)]"><Outlet /></div>
            </main>
          </div>
        }>
          <Route path='/' element={<EMPTabs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
