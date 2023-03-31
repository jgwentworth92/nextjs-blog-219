import Image from "next/image";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import fs from "fs";
import path from "path";
import Layout from "../../components/Layout";
import styles from "../../styles/Blog.module.css";
import Link from "next/link";

function reformatDate(fullDate) {
  const date = new Date(fullDate);
  return date.toDateString().slice(4);
}

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
  return (
    <Layout>
      <article className={styles.blog}>
        <figure className={styles.blog__hero}>
          <Image
            width="1920"
            height="1080"
            src={frontmatter.hero_image}
            alt={`blog_hero_${frontmatter.title}`}
          />
        </figure>
        <div className={styles.blog__info}>
          <h1>{frontmatter.title}</h1>
          <h3>{reformatDate(frontmatter.date)}</h3>
        </div>
        <div className={styles.blog__body}>
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
        <h2 className={styles.blog__footer}>
          Written By: {frontmatter.author}
        </h2>
      </article>
    </Layout>
  );
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

export async function getStaticProps({ params }) {
  const postsDirectory = `${process.cwd()}/posts`;
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontmatter: data,
      slug: params.slug,
      markdownBody: content,
    },
  };
}
