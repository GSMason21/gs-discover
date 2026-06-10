import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import mailchimp from '@mailchimp/mailchimp_marketing';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mailchimp Configuration
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (MAILCHIMP_API_KEY && MAILCHIMP_SERVER_PREFIX) {
    mailchimp.setConfig({
      apiKey: MAILCHIMP_API_KEY,
      server: MAILCHIMP_SERVER_PREFIX,
    });
  }

  // API Routes
  app.post('/api/subscribe', async (req, res) => {
    const { name, email, title, organization, persona } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
      console.error('Mailchimp environment variables are missing');
      // For demo purposes, we'll simulate success if keys are missing but log the error
      return res.json({ result: 'simulated_success', message: 'Mailchimp keys missing, simulated success' });
    }

    try {
      // 1. Subscribe/Update user in the list
      // We use md5 of lowercase email for the subscriber hash
      const crypto = await import('crypto');
      const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

      const [firstName, ...lastNameParts] = (name || '').split(' ');
      const lastName = lastNameParts.join(' ');

      await mailchimp.lists.setListMember(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
          JOBTITLE: title || '',
          COMPANY: organization || '',
          PERSONA: persona || '',
        },
      });

      // 2. Add Tags
      const tagName = process.env.MAILCHIMP_TAG_NAME || 'Innovation Explorer';
      const personaTag = `Persona: ${persona}`;

      await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
        tags: [
          { name: tagName, status: 'active' },
          { name: personaTag, status: 'active' }
        ],
      });

      res.json({ result: 'success' });
    } catch (error: any) {
      console.error('Mailchimp error:', error.response?.body || error.message);
      res.status(500).json({ 
        error: 'Failed to subscribe to Mailchimp', 
        details: error.response?.body?.detail || error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
