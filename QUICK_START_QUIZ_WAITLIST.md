# Quick Start: Quiz + Waitlist Features
## Deploy in 30 Minutes

---

## ⚡ Phase 1: Database (5 min)

1. **Open Supabase** → SQL Editor
2. **Copy/paste** `database-migration.sql`
3. **Click Run**
4. ✅ Verify: "Success. No rows returned"

---

## ⚡ Phase 2: Deploy (10 min)

```bash
cd tessera-amoris-main
git add .
git commit -m "Add quiz and waitlist features"
git push origin main
```

Wait 2-3 minutes for Vercel auto-deploy.

---

## ⚡ Phase 3: Test (15 min)

### Test 1: Quiz
- [ ] Go to `/application.html`
- [ ] Quiz appears automatically
- [ ] Answer all questions
- [ ] Can proceed after passing

### Test 2: Waitlist
- [ ] Submit application
- [ ] Redirects to confirmation
- [ ] Position number animates
- [ ] Email displays

### Test 3: Database
- [ ] Supabase → applications table
- [ ] quiz_score populated
- [ ] quiz_responses has JSON

---

## ✅ Done!

Your platform now has:
- ✅ Pre-screening quiz
- ✅ Waitlist positioning
- ✅ Better quality filtering

**Full docs:** `IMPLEMENTATION_GUIDE.md`

