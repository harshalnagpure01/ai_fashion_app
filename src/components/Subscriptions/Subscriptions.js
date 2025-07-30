import React from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';

const Subscriptions = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Subscription Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Plan</Typography>
              <TextField
                label="Price"
                defaultValue="9.99"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained">Update Pricing</Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Annual Plan</Typography>
              <TextField
                label="Price"
                defaultValue="99.99"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained">Update Pricing</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Subscription Analytics</Typography>
              <Typography>Total Revenue: $12,345.67</Typography>
              <Typography>Active Subscribers: 456</Typography>
              <Typography>Conversion Rate: 12.5%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Subscriptions;