


// pages/api/createPost.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { title, excerpt, description, image, tags } = req.body;
  const id = uuidv4();
  const date = new Date().toISOString().slice(0, 10);

  const postData = `---
id: ${id}
title: '${title}'
date: '${date}'
excerpt: '${excerpt}'
image: '${image}'
tags: ${JSON.stringify(tags)}
---

${description}
`;

  const filePath = path.join(process.cwd(), 'posts', `${id}.md`);

  try {
    fs.writeFileSync(filePath, postData);
    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
}
