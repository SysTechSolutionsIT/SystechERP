import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EMPTabs from "./components/employee/emptabs";

function App() {
  return (
    <div>
      <Sidebar/>
      <Header/>
      <EMPTabs/>
    </div>
  );
}

export default App;
