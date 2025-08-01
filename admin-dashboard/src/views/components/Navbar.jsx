import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  UserGroupIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigation = [
    { name: 'User Management', href: '/users', icon: UserGroupIcon },
    { name: 'Content Moderation', href: '/content', icon: ShieldCheckIcon },
    { name: 'Statistics', href: '/stats', icon: ChartBarIcon },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
  ];

  return (
    <>
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <h1 className="ml-2 text-xl font-semibold text-gray-900 lg:ml-0">
              Fashion Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, Admin
            </div>
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-16">
          <div className="flex items-center px-6 py-4 border-b border-gray-700">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">FA</span>
            </div>
            <span className="ml-3 text-white font-semibold">Fashion Admin</span>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@fashionapp.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;