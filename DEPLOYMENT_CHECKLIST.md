# Tessera Amoris - Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Preparation
- [x] Vercel configuration file created (`vercel.json`)
- [x] Package.json with dependencies added
- [x] API endpoints created (`/api/submit-application.js`, `/api/upload-photo.js`)
- [x] Production JavaScript added (`js/application-production.js`)
- [x] .gitignore file created
- [x] .env.example template created
- [x] README.md with instructions created

### Required Accounts
- [ ] GitHub account created
- [ ] Vercel account created (sign up at vercel.com)
- [ ] Supabase account created (sign up at supabase.com)

---

## 📝 Step-by-Step Deployment Guide

### Phase 1: Setup Supabase (15 minutes)

#### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if first time)
4. Click "New project"
5. Fill in:
   - **Name:** tessera-amoris
   - **Database Password:** (create a strong password - save it!)
   - **Region:** Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for setup

#### 1.2 Run Tessera Amoris Schema Script
1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Upload or paste the contents of [`supabase-schema.sql`](supabase-schema.sql)
4. Click "Run" (or press Cmd/Ctrl + Enter) and wait for the "Success" message

The script provisions everything the code expects:
- `applications` table (with quiz + reference columns)
- `expansion_interests` table for the global waitlist form
- Helpful analytics views and helper functions
- Row Level Security policies so the anonymous key can insert through the serverless APIs
- `verification-photos` storage bucket with upload/read/delete policies

#### 1.3 (Optional) Verify Resources
If you want to double-check the results:
- **Tables:** SQL Editor → run `SELECT * FROM applications LIMIT 1;`
- **Views:** SQL Editor → run `SELECT * FROM quiz_analytics;`
- **Storage:** Storage → confirm `verification-photos` bucket exists and is marked Public

#### 1.4 Get API Credentials
1. Go to **Settings** → **API** (left sidebar)
2. Copy these values (you'll need them for Vercel):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

✅ **Supabase setup complete!**

---

### Phase 2: Push to GitHub (10 minutes)

#### 2.1 Initialize Git Repository
Open terminal in your project folder and run:

```bash
cd /path/to/tessera_production

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Tessera Amoris production ready"
```

#### 2.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Fill in:
   - **Repository name:** tessera-amoris
   - **Description:** Tessera Amoris - International Matchmaking Platform
   - **Visibility:** Private (recommended) or Public
4. **DO NOT** check "Initialize with README" (we already have one)
5. Click "Create repository"

#### 2.3 Push to GitHub
Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/yourusername/tessera-amoris.git
git branch -M main
git push -u origin main
```

✅ **Code is now on GitHub!**

---

### Phase 3: Deploy to Vercel (10 minutes)

#### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easiest)
4. Authorize Vercel to access your GitHub

#### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Find "tessera-amoris" in the list
3. Click "Import"

#### 3.3 Configure Project
1. **Framework Preset:** Select "Other" (it's a static site)
2. **Root Directory:** Leave as "./"
3. **Build Command:** Leave empty
4. **Output Directory:** Leave empty

#### 3.4 Add Environment Variables
Click "Environment Variables" and add these:

| Name | Value |
|:-----|:------|
| `SUPABASE_URL` | (paste from Supabase Settings → API) |
| `SUPABASE_ANON_KEY` | (paste from Supabase Settings → API) |

Make sure to add them for:
- ✅ Production
- ✅ Preview
- ✅ Development

#### 3.5 Deploy
1. Click "Deploy"
2. Wait 1-2 minutes
3. You'll see "Congratulations!" when done

✅ **Your site is now LIVE!**

---

### Phase 4: Test Your Deployment (15 minutes)

#### 4.1 Access Your Site
1. Click "Visit" in Vercel dashboard
2. Your URL will be: `https://tessera-amoris.vercel.app`

#### 4.2 Test Homepage
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] "APPLY" button works

#### 4.3 Test Application Form
- [ ] Form loads
- [ ] All sections navigate correctly
- [ ] Fill out a test application
- [ ] Upload a test photo
- [ ] Submit form
- [ ] Success message appears

#### 4.4 Verify in Supabase
1. Go to Supabase dashboard
2. Click **Table Editor** → **applications**
3. You should see your test application!
4. Go to **Storage** → **verification-photos**
5. You should see your test photo!

✅ **Everything works!**

---

## 🎉 Post-Deployment Tasks

### Add Custom Domain (Optional)
1. Buy a domain (e.g., tesseraamoris.com)
2. In Vercel dashboard, go to **Settings** → **Domains**
3. Click "Add"
4. Enter your domain
5. Follow DNS instructions
6. Wait 24 hours for propagation

### Setup Email Notifications (Optional)
1. Sign up for [Resend](https://resend.com) (free tier: 100 emails/day)
2. Get API key
3. Add to Vercel environment variables: `RESEND_API_KEY`
4. Create `/api/send-notification.js` endpoint

### Monitor Your Site
- **Vercel Analytics:** Dashboard → Analytics
- **Supabase Logs:** Dashboard → Logs
- **Application Stats:** Dashboard → Table Editor

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" error when submitting form

**Solution:**
1. Check Vercel environment variables are set correctly
2. Verify Supabase URL and key are correct
3. Check browser console for specific error

### Issue: Photos not uploading

**Solution:**
1. Verify storage bucket "verification-photos" exists
2. Check storage policies are set
3. Verify file is under 5MB
4. Check file type is JPEG, PNG, or WebP

### Issue: Form submission works but no data in Supabase

**Solution:**
1. Check SQL table was created correctly
2. Verify table name is "applications" (lowercase)
3. Check Supabase logs for errors

### Issue: Site loads but styles are broken

**Solution:**
1. Check all CSS files are in the `css/` folder
2. Verify paths in HTML are correct (relative paths)
3. Clear browser cache and reload

---

## 📊 What's Next?

### Immediate
- [ ] Test form submission thoroughly
- [ ] Fill out test applications
- [ ] Share URL with team for feedback

### Short Term (1-2 weeks)
- [ ] Add custom domain
- [ ] Setup email notifications
- [ ] Create admin dashboard for reviewing applications
- [ ] Add analytics tracking

### Long Term
- [ ] Implement applicant login
- [ ] Add status tracking
- [ ] Create matching algorithm
- [ ] Build messaging system

---

## 💰 Cost Tracking

### Current (Free Tier)
- Vercel: $0/month
- Supabase: $0/month
- **Total: $0/month**

### When to Upgrade
- **Vercel:** When you exceed 100GB bandwidth/month
- **Supabase:** When you exceed 500MB database or 1GB storage

---

## 📞 Support

### Vercel Issues
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Supabase Issues
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support

### Code Issues
- Check browser console (F12)
- Check Vercel function logs
- Check Supabase logs

---

**🎊 Congratulations! Your platform is live and ready to connect hearts across continents!**

