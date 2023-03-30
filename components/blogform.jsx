import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios'; 

export default function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      title,
      excerpt,
      description,
      image,
      tags: tags.split(',').map((tag) => tag.trim()),
    };
  
    try {
      const response = await axios.post('/api/createPost', postData);
      if (response.status === 200) {
        onSubmit(postData);
        setTitle('');
        setExcerpt('');
        setDescription('');
        setImage('');
        setTags('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        margin="normal"
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="image">Image URL</InputLabel>
        <OutlinedInput
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <PhotoCamera />
              </IconButton>
            </InputAdornment>
          }
          label="Image URL"
        />
      </FormControl>
      <TextField
        label="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Create Post
      </Button>
    </Box>
  );
}
