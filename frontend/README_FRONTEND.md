
Frontend with Supabase Auth
- copy .env.example -> .env.local and fill VITE_SUPABASE_*
- npm install && npm run dev
- The app uses Supabase Auth for login & session
- Uploads go to serverless /api/upload which requires SUPABASE_SERVICE_ROLE_KEY set in Vercel
