import { NextApiRequest, NextApiResponse } from 'next';

export type IGetHimOut = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    postLetMeIn({
      targetServerIp: req.body.targetServerIp,
      targetServerPort: req.body.targetServerPort,
      targetServerId: req.body.targetServerId,
    })
  );
}

export function postLetMeIn({
  targetServerIp,
  targetServerPort,
  targetServerId,
}: {
  targetServerIp: string;
  targetServerPort: number;
  targetServerId: string;
}) {
  return {
    error: 'OK',
  };
}
