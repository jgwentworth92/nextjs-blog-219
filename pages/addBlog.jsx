import Layout from '../components/Layout';

import BlogForm from '../components/blogform';
const  addBlogPosts= () => {
    const handleSubmit = (postData) => {
        // Do something with the post data
      };
  return (
    <Layout>
      <h1>Add Blog Posts!!</h1>
      <p>Please enter details below</p>
      <BlogForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default addBlogPosts;