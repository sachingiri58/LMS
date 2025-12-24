import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  CalendarCheck,
  Menu,
  X,
} from "lucide-react";

import logo from "../assets/logo.png";
import { navbarStyles } from "../assets/dummyStyles";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "addcourse", label: "Add Course", icon: PlusCircle, path: "/addcourse" },
  { id: "listcourse", label: "List Courses", icon: ListChecks, path: "/listcourse" },
  { id: "bookings", label: "Bookings", icon: CalendarCheck, path: "/bookings" },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const menuRef = useRef(null);

  // hide navbar on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={navbarStyles.nav(isVisible)}>
      <div className={navbarStyles.navContainer}>
        <div ref={menuRef} className={navbarStyles.menuWrapper}>
          <div className={navbarStyles.glowEffect}></div>

          <div className={navbarStyles.navbarContent}>
            {/* Logo */}
            <div className={navbarStyles.logoContainer}>
              <img src={logo} alt="logo" className={navbarStyles.logoImage} />
              <div className={navbarStyles.logoText}>SkillForge</div>
            </div>

            {/* Desktop Nav */}
            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.desktopNavInner}>
                {menuItems.map(({ id, label, icon: Icon, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={id}
                      to={path}
                      className={navbarStyles.desktopNavItem(isActive)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                      {isActive && (
                        <span className={navbarStyles.desktopActiveGlow} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className={navbarStyles.mobileToggleContainer}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={navbarStyles.mobileToggleButton}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={navbarStyles.mobileMenu(isMenuOpen)}>
            <div className={navbarStyles.mobileMenuInner}>
              {menuItems.map(({ id, label, icon: Icon, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={navbarStyles.mobileMenuItem(isActive)}
                  >
                    <Icon className={navbarStyles.mobileMenuIcon} />
                    <span className={navbarStyles.mobileMenuText}>
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Home;
