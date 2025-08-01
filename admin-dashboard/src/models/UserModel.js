import { mockUsers } from '../data/mockData.js';

class UserModel {
  constructor() {
    this.users = [...mockUsers];
  }

  // Get all users
  getAllUsers() {
    return this.users;
  }

  // Get user by ID
  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // Get users by status
  getUsersByStatus(status) {
    return this.users.filter(user => user.status === status);
  }

  // Update user status
  updateUserStatus(id, status) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex].status = status;
      return this.users[userIndex];
    }
    return null;
  }

  // Delete user
  deleteUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
      return deletedUser;
    }
    return null;
  }

  // Get user activity summary
  getUserActivity(id) {
    const user = this.getUserById(id);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        uploads: user.uploads,
        polls: user.polls,
        totalVotes: user.totalVotes,
        lastLogin: user.lastLogin
      };
    }
    return null;
  }

  // Search users by username or email
  searchUsers(query) {
    const searchTerm = query.toLowerCase();
    return this.users.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  // Get users registered in date range
  getUsersByDateRange(startDate, endDate) {
    return this.users.filter(user => {
      const registrationDate = new Date(user.registrationDate);
      return registrationDate >= new Date(startDate) && registrationDate <= new Date(endDate);
    });
  }
}

export default UserModel;