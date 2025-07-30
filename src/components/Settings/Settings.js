import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Switch, FormControlLabel, TextField, Button, Divider } from '@mui/material';

const Settings = () => {
  const [featureFlags, setFeatureFlags] = useState({
    enableAds: true,
    enableAI: true,
    enablePolling: true
  });

  const [thresholds, setThresholds] = useState({
    outfitRotationDays: 7,
    maxClosetItems: 1000,
    minVotingThreshold: 5
  });

  const handleFeatureFlagChange = (flag) => (event) => {
    setFeatureFlags({ ...featureFlags, [flag]: event.target.checked });
  };

  const handleThresholdChange = (threshold) => (event) => {
    setThresholds({ ...thresholds, [threshold]: event.target.value });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        System Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Feature Flags</Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={featureFlags.enableAds}
                    onChange={handleFeatureFlagChange('enableAds')}
                  />
                }
                label="Enable Advertisements"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={featureFlags.enableAI}
                    onChange={handleFeatureFlagChange('enableAI')}
                  />
                }
                label="Enable AI Recommendations"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={featureFlags.enablePolling}
                    onChange={handleFeatureFlagChange('enablePolling')}
                  />
                }
                label="Enable Outfit Polling"
              />
              
              <Box mt={2}>
                <Button variant="contained">Save Feature Flags</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>System Thresholds</Typography>
              
              <TextField
                label="Outfit Rotation Days"
                type="number"
                value={thresholds.outfitRotationDays}
                onChange={handleThresholdChange('outfitRotationDays')}
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <TextField
                label="Max Closet Items"
                type="number"
                value={thresholds.maxClosetItems}
                onChange={handleThresholdChange('maxClosetItems')}
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <TextField
                label="Min Voting Threshold"
                type="number"
                value={thresholds.minVotingThreshold}
                onChange={handleThresholdChange('minVotingThreshold')}
                fullWidth
                sx={{ mb: 2 }}
              />
              
              <Button variant="contained">Save Thresholds</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>System Status</Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">API Status</Typography>
                  <Typography variant="h6" color="success.main">Healthy</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">Database</Typography>
                  <Typography variant="h6" color="success.main">Connected</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">Firebase</Typography>
                  <Typography variant="h6" color="success.main">Connected</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">Version</Typography>
                  <Typography variant="h6">v1.0.0</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;