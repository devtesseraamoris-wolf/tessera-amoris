# Strategic Quiz Design for Tessera Amoris
## Research-Based Questions for High-Quality Filtering

---

## Research Foundation

### Target Audience Profile
- **Age Range:** 28-45 (established, marriage-ready)
- **Cultural Background:** Paraguay + Europe
- **Faith:** Christian (Catholic, Protestant, Lutheran, etc.)
- **Relationship Goal:** Marriage within 1-3 years
- **Values:** Family, faith, legacy, cross-cultural openness

### Red Flags to Filter Out
1. **Casual daters** - Not serious about marriage
2. **Cultural rigidity** - Won't embrace Paraguay-Europe connection
3. **Weak faith commitment** - Faith is peripheral, not central
4. **Unrealistic expectations** - Seeking perfection, not partnership
5. **Financial/emotional immaturity** - Not ready for serious commitment

---

## The 5 Strategic Questions

### Question 1: Faith Integration (Core Value Alignment)

**Question:**
> "How does faith shape your daily life and major decisions?"

**Options:**
- **A) [3 points - ALIGNED]** "Faith is the foundation of my life. I pray daily, attend services regularly, and seek divine guidance in all major decisions including relationships and career."

- **B) [1 point - NEUTRAL]** "Faith is important to me. I attend services occasionally and pray when facing challenges, but I also rely heavily on my own judgment."

- **C) [0 points - MISALIGNED]** "I respect faith and traditions, but I make decisions based primarily on logic, personal goals, and practical considerations."

**Why This Works:**
- Filters for **active** faith practice, not just cultural Christianity
- Distinguishes between "faith-informed" vs "faith-centered" individuals
- Aligns with Tessera Amoris core value: "God first"

---

### Question 2: Marriage Timeline & Commitment Level

**Question:**
> "What does your ideal timeline look like from meeting someone to marriage?"

**Options:**
- **A) [3 points - ALIGNED]** "6-18 months of intentional courtship focused on compatibility, family integration, and spiritual alignment. I'm ready to commit when I find the right person."

- **B) [1 point - NEUTRAL]** "2-3 years to really get to know someone through different life seasons. I believe in taking time to be absolutely certain before such a major commitment."

- **C) [0 points - MISALIGNED]** "I'm in no rush. I want to enjoy dating, travel together, and see how things naturally evolve over 3-5+ years before considering marriage."

**Why This Works:**
- Identifies **urgency** and **readiness** for marriage
- Filters out perpetual daters who aren't ready to commit
- Option A shows maturity: knows what they want, ready to act
- Option C reveals casual dating mindset

---

### Question 3: Cross-Cultural Relationship Readiness

**Question:**
> "A successful Paraguay-Europe relationship requires significant cultural adaptation. How do you view this?"

**Options:**
- **A) [3 points - ALIGNED]** "I'm genuinely excited about learning a new culture, potentially relocating, learning a new language, and integrating two families. Cultural differences enrich relationships when both partners are committed."

- **B) [1 point - NEUTRAL]** "I'm open to it, but I'd need my partner to adapt significantly to my culture and lifestyle. I'm willing to make some adjustments, but I have clear boundaries."

- **C) [0 points - MISALIGNED]** "I prefer someone from my own cultural background. While I respect other cultures, I believe relationships are easier when both partners share the same cultural context."

**Why This Works:**
- **Critical** for Paraguay-Europe matchmaking
- Option A shows genuine openness and sacrifice
- Option B reveals conditional openness (red flag)
- Option C filters out cultural rigidity immediately

---

### Question 4: Family Vision & Children

**Question:**
> "How do you envision your future family?"

**Options:**
- **A) [3 points - ALIGNED]** "I want 2-4 children raised in a faith-centered home where both parents are actively involved. Family dinners, regular worship, and strong extended family connections are essential to me."

- **B) [1 point - NEUTRAL]** "I'm open to 1-2 children if the relationship is right, but I also value maintaining our couple identity, careers, and personal freedom. Family is one important part of a fulfilling life."

- **C) [0 points - MISALIGNED]** "I'm undecided about children. I want to focus on my career and personal growth first. If children happen, great, but they're not a priority or requirement for my happiness."

**Why This Works:**
- Distinguishes **family-first** vs **career-first** mindsets
- Option A shows clear vision and commitment
- Option B reveals ambivalence (may not be ready)
- Option C filters out those not aligned with "legacy building"

---

### Question 5: Financial & Life Readiness

**Question:**
> "Which statement best describes your current life stage?"

