# Contact Email (Resend) Setup

This portfolio uses `Resend` in `app/api/contact/route.ts` to deliver contact form emails.

## 1) Create your local env file

Copy `env.local.example` to `.env.local` and fill in real values:

```bash
cp env.local.example .env.local
```

Required variables:

- `RESEND_API_KEY`: your Resend API key (`re_...`)
- `CONTACT_TO`: where contact form emails should be delivered (comma-separated for multiple recipients)
- `CONTACT_FROM`: sender address, for example `Portfolio <hello@yourdomain.com>`

## 2) Verify your sender domain in Resend

- Add and verify your domain in Resend (DNS records).
- Use a `CONTACT_FROM` address from that verified domain.
- `onboarding@resend.dev` is good for initial local testing only.

## 3) Run and test locally

```bash
npm run dev
```

Submit the contact form from the site and confirm:

- the API route returns success
- the email arrives at `CONTACT_TO`
- Reply in your inbox goes to the visitor email (via `replyTo`)
