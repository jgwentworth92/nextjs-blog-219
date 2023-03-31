import fs from "fs";
import path from "path";
import nextConnect from "next-connect";
import formidable from "formidable";

const handler = nextConnect();

handler.post(async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Error parsing form data", error: err });
      return;
    }

    const { id, title, excerpt, description, tags } = fields;
    const date = new Date().toISOString().slice(0, 10);

    const postData = `---
id: ${id}
title: '${title}'
date: '${date}'
excerpt: '${excerpt}'
hero_image: '/${id}.jpg'
tags: ${JSON.stringify(tags)}
---

${description}
`;

    const filePath = path.join(process.cwd(), "posts", `${id}.md`);

    try {
      fs.writeFileSync(filePath, postData);

      if (files.image) {
        const image = files.image;
        const imagePath = path.join(process.cwd(), "/public", `${id}.jpg`);
        fs.renameSync(image.filepath, imagePath);
      }

      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update post", error });
    }
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
