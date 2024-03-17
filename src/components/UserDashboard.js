import React from "react";
import UserNavbar from "./UserNavbar";
import WikipediaSearch from "./WikipediaSearch";
import Footer from "./Footer";
function UserDashboard() {
  return (
    <div>
      <UserNavbar />
      <WikipediaSearch />
      <Footer />
    </div>
  );
}

export default UserDashboard;
