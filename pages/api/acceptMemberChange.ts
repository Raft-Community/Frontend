import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type IAcceptMemberChange = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = JSON.parse(req.body);
  res.status(200).json(
    await postAcceptMemberChange({
      messageId: params.messageId,
      id: params.id,
    })
  );
}

export async function postAcceptMemberChange({
  messageId,
  id,
}: {
  messageId: string | null;
  id: string | null;
}) {
  if (!messageId || !id) {
    return {
      error: 'Missing electId or voterId',
    };
  }

  await prisma.vote.create({
    data: {
      electId: messageId,
      voterId: id,
    },
  });

  return {
    error: 'OK',
  };
}
