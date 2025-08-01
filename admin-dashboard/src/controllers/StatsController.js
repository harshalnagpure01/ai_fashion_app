import StatsModel from '../models/StatsModel.js';

class StatsController {
  constructor() {
    this.statsModel = new StatsModel();
  }

  // Get dashboard overview statistics
  getDashboardOverview() {
    const summaryStats = this.statsModel.getSummaryStats();
    const dailyLogins = this.statsModel.getDailyLogins();
    const engagement = this.statsModel.getEngagementMetrics();
    const revenue = this.statsModel.getRevenueData();

    // Calculate growth rates
    const loginGrowth = this.statsModel.calculateGrowthRate(dailyLogins);
    const engagementGrowth = this.statsModel.calculateGrowthRate(engagement.dailyEngagement);

    return {
      summary: summaryStats,
      growth: {
        logins: loginGrowth,
        engagement: engagementGrowth
      },
      quickStats: {
        todayLogins: dailyLogins[dailyLogins.length - 1]?.count || 0,
        totalRevenue: revenue.totalRevenue,
        activeUsers: summaryStats.totalUsers,
        totalPolls: engagement.totalPolls
      }
    };
  }

  // Get user activity trends
  getUserActivityTrends(period = 'daily') {
    if (period === 'daily') {
      return this.statsModel.getDailyLogins();
    } else if (period === 'weekly') {
      return this.statsModel.getWeeklyLogins();
    } else {
      throw new Error('Invalid period. Use "daily" or "weekly"');
    }
  }

  // Get engagement metrics
  getEngagementMetrics() {
    const engagement = this.statsModel.getEngagementMetrics();
    const dailyEngagement = this.statsModel.getDailyEngagement();
    
    // Calculate averages
    const avgDailyVotes = dailyEngagement.reduce((sum, day) => sum + day.votes, 0) / dailyEngagement.length;
    const avgDailyComments = dailyEngagement.reduce((sum, day) => sum + day.comments, 0) / dailyEngagement.length;

    return {
      ...engagement,
      averages: {
        dailyVotes: Math.round(avgDailyVotes),
        dailyComments: Math.round(avgDailyComments)
      },
      dailyTrends: dailyEngagement
    };
  }

  // Get closet upload statistics
  getClosetUploadStats() {
    const uploads = this.statsModel.getClosetUploads();
    const topUsers = this.statsModel.getTopUsersByUploads(5);
    const totalUploads = uploads.reduce((sum, user) => sum + user.uploads, 0);
    const averageUploads = uploads.length > 0 ? (totalUploads / uploads.length).toFixed(2) : 0;

    return {
      totalUploads,
      averageUploads,
      topUsers,
      allUsers: uploads.sort((a, b) => b.uploads - a.uploads)
    };
  }

  // Get revenue analytics
  getRevenueAnalytics() {
    const revenue = this.statsModel.getRevenueData();
    const monthlyBreakdown = this.statsModel.getMonthlyRevenueBreakdown();
    
    // Calculate percentages
    const subscriptionPercentage = ((revenue.subscriptionRevenue / revenue.totalRevenue) * 100).toFixed(2);
    const adPercentage = ((revenue.adRevenue / revenue.totalRevenue) * 100).toFixed(2);

    // Calculate growth
    const revenueGrowth = this.statsModel.calculateGrowthRate(monthlyBreakdown);

    return {
      ...revenue,
      percentages: {
        subscription: subscriptionPercentage,
        ads: adPercentage
      },
      monthlyBreakdown,
      growth: revenueGrowth
    };
  }

  // Get filtered statistics by date range
  getStatsByDateRange(startDate, endDate) {
    const userActivity = this.statsModel.getUserActivityByDateRange(startDate, endDate);
    const engagement = this.statsModel.getEngagementByDateRange(startDate, endDate);

    return {
      userActivity,
      engagement,
      summary: {
        totalLogins: userActivity.reduce((sum, day) => sum + day.count, 0),
        totalVotes: engagement.reduce((sum, day) => sum + day.votes, 0),
        totalComments: engagement.reduce((sum, day) => sum + day.comments, 0),
        averageDailyLogins: userActivity.length > 0 ? 
          (userActivity.reduce((sum, day) => sum + day.count, 0) / userActivity.length).toFixed(2) : 0,
        averageDailyEngagement: engagement.length > 0 ? 
          (engagement.reduce((sum, day) => sum + (day.votes + day.comments), 0) / engagement.length).toFixed(2) : 0
      }
    };
  }

