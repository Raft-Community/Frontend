import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type IGetHimOut = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  res.status(200).json(
    await postGetHimOut({
      targetServerIp: params.targetServerIp,
      targetServerPort: params.targetServerPort,
      targetServerId: params.targetServerId,
      originServerId: params.originServerId,
    })
  );
}

export async function postGetHimOut({
  targetServerIp,
  targetServerPort,
  targetServerId,
  originServerId,
}: {
  targetServerIp: string;
  targetServerPort: number;
  targetServerId: string;
  originServerId: string;
}) {
  if (!targetServerId || !originServerId) {
    return {
      error: 'Missing targetServerId or originServerId',
    };
  }
  
  const targetInstance = await prisma.instance.findUnique({
    where: {
      id: targetServerId,
    },
  });
  
  const originInstance = await prisma.instance.findUnique({
    where: {
      id: originServerId,
    },
  });
  
  if (!targetInstance || !originInstance) {
    return {
      error: 'Target or origin instance not found',
    };
  }
  
  await prisma.elect.create({
    data: {
      electee: {
        connect: {
          id: targetServerId,
        },
      },
      creator: {
        connect: {
          id: originServerId,
        },
      },
      content: `${originInstance.name} wants to get ${targetInstance.name} out of the cluster`,
    },
  });
  
  return {
    error: 'OK',
  };
}