**Options:**
- **A) [3 points - ALIGNED]** "I'm financially stable with a clear career path, emotionally mature from past experiences, and have a strong support system. I'm ready to build a life with the right partner."

- **B) [1 point - NEUTRAL]** "I'm working toward financial stability and still figuring out some aspects of my career and life direction. I'm open to growing together with a partner."

- **C) [0 points - MISALIGNED]** "I'm in a transition phase - changing careers, dealing with past relationship baggage, or working through personal challenges. I'm hoping a relationship will help me find direction."

**Why This Works:**
- Filters for **readiness** and **stability**
- Option A = established, ready to give
- Option B = still developing (may not be ready)
- Option C = seeking partner to "fix" them (major red flag)

---

## Scoring System

### Total Possible: 15 points

**13-15 points (87-100%) - HIGHLY ALIGNED**
> "Welcome to Tessera Amoris. Your responses reveal a deep alignment with our community's values of faith, family, and purposeful partnership. You demonstrate the maturity, readiness, and cultural openness we seek. **Please proceed with your full application.**"

**9-12 points (60-80%) - ALIGNED WITH REFLECTION**
> "Thank you for your thoughtful responses. Your values show promise, though we encourage you to reflect on your readiness for the unique journey of cross-cultural, faith-centered partnership. If you feel truly prepared for this commitment, you may proceed. We recommend reviewing our [Vision] and [Process] pages to ensure alignment."

**5-8 points (33-53%) - NEEDS SIGNIFICANT REFLECTION**
> "We appreciate your interest in Tessera Amoris. Based on your responses, we sense you may be in an exploratory phase rather than ready for the deep commitment our community requires. We encourage you to take time to clarify your values, goals, and readiness. You're welcome to reapply when you feel more aligned with our mission."

**0-4 points (0-27%) - NOT ALIGNED**
> "Thank you for your honesty. Based on your responses, we believe other platforms may be better suited to your current relationship goals and timeline. Tessera Amoris specializes in faith-centered, marriage-focused connections for individuals ready to build lasting cross-cultural legacies. We wish you the very best in your search."

---

## Database Schema Addition

Add to `applications` table:

```sql
ALTER TABLE applications ADD COLUMN quiz_score INTEGER;
ALTER TABLE applications ADD COLUMN quiz_responses JSONB;
ALTER TABLE applications ADD COLUMN quiz_completed_at TIMESTAMP;
ALTER TABLE applications ADD COLUMN quiz_result_category VARCHAR(50);
```

**quiz_responses format:**
```json
{
  "q1": { "question": "How does faith shape...", "answer": 0, "points": 3 },
  "q2": { "question": "What does your ideal...", "answer": 0, "points": 3 },
  "q3": { "question": "A successful Paraguay...", "answer": 0, "points": 3 },
  "q4": { "question": "How do you envision...", "answer": 0, "points": 3 },
  "q5": { "question": "Which statement best...", "answer": 0, "points": 3 }
}
```

---

## Expected Impact

### Current State (Without Quiz)
- 100 applications/month
- 60% low quality (casual daters, not ready, misaligned)
- 10 hours/month manual screening
- 40 quality candidates

### Projected State (With Quiz)
- 50 applications/month (50% reduction)
- 20% low quality (60% improvement)
- 3 hours/month screening (70% time savings)
- 40 quality candidates (same number, better quality)

### Quality Improvements
- **Faith alignment:** 90%+ will have active faith practice
- **Marriage readiness:** 85%+ ready to commit within 18 months
- **Cultural openness:** 80%+ genuinely excited about cross-cultural partnership
- **Family vision:** 90%+ want 2+ children in faith-centered home
- **Life readiness:** 85%+ financially and emotionally stable

---

## A/B Testing Plan (Future)

### Variations to Test
1. **Question order** - Does starting with "easier" questions improve completion?
2. **Option wording** - More direct vs. more diplomatic language
3. **Scoring thresholds** - 80% vs. 87% for "highly aligned"
4. **Result messaging** - Encouraging vs. direct rejection

### Metrics to Track
- Quiz completion rate
- Score distribution
- Application quality post-quiz
- Conversion rate (quiz → full application)
- Match success rate by quiz score

---

## Implementation Notes

1. **Save quiz data BEFORE application** - Even if they don't proceed
2. **Anonymous analytics** - Track score distribution without PII
3. **Admin dashboard** - View quiz results, adjust thresholds
4. **Periodic review** - Adjust questions every 6 months based on data
5. **Cultural sensitivity** - Questions work for both Paraguay and European applicants

---

This strategic quiz design ensures only serious, aligned, marriage-ready individuals proceed to the full application, saving time and improving match quality dramatically.

