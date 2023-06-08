import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Message = {
  messageId: string;
  content: string | null;
  type: string; // 'normal' | 'memberChange'
};

export type IGetMessage = {
  error: string;
  message: Message[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getMessage());
}

export async function getMessage() {
  const blogs = await prisma.blog.findMany();
  const elects = await prisma.elect.findMany();
  return {
    error: 'OK',
    message: [
      ...blogs.map((blog) => ({
        messageId: blog.id,
        content: blog.content,
        type: 'normal',
      })),
      ...elects.map((elect) => ({
        messageId: elect.id,
        content: elect.content,
        type: 'memberChange',
      })),
    ],
  };
}
