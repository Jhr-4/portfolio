# Contact Form and Email API Implementation

This document details the implementation of the contact form and email API for the portfolio.

## Email API Integration (`@emailjs/nodejs`)

A new email API is implemented using the `@emailjs/nodejs` library to securely send emails from the server (used in the contact form).

**API Route:** `/api/email/send` (`src/app/api/email/send/route.ts`)

- Accepts POST requests with `name`, `email`, `subject`, and `message` fields.
- Validates all fields, checks email format, and enforces a minimum message length.
- Uses `emailjs.send` with credentials from environment variables.
- Returns a JSON response indicating success or error.

**Frontend Usage Example:**
```js
await fetch('/api/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message }),
});
```

**Required Environment Variables:**
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PRIVATE_API_KEY`
- `EMAILJS_PUBLIC_API_KEY`

This approach keeps sensitive keys server-side and ensures secure, reliable email delivery for contact forms.
