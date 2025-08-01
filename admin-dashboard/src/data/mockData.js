// Mock data for the admin dashboard

export const mockUsers = [
  {
    id: 1,
    username: "fashionista_jane",
    email: "jane@example.com",
    registrationDate: "2024-01-15",
    lastLogin: "2024-12-20",
    status: "active",
    uploads: 23,
    polls: 12,
    totalVotes: 145,
    profileImage: "https://via.placeholder.com/50"
  },
  {
    id: 2,
    username: "style_guru_alex",
    email: "alex@example.com",
    registrationDate: "2024-02-20",
    lastLogin: "2024-12-19",
    status: "active",
    uploads: 18,
    polls: 8,
    totalVotes: 89,
    profileImage: "https://via.placeholder.com/50"
  },
  {
    id: 3,
    username: "trendy_sarah",
    email: "sarah@example.com",
    registrationDate: "2024-03-10",
    lastLogin: "2024-12-18",
    status: "inactive",
    uploads: 31,
    polls: 15,
    totalVotes: 203,
    profileImage: "https://via.placeholder.com/50"
  },
  {
    id: 4,
    username: "fashion_mike",
    email: "mike@example.com",
    registrationDate: "2024-04-05",
    lastLogin: "2024-12-21",
    status: "suspended",
    uploads: 7,
    polls: 3,
    totalVotes: 25,
    profileImage: "https://via.placeholder.com/50"
  },
  {
    id: 5,
    username: "outfit_queen",
    email: "queen@example.com",
    registrationDate: "2024-05-12",
    lastLogin: "2024-12-20",
    status: "active",
    uploads: 45,
    polls: 22,
    totalVotes: 312,
    profileImage: "https://via.placeholder.com/50"
  }
];

export const mockContent = [
  {
    id: 1,
    type: "poll",
    title: "Summer vs Winter Fashion",
    content: "Which season has better fashion trends?",
    userId: 1,
    username: "fashionista_jane",
    createdDate: "2024-12-20",
    status: "approved",
    reports: 0,
    votes: 45,
    category: "seasonal"
  },
  {
    id: 2,
    type: "comment",
    title: "Inappropriate comment on fashion poll",
    content: "This is an offensive comment that needs review",
    userId: 4,
    username: "fashion_mike",
    createdDate: "2024-12-19",
    status: "flagged",
    reports: 3,
    votes: 0,
    category: "comment"
  },
  {
    id: 3,
    type: "poll",
    title: "Best Casual Outfit",
    content: "Vote for the best casual weekend outfit",
    userId: 3,
    username: "trendy_sarah",
    createdDate: "2024-12-18",
    status: "approved",
    reports: 0,
    votes: 78,
    category: "casual"
  },
  {
    id: 4,
    type: "poll",
    title: "Designer vs Budget Fashion",
    content: "Quality comparison between designer and budget clothing",
    userId: 5,
    username: "outfit_queen",
    createdDate: "2024-12-17",
    status: "pending",
    reports: 1,
    votes: 23,
    category: "comparison"
  }
];

export const mockStats = {
  userActivity: {
    dailyLogins: [
      { date: "2024-12-15", count: 125 },
      { date: "2024-12-16", count: 143 },
      { date: "2024-12-17", count: 156 },
      { date: "2024-12-18", count: 134 },
      { date: "2024-12-19", count: 167 },
      { date: "2024-12-20", count: 189 },
      { date: "2024-12-21", count: 201 }
    ],
    weeklyLogins: [
      { week: "Week 1", count: 890 },
      { week: "Week 2", count: 923 },
      { week: "Week 3", count: 1045 },
      { week: "Week 4", count: 1123 }
    ]
  },
  closetUploads: [
    { userId: 1, username: "fashionista_jane", uploads: 23 },
    { userId: 2, username: "style_guru_alex", uploads: 18 },
    { userId: 3, username: "trendy_sarah", uploads: 31 },
    { userId: 4, username: "fashion_mike", uploads: 7 },
    { userId: 5, username: "outfit_queen", uploads: 45 }
  ],
  engagement: {
    totalVotes: 1247,
    totalPolls: 89,
    totalComments: 456,
    averageVotesPerPoll: 14.2,
    dailyEngagement: [
      { date: "2024-12-15", votes: 45, comments: 23 },
      { date: "2024-12-16", votes: 67, comments: 34 },
      { date: "2024-12-17", votes: 52, comments: 28 },
      { date: "2024-12-18", votes: 78, comments: 41 },
      { date: "2024-12-19", votes: 89, comments: 52 },
      { date: "2024-12-20", votes: 94, comments: 38 },
      { date: "2024-12-21", votes: 103, comments: 47 }
    ]
  },
  revenue: {
    totalRevenue: 15847.50,
    subscriptionRevenue: 12350.00,
    adRevenue: 3497.50,
    monthlyBreakdown: [
      { month: "January", subscription: 2100, ads: 450, total: 2550 },
      { month: "February", subscription: 2300, ads: 520, total: 2820 },
      { month: "March", subscription: 2450, ads: 580, total: 3030 },
      { month: "April", subscription: 2650, ads: 620, total: 3270 }
    ]
  }
};

export const mockSubscriptions = [
  {
    id: 1,
    userId: 1,
    username: "fashionista_jane",
    email: "jane@example.com",
    plan: "monthly",
    amount: 9.99,
    startDate: "2024-11-15",
    endDate: "2024-12-15",
    status: "active",
    paymentMethod: "Credit Card",
    renewalDate: "2024-12-15"
  },
  {
    id: 2,
    userId: 3,
    username: "trendy_sarah",
    email: "sarah@example.com",
    plan: "annual",
    amount: 99.99,
    startDate: "2024-06-10",
    endDate: "2025-06-10",
    status: "active",
    paymentMethod: "PayPal",
    renewalDate: "2025-06-10"
  },
  {
    id: 3,
    userId: 5,
    username: "outfit_queen",
    email: "queen@example.com",
    plan: "monthly",
    amount: 9.99,
    startDate: "2024-12-01",
    endDate: "2025-01-01",
    status: "active",
    paymentMethod: "Credit Card",
    renewalDate: "2025-01-01"
  },
  {
    id: 4,
    userId: 2,
    username: "style_guru_alex",
    email: "alex@example.com",
    plan: "monthly",
    amount: 9.99,
    startDate: "2024-10-20",
    endDate: "2024-11-20",
    status: "expired",
    paymentMethod: "Credit Card",
    renewalDate: "2024-11-20"
  }
];

export const mockSubscriptionSettings = {
  monthlyPrice: 9.99,
  annualPrice: 99.99,
  adminAccount: {
    email: "admin@fashionapp.com",
    name: "Fashion App Admin",
    lastUpdated: "2024-12-01"
  },
  earnings: {
    total: 12350.00,
    monthly: [
      { date: "2024-01", amount: 2100.00, subscribers: 210 },
      { date: "2024-02", amount: 2300.00, subscribers: 230 },
      { date: "2024-03", amount: 2450.00, subscribers: 245 },
      { date: "2024-04", amount: 2650.00, subscribers: 265 },
      { date: "2024-05", amount: 2850.00, subscribers: 285 }
    ]
  }
};