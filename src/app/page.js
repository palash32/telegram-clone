'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedChat, setSelectedChat] = React.useState(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ 
        width: isMobile ? '100%' : 360, 
        display: isMobile && selectedChat ? 'none' : 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #E9E9E9'
      }}>
        <ChatList onSelectChat={setSelectedChat} />
      </Box>
      <Box sx={{ 
        flex: 1, 
        display: isMobile && !selectedChat ? 'none' : 'flex',
        flexDirection: 'column'
      }}>
        <ChatWindow 
          chat={selectedChat} 
          onBack={() => setSelectedChat(null)} 
        />
      </Box>
    </Box>
  );
}

export default App;