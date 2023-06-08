import { NextApiRequest, NextApiResponse } from 'next';

export type ILetMeIn = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    postLetMeIn({
      knownServerIp: req.body.knownServerIp,
      knownServerPort: req.body.knownServerPort,
      name: req.body.name,
    })
  );
}

export function postLetMeIn({
  knownServerIp,
  knownServerPort,
  name,
}: {
  knownServerIp: string;
  knownServerPort: number;
  name: string;
}) {
  return {
    error: 'OK',
  };
}
