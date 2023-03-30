import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Card, CardContent, CardMedia, Typography, Box, ListItem } from '@mui/material';

function truncateSummary(content) {
  return content.slice(0, 200).trimEnd();
}

function reformatDate(fullDate) {
  const date = new Date(fullDate);
  return date.toDateString().slice(4);
}

const BlogList = ({ allBlogs }) => {
  return (
    <Box component="ul" sx={{ padding: 0 }}>
      {allBlogs && allBlogs.length > 0 ? (
        allBlogs.map((post) => (
          <ListItem key={post.slug} sx={{ display: 'block', mb: 4 }}>
            <Link href={{ pathname: `/posts/${post.slug}` }} passHref>
         
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    '&:hover .heroImage': {
                      opacity: 0.8,
                    },
                    '&:hover .blogInfo *': {
                      transform: 'translateX(10px)',
                    },
                  }}
                >
                  <CardMedia
                    className="heroImage"
                    component={Image}
                    image={post.frontmatter.hero_image}
                    alt={post.frontmatter.hero_image}
                    width={384}
                    height={288}
                    sx={{
                      objectFit: 'cover',
                      minHeight: { xs: '33vh', sm: 'auto' },
                      minWidth: { xs: '100%', sm: '384px' },
                      height: { xs: '33vh', sm: 'auto' },
                      width: { xs: '100%', sm: '384px' },
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  <CardContent
                    className="blogInfo"
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      padding: '1.5rem 1.25rem',
                      borderBottom: '1px solid #ebebeb',
                      transform: 'translateX(0px)',
                      transition: 'transform 0.3s ease-in',
                    }}
                  >
                    <Typography variant="h5" component="div" gutterBottom sx={{ marginLeft: { sm: '1rem' } }}>
                      {post.frontmatter.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ marginLeft: { sm: '1rem' } }}>
                      {reformatDate(post.frontmatter.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
  <ReactMarkdown>{truncateSummary(post.markdownBody)}</ReactMarkdown>
</Typography>
                  </CardContent>
                </Card>
             
            </Link>
          </ListItem>
        ))
      ) : (
        <Typography variant="h6">No blog posts found.</Typography>
      )}
    </Box>
  );
};

export default BlogList;
