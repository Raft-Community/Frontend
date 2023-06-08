import { NextApiRequest, NextApiResponse } from 'next';

export type ClusterMember = {
  port: number;
  ip: string;
  name: string;
  id: string;
  status: string; // 'online' | 'pending'
};

export type IGetClusterMember = {
  error: string;
  members: ClusterMember[];
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
        status: 'online',
      },
      {
        name: 'Instance 2',
        ip: '127.0.0.1',
        port: 2334,
        id: '2',
        status: 'online',
      },
      {
        name: 'Instance 3',
        ip: '127.0.0.1',
        port: 2335,
        id: '3',
        status: 'online',
      },
      {
        name: 'Instance 4',
        ip: '127.0.0.1',
        port: 2336,
        id: '4',
        status: 'online',
      },
      {
        name: 'Instance 5' + Math.random(),
        ip: '127.0.0.1',
        port: 2337,
        id: '5',
        status: 'online',
      },
      {
        name: 'Instance 6',
        ip: '127.0.0.1',
        port: Math.floor(Math.random() * 10000),
        id: '6',
        status: 'pending',
      },
    ],
  };
}