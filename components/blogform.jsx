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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
   
    formData.append('image', image, image.name);
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('description', description);
    formData.append('tags', tags);
    console.log('Form data:', formData);
    const tagsArray = tags.split(',').map((tag) => tag.trim());

    // Append each tag as a separate form data field
    tagsArray.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
  
    console.log('Form data:', formData);
  
    const fileArray = [];
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        fileArray.push(value);
      }
      console.log(`${key}: ${value}`);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post('/api/createPost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });
      console.log('Response:', response); // Add this line
      if (response.status === 200) {
        onSubmit(formData);
        setTitle('');
        setExcerpt('');
        setDescription('');
        setImage(null);
        setTags('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
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
        <InputLabel htmlFor="image">Image</InputLabel>
        <OutlinedInput
          id="image"
          type="file"
          onChange={handleImageChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <PhotoCamera />
              </IconButton>
            </InputAdornment>
          }
          label="Image"
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
