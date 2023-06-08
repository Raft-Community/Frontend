import { NextApiRequest, NextApiResponse } from 'next';

export type ICreateNode = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    postCreateNewNode({
      port: req.body.port,
      name: req.body.name,
    })
  );
}

export function postCreateNewNode({
  port,
  name,
}: {
  port: number;
  name: string;
}) {
  return {
    error: 'OK',
  };
}
