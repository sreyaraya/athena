import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, /*getUser, updateMessage, deleteMessage*/} from './database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
      const content = req.body.email;
      const insertedId = await createUser("hi");
      //const insertedId = await createUser(req.body.email, req.body.username, req.body.resume);
      res.status(200).json({ id: insertedId });
      return;
      }
      catch (err)
      {
        res.status(600).json({ error: 'failed to load data' })
        return;
      }
    // case 'GET':
    //   const messageId = String(req.query.email)
    //   const message = await getUser(messageId);
    //   res.status(200).json(message);
    //   break;
    // case 'PUT':
    //   const { id, newContent } = req.body;
    //   const updatedMessage = await updateMessage(id, newContent);
    //   res.status(200).json(updatedMessage);
    //   break;
    // case 'DELETE':
    //   const deleteId = parseInt(req.query.id as string);
    //   await deleteMessage(deleteId);
    //   res.status(200).json({ success: true });
    //   break;
    default:
      //res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
