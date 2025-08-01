import ContentModel from '../models/ContentModel.js';

class ContentController {
  constructor() {
    this.contentModel = new ContentModel();
  }

  // Get all content with pagination
  getAllContent(page = 1, limit = 10) {
    const content = this.contentModel.getAllContent();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      content: content.slice(startIndex, endIndex),
      totalContent: content.length,
      totalPages: Math.ceil(content.length / limit),
      currentPage: page
    };
  }

  // Get flagged content for moderation
  getFlaggedContent() {
    return this.contentModel.getFlaggedContent();
  }

  // Get content by status
  getContentByStatus(status) {
    const validStatuses = ['approved', 'pending', 'flagged', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    return this.contentModel.getContentByStatus(status);
  }

  // Get content by type
  getContentByType(type) {
    const validTypes = ['poll', 'comment'];
    if (!validTypes.includes(type)) {
      throw new Error('Invalid content type');
    }
    return this.contentModel.getContentByType(type);
  }

  // Approve content
  approveContent(id) {
    const content = this.contentModel.updateContentStatus(id, 'approved');
    if (!content) {
      throw new Error('Content not found');
    }
    return {
      success: true,
      message: 'Content approved successfully',
      content
    };
  }

  // Reject content
  rejectContent(id) {
    const content = this.contentModel.updateContentStatus(id, 'rejected');
    if (!content) {
      throw new Error('Content not found');
    }
    return {
      success: true,
      message: 'Content rejected successfully',
      content
    };
  }

  // Remove offensive content
  removeContent(id) {
    const content = this.contentModel.deleteContent(id);
    if (!content) {
      throw new Error('Content not found');
    }
    return {
      success: true,
      message: 'Offensive content removed successfully',
      deletedContent: content
    };
  }

  // Flag content for review
  flagContent(id) {
    const content = this.contentModel.updateContentStatus(id, 'flagged');
    if (!content) {
      throw new Error('Content not found');
    }
    return {
      success: true,
      message: 'Content flagged for review',
      content
    };
  }

  // Search content
  searchContent(query) {
    if (!query || query.trim() === '') {
      return this.contentModel.getAllContent();
    }
    return this.contentModel.searchContent(query);
  }

  // Get content statistics
  getContentStatistics() {
    const stats = this.contentModel.getContentStats();
    const flaggedPercentage = stats.total > 0 ? ((stats.flagged / stats.total) * 100).toFixed(2) : 0;
    const approvalRate = stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(2) : 0;

    return {
      ...stats,
      flaggedPercentage,
      approvalRate
    };
  }

  // Get content by user
  getContentByUser(userId) {
    return this.contentModel.getContentByUser(userId);
  }

  // Get content requiring moderation (flagged + pending)
  getContentRequiringModeration() {
    const flagged = this.contentModel.getContentByStatus('flagged');
    const pending = this.contentModel.getContentByStatus('pending');
    return [...flagged, ...pending].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }

  // Bulk approve content
  bulkApproveContent(contentIds) {
    const approvedContent = [];
    const errors = [];

    contentIds.forEach(id => {
      try {
        const content = this.contentModel.updateContentStatus(id, 'approved');
        if (content) {
          approvedContent.push(content);
        } else {
          errors.push(`Content with ID ${id} not found`);
        }
      } catch (error) {
        errors.push(`Error approving content ${id}: ${error.message}`);
      }
    });

    return {
      success: errors.length === 0,
      approvedContent,
      errors,
      message: `${approvedContent.length} content items approved${errors.length > 0 ? `, ${errors.length} errors occurred` : ''}`
    };
  }

  // Bulk reject content
  bulkRejectContent(contentIds) {
    const rejectedContent = [];
    const errors = [];

    contentIds.forEach(id => {
      try {
        const content = this.contentModel.updateContentStatus(id, 'rejected');
        if (content) {
          rejectedContent.push(content);
        } else {
          errors.push(`Content with ID ${id} not found`);
        }
      } catch (error) {
        errors.push(`Error rejecting content ${id}: ${error.message}`);
      }
    });

    return {
      success: errors.length === 0,
      rejectedContent,
      errors,
      message: `${rejectedContent.length} content items rejected${errors.length > 0 ? `, ${errors.length} errors occurred` : ''}`
    };
  }

  // Get content trends
  getContentTrends(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentContent = this.contentModel.getContentByDateRange(
      cutoffDate.toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    );

    const trendData = {};
    recentContent.forEach(content => {
      const date = content.createdDate;
      if (!trendData[date]) {
        trendData[date] = { polls: 0, comments: 0, total: 0 };
      }
      trendData[date][content.type]++;
      trendData[date].total++;
    });

    return Object.entries(trendData).map(([date, data]) => ({
      date,
      ...data
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Get most reported content
  getMostReportedContent(limit = 10) {
    const content = this.contentModel.getAllContent();
    return content
      .filter(item => item.reports > 0)
      .sort((a, b) => b.reports - a.reports)
      .slice(0, limit);
  }
}

export default ContentController;