  // Get real-time statistics
  getRealTimeStats() {
    const dailyLogins = this.statsModel.getDailyLogins();
    const dailyEngagement = this.statsModel.getDailyEngagement();
    const today = new Date().toISOString().split('T')[0];
    
    const todayLogins = dailyLogins.find(day => day.date === today)?.count || 0;
    const todayEngagement = dailyEngagement.find(day => day.date === today) || { votes: 0, comments: 0 };

    return {
      todayLogins,
      todayVotes: todayEngagement.votes,
      todayComments: todayEngagement.comments,
      totalTodayEngagement: todayEngagement.votes + todayEngagement.comments,
      lastUpdated: new Date().toISOString()
    };
  }

  // Get comparative analytics
  getComparativeAnalytics() {
    const dailyLogins = this.statsModel.getDailyLogins();
    const dailyEngagement = this.statsModel.getDailyEngagement();
    
    if (dailyLogins.length < 2 || dailyEngagement.length < 2) {
      return {
        error: 'Insufficient data for comparison'
      };
    }

    const latest = dailyLogins[dailyLogins.length - 1];
    const previous = dailyLogins[dailyLogins.length - 2];
    const latestEngagement = dailyEngagement[dailyEngagement.length - 1];
    const previousEngagement = dailyEngagement[dailyEngagement.length - 2];

    return {
      logins: {
        current: latest.count,
        previous: previous.count,
        change: latest.count - previous.count,
        changePercentage: previous.count > 0 ? (((latest.count - previous.count) / previous.count) * 100).toFixed(2) : 0
      },
      votes: {
        current: latestEngagement.votes,
        previous: previousEngagement.votes,
        change: latestEngagement.votes - previousEngagement.votes,
        changePercentage: previousEngagement.votes > 0 ? 
          (((latestEngagement.votes - previousEngagement.votes) / previousEngagement.votes) * 100).toFixed(2) : 0
      },
      comments: {
        current: latestEngagement.comments,
        previous: previousEngagement.comments,
        change: latestEngagement.comments - previousEngagement.comments,
        changePercentage: previousEngagement.comments > 0 ? 
          (((latestEngagement.comments - previousEngagement.comments) / previousEngagement.comments) * 100).toFixed(2) : 0
      }
    };
  }

  // Export statistics data
  exportStats(format = 'json') {
    const stats = {
      userActivity: this.statsModel.getUserActivityTrends(),
      engagement: this.statsModel.getEngagementMetrics(),
      closetUploads: this.statsModel.getClosetUploads(),
      revenue: this.statsModel.getRevenueData(),
      summary: this.statsModel.getSummaryStats(),
      exportDate: new Date().toISOString()
    };

    if (format === 'json') {
      return stats;
    } else if (format === 'csv') {
      // Convert to CSV format (simplified)
      return this.convertToCSV(stats);
    } else {
      throw new Error('Invalid export format. Use "json" or "csv"');
    }
  }

  // Helper method to convert stats to CSV
  convertToCSV(stats) {
    const csvData = [];
    
    // Add daily logins
    csvData.push('Daily Logins');
    csvData.push('Date,Count');
    stats.userActivity.dailyLogins.forEach(day => {
      csvData.push(`${day.date},${day.count}`);
    });
    
    csvData.push(''); // Empty line
    
    // Add engagement data
    csvData.push('Daily Engagement');
    csvData.push('Date,Votes,Comments');
    stats.engagement.dailyEngagement.forEach(day => {
      csvData.push(`${day.date},${day.votes},${day.comments}`);
    });

    return csvData.join('\n');
  }
}

export default StatsController;