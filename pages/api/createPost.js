import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const postsDirectory = path.join(process.cwd(), 'posts');
const writeFile = promisify(fs.writeFile);

export default async function handler(req, res) {
  const { title, content } = req.body;
  const id = uuidv4();

  // Convert the date object to a string in the format "YYYY-MM-DD"
  const date = new Date().toISOString().slice(0, 10);
  const markdownContent = `---
id: ${id}
title: ${title}
date: '${date}'
---

${content}
`;

  try {
    await writeFile(path.join(postsDirectory, `${id}.md`), markdownContent);
    res.status(200).json({ message: 'Post created successfully!', post: { id, title, date } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
