import React, { useEffect, useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import {
  Home,
  BookOpen,
  BookMarked,
  Users,
  Contact,
  Menu,
  X,
  BookOpenText,
} from "lucide-react";
import { NavLink, href } from "react-router-dom";
import { UserButton, useAuth, useUser, useClerk } from "@clerk/clerk-react";

const baseNav = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Faculty", icon: Users, href: "/faculty" },
  { name: "Contact", icon: Contact, href: "/contact" },
];

const Navbar = () => {
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const navItems = isSignedIn
  ? [...baseNav, { name: "My Courses", icon: BookOpenText, href: "/mycourses" }]
  : baseNav;

  const menuRef = useRef(null);

  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        localStorage.setItem("token", token);
      }
    };
    loadToken();
  }, [isSignedIn, getToken]);

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("token");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ FIXED HERE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("[data-clerk-user-button]")) return;

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${
      isActive ? navbarStyles.desktopNavItemActive : ""
    }`;

  const mobileLinkClass = (isActive) =>
    `${navbarStyles.mobileMenuLink} ${
      isActive ? navbarStyles.mobileMenuLinkActive : ""
    }`;

  return (
    <nav
      className={`${navbarStyles.navbar} ${
        showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
      } ${
        isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault
      }`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div className="text-xl font-bold text-sky-700">
              SkillForge
            </div>
          </div>

          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    desktopLinkClass(isActive)
                  }
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <div className={navbarStyles.authContainer}>
            {!isSignedIn ? (
              <button
                onClick={() => openSignUp({})}
                className={navbarStyles.loginButton}
              >
                Create Account
              </button>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={navbarStyles.mobileLoginButton}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`${navbarStyles.mobileMenu} ${
            isOpen
              ? navbarStyles.mobileMenuOpen
              : navbarStyles.mobileMenuClosed
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === "/"}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
