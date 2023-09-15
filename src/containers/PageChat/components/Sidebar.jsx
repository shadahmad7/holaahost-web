import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import '../style.scss'

const Sidebar = () => {
  return (
    <div className="sidebar sm: w-16">
      <Navbar />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
