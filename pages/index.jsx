import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import SearchBar from "../components/SearchBar";
import React, { useState } from "react";

const Index = (props) => {
  const [filteredBlogs, setFilteredBlogs] = useState(props.allBlogs);

  const handleSearch = (filteredBlogs) => {
    setFilteredBlogs(filteredBlogs);
  };

  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <SearchBar allBlogs={props.allBlogs} onSearch={handleSearch} />
        {filteredBlogs.length > 0 ? (
          <BlogList allBlogs={filteredBlogs} />
        ) : (
          <p>No blog posts found.</p>
        )}
      </section>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const postsDirectory = `${process.cwd()}/posts`;
  const fileNames = fs.readdirSync(postsDirectory);
  const allBlogs = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      markdownBody: content,
    };
  });

  return {
    props: {
      allBlogs,
    },
  };
}
