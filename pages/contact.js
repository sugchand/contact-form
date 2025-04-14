import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } else {
      const data = await res.json();
      setError(data?.error || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        {submitted && <Alert severity="success">Message sent successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
}
