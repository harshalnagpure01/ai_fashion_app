import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Analytics = () => {
  const pieData = [
    { name: 'Casual', value: 400 },
    { name: 'Formal', value: 300 },
    { name: 'Evening', value: 200 },
    { name: 'Workout', value: 100 }
  ];

  const barData = [
    { month: 'Jan', uploads: 400, polls: 240 },
    { month: 'Feb', uploads: 300, polls: 200 },
    { month: 'Mar', uploads: 500, polls: 300 },
    { month: 'Apr', uploads: 450, polls: 280 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Analytics & Insights
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Outfit Categories</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
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

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Activity</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uploads" fill="#8884d8" />
                    <Bar dataKey="polls" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Key Metrics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="h4">1,234</Typography>
                  <Typography color="text.secondary">Total Uploads</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h4">567</Typography>
                  <Typography color="text.secondary">Active Polls</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h4">89%</Typography>
                  <Typography color="text.secondary">Engagement Rate</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h4">$2,345</Typography>
                  <Typography color="text.secondary">Monthly Revenue</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;