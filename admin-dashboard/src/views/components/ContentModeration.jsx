import React, { useState, useEffect } from 'react';
import ContentController from '../../controllers/ContentController.js';
import { 
  MagnifyingGlassIcon, 
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  FlagIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const ContentModeration = () => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const contentController = new ContentController();

  useEffect(() => {
    loadContent();
    loadStats();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, statusFilter, typeFilter]);

  const loadContent = async () => {
    try {
      const contentData = contentController.getAllContent(1, 100);
      setContent(contentData.content);
      setLoading(false);
    } catch (error) {
      console.error('Error loading content:', error);
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const contentStats = contentController.getContentStatistics();
      setStats(contentStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const filterContent = () => {
    let filtered = content;

    if (searchTerm) {
      filtered = contentController.searchContent(searchTerm);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    setFilteredContent(filtered);
  };

  const handleApproveContent = async (contentId) => {
    try {
      const result = contentController.approveContent(contentId);
      if (result.success) {
        loadContent();
        loadStats();
        alert(result.message);
      }
    } catch (error) {
      alert('Error approving content: ' + error.message);
    }
  };

  const handleRejectContent = async (contentId) => {
    try {
      const result = contentController.rejectContent(contentId);
      if (result.success) {
        loadContent();
        loadStats();
        alert(result.message);
      }
    } catch (error) {
      alert('Error rejecting content: ' + error.message);
    }
  };

  const handleRemoveContent = async (contentId) => {
    if (window.confirm('Are you sure you want to remove this content? This action cannot be undone.')) {
      try {
        const result = contentController.removeContent(contentId);
        if (result.success) {
          loadContent();
          loadStats();
          alert(result.message);
        }
      } catch (error) {
        alert('Error removing content: ' + error.message);
      }
    }
  };

  const handleFlagContent = async (contentId) => {
    try {
      const result = contentController.flagContent(contentId);
      if (result.success) {
        loadContent();
        loadStats();
        alert(result.message);
      }
    } catch (error) {
      alert('Error flagging content: ' + error.message);
    }
  };

  const handleViewContent = (contentItem) => {
    setSelectedContent(contentItem);
    setShowContentModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      flagged: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'poll':
        return <ChartBarIcon className="h-4 w-4 text-blue-600" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="h-4 w-4 text-green-600" />;
      default:
        return <EyeIcon className="h-4 w-4 text-gray-600" />;
    }
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
        <h2 className="text-2xl font-bold text-gray-900">Content Moderation</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <EyeIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.approved || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FlagIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Flagged</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.flagged || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XMarkIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="poll">Polls</option>
              <option value="comment">Comments</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        by {item.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(item.type)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">
                        {item.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.reports > 0 && (
                        <FlagIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${item.reports > 0 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {item.reports}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewContent(item)}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <div className="inline-flex space-x-1">
                      {item.status !== 'approved' && (
                        <button
                          onClick={() => handleApproveContent(item.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                      )}
                      {item.status !== 'rejected' && (
                        <button
                          onClick={() => handleRejectContent(item.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Reject"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      )}
                      {item.status !== 'flagged' && (
                        <button
                          onClick={() => handleFlagContent(item.id)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Flag"
                        >
                          <FlagIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveContent(item.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Remove"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Detail Modal */}
      {showContentModal && selectedContent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Content Details</h3>
                <button
                  onClick={() => setShowContentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{selectedContent.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <span>by {selectedContent.username}</span>
                    <span>•</span>
                    <span>{new Date(selectedContent.createdDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      {getTypeIcon(selectedContent.type)}
                      <span className="ml-1 capitalize">{selectedContent.type}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Content:</h5>
                  <p className="text-gray-700">{selectedContent.content}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadge(selectedContent.status)}`}>
                      {selectedContent.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Reports:</span>
                    <span className={`ml-2 ${selectedContent.reports > 0 ? 'text-red-600 font-medium' : ''}`}>
                      {selectedContent.reports}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Votes:</span>
                    <span className="ml-2">{selectedContent.votes}</span>
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2">{selectedContent.category}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-4 border-t">
                  {selectedContent.status !== 'approved' && (
                    <button
                      onClick={() => {
                        handleApproveContent(selectedContent.id);
                        setShowContentModal(false);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}
                  {selectedContent.status !== 'rejected' && (
                    <button
                      onClick={() => {
                        handleRejectContent(selectedContent.id);
                        setShowContentModal(false);
                      }}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleRemoveContent(selectedContent.id);
                      setShowContentModal(false);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;