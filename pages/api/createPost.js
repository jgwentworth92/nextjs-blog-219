import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import nextConnect from 'next-connect';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'images'));
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    req.id = id; // Store the generated id in the request object for later use
    cb(null, `${id}.jpg`);
  },
});

const upload = multer({ storage });

const handler = nextConnect();

handler.use((req, res, next) => {
  try {
    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    });
  } catch (multerError) {
    console.error('Error using multer:', multerError);
    res.status(500).json({ message: 'Error using multer', error: multerError });
  }
});

handler.post(async (req, res) => {
  try {
    console.log('Executing form parsing middleware');
    const { title, excerpt, description, tags } = req.body;
    const id = req.id;
    const date = new Date().toISOString().slice(0, 10);

    const postData = `---
id: ${id}
title: '${title}'
date: '${date}'
excerpt: '${excerpt}'
hero_image: '/images/${id}.jpg'
tags: ${JSON.stringify(tags)}
---

${description}
`;

    const filePath = path.join(process.cwd(), 'posts', `${id}.md`);

    try {
      fs.writeFileSync(filePath, postData);
      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create post', error });
    }
  } catch (unhandledError) {
    console.error('Unhandled error in POST handler:', unhandledError);
    res.status(500).json({ message: 'Unhandled error in POST handler', error: unhandledError });
  }
});

export default handler;
