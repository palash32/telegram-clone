import { useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemAvatar, Avatar, 
  ListItemText, Typography, TextField, InputAdornment, CircularProgress, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchChats();
  }, [page]);

  const fetchChats = async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`https://devapi.beyondchats.com/api/get_all_chats?page=${page}`);
      const result = await response.json();
      
      if (result.status === 'success' && result.data.data) {
        setChats(prevChats => [...prevChats, ...result.data.data]);
        setHasMore(page < result.data.last_page);
      } else {
        console.error('Error fetching chats:', result.message);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
    setLoading(false);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const getLastMessage = (chat) => {
    return `${chat.msg_count} messages`;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ m: 1 }}
      />
      <List sx={{ flexGrow: 1, overflowY: 'auto' }} onScroll={handleScroll}>
        {chats.map((chat) => (
          <ListItem 
            key={chat.id} 
            onClick={() => onSelectChat(chat)}
          >
            <ListItemAvatar>
              <Avatar>{chat.creator.name ? chat.creator.name[0] : 'U'}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={chat.creator.name || 'Unknown'}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {getLastMessage(chat)}
                </Typography>
              }
            />
          </ListItem>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </List>
    </Box>
  );
}