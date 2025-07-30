import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Notifications = () => {
  const [notificationData, setNotificationData] = useState({
    title: '',
    body: '',
    target_type: 'all'
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Push Notifications
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Send Notification</Typography>
          
          <TextField
            label="Title"
            fullWidth
            value={notificationData.title}
            onChange={(e) => setNotificationData({...notificationData, title: e.target.value})}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Message"
            multiline
            rows={3}
            fullWidth
            value={notificationData.body}
            onChange={(e) => setNotificationData({...notificationData, body: e.target.value})}
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Target</InputLabel>
            <Select
              value={notificationData.target_type}
              onChange={(e) => setNotificationData({...notificationData, target_type: e.target.value})}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="active">Active Users</MenuItem>
              <MenuItem value="premium">Premium Users</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="contained" size="large">
            Send Notification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Notification History</Typography>
          <Typography variant="body2" color="text.secondary">
            Recent notifications will appear here...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notifications;