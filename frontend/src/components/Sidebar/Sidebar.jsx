import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaFirstOrder } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);

    // Detect screen size and set initial states
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);

            // Set sidebar state based on screen size
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                // Maintain the current state for desktop
                // This allows manual toggle on desktop
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [location, isMobile]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
    };

    const navItems = [
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            path: "/profile",
            label: "Profile",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            path: "/users",
            label: "Users",
            icon: <FaUsers />

        },
        {
            path: "/products",
            label: "Products",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        },
        {
            path: "/order",
            label: "Orders",
            icon: <FaFirstOrder />
        },
        {
            path: "/cart-item",
            label: "Cart Item",
            icon: <FaFirstOrder />
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:relative top-0 left-0 z-40 w-64 bg-[#2e3345] text-white 
                    transform transition-transform duration-300 ease-in-out min-h-screen
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="p-5 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold bg-[#315bc1] p-4 rounded-lg flex-1 text-center">
                            Easy Shop
                        </h2>
                        {isMobile && (
                            <button
                                className="ml-2 text-gray-400 hover:text-white p-2"
                                onClick={toggleSidebar}
                                aria-label="Close sidebar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 mt-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center p-3 rounded-lg transition-all duration-200
                                    hover:bg-[#315bc1] hover:shadow-md
                                    ${location.pathname === item.path ? 'bg-[#315bc1] shadow-md' : ''}
                                `}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="border-t border-gray-700 pt-5">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center p-3 bg-[#315bc1] hover:bg-[#2549a8] rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen flex flex-col">
                {/* Top Navigation Bar */}
                <header className="bg-white shadow-md">
                    <div className="px-4 py-3 flex justify-between items-center">
                        {/* Menu Toggle Button */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle sidebar"
                        >
                            <IoMenu className="text-2xl text-gray-700" />
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                onClick={toggleProfileDropdown}
                            >
                                <div className="w-10 h-10 rounded-full bg-[#315bc1] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium hidden sm:block">Admin</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-50 border border-gray-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={() => {
                                            setIsProfileDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};


export default Sidebar;