import React from "react";
import UserNavbar from "./UserNavbar";
import WikipediaSearch from "./WikipediaSearch";
import Footer from "./Footer";
function UserDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UserNavbar />
      <WikipediaSearch />
      <Footer />
    </div>
  );
}

export default UserDashboard;
