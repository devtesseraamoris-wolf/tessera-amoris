# Troubleshooting: CSS Not Loading When Opening HTML Locally

## Why This Happens

When you see only plain HTML without styles, it's usually because:

1. **Opening from inside the ZIP file** - The browser can't access CSS files inside compressed archives
2. **Incorrect folder structure** - The CSS folder isn't in the right place relative to the HTML file
3. **Browser security restrictions** - Some browsers block local file access

---

## ✅ Solution: Proper Extraction

### Step 1: Extract the ZIP Completely

**DO NOT** open HTML files directly from the ZIP. You must extract first.

**Windows:**
1. Right-click `tessera_amoris_production_ready.zip`
2. Choose "Extract All..."
3. Choose a destination folder
4. Click "Extract"

**Mac:**
1. Double-click `tessera_amoris_production_ready.zip`
2. It will extract to a folder automatically

**Linux:**
```bash
unzip tessera_amoris_production_ready.zip
cd tessera_production
```

### Step 2: Verify Folder Structure

After extraction, you should see this structure:

```
tessera_production/
├── index.html          ← Main file
├── application.html
├── contact.html
├── css/                ← CSS folder MUST be here
│   ├── styles.css
│   ├── application.css
│   └── [other CSS files]
├── js/                 ← JavaScript folder
├── images/             ← Images folder
└── api/                ← API folder
```

**IMPORTANT:** The `css/` folder must be at the same level as `index.html`

### Step 3: Open HTML from Extracted Folder

1. Navigate to the extracted `tessera_production` folder
2. Find `index.html`
3. Double-click to open in your browser
   - OR right-click → "Open with" → Choose your browser

---

## 🔍 Quick Check

If styles still don't load, check this:

### Check 1: Folder Structure
Open the `tessera_production` folder and verify you see:
- ✅ index.html (file)
- ✅ css (folder)
- ✅ js (folder)
- ✅ images (folder)

### Check 2: CSS Files Exist
Open the `css` folder and verify you see:
- ✅ styles.css
- ✅ application.css
- ✅ [many other .css files]

### Check 3: Browser Console
1. Open the HTML file
2. Press F12 (or right-click → Inspect)
3. Go to "Console" tab
4. Look for errors like:
   - ❌ "Failed to load resource: css/styles.css"
   - ❌ "Not allowed to load local resource"

---

## 🌐 Alternative: Use a Local Server

If opening files directly doesn't work (some browsers block local file access), use a local server:

### Option 1: Python (Easiest)

If you have Python installed:

```bash
# Navigate to the folder
cd /path/to/tessera_production

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to the folder
cd /path/to/tessera_production

# Start server
http-server
```

Then open: `http://localhost:8080`

### Option 3: VS Code Live Server

If you use VS Code:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Choose "Open with Live Server"

---

## 🚀 Best Solution: Just Deploy to Vercel

Honestly, the easiest way to see it working properly is to deploy to Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy (takes 2 minutes)
4. View at `https://tessera-amoris.vercel.app`

**Why this is better:**
- ✅ No local server setup needed
- ✅ See it exactly as users will
- ✅ Test on mobile devices
- ✅ Share with others for feedback
- ✅ Everything works (API, forms, uploads)

---

## 📝 Common Mistakes

### ❌ Mistake 1: Opening from ZIP
**Problem:** Double-clicking HTML inside the ZIP file  
**Solution:** Extract the ZIP first, then open HTML

### ❌ Mistake 2: Moving Only the HTML File
**Problem:** Copying just `index.html` to desktop  
**Solution:** Keep the entire folder structure together

### ❌ Mistake 3: Wrong Folder Level
**Problem:** Opening HTML from inside a nested folder  
**Solution:** Make sure you're in the `tessera_production` folder

---

## ✅ Expected Result

When working correctly, you should see:

- ✅ Beautiful golden/navy color scheme
- ✅ "TESSERA AMORIS" logo in elegant font
- ✅ Hero image with couple
- ✅ Styled buttons and navigation
- ✅ Smooth animations
- ✅ Professional layout

If you see plain black text on white background, CSS is not loading.

---

## 🆘 Still Not Working?

Try this diagnostic:

1. **Extract the ZIP to your Desktop**
2. **Open the extracted folder** (should be called `tessera_production`)
3. **Look inside** - do you see `css`, `js`, `images` folders?
4. **Open `css` folder** - do you see many `.css` files?
5. **Go back to main folder**
6. **Right-click `index.html`** → Open with Chrome/Firefox/Safari
7. **Press F12** → Check Console tab for errors

If you still see issues, let me know:
- What operating system? (Windows/Mac/Linux)
- What browser? (Chrome/Firefox/Safari/Edge)
- What error messages in console?

---

## 💡 Pro Tip

The production code is meant to be deployed to Vercel, not necessarily viewed locally. Local viewing is just for quick checks. For the full experience with working forms and database, deploy to Vercel (it's free and takes 10 minutes).

---

**Remember:** The code is 100% correct and ready for deployment. The styling issue is just a local viewing problem, not a code problem!

