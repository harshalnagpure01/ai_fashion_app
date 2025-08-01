import UserModel from '../models/UserModel.js';

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  // Get all users with pagination
  getAllUsers(page = 1, limit = 10) {
    const users = this.userModel.getAllUsers();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      users: users.slice(startIndex, endIndex),
      totalUsers: users.length,
      totalPages: Math.ceil(users.length / limit),
      currentPage: page
    };
  }

  // Get user details
  getUserDetails(id) {
    const user = this.userModel.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Search users
  searchUsers(query) {
    if (!query || query.trim() === '') {
      return this.userModel.getAllUsers();
    }
    return this.userModel.searchUsers(query);
  }

  // Deactivate user account
  deactivateUser(id) {
    const user = this.userModel.updateUserStatus(id, 'inactive');
    if (!user) {
      throw new Error('User not found');
    }
    return {
      success: true,
      message: 'User account deactivated successfully',
      user
    };
  }

  // Suspend user account
  suspendUser(id) {
    const user = this.userModel.updateUserStatus(id, 'suspended');
    if (!user) {
      throw new Error('User not found');
    }
    return {
      success: true,
      message: 'User account suspended successfully',
      user
    };
  }

  // Activate user account
  activateUser(id) {
    const user = this.userModel.updateUserStatus(id, 'active');
    if (!user) {
      throw new Error('User not found');
    }
    return {
      success: true,
      message: 'User account activated successfully',
      user
    };
  }

  // Delete user account
  deleteUser(id) {
    const user = this.userModel.deleteUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      success: true,
      message: 'User account deleted successfully',
      deletedUser: user
    };
  }

  // Get user activity
  getUserActivity(id) {
    const activity = this.userModel.getUserActivity(id);
    if (!activity) {
      throw new Error('User not found');
    }
    return activity;
  }

  // Get users by status
  getUsersByStatus(status) {
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    return this.userModel.getUsersByStatus(status);
  }

  // Get user statistics
  getUserStatistics() {
    const allUsers = this.userModel.getAllUsers();
    const activeUsers = allUsers.filter(user => user.status === 'active').length;
    const inactiveUsers = allUsers.filter(user => user.status === 'inactive').length;
    const suspendedUsers = allUsers.filter(user => user.status === 'suspended').length;
    const totalUploads = allUsers.reduce((sum, user) => sum + user.uploads, 0);
    const totalPolls = allUsers.reduce((sum, user) => sum + user.polls, 0);
    const totalVotes = allUsers.reduce((sum, user) => sum + user.totalVotes, 0);

    return {
      totalUsers: allUsers.length,
      activeUsers,
      inactiveUsers,
      suspendedUsers,
      totalUploads,
      totalPolls,
      totalVotes,
      averageUploadsPerUser: allUsers.length > 0 ? (totalUploads / allUsers.length).toFixed(2) : 0,
      averagePollsPerUser: allUsers.length > 0 ? (totalPolls / allUsers.length).toFixed(2) : 0
    };
  }

  // Get recently registered users
  getRecentlyRegisteredUsers(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.userModel.getUsersByDateRange(
      cutoffDate.toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    );
  }

  // Get most active users
  getMostActiveUsers(limit = 10) {
    const users = this.userModel.getAllUsers();
    return users
      .sort((a, b) => (b.uploads + b.polls + b.totalVotes) - (a.uploads + a.polls + a.totalVotes))
      .slice(0, limit);
  }

  // Bulk update user status
  bulkUpdateUserStatus(userIds, status) {
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const updatedUsers = [];
    const errors = [];

    userIds.forEach(id => {
      try {
        const user = this.userModel.updateUserStatus(id, status);
        if (user) {
          updatedUsers.push(user);
        } else {
          errors.push(`User with ID ${id} not found`);
        }
      } catch (error) {
        errors.push(`Error updating user ${id}: ${error.message}`);
      }
    });

    return {
      success: errors.length === 0,
      updatedUsers,
      errors,
      message: `${updatedUsers.length} users updated successfully${errors.length > 0 ? `, ${errors.length} errors occurred` : ''}`
    };
  }
}

export default UserController;