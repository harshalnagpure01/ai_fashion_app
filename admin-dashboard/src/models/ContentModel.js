import { mockContent } from '../data/mockData.js';

class ContentModel {
  constructor() {
    this.content = [...mockContent];
  }

  // Get all content
  getAllContent() {
    return this.content;
  }

  // Get content by status
  getContentByStatus(status) {
    return this.content.filter(item => item.status === status);
  }

  // Get content by type (poll, comment)
  getContentByType(type) {
    return this.content.filter(item => item.type === type);
  }

  // Get flagged content (content with reports > 0)
  getFlaggedContent() {
    return this.content.filter(item => item.reports > 0);
  }

  // Update content status
  updateContentStatus(id, status) {
    const contentIndex = this.content.findIndex(item => item.id === id);
    if (contentIndex !== -1) {
      this.content[contentIndex].status = status;
      return this.content[contentIndex];
    }
    return null;
  }

  // Delete content
  deleteContent(id) {
    const contentIndex = this.content.findIndex(item => item.id === id);
    if (contentIndex !== -1) {
      const deletedContent = this.content.splice(contentIndex, 1)[0];
      return deletedContent;
    }
    return null;
  }

  // Report content
  reportContent(id) {
    const contentIndex = this.content.findIndex(item => item.id === id);
    if (contentIndex !== -1) {
      this.content[contentIndex].reports += 1;
      if (this.content[contentIndex].reports >= 3) {
        this.content[contentIndex].status = 'flagged';
      }
      return this.content[contentIndex];
    }
    return null;
  }

  // Get content by user
  getContentByUser(userId) {
    return this.content.filter(item => item.userId === userId);
  }

  // Search content by title or content
  searchContent(query) {
    const searchTerm = query.toLowerCase();
    return this.content.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    );
  }

  // Get content by date range
  getContentByDateRange(startDate, endDate) {
    return this.content.filter(item => {
      const createdDate = new Date(item.createdDate);
      return createdDate >= new Date(startDate) && createdDate <= new Date(endDate);
    });
  }

  // Get content statistics
  getContentStats() {
    const totalContent = this.content.length;
    const approvedContent = this.content.filter(item => item.status === 'approved').length;
    const flaggedContent = this.content.filter(item => item.status === 'flagged').length;
    const pendingContent = this.content.filter(item => item.status === 'pending').length;
    const totalReports = this.content.reduce((sum, item) => sum + item.reports, 0);
    const totalVotes = this.content.reduce((sum, item) => sum + item.votes, 0);

    return {
      total: totalContent,
      approved: approvedContent,
      flagged: flaggedContent,
      pending: pendingContent,
      totalReports,
      totalVotes
    };
  }
}

export default ContentModel;