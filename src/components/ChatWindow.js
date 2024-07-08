import { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, TextField, CircularProgress, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

export default function ChatWindow({ chat, onBack }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat) {
      fetchMessages();
    }
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`);
      const result = await response.json();
      if (result.status === 'success' && result.data) {
        setMessages(result.data);
      } else {
        console.error('Error fetching messages:', result.message);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  if (!chat) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%' 
      }}>
        <Typography variant="h6">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'primary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}>
        <IconButton color="inherit" onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">{chat.creator.name || 'Chat'}</Typography>
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          messages.map((message) => (
            <Box 
              key={message.id} 
              sx={{ 
                display: 'flex', 
                justifyContent: message.sender_id === 1 ? 'flex-start' : 'flex-end',
                mb: 2 
              }}
            >
              <Box 
                sx={{ 
                  maxWidth: '70%', 
                  backgroundColor: message.sender_id === 1 ? 'primary.light' : 'secondary.light',
                  borderRadius: 2,
                  p: 1
                }}
              >
                <Typography variant="body1">{message.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(message.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
}