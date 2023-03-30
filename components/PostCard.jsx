import React, { useState } from 'react';
import { styled } from '@mui/system';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';

const StyledArticle = styled('article')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: '800px', // set max width to limit to one column
  width: '100%', // set width to ensure it takes full width of parent container
  margin: '0 auto', // center horizontally
}));

export default function PostCard({ post }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledArticle>
        <Typography component="h2" variant="h5">
          {post.title}
        </Typography>
        <Typography component="div" variant="body1" dangerouslySetInnerHTML={{ __html: post.description && parse(post.description) }}>
        </Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Read More
        </Button>
      </StyledArticle>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>{post.title}</DialogTitle>
        <DialogContent dividers>
          <StyledArticle>
            <Typography gutterBottom variant="subtitle1" color="text.secondary">
              {post.excerpt}
            </Typography>
            <img src={post.image} alt={post.title} />
            <Typography component="div" variant="body1" dangerouslySetInnerHTML={{ __html: post.description && parse(post.description) }}>
            </Typography>
            <Link href={`/posts/${post.id}`} passHref>
              <Button variant="contained" color="primary" onClick={handleClose}>
                View Full Post
              </Button>
            </Link>
          </StyledArticle>
        </DialogContent>
      </Dialog>
    </>
  );
}
