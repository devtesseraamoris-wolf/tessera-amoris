# 🧪 Quick Testing Guide
## Tessera Amoris - Production Readiness Tests

**Time Required:** 15 minutes  
**Last Updated:** October 18, 2025

---

## 🚀 Quick Start

```bash
# 1. Open application.html in browser
open application.html

# OR start local server
python3 -m http.server 8000
# Then visit: http://localhost:8000/application.html
```

---

## ✅ 5-Minute Smoke Test

### Test 1: Paraguay Flow (2 min)
1. Select "🇵🇾 Paraguay"
2. ✅ State dropdown enables
3. Select "Central"
4. ✅ City dropdown enables
5. Select "Asunción"
6. ✅ Phone code shows "+595"
7. ✅ Nationality suggests "Paraguayan"

### Test 2: European Country Flow (2 min)
1. Select "🇩🇪 Germany"
2. ✅ State dropdown enables
3. Select "Bavaria"
4. ✅ City dropdown enables
5. Select "Munich"
6. ✅ Phone code shows "+49"
7. ✅ Nationality suggests "German"

### Test 3: Expansion Modal (1 min)
1. Select "🌍 My country isn't listed yet"
2. ✅ Modal opens
3. Select "Americas"
4. Enter "United States"
5. Click "Share My Interest"
6. ✅ Success message appears

---

## 📱 Device Testing (5 min)

### Desktop (1 min)
- Open in Chrome/Firefox/Safari
- ✅ Full layout displays
- ✅ All dropdowns work

### Tablet (2 min)
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Select "iPad" (768x1024)
- ✅ Single column layout
- ✅ Touch targets ≥44px

### Mobile (2 min)
- Select "iPhone 14 Pro" (393x852)
- ✅ Compact layout
- ✅ No horizontal scroll
- ✅ Text ≥16px (no zoom)
- ✅ Modal fits screen

---

## 🔍 Critical Checks

### Geography
- [ ] 45 countries in dropdown
- [ ] Paraguay at top
- [ ] "Europe" gold divider
- [ ] "My country isn't listed yet" at bottom

### Functionality
- [ ] Country → State → City cascade works
- [ ] "Other (specify)" shows custom input
- [ ] Nationality autocomplete works
- [ ] Phone code auto-syncs
- [ ] Expansion modal opens/closes

### Responsive
- [ ] Desktop (1920px) - Full layout
- [ ] Tablet (768px) - Single column
- [ ] Mobile (393px) - Compact layout
- [ ] No horizontal scroll on any device

---

## 🐛 Common Issues

### Issue: State dropdown stays disabled
**Fix:** Check console for errors. Ensure `paraguay-europe-data.js` loaded.

### Issue: Nationality suggestions don't appear
**Fix:** Click field, then type. Check if datalist element exists.

### Issue: Modal doesn't open
**Fix:** Check if `expansion-modal.css` loaded. Verify no JS errors.

### Issue: Horizontal scroll on mobile
**Fix:** Check for fixed-width elements. Ensure `max-width: 100%`.

---

## ✅ Pass Criteria

**PASS if:**
- ✅ All 3 smoke tests pass
- ✅ Works on desktop + tablet + mobile
- ✅ No console errors
- ✅ All 5 critical checks pass

**FAIL if:**
- ❌ Any smoke test fails
- ❌ Console errors present
- ❌ Horizontal scroll on mobile
- ❌ Text <16px on mobile (causes zoom)

---

## 🎉 Production Ready?

**YES** if all tests pass.  
**NO** if any test fails → Review `PRODUCTION_READY_AUDIT.md` for detailed debugging.

---

**Happy Testing! 🚀**

