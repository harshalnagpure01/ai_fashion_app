import React, { useState, useEffect } from 'react';
import StatsController from '../../controllers/StatsController.js';
import { 
  ChartBarIcon, 
  UsersIcon, 
  CloudArrowUpIcon, 
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

const StatisticalCount = () => {
  const [overview, setOverview] = useState({});
  const [userActivity, setUserActivity] = useState([]);
  const [engagement, setEngagement] = useState({});
  const [revenue, setRevenue] = useState({});
  const [closetUploads, setClosetUploads] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7');

  const statsController = new StatsController();

  useEffect(() => {
    loadAllStats();
  }, []);

  const loadAllStats = async () => {
    try {
      const dashboardOverview = statsController.getDashboardOverview();
      const activityTrends = statsController.getUserActivityTrends('daily');
      const engagementMetrics = statsController.getEngagementMetrics();
      const revenueAnalytics = statsController.getRevenueAnalytics();
      const uploadStats = statsController.getClosetUploadStats();

      setOverview(dashboardOverview);
      setUserActivity(activityTrends);
      setEngagement(engagementMetrics);
      setRevenue(revenueAnalytics);
      setClosetUploads(uploadStats);
      setLoading(false);
    } catch (error) {
      console.error('Error loading statistics:', error);
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) {
      return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
    } else if (growth < 0) {
      return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
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
        <h2 className="text-2xl font-bold text-gray-900">Statistical Dashboard</h2>
        <div className="flex space-x-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'users', name: 'User Activity', icon: UsersIcon },
            { id: 'engagement', name: 'Engagement', icon: HandThumbUpIcon },
            { id: 'revenue', name: 'Revenue', icon: CurrencyDollarIcon }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <UsersIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(overview.summary?.totalUsers || 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(overview.growth?.logins)}
                    <span className={`text-sm ${getGrowthColor(overview.growth?.logins)}`}>
                      {overview.growth?.logins > 0 ? '+' : ''}{overview.growth?.logins}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Polls</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(overview.summary?.totalPolls || 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(overview.growth?.engagement)}
                    <span className={`text-sm ${getGrowthColor(overview.growth?.engagement)}`}>
                      {overview.growth?.engagement > 0 ? '+' : ''}{overview.growth?.engagement}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <HandThumbUpIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Votes</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(overview.summary?.totalVotes || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Avg: {overview.summary?.averageVotesPerPoll || 0} per poll
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(overview.summary?.totalRevenue || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Subscriptions: {formatCurrency(overview.summary?.subscriptionRevenue || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600">
                  {overview.quickStats?.todayLogins || 0}
                </p>
                <p className="text-sm text-gray-600">Logins Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600">
                  {overview.quickStats?.activeUsers || 0}
                </p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">
                  {overview.quickStats?.totalPolls || 0}
                </p>
                <p className="text-sm text-gray-600">Total Polls</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-yellow-600">
                  {formatCurrency(overview.quickStats?.totalRevenue || 0)}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Activity Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Login Trends</h3>
            <div className="space-y-2">
              {userActivity.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(day.count / Math.max(...userActivity.map(d => d.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {day.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Users by Uploads</h3>
            <div className="space-y-3">
              {closetUploads.topUsers?.map((user, index) => (
                <div key={user.userId} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 w-4">
                      {index + 1}.
                    </span>
                    <span className="ml-3 text-sm text-gray-900">{user.username}</span>
                  </div>
                  <div className="flex items-center">
                    <CloudArrowUpIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{user.uploads}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <HandThumbUpIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Votes</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(engagement.totalVotes || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ChatBubbleLeftIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Comments</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatNumber(engagement.totalComments || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Votes/Poll</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {engagement.averageVotesPerPoll || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Engagement Trends</h3>
            <div className="space-y-3">
              {engagement.dailyTrends?.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <HandThumbUpIcon className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-gray-900">{day.votes} votes</span>
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-gray-900">{day.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Averages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">
                  {engagement.averages?.dailyVotes || 0}
                </p>
                <p className="text-sm text-gray-600">Avg Daily Votes</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">
                  {engagement.averages?.dailyComments || 0}
                </p>
                <p className="text-sm text-gray-600">Avg Daily Comments</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(revenue.totalRevenue || 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(revenue.growth)}
                    <span className={`text-sm ${getGrowthColor(revenue.growth)}`}>
                      {revenue.growth > 0 ? '+' : ''}{revenue.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Subscription Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(revenue.subscriptionRevenue || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {revenue.percentages?.subscription}% of total
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ad Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(revenue.adRevenue || 0)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {revenue.percentages?.ads}% of total
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
            <div className="space-y-3">
              {revenue.monthlyBreakdown?.map((month, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-900">{month.month}</span>
                  <div className="flex space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        {formatCurrency(month.subscription)}
                      </p>
                      <p className="text-xs text-gray-500">Subscriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-600">
                        {formatCurrency(month.ads)}
                      </p>
                      <p className="text-xs text-gray-500">Ads</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(month.total)}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticalCount;