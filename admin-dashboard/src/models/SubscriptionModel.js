import { mockSubscriptions, mockSubscriptionSettings } from '../data/mockData.js';

class SubscriptionModel {
  constructor() {
    this.subscriptions = [...mockSubscriptions];
    this.settings = { ...mockSubscriptionSettings };
  }

  // Get all subscriptions
  getAllSubscriptions() {
    return this.subscriptions;
  }

  // Get subscription by ID
  getSubscriptionById(id) {
    return this.subscriptions.find(sub => sub.id === id);
  }

  // Get subscriptions by status
  getSubscriptionsByStatus(status) {
    return this.subscriptions.filter(sub => sub.status === status);
  }

  // Get subscriptions by plan type
  getSubscriptionsByPlan(plan) {
    return this.subscriptions.filter(sub => sub.plan === plan);
  }

  // Get active subscriptions
  getActiveSubscriptions() {
    return this.subscriptions.filter(sub => sub.status === 'active');
  }

  // Get expired subscriptions
  getExpiredSubscriptions() {
    return this.subscriptions.filter(sub => sub.status === 'expired');
  }

  // Get subscriptions by date range
  getSubscriptionsByDateRange(startDate, endDate) {
    return this.subscriptions.filter(sub => {
      const subStartDate = new Date(sub.startDate);
      return subStartDate >= new Date(startDate) && subStartDate <= new Date(endDate);
    });
  }

  // Update subscription status
  updateSubscriptionStatus(id, status) {
    const subIndex = this.subscriptions.findIndex(sub => sub.id === id);
    if (subIndex !== -1) {
      this.subscriptions[subIndex].status = status;
      return this.subscriptions[subIndex];
    }
    return null;
  }

  // Cancel subscription
  cancelSubscription(id) {
    const subIndex = this.subscriptions.findIndex(sub => sub.id === id);
    if (subIndex !== -1) {
      this.subscriptions[subIndex].status = 'cancelled';
      return this.subscriptions[subIndex];
    }
    return null;
  }

  // Get subscription settings
  getSubscriptionSettings() {
    return this.settings;
  }

  // Update monthly price
  updateMonthlyPrice(price) {
    this.settings.monthlyPrice = price;
    return this.settings;
  }

  // Update annual price
  updateAnnualPrice(price) {
    this.settings.annualPrice = price;
    return this.settings;
  }

  // Update admin account details
  updateAdminAccount(accountDetails) {
    this.settings.adminAccount = { ...this.settings.adminAccount, ...accountDetails };
    this.settings.adminAccount.lastUpdated = new Date().toISOString().split('T')[0];
    return this.settings.adminAccount;
  }

  // Get subscription earnings
  getSubscriptionEarnings() {
    return this.settings.earnings;
  }

  // Get monthly earnings
  getMonthlyEarnings() {
    return this.settings.earnings.monthly;
  }

  // Calculate total subscription revenue
  calculateTotalRevenue() {
    return this.subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((total, sub) => total + sub.amount, 0);
  }

  // Get subscription statistics
  getSubscriptionStats() {
    const total = this.subscriptions.length;
    const active = this.subscriptions.filter(sub => sub.status === 'active').length;
    const expired = this.subscriptions.filter(sub => sub.status === 'expired').length;
    const cancelled = this.subscriptions.filter(sub => sub.status === 'cancelled').length;
    const monthly = this.subscriptions.filter(sub => sub.plan === 'monthly').length;
    const annual = this.subscriptions.filter(sub => sub.plan === 'annual').length;
    const totalRevenue = this.calculateTotalRevenue();

    return {
      total,
      active,
      expired,
      cancelled,
      monthly,
      annual,
      totalRevenue,
      conversionRate: total > 0 ? ((active / total) * 100).toFixed(2) : 0
    };
  }

  // Search subscriptions by user
  searchSubscriptionsByUser(query) {
    const searchTerm = query.toLowerCase();
    return this.subscriptions.filter(sub => 
      sub.username.toLowerCase().includes(searchTerm) ||
      sub.email.toLowerCase().includes(searchTerm)
    );
  }

  // Get subscriptions expiring soon (within 7 days)
  getExpiringSoon() {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    return this.subscriptions.filter(sub => {
      if (sub.status !== 'active') return false;
      const endDate = new Date(sub.endDate);
      return endDate <= sevenDaysFromNow && endDate >= new Date();
    });
  }

  // Add new subscription
  addSubscription(subscriptionData) {
    const newId = Math.max(...this.subscriptions.map(sub => sub.id)) + 1;
    const newSubscription = {
      id: newId,
      ...subscriptionData,
      status: 'active'
    };
    this.subscriptions.push(newSubscription);
    return newSubscription;
  }
}

export default SubscriptionModel;