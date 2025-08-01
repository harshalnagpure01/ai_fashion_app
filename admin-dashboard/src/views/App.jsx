import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import UserManagement from './components/UserManagement.jsx';
import ContentModeration from './components/ContentModeration.jsx';
import StatisticalCount from './components/StatisticalCount.jsx';
import SubscriptionManagement from './components/SubscriptionManagement.jsx';

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to Fashion Admin Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow text-white">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-blue-100">Quick Access</p>
              <p className="text-xl font-semibold">User Management</p>
              <p className="text-sm text-blue-100">Manage user accounts and activities</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow text-white">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">🛡️</span>
            </div>
            <div className="ml-4">
              <p className="text-green-100">Quick Access</p>
              <p className="text-xl font-semibold">Content Moderation</p>
              <p className="text-sm text-green-100">Review and moderate platform content</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow text-white">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-purple-100">Quick Access</p>
              <p className="text-xl font-semibold">Analytics</p>
              <p className="text-sm text-purple-100">View detailed platform statistics</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg shadow text-white">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">💳</span>
            </div>
            <div className="ml-4">
              <p className="text-yellow-100">Quick Access</p>
              <p className="text-xl font-semibold">Subscriptions</p>
              <p className="text-sm text-yellow-100">Manage subscription plans and billing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Overview</h3>
        <div className="prose max-w-none text-gray-600">
          <p>
            Welcome to the Fashion Admin Dashboard! This comprehensive platform provides you with all the tools 
            necessary to manage your fashion community platform effectively.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>User account management and monitoring</li>
                <li>Content moderation and approval workflows</li>
                <li>Comprehensive analytics and reporting</li>
                <li>Subscription management and billing oversight</li>
                <li>Real-time platform metrics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Admin Capabilities:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Monitor user activity and engagement</li>
                <li>Review and moderate polls and comments</li>
                <li>Track revenue and subscription metrics</li>
                <li>Manage platform abuse and spam</li>
                <li>Generate detailed reports for decision making</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-semibold text-blue-600">5</p>
            <p className="text-sm text-gray-600">New Users Today</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-semibold text-green-600">12</p>
            <p className="text-sm text-gray-600">Content Items Pending Review</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-semibold text-purple-600">3</p>
            <p className="text-sm text-gray-600">New Subscriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <div className="lg:ml-64 pt-16">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/content" element={<ContentModeration />} />
              <Route path="/stats" element={<StatisticalCount />} />
              <Route path="/subscriptions" element={<SubscriptionManagement />} />
              {/* Catch all route - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;