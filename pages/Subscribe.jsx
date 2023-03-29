import Layout from '../components/Layout';
import NewsletterForm from '../components/NewsletterForm';

const Subscribe = () => {
  return (
    <Layout>
      <h1>Subscribe to Our Newsletter</h1>
      <p>Stay up-to-date with our latest news and volunteering opportunities.</p>
      <NewsletterForm />
    </Layout>
  );
};

export default Subscribe;