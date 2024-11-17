import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '../assets/action_key.svg';
import { useNavigate } from 'react-router-dom';
const BottomNavigationBar = () => {
  const navigate= useNavigate();
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: 'background.paper',
      borderTop: '1px solid #ddd', // Optional: Adds a separator line at the top of the nav
      boxShadow: 3, // Optional: Adds a subtle shadow at the top
      paddingY: 1, // Adds vertical padding to space out the icons
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <Grid container justifyContent="space-around" alignItems="center">
        {/* Home Icon */}
        <Grid item>
          <IconButton onClick={() => navigate('/home')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <HomeIcon sx={{ fontSize: 26 }}/>
            <Typography variant="caption" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Home
            </Typography>
          </IconButton>
        </Grid>
        
        {/* History Icon */}
        <Grid item>
          <IconButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HistoryIcon sx={{ fontSize: 26 }} />
            <Typography variant="caption" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              History
            </Typography>
          </IconButton>
        </Grid>
        
        {/* Group Icon */}
        <Grid item>
          <IconButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={GroupIcon} alt="Group" style={{ width: '30px', height: '30px' }} />
            {/* <Typography variant="caption" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Group
            </Typography> */}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BottomNavigationBar;
