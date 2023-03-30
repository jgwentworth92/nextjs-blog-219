import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SearchBar = ({ allBlogs, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    const filteredPosts = allBlogs.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.markdownBody.toLowerCase().includes(query)
    );
    onSearch(filteredPosts);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchBar;
