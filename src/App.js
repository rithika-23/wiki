import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
// import Wikisearch from "./pages/Wikisearch";

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
