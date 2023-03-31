import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import EditPostForm from "../../../components/EditPostForm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../../../components/Layout";
import Toast from "../../../components/Toast";
import React, { useState } from "react";
const EditPostPage = ({ post }) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const handlePostUpdate = () => {
    setShowToast(true);
  };
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <EditPostForm post={post} onSubmit={handlePostUpdate} />
      <Toast
        open={showToast}
        handleClose={handleToastClose}
        message="Post updated successfully!"
        severity="success"
      />
    </Layout>
  );
};

export default EditPostPage;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      post: {
        slug,
        frontmatter: data,
        markdownBody: content,
      },
    },
  };
}

export async function getStaticPaths() {
  const postsDirectory = `${process.cwd()}/posts`;
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    console.log(slug);
    return {
      params: {
        slug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false, // Return a 404 page if a path is not found
  };
}
