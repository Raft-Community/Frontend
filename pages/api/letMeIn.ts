import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ILetMeIn = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  res.status(200).json(
    postLetMeIn({
      knownServerIp: params.knownServerIp,
      knownServerPort: params.knownServerPort,
      id: params.id,
    })
  );
}

export async function postLetMeIn({
  knownServerIp,
  knownServerPort,
  id,
}: {
  knownServerIp: string;
  knownServerPort: number;
  id: string;
}) {
  if (!id) {
    return {
      error: 'Missing id',
    };
  }
  
  const instance = await prisma.instance.findUnique({
    where: {
      id,
    },
  });
  
  if (!instance) {
    return {
      error: 'Instance not found',
    };
  }
  
  await prisma.elect.create({
    data: {
      creator: {
        connect: {
          id,
        },
      },
      electee: {
        connect: {
          id,
        },
      },
      content: `${instance.name} want to join`,
    }
  });
  
  return {
    error: 'OK',
  };
}
