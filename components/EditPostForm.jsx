import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

const EditPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post.frontmatter.title || "");
  const [excerpt, setExcerpt] = useState(post.frontmatter.excerpt || "");
  const [description, setDescription] = useState(post.markdownBody || "");

  const [image, setImage] = useState(post.frontmatter.hero_image || "");
  const [tags, setTags] = useState(post.frontmatter.tags || "");
  console.log(post.frontmatter.hero_image);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onClearForm = () => {
    setTitle("");
    setExcerpt("");
    setDescription("");
    setImage(null);
    setTags("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("tags", tags);
    formData.append("id", post.slug);

    try {
      const response = await axios.post("/api/updatePost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("success");
        onSubmit(formData);

        onClearForm();
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
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
      {image && typeof image === "string" ? (
        <div>
          <img
            src={image}
            alt="Current hero image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : null}
      {/* ... other form fields */}
      <TextField
        label="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditPostForm;
