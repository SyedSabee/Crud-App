import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div>
      <Link to="/category">Category List</Link>
      <Link to="/add-category">Add New Category</Link>
    </div>
  );
};

export default MainNav;
