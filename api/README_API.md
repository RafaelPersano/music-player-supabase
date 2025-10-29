
API for Vercel functions.

Endpoints:
- POST /api/upload -> multipart/form-data; fields: file, title, artist, genre, user_id
- GET  /api/listTracks?user_id=<user_id> -> lists tracks for given user
- POST /api/generateTags -> {title,artist,genre,excerpt} -> returns tags/description

Environment Variables (set in Vercel project settings):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (secret)
- OPENAI_API_KEY (secret)
- OPENAI_MODEL (optional)
- ADMIN_EMAIL (optional)
