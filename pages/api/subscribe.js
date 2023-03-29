import { subscribeToNewsletter } from '../../lib/mailchimp';

export default async function handler(req, res) {
  const { email } = req.body;

  try {
    await subscribeToNewsletter(email);
    res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
