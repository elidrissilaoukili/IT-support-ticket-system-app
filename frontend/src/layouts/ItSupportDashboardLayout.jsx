import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

import Footer from '../components/Footer';
import {
  EngineeringIcon,
  MenuIcon,
  HourglassBottomIcon,
  CategoryIcon,
  InventoryIcon,
  LocalShippingIcon,
  MessageIcon,
  ReviewsIcon,
  DoneAllIcon,
  NewReleasesIcon,
  PriceCheckIcon,
  VerifiedIcon,
  InsightsIcon,
  RemoveDoneIcon,
  SupervisedUserCircleIcon,
  AddBusinessIcon,
  ExtensionIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon
} from '@/components/Icons'
import "./Dashboard.css";


const AdminDashboardLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);

  const getLinkClass = (path) => {
    const location = useLocation();
    const baseUrl = location.pathname;

    return baseUrl === path ? "link-dashes active" : "link-dashes";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // for side bar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setOpenSidebar(false);
      } else {
        setOpenSidebar(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle sidebar manually
  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  return (
    <AuthenticatedLayout>
      <div className="openside-btn">
        <button className="opn-btn" onClick={toggleSidebar} >
          <MenuIcon />
        </button>
      </div>
      <div className="dashboard-container">
        <div className="sidebar-container">
          <aside className={`sidebar ${openSidebar ? 'open' : ''}`} id="sdbr">
            <Link
              to="/it-support/employees"
              className={getLinkClass("/it-support/employees")}
            >
              <EngineeringIcon fontSize="small" /> Employees
            </Link>

            <Link
              to="/it-support/tickets"
              className={getLinkClass("/it-support/tickets")}
            >
              <CategoryIcon fontSize="small" />Tickets
            </Link>
          </aside>
        </div>

        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
    </AuthenticatedLayout>

  )
}
export default AdminDashboardLayout