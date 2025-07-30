import React from 'react';
import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const ContentModeration = () => {
  const { data: flaggedContent } = useQuery({
    queryKey: ['flagged-content'],
    queryFn: async () => {
      const response = await api.get('/content/flagged/');
      return response.data.data;
    },
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Content Moderation
      </Typography>
      
      {flaggedContent?.polls?.map((content) => (
        <Card key={content.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6">{content.title || 'Flagged Content'}</Typography>
                <Chip label={content.type} size="small" color="warning" />
              </Box>
              <Box>
                <Button color="success" sx={{ mr: 1 }}>Approve</Button>
                <Button color="error">Remove</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ContentModeration;