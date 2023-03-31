import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "../styles/BlogList.module.css";
import Image from "next/image";
import Button from "@mui/material/Button";
function truncateSummary(content) {
  return content.slice(0, 200).trimEnd();
}

function reformatDate(fullDate) {
  const date = new Date(fullDate);
  return date.toDateString().slice(4);
}

const BlogList = ({ allBlogs }) => {
  return (
    <ul>
      {allBlogs && allBlogs.length > 0 ? (
        allBlogs.map((post) => (
          <li key={post.slug}>
            <Link
              href={{ pathname: `/posts/${post.slug}` }}
              className={styles.blog__link}
            >
              <div className={styles.hero_image}>
                <Image
                  width={384}
                  height={288}
                  src={post.frontmatter.hero_image}
                  alt={post.frontmatter.hero_image}
                />
              </div>
              <div className={styles.blog__info}>
                <h2>{post.frontmatter.title}</h2>
                <h3>{reformatDate(post.frontmatter.date)}</h3>
                <ReactMarkdown disallowedElements={["a"]}>
                  {truncateSummary(post.markdownBody)}
                </ReactMarkdown>
              </div>
            </Link>
            <Link href={`/posts/edit/${encodeURIComponent(post.slug)}`}>
              <Button variant="contained" color="secondary">
                Edit
              </Button>
            </Link>
          </li>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </ul>
  );
};

export default BlogList;
