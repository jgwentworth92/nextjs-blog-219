import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import EditPostForm from "../../../components/EditPostForm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../../../components/Layout";
const EditPostPage = ({ post }) => {
  const router = useRouter();

  const handlePostUpdate = () => {
    router.push(`/posts/${post.slug}`);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <EditPostForm post={post} onSubmit={handlePostUpdate} />
    </Layout>
  );
};

export default EditPostPage;

export async function getServerSideProps({ params }) {
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
