# Tessera Amoris - Production Deployment

**Where Continents Connect, Legacies Begin**

An exclusive international matchmaking platform connecting purpose-driven individuals between Paraguay and Europe.

---

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tessera-amoris)

---

## 📋 Prerequisites

Before deploying, you need:

1. **GitHub Account** - To store your code
2. **Vercel Account** - To host the website (free tier available)
3. **Supabase Account** - For database and file storage (free tier available)

---

## 🛠️ Setup Instructions

### Step 1: Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of [`supabase-schema.sql`](supabase-schema.sql). This single script will:
   - Create the `applications` table with every column referenced by the application and quiz flows
   - Create the `expansion_interests` table used by the expansion waitlist form
   - Provision helper views/functions for analytics (`quiz_analytics`, `waitlist_positions`, `get_application_position`, `expansion_interest_analytics`, `get_expansion_priorities`)
   - Enable Row Level Security (RLS) with policies that allow the anonymous API key to insert records while preserving admin-only access for updates
   - Create the public `verification-photos` storage bucket and matching policies so `/api/upload-photo` can store verification images

> **Tip:** you can upload the file directly via Supabase → **SQL Editor** → **New query** → **Upload file**, or copy/paste the script contents from your local clone.

4. Go to **Settings** → **API** and copy:
   - Project URL (SUPABASE_URL)
   - anon/public key (SUPABASE_ANON_KEY)

### Step 2: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Tessera Amoris platform"

# Add remote repository
git remote add origin https://github.com/yourusername/tessera-amoris.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Add environment variables:
   - `SUPABASE_URL` = (from Supabase)
   - `SUPABASE_ANON_KEY` = (from Supabase)
5. Click **"Deploy"**

**Done!** Your site will be live at `https://tessera-amoris.vercel.app`

---

## 🔧 Environment Variables

Create a `.env` file (for local development) with:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**For Vercel:** Add these in the Vercel dashboard under **Settings** → **Environment Variables**

---

## 📁 Project Structure

```
tessera-amoris/
├── api/                      # Vercel Serverless Functions
│   ├── submit-application.js # Handle form submissions
│   └── upload-photo.js       # Handle photo uploads
├── css/                      # Stylesheets
├── images/                   # Static images
├── js/                       # Frontend JavaScript
├── index.html                # Homepage
├── application.html          # Application form
├── contact.html              # Contact page
├── our-vision.html           # Vision page
├── the-process.html          # Process page
├── who-we-serve.html         # Target audience page
├── resources.html            # Resources page
├── package.json              # Dependencies
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

---

## 🔐 Security Features

✅ HTTPS encryption (automatic via Vercel)  
✅ CORS protection  
✅ Input validation  
✅ File type restrictions  
✅ File size limits (5MB max)  
✅ SQL injection prevention (Supabase)  
✅ XSS protection headers  

---

## 📊 Admin Dashboard

Access your Supabase dashboard to:

- View all applications
- Filter and search applicants
- See uploaded photos
- Export data to CSV/Excel
- Manage application status

**URL:** `https://app.supabase.com/project/your-project-id`

---

## 💰 Cost

### Free Tier (Sufficient for Launch)

- **Vercel:** Free (100GB bandwidth/month)
- **Supabase:** Free (500MB database, 1GB storage)
- **Total:** $0/month

### Paid Tier (When You Scale)

- **Vercel Pro:** $20/month
- **Supabase Pro:** $25/month
- **Total:** $45/month

---

## 🆘 Troubleshooting

### Forms not submitting?

1. Check Vercel environment variables are set
2. Check Supabase database table exists
3. Check browser console for errors

### Photos not uploading?

1. Check Supabase storage bucket exists
2. Check storage policies are set
3. Verify file size is under 5MB

### Need help?

Check the logs:
- **Vercel:** Dashboard → Your Project → Functions → Logs
- **Supabase:** Dashboard → Logs

---

## 📝 License

MIT License - Feel free to use and modify

---

## 🤝 Support

For questions or issues, contact: admin@tesseraamoris.com

---

**Built with ❤️ for connecting hearts across continents**

 
