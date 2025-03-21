import { NavLink } from "react-router-dom";
import { FaBox, FaTags, FaChartBar, FaWarehouse, FaUsers, FaHome, FaList } from "react-icons/fa";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import "./sidebar.scss";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleUserClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/dashboard/overview">
          <FaHome className="icon" />
          Overview
        </NavLink>
        <NavLink to="/dashboard/orders">
          <FaBox className="icon" />
          Orders
        </NavLink>
        <NavLink to="/dashboard/categories">
          <FaList className="icon" />
          Categories
        </NavLink>
        <NavLink to="/dashboard/products">
          <FaTags className="icon" />
          Products
        </NavLink>
        <NavLink to="/dashboard/sales">
          <FaChartBar className="icon" />
          Sales Analytics
        </NavLink>
        <NavLink to="/dashboard/inventory">
          <FaWarehouse className="icon" />
          Inventory
        </NavLink>
        <NavLink to="/dashboard/overview" onClick={handleUserClick} className="disabled">
          <FaUsers className="icon" />
          Users
        </NavLink>
      </nav>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Premium Module</DialogTitle>
        <DialogContent>This is a premium module. Please contact the owner for access.</DialogContent>
        <Button onClick={() => setOpen(false)} color="primary" variant="contained" sx={{ margin: 2 }}>
          Close
        </Button>
      </Dialog>
    </aside>
  );
}
