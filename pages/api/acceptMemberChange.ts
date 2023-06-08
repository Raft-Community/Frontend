import { NextApiRequest, NextApiResponse } from 'next';

export type IAcceptMemberChange = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    postAcceptMemberChange({
      messageId: req.body.messageId,
    })
  );
}

export function postAcceptMemberChange({
  messageId
}: {
  messageId: string;
}) {
  return {
    error: 'OK',
  };
}
