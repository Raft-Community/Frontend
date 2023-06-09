import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { postLetMeIn } from './letMeIn';

const prisma = new PrismaClient();

export type ICreateNode = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.headers);
  const params = JSON.parse(req.body);
  const originIp =
    req.headers['x-forwarded-for'] instanceof Array
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'];
  res.status(200).json(
    await postCreateNewNode({
      port: params.port,
      name: params.name,
      ip: originIp,
    })
  );
}

export async function postCreateNewNode({
  port,
  name,
  ip,
}: {
  port: number | undefined;
  name: string | undefined;
  ip: string | undefined;
}) {
  if (!port || !name || !ip) {
    return {
      error: 'Missing port or name or ip',
    };
  }

  const res = await prisma.instance.create({
    data: {
      name,
      port,
      ip,
    },
  });
  
  await postLetMeIn({
    knownServerIp: 'qwq',
    knownServerPort: 2333,
    id: res.id,
  });

  return {
    error: 'OK',
    id: res.id,
  };
}
