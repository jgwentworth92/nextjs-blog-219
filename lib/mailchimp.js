import fetch from 'isomorphic-unfetch';

const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
const listId = process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID;
const server = apiKey.split('-')[1];
const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`;

export async function subscribeToNewsletter(email) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });

  if (response.status >= 400) {
    throw new Error('Failed to subscribe.');
  }

  return response;
}
