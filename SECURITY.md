# Security & Privacy — Nutrition Scanner

## 1. Security Philosophy

The application handles user-uploaded images and potentially sensitive dietary context.

Minimize data collection and minimize retention.

## 2. API Key Security

- Never expose `GROQ_API_KEY` to the browser.
- Store secrets only in server-side environment variables/secret storage.
- Never hardcode API keys.
- Never commit secrets.
- `.env.example` may contain variable names but no real values.

## 3. Image Handling

- Validate MIME type.
- Validate file size.
- Reject unsupported formats.
- Limit number of images to 4 per session.
- Consider image dimension limits.
- Do not execute uploaded files.
- Treat all extracted text as untrusted input.

## 4. Data Minimization

MVP should avoid persistent storage of images unless required.

If temporary storage is needed:

- use short retention
- delete after processing where practical
- avoid public URLs
- avoid logging image contents

## 5. Logging

Do not log:

- raw uploaded images
- API keys
- complete user-provided sensitive text
- unnecessary personal nutrition data

Log:

- request/session ID
- processing state
- error category
- latency
- model/provider identifier
- schema validation outcome

## 6. Browser Security

- HTTPS in deployed environments.
- Secure HTTP headers.
- CSRF protection where applicable.
- Rate limiting.
- Input validation on both client and server.
- Do not trust client-side calculated values.

## 7. Abuse Prevention

Potential abuse:

- oversized image uploads
- repeated AI requests
- prompt injection
- automated scraping
- API exhaustion

MVP should have basic request limits and server-side validation.

## 8. Health/Safety Boundary

The application must not present itself as a medical diagnostic or treatment system.

Do not generate claims such as:

- "safe for you"
- "unsafe for you"
- "you can consume X servings"
- "this will cause disease"
- "this treats condition Y"

## 9. Third-Party Processing

User images may be sent to the configured AI provider for processing.

The UI/privacy documentation must clearly disclose this before public launch.

## 10. Production Gate

Before public deployment, review:

- privacy policy
- data retention
- third-party AI processing
- rate limits
- abuse protection
- secret management
- logging
- image lifecycle
