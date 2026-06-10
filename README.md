# gs-discover

Multi-quiz platform for discover.gettingsmart.com

## URLs
- `discover.gettingsmart.com/innovation-explorer`
- `discover.gettingsmart.com/leadership`
- `discover.gettingsmart.com` → redirects to gettingsmart.com

## Adding a new quiz
1. `cp -r quizzes/leadership quizzes/new-quiz-slug`
2. Edit `quizzes/new-quiz-slug/constants.ts` — update QUIZ_CONFIG, QUESTIONS, PERSONAS
3. Add entry to `vite.config.ts` inputs
4. Add rewrite rule to `vercel.json`
5. Push — Vercel auto-deploys

## Env vars (set in Vercel project settings)
- MAILCHIMP_API_KEY
- MAILCHIMP_SERVER_PREFIX  (e.g. us21)
- MAILCHIMP_AUDIENCE_ID    (e.g. 17bb008ec3)

## Local dev
```bash
npm install
npm run dev
```
