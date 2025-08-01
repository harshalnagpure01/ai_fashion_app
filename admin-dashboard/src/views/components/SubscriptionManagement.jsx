import React, { useState, useEffect } from 'react';
import SubscriptionController from '../../controllers/SubscriptionController.js';
import { 
  MagnifyingGlassIcon, 
  CurrencyDollarIcon, 
  CalendarIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PencilIcon,
  EyeIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [stats, setStats] = useState({});
  const [earnings, setEarnings] = useState({});
  const [settings, setSettings] = useState({});
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('subscriptions');

  const subscriptionController = new SubscriptionController();

  useEffect(() => {
    loadSubscriptions();
    loadStats();
    loadEarnings();
    loadSettings();
  }, []);

  useEffect(() => {
    filterSubscriptions();
  }, [subscriptions, searchTerm, statusFilter, planFilter, dateFilter]);

  const loadSubscriptions = async () => {
    try {
      const subscriptionData = subscriptionController.getAllSubscriptions(1, 100);
      setSubscriptions(subscriptionData.subscriptions);
      setLoading(false);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const subscriptionStats = subscriptionController.getSubscriptionStatistics();
      setStats(subscriptionStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadEarnings = async () => {
    try {
      const earningsData = subscriptionController.getSubscriptionEarnings();
      setEarnings(earningsData);
    } catch (error) {
      console.error('Error loading earnings:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const settingsData = subscriptionController.getSubscriptionSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const filterSubscriptions = () => {
    let filtered = subscriptions;

    if (searchTerm) {
      filtered = subscriptionController.searchSubscriptions(searchTerm);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (planFilter !== 'all') {
      filtered = filtered.filter(sub => sub.plan === planFilter);
    }

    if (dateFilter.start && dateFilter.end) {
      filtered = filtered.filter(sub => {
        const subDate = new Date(sub.startDate);
        return subDate >= new Date(dateFilter.start) && subDate <= new Date(dateFilter.end);
      });
    }

    setFilteredSubscriptions(filtered);
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        const result = subscriptionController.cancelSubscription(subscriptionId);
        if (result.success) {
          loadSubscriptions();
          loadStats();
          alert(result.message);
        }
      } catch (error) {
        alert('Error cancelling subscription: ' + error.message);
      }
    }
  };

  const handleReactivateSubscription = async (subscriptionId) => {
    try {
      const result = subscriptionController.reactivateSubscription(subscriptionId);
      if (result.success) {
        loadSubscriptions();
        loadStats();
        alert(result.message);
      }
    } catch (error) {
      alert('Error reactivating subscription: ' + error.message);
    }
  };

  const handleUpdatePricing = async (monthlyPrice, annualPrice) => {
    try {
      const result = subscriptionController.updateSubscriptionPricing(
        parseFloat(monthlyPrice), 
        parseFloat(annualPrice)
      );
      if (result.success) {
        loadSettings();
        loadStats();
        alert(result.message);
      }
    } catch (error) {
      alert('Error updating pricing: ' + error.message);
    }
  };

  const handleUpdateAdminAccount = async (accountDetails) => {
    try {
      const result = subscriptionController.updateAdminAccount(accountDetails);
      if (result.success) {
        loadSettings();
        alert(result.message);
      }
    } catch (error) {
      alert('Error updating admin account: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'expired':
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
      case 'cancelled':
        return <ClockIcon className="h-4 w-4 text-gray-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Subscription Management</h2>
        <button
          onClick={() => setShowSettingsModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <CogIcon className="h-4 w-4 mr-2" />
          Settings
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'subscriptions', name: 'Subscriptions', icon: UserIcon },
            { id: 'earnings', name: 'Earnings', icon: CurrencyDollarIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.active || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(stats.projectedMonthlyRevenue || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.conversionRate || 0}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by username or email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                >
                  <option value="all">All Plans</option>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateFilter.start}
                  onChange={(e) => setDateFilter({...dateFilter, start: e.target.value})}
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={dateFilter.end}
                  onChange={(e) => setDateFilter({...dateFilter, end: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subscription.username}
                          </div>
                          <div className="text-sm text-gray-500">{subscription.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {subscription.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(subscription.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(subscription.status)}`}>
                            {subscription.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(subscription.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{new Date(subscription.startDate).toLocaleDateString()}</div>
                          <div className="text-gray-500">to {new Date(subscription.endDate).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <div className="flex space-x-1">
                          {subscription.status === 'active' && (
                            <button
                              onClick={() => handleCancelSubscription(subscription.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          )}
                          {subscription.status !== 'active' && (
                            <button
                              onClick={() => handleReactivateSubscription(subscription.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Reactivate"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(earnings.total || 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-green-600">
                      +{earnings.growthRate || 0}% growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(earnings.monthlyBreakdown?.[earnings.monthlyBreakdown.length - 1]?.amount || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {earnings.monthlyBreakdown?.[earnings.monthlyBreakdown.length - 1]?.subscribers || 0} subscribers
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.active || 0}</p>
                  <p className="text-sm text-gray-500">
                    Monthly: {stats.monthly || 0} | Annual: {stats.annual || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Earnings Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Earnings Breakdown</h3>
            <div className="space-y-3">
              {earnings.monthlyBreakdown?.map((month, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(month.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                    <p className="text-sm text-gray-500">{month.subscribers} subscribers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(month.amount)}
                    </p>
                    {index > 0 && (
                      <p className={`text-sm ${
                        month.amount > earnings.monthlyBreakdown[index - 1].amount 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {month.amount > earnings.monthlyBreakdown[index - 1].amount 
                          ? '+' 
                          : ''}
                        {((month.amount - earnings.monthlyBreakdown[index - 1].amount) / earnings.monthlyBreakdown[index - 1].amount * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Subscription Settings</h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Pricing Settings */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Subscription Pricing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Monthly Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={settings.monthlyPrice}
                          id="monthlyPrice"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Annual Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          defaultValue={settings.annualPrice}
                          id="annualPrice"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const monthlyPrice = document.getElementById('monthlyPrice').value;
                      const annualPrice = document.getElementById('annualPrice').value;
                      handleUpdatePricing(monthlyPrice, annualPrice);
                    }}
                    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Update Pricing
                  </button>
                </div>

                {/* Admin Account Settings */}
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Admin Account Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Name</label>
                      <input
                        type="text"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={settings.adminAccount?.name}
                        id="adminName"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                      <input
                        type="email"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        defaultValue={settings.adminAccount?.email}
                        id="adminEmail"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const name = document.getElementById('adminName').value;
                      const email = document.getElementById('adminEmail').value;
                      handleUpdateAdminAccount({ name, email });
                    }}
                    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Update Admin Account
                  </button>
                </div>

                {/* Current Settings Display */}
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Current Settings</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Monthly Price:</span>
                        <span className="ml-2">{formatCurrency(settings.monthlyPrice || 0)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Annual Price:</span>
                        <span className="ml-2">{formatCurrency(settings.annualPrice || 0)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Admin:</span>
                        <span className="ml-2">{settings.adminAccount?.name}</span>
                      </div>
                      <div>
                        <span className="font-medium">Last Updated:</span>
                        <span className="ml-2">{settings.adminAccount?.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;