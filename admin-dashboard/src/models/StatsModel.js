import { mockStats } from '../data/mockData.js';

class StatsModel {
  constructor() {
    this.stats = { ...mockStats };
  }

  // Get user activity trends
  getUserActivityTrends() {
    return this.stats.userActivity;
  }

  // Get daily login data
  getDailyLogins() {
    return this.stats.userActivity.dailyLogins;
  }

  // Get weekly login data
  getWeeklyLogins() {
    return this.stats.userActivity.weeklyLogins;
  }

  // Get closet uploads per user
  getClosetUploads() {
    return this.stats.closetUploads;
  }

  // Get engagement metrics
  getEngagementMetrics() {
    return this.stats.engagement;
  }

  // Get daily engagement data
  getDailyEngagement() {
    return this.stats.engagement.dailyEngagement;
  }

  // Get revenue data
  getRevenueData() {
    return this.stats.revenue;
  }

  // Get total revenue
  getTotalRevenue() {
    return this.stats.revenue.totalRevenue;
  }

  // Get subscription revenue
  getSubscriptionRevenue() {
    return this.stats.revenue.subscriptionRevenue;
  }

  // Get ad revenue
  getAdRevenue() {
    return this.stats.revenue.adRevenue;
  }

  // Get monthly revenue breakdown
  getMonthlyRevenueBreakdown() {
    return this.stats.revenue.monthlyBreakdown;
  }

  // Get summary statistics
  getSummaryStats() {
    const userActivity = this.stats.userActivity;
    const engagement = this.stats.engagement;
    const revenue = this.stats.revenue;

    return {
      totalUsers: userActivity.dailyLogins[userActivity.dailyLogins.length - 1]?.count || 0,
      totalPolls: engagement.totalPolls,
      totalVotes: engagement.totalVotes,
      totalComments: engagement.totalComments,
      averageVotesPerPoll: engagement.averageVotesPerPoll,
      totalRevenue: revenue.totalRevenue,
      subscriptionRevenue: revenue.subscriptionRevenue,
      adRevenue: revenue.adRevenue
    };
  }

  // Get user activity for specific date range
  getUserActivityByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.stats.userActivity.dailyLogins.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= start && dayDate <= end;
    });
  }

  // Get engagement for specific date range
  getEngagementByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.stats.engagement.dailyEngagement.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= start && dayDate <= end;
    });
  }

  // Calculate growth rate
  calculateGrowthRate(data, period = 'daily') {
    if (data.length < 2) return 0;
    
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    
    const latestValue = latest.count || latest.votes || latest.amount || 0;
    const previousValue = previous.count || previous.votes || previous.amount || 0;
    
    if (previousValue === 0) return 0;
    
    return ((latestValue - previousValue) / previousValue * 100).toFixed(2);
  }

  // Get top performing users by uploads
  getTopUsersByUploads(limit = 5) {
    return this.stats.closetUploads
      .sort((a, b) => b.uploads - a.uploads)
      .slice(0, limit);
  }
}

export default StatsModel;