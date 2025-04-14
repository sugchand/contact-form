import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const contact = await prisma.contact.create({
        data: { name, email, message },
      });
      res.status(200).json({ success: true, contact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Database error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
