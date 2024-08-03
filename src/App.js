import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
// import Wikisearch from "./pages/Wikisearch";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
       
      </Routes>
    </>
  );
};

export default App;
