import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const AITemplates = () => {
  const mockTemplates = [
    { id: 1, title: 'Casual Day Out', category: 'occasion', text: 'Create a casual outfit for...' },
    { id: 2, title: 'Rainy Weather', category: 'weather', text: 'Suggest clothes for rainy weather...' },
    { id: 3, title: 'Happy Mood', category: 'mood', text: 'Bright and cheerful outfit ideas...' }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          AI Prompt Templates
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Template
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockTemplates.map((template) => (
          <Grid item xs={12} md={6} lg={4} key={template.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{template.title}</Typography>
                <Chip label={template.category} size="small" color="primary" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {template.text}
                </Typography>
                <Box mt={2}>
                  <Button size="small" sx={{ mr: 1 }}>Edit</Button>
                  <Button size="small" color="error">Delete</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AITemplates;