import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type IBlogPost = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  res.status(200).json(
    await postBlogPost({
      blogContent: params.blogContent,
      posterId: params.posterId,
    })
  );
}

async function postBlogPost({
  blogContent,
  posterId,
}: {
  blogContent: string;
  posterId: string;
}) {
  if (!blogContent || !posterId) {
    return {
      error: 'Missing blogContent or posterId',
    };
  }
  await prisma.blog.create({
    data: {
      content: blogContent,
      author: {
        connect: {
          id: posterId,
        },
      },
    },
  });
  return {
    error: 'OK',
  };
}