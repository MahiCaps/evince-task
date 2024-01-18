import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/employee-list";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
