import { NextApiRequest, NextApiResponse } from 'next';

export type IGetClusterMember = {
  error: string;
  members: {
    port: number;
    ip: string;
    name: string;
    id: string;
  }[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getCluster());
}

export function getCluster() {
  return {
    error: 'OK',
    members: [
      {
        name: 'Instance 1',
        ip: '127.0.0.1',
        port: 2333,
        id: '1',
      },
      {
        name: 'Instance 2',
        ip: '127.0.0.1',
        port: 2334,
        id: '2',
      },
      {
        name: 'Instance 3',
        ip: '127.0.0.1',
        port: 2335,
        id: '3',
      },
      {
        name: 'Instance 4',
        ip: '127.0.0.1',
        port: 2336,
        id: '4',
      },
      {
        name: 'Instance 5',
        ip: '127.0.0.1',
        port: 2337,
        id: '5',
      },
      {
        name: 'Instance 6',
        ip: '127.0.0.1',
        port: 2338,
        id: '6',
      },
    ],
  };
}