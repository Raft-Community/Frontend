import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ICreateNode = {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = JSON.parse(req.body);
  res.status(200).json(
    await postCreateNewNode({
      port: params.port,
      name: params.name,
    })
  );
}

export async function postCreateNewNode({
  port,
  name,
}: {
  port: number | undefined;
  name: string | undefined;
}) {
  if (!port || !name) {
    return {
      error: 'Missing port or name',
    };
  }
  
  const res = await prisma.instance.create({
    data: {
      name,
      port,
      ip: '127.0.0.1',
    }
  });
  
  return {
    error: 'OK',
    id: res.id,
  };
}
