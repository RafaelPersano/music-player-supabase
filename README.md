
Music Player SaaS — Supabase Auth + Storage + OpenAI tags

This package contains a ready starter for a music player SaaS where each user logs in (Supabase Auth)
and can upload/list/play their own tracks. Admin (configured by ADMIN_EMAIL) can view all tracks.

Folders:
- frontend/  -> Vite + React app (client)
- api/       -> serverless functions for Vercel (upload, listTracks, generateTags)
- create_tracks.sql -> SQL to create table and indexes
- .env.example -> env placeholders

Follow instructions in /frontend/README_FRONTEND.md and /api/README_API.md to deploy.

