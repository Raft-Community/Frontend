import { NextApiRequest, NextApiResponse } from 'next';

export type Message = {
  messageId: string;
  content: string;
  type: string; // 'normal' | 'memberChange'
};

export type IGetMessage = {
  error: string;
  message: Message[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getMessage());
}

export function getMessage() {
  return {
    error: 'OK',
    message: [
      {
        messageId: '1',
        content: 'Hello World' + Math.random(),
        type: 'normal',
      },
      {
        messageId: '2',
        content: 'want to join' + Math.random(),
        type: 'memberChange',
      },
      {
        messageId: '3',
        content: 'Goodbye',
        type: 'normal',
      }
    ],
  };
}