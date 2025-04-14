import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  // Very simple protection with query param (replace with real auth later)
  const { req } = context;

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
  
  const safeContacts = contacts.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(), // convert Date → string
  }));
  
  return { props: { contacts: safeContacts } };
}

export default function Admin({ contacts }) {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Form Submissions
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>{new Date(contact.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
