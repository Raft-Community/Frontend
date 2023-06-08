import { NextApiRequest, NextApiResponse } from 'next';

export type IBlogPost = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    postBlogPost({
      blogContent: req.body.blogContent,
      posterId: req.body.posterId,
    })
  );
}

function postBlogPost({
  blogContent,
  posterId,
}: {
  blogContent: string;
  posterId: string;
}) {
  return {
    error: 'OK',
  };
}