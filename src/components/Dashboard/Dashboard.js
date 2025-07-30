import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  Poll as PollIcon,
  CloudUpload as CloudUploadIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import api from '../../services/api';

// Overview Cards Component
const OverviewCard = ({ title, value, icon, color, change, changeType }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {change && (
              <Typography 
                variant="body2" 
                color={changeType === 'increase' ? 'success.main' : 'error.main'}
                sx={{ mt: 1 }}
              >
                {changeType === 'increase' ? '↗' : '↘'} {change}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: `${color}.light`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { 
              sx: { color: `${color}.main`, fontSize: 32 } 
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Recent Activity Component
const RecentActivity = ({ activities }) => (
  <Card sx={{ borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Recent Activity
      </Typography>
      <Box>
        {activities?.map((activity) => (
          <Box
            key={activity.id}
            sx={{
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              {activity.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(activity.timestamp).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();

  // Fetch dashboard data
  const { data: overviewData } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: async () => {
      const response = await api.get('/dashboard/overview/');
      return response.data.data;
    },
  });

  const { data: loginTrendsData } = useQuery({
    queryKey: ['login-trends'],
    queryFn: async () => {
      const response = await api.get('/dashboard/login-trends/');
      return response.data.data;
    },
  });

  const { data: votingData } = useQuery({
    queryKey: ['voting-engagement'],
    queryFn: async () => {
      const response = await api.get('/dashboard/voting-engagement/');
      return response.data.data;
    },
  });

  const { data: subscriptionTrends } = useQuery({
    queryKey: ['subscription-trends'],
    queryFn: async () => {
      const response = await api.get('/dashboard/subscription-trends/');
      return response.data.data;
    },
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const response = await api.get('/dashboard/recent-activity/');
      return response.data.data;
    },
  });

  // Chart colors
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Users"
            value={overviewData?.total_users?.toLocaleString() || '0'}
            icon={<PeopleIcon />}
            color="primary"
            change="+12% from last month"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Daily Active Users"
            value={overviewData?.daily_active_users?.toLocaleString() || '0'}
            icon={<TrendingUpIcon />}
            color="success"
            change="+8% from yesterday"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Revenue"
            value={`$${overviewData?.total_revenue?.toFixed(2) || '0.00'}`}
            icon={<AttachMoneyIcon />}
            color="warning"
            change="+15% from last month"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Poll Engagement"
            value={overviewData?.voting_engagement?.toLocaleString() || '0'}
            icon={<ThumbUpIcon />}
            color="secondary"
            change="+22% from last week"
            changeType="increase"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Closet Uploads"
            value={overviewData?.closet_uploads?.toLocaleString() || '0'}
            icon={<CloudUploadIcon />}
            color="info"
            change="+18% from last week"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Total Polls"
            value={overviewData?.poll_count?.toLocaleString() || '0'}
            icon={<PollIcon />}
            color="error"
            change="+9% from last month"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Subscription Revenue"
            value={`$${overviewData?.subscription_revenue?.toFixed(2) || '0.00'}`}
            icon={<AttachMoneyIcon />}
            color="success"
            change="+25% from last month"
            changeType="increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <OverviewCard
            title="Ad Revenue"
            value={`$${overviewData?.ad_revenue?.toFixed(2) || '0.00'}`}
            icon={<TrendingUpIcon />}
            color="primary"
            change="+7% from last month"
            changeType="increase"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Login Trends Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                User Login Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={loginTrendsData?.trends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="logins" 
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      name="Daily Logins"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="new_users" 
                      stroke={theme.palette.secondary.main}
                      strokeWidth={2}
                      name="New Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Voting Categories Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Top Voting Categories
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={votingData?.top_categories || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="votes"
                    >
                      {(votingData?.top_categories || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Subscription Trends */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Subscription Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subscriptionTrends?.trends?.slice(-6) || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="monthly_subscriptions" 
                      fill={theme.palette.primary.main}
                      name="Monthly Subscriptions"
                    />
                    <Bar 
                      dataKey="annual_subscriptions" 
                      fill={theme.palette.secondary.main}
                      name="Annual Subscriptions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <RecentActivity activities={recentActivity} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;