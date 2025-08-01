import SubscriptionModel from '../models/SubscriptionModel.js';

class SubscriptionController {
  constructor() {
    this.subscriptionModel = new SubscriptionModel();
  }

  // Get all subscriptions with pagination
  getAllSubscriptions(page = 1, limit = 10) {
    const subscriptions = this.subscriptionModel.getAllSubscriptions();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      subscriptions: subscriptions.slice(startIndex, endIndex),
      totalSubscriptions: subscriptions.length,
      totalPages: Math.ceil(subscriptions.length / limit),
      currentPage: page
    };
  }

  // Get subscription statistics
  getSubscriptionStatistics() {
    const stats = this.subscriptionModel.getSubscriptionStats();
    const settings = this.subscriptionModel.getSubscriptionSettings();
    
    return {
      ...stats,
      monthlyPrice: settings.monthlyPrice,
      annualPrice: settings.annualPrice,
      projectedMonthlyRevenue: stats.active * settings.monthlyPrice
    };
  }

  // Get subscriptions by status
  getSubscriptionsByStatus(status) {
    const validStatuses = ['active', 'expired', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid subscription status');
    }
    return this.subscriptionModel.getSubscriptionsByStatus(status);
  }

  // Get subscriptions by plan
  getSubscriptionsByPlan(plan) {
    const validPlans = ['monthly', 'annual'];
    if (!validPlans.includes(plan)) {
      throw new Error('Invalid subscription plan');
    }
    return this.subscriptionModel.getSubscriptionsByPlan(plan);
  }

  // Get subscription earnings
  getSubscriptionEarnings() {
    const earnings = this.subscriptionModel.getSubscriptionEarnings();
    const monthlyEarnings = this.subscriptionModel.getMonthlyEarnings();
    
    // Calculate growth rate
    const growthRate = monthlyEarnings.length >= 2 ? 
      (((monthlyEarnings[monthlyEarnings.length - 1].amount - monthlyEarnings[monthlyEarnings.length - 2].amount) / 
        monthlyEarnings[monthlyEarnings.length - 2].amount) * 100).toFixed(2) : 0;

    return {
      ...earnings,
      monthlyBreakdown: monthlyEarnings,
      growthRate
    };
  }

  // Get subscription settings
  getSubscriptionSettings() {
    return this.subscriptionModel.getSubscriptionSettings();
  }

  // Update subscription pricing
  updateSubscriptionPricing(monthlyPrice, annualPrice) {
    if (monthlyPrice <= 0 || annualPrice <= 0) {
      throw new Error('Subscription prices must be greater than 0');
    }

    this.subscriptionModel.updateMonthlyPrice(monthlyPrice);
    this.subscriptionModel.updateAnnualPrice(annualPrice);

    return {
      success: true,
      message: 'Subscription pricing updated successfully',
      pricing: {
        monthlyPrice,
        annualPrice
      }
    };
  }

  // Update admin account details
  updateAdminAccount(accountDetails) {
    if (!accountDetails.email || !accountDetails.name) {
      throw new Error('Email and name are required');
    }

    const updatedAccount = this.subscriptionModel.updateAdminAccount(accountDetails);
    
    return {
      success: true,
      message: 'Admin account updated successfully',
      account: updatedAccount
    };
  }

  // Cancel subscription
  cancelSubscription(id) {
    const subscription = this.subscriptionModel.cancelSubscription(id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return {
      success: true,
      message: 'Subscription cancelled successfully',
      subscription
    };
  }

  // Reactivate subscription
  reactivateSubscription(id) {
    const subscription = this.subscriptionModel.updateSubscriptionStatus(id, 'active');
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return {
      success: true,
      message: 'Subscription reactivated successfully',
      subscription
    };
  }

  // Search subscriptions
  searchSubscriptions(query) {
    if (!query || query.trim() === '') {
      return this.subscriptionModel.getAllSubscriptions();
    }
    return this.subscriptionModel.searchSubscriptionsByUser(query);
  }

  // Get subscriptions by date range
  getSubscriptionsByDateRange(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('Start date and end date are required');
    }

    const subscriptions = this.subscriptionModel.getSubscriptionsByDateRange(startDate, endDate);
    const totalAmount = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

    return {
      subscriptions,
      summary: {
        count: subscriptions.length,
        totalAmount,
        averageAmount: subscriptions.length > 0 ? (totalAmount / subscriptions.length).toFixed(2) : 0
      }
    };
  }

  // Get subscriptions expiring soon
  getExpiringSoonSubscriptions() {
    const expiringSoon = this.subscriptionModel.getExpiringSoon();
    
    return {
      subscriptions: expiringSoon,
      count: expiringSoon.length,
      urgentCount: expiringSoon.filter(sub => {
        const endDate = new Date(sub.endDate);
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
        return endDate <= threeDaysFromNow;
      }).length
    };
  }

  // Get subscription analytics
  getSubscriptionAnalytics() {
    const stats = this.subscriptionModel.getSubscriptionStats();
    const earnings = this.subscriptionModel.getSubscriptionEarnings();
    const expiringSoon = this.subscriptionModel.getExpiringSoon();
    
    // Calculate retention rate
    const retentionRate = stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(2) : 0;
    
    // Calculate churn rate
    const churnRate = stats.total > 0 ? (((stats.expired + stats.cancelled) / stats.total) * 100).toFixed(2) : 0;

    return {
      overview: stats,
      financials: {
        totalEarnings: earnings.total,
        monthlyRecurring: stats.monthly * this.subscriptionModel.getSubscriptionSettings().monthlyPrice,
        annualRecurring: stats.annual * this.subscriptionModel.getSubscriptionSettings().annualPrice
      },
      metrics: {
        retentionRate,
        churnRate,
        conversionRate: stats.conversionRate,
        expiringSoonCount: expiringSoon.length
      },
      trends: earnings.monthly
    };
  }

  // Apply date filters to earnings
  getEarningsWithDateFilter(startDate, endDate) {
    const earnings = this.subscriptionModel.getMonthlyEarnings();
    
    if (!startDate || !endDate) {
      return earnings;
    }

    return earnings.filter(earning => {
      const earningDate = new Date(earning.date);
      return earningDate >= new Date(startDate) && earningDate <= new Date(endDate);
    });
  }

  // Get subscription revenue forecast
  getRevenuePreview(months = 6) {
    const activeSubscriptions = this.subscriptionModel.getActiveSubscriptions();
    const settings = this.subscriptionModel.getSubscriptionSettings();
    
    const monthlySubscriptions = activeSubscriptions.filter(sub => sub.plan === 'monthly');
    const annualSubscriptions = activeSubscriptions.filter(sub => sub.plan === 'annual');
    
    const monthlyRevenue = monthlySubscriptions.length * settings.monthlyPrice;
    const annualRevenue = annualSubscriptions.length * settings.annualPrice / 12; // Monthly equivalent
    
    const projectedMonthlyRevenue = monthlyRevenue + annualRevenue;
    
    const forecast = [];
    for (let i = 1; i <= months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      
      forecast.push({
        month: date.toISOString().split('T')[0].slice(0, 7),
        projectedRevenue: projectedMonthlyRevenue,
        monthlyPlan: monthlyRevenue,
        annualPlan: annualRevenue
      });
    }

    return {
      currentMonthlyRevenue: projectedMonthlyRevenue,
      forecast,
      assumptions: {
        activeMonthlySubscriptions: monthlySubscriptions.length,
        activeAnnualSubscriptions: annualSubscriptions.length,
        monthlyPrice: settings.monthlyPrice,
        annualPrice: settings.annualPrice
      }
    };
  }

  // Bulk update subscription status
  bulkUpdateSubscriptionStatus(subscriptionIds, status) {
    const validStatuses = ['active', 'cancelled', 'expired'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const updatedSubscriptions = [];
    const errors = [];

    subscriptionIds.forEach(id => {
      try {
        const subscription = this.subscriptionModel.updateSubscriptionStatus(id, status);
        if (subscription) {
          updatedSubscriptions.push(subscription);
        } else {
          errors.push(`Subscription with ID ${id} not found`);
        }
      } catch (error) {
        errors.push(`Error updating subscription ${id}: ${error.message}`);
      }
    });

    return {
      success: errors.length === 0,
      updatedSubscriptions,
      errors,
      message: `${updatedSubscriptions.length} subscriptions updated${errors.length > 0 ? `, ${errors.length} errors occurred` : ''}`
    };
  }
}

export default SubscriptionController;