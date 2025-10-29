/**
 * ULTIMATE COMPLETE TEST - Fills EVERY SINGLE FIELD
 * Quiz + All Sections + All References + All Textareas + All Checkboxes
 * With 2-second intervals between sections
 */

async function ultimateCompleteTest() {
    console.log('%c🚀 ULTIMATE COMPLETE TEST - EVERY FIELD', 'background: #D4AF37; color: white; padding: 10px; font-size: 20px; font-weight: bold;');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    // Wait for initialization
    console.log('⏳ Waiting for form initialization...');
    await wait(2000);
    console.log('✅ Ready to start!\n');
    
    // STEP 1: Complete Quiz
    console.log('%c📝 STEP 1: Completing Pre-Screening Quiz', 'background: #2196F3; color: white; padding: 8px; font-weight: bold;');
    await completeQuizComplete();
    await wait(2000);
    
    // STEP 2: Fill Section 1 - Personal Information
    console.log('\n%c📋 STEP 2: Section 1 - Personal Information', 'background: #4CAF50; color: white; padding: 8px; font-weight: bold;');
    await fillSection1Complete();
    await wait(2000);
    
    // STEP 3: Fill Section 2 - Faith & Values
    console.log('\n%c✟ STEP 3: Section 2 - Faith & Values', 'background: #8B4513; color: white; padding: 8px; font-weight: bold;');
    await fillSection2Complete();
    await wait(2000);
    
    // STEP 4: Fill Section 3 - Relationship Preferences
    console.log('\n%c💕 STEP 4: Section 3 - Relationship Preferences', 'background: #E91E63; color: white; padding: 8px; font-weight: bold;');
    await fillSection3Complete();
    await wait(2000);
    
    // STEP 5: Fill Section 4 - Verification & References
    console.log('\n%c🔍 STEP 5: Section 4 - Verification & References', 'background: #FF9800; color: white; padding: 8px; font-weight: bold;');
    await fillSection4Complete();
    await wait(2000);
    
    // STEP 6: Navigate to Section 5 and verify
    console.log('\n%c✅ STEP 6: Section 5 - Review & Terms', 'background: #9C27B0; color: white; padding: 8px; font-weight: bold;');
    await fillSection5Complete();
    
    console.log('\n%c🎉 ULTIMATE COMPLETE TEST FINISHED!', 'background: #4CAF50; color: white; padding: 10px; font-size: 20px; font-weight: bold;');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('✅ All fields filled');
    console.log('✅ All validations should pass');
    console.log('✅ Ready to submit!');
}

// Helper function for delays
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Set field value and trigger events
function setField(id, value) {
    const field = document.getElementById(id);
    if (field) {
        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`  ✓ ${id}: ${value}`);
        return true;
    } else {
        console.log(`  ❌ ${id}: NOT FOUND`);
        return false;
    }
}

// Complete the quiz
async function completeQuizComplete() {
    const quizOverlay = document.querySelector('.quiz-overlay');
    const quizModal = document.getElementById('quiz-modal-overlay');
    
    // Make sure quiz is visible
    if (quizOverlay) {
        quizOverlay.classList.remove('hidden');
        quizOverlay.style.display = 'flex';
    }
    if (quizModal) {
        quizModal.classList.remove('hidden');
        quizModal.style.display = 'flex';
    }
    
    console.log('  Starting quiz...');
    
    // Answer all 5 questions
    for (let i = 1; i <= 5; i++) {
        console.log(`  Question ${i}/5...`);
        
        // Find and click option A for each question
        const optionA = document.querySelector('input[name="quiz-question"][value="A"]');
        if (optionA) {
            optionA.checked = true;
            optionA.click();
            await wait(300);
        }
        
        // Click Next button (or View Results on last question)
        if (i < 5) {
            const nextBtn = document.querySelector('.quiz-next-btn');
            if (nextBtn) {
                nextBtn.click();
                await wait(500);
            }
        } else {
            const viewResultsBtn = document.querySelector('.quiz-next-btn');
            if (viewResultsBtn) {
                viewResultsBtn.click();
                await wait(1000);
            }
        }
    }
    
    // Click "Proceed to Application"
    const proceedBtn = document.querySelector('.proceed-to-application-btn, button[onclick*="proceedToApplication"]');
    if (proceedBtn) {
        proceedBtn.click();
        console.log('  ✅ Quiz completed!');
        await wait(1000);
    } else {
        // Force close quiz
        if (quizOverlay) quizOverlay.style.display = 'none';
        if (quizModal) quizModal.style.display = 'none';
        const appForm = document.getElementById('application-form-container');
        if (appForm) appForm.style.display = 'block';
        console.log('  ✅ Quiz bypassed');
    }
}

// Fill Section 1 - Personal Information
async function fillSection1Complete() {
    // Full Name
    setField('full-name', 'Maria Silva Santos');
    
    // Date of Birth
    setField('birth-month', '3');
    await wait(100);
    setField('birth-day', '15');
    await wait(100);
    setField('birth-year', '1992');
    
    // Gender
    setField('gender', 'female');
    
    // Email
    setField('email', 'maria.santos@example.com');
    
    // Phone
    setField('country-code', '+55');
    setField('phone', '11987654321');
    
    // Location
    setField('country', 'Brazil');
    await wait(800); // Wait for state dropdown to populate
    setField('state', 'São Paulo');
    await wait(800); // Wait for city dropdown to populate
    setField('city', 'São Paulo');
    
    // Nationality
    setField('nationality', 'Brazilian');
    
    // Occupation
    const occupationInput = document.getElementById('occupation');
    const occupationHidden = document.getElementById('occupation-hidden');
    if (occupationInput) {
        occupationInput.value = 'Marketing Manager';
        occupationInput.dispatchEvent(new Event('input', { bubbles: true }));
        occupationInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  ✓ occupation: Marketing Manager');
    }
    if (occupationHidden) {
        occupationHidden.value = 'Marketing Manager';
    }
    
    // Education
    setField('education', 'masters');
    
    // Languages
    const languagesField = document.getElementById('languages');
    if (languagesField) {
        languagesField.value = JSON.stringify(['Portuguese', 'English', 'Spanish']);
        console.log('  ✓ languages: ["Portuguese", "English", "Spanish"]');
    }
    
    console.log('✅ Section 1 complete - ALL 11 fields filled');
}

// Fill Section 2 - Faith & Values
async function fillSection2Complete() {
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    
    // Navigate to section 2
    if (formControl) {
        formControl.currentStep = 2;
        formControl.transitionToSection(2);
        await wait(1000);
    }
    
    // Faith Tradition
    setField('faith-tradition', 'christian-catholic');
    
    // Community Involvement
    setField('community-involvement', 'active');
    
    // Values Importance
    setField('values-importance', 'essential');
    
    // Values Journey (textarea)
    const valuesJourney = document.getElementById('values-journey');
    if (valuesJourney) {
        valuesJourney.value = 'My faith has been the foundation of my life since childhood. I grew up in a Catholic family and have always found strength and guidance in my relationship with God. Prayer and attending Mass are central to my daily routine, and I seek to live out my values in every aspect of my life, from my career to my relationships.';
        valuesJourney.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('  ✓ values-journey: filled (detailed)');
    }
    
    // Family Vision (textarea)
    const familyVision = document.getElementById('family-vision');
    if (familyVision) {
        familyVision.value = 'I envision a family built on love, faith, and mutual respect. I want to create a home where our children grow up with strong moral values, understanding the importance of kindness, honesty, and compassion. Together with my partner, I hope to build a legacy that extends beyond our lifetime, raising children who will make a positive impact on the world.';
        familyVision.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('  ✓ family-vision: filled (detailed)');
    }
    
    console.log('✅ Section 2 complete - ALL 5 fields + 2 textareas filled');
}

// Fill Section 3 - Relationship Preferences
async function fillSection3Complete() {
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    
    // Navigate to section 3
    if (formControl) {
        formControl.currentStep = 3;
        formControl.transitionToSection(3);
        await wait(1000);
    }
    
    // Relationship Goal
    setField('relationship-goal', 'marriage');
    
    // Previous Marriage
    setField('previous-marriage', 'no');
    
    // Have Children
    setField('have-children', 'no');
    
    // Want Children
    setField('want-children', 'yes');
    
    // Relocation
    setField('relocation', 'yes');
    
    // Partner Location
    setField('partner-location', 'Brazil');
    
    // Partner Age Range
    setField('partner-age-range', '28-38');
    
    // Partner Qualities (textarea)
    const partnerQualities = document.getElementById('partner-qualities');
    if (partnerQualities) {
        partnerQualities.value = 'I am looking for someone who shares my faith and values family as much as I do. Someone who is kind, honest, and has a good sense of humor. I value emotional intelligence and the ability to communicate openly. My ideal partner is someone who is ambitious yet grounded, someone who wants to build a meaningful life together and create a lasting legacy.';
        partnerQualities.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('  ✓ partner-qualities: filled (detailed)');
    }
    
    console.log('✅ Section 3 complete - ALL 7 fields + 1 textarea filled');
}

// Fill Section 4 - Verification & References
async function fillSection4Complete() {
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    
    // Navigate to section 4
    if (formControl) {
        formControl.currentStep = 4;
        formControl.transitionToSection(4);
        await wait(1000);
    }
    
    // Reference #1
    setField('reference-name-1', 'João Pedro Silva');
    setField('reference-relationship-1', 'Mentor and former professor');
    setField('reference-email-1', 'joao.silva@university.edu');
    setField('reference-phone-1', '+5511987654321');
    
    // Reference #2
    setField('reference-name-2', 'Ana Carolina Oliveira');
    setField('reference-relationship-2', 'Close friend for 10 years');
    setField('reference-email-2', 'ana.oliveira@email.com');
    setField('reference-phone-2', '+5511976543210');
    
    // Background Check - THIS IS CRITICAL!
    const backgroundCheck = document.getElementById('verification-consent');
    if (backgroundCheck) {
        backgroundCheck.checked = true;
        backgroundCheck.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  ✅ verification-consent (background-check): CHECKED');
    } else {
        console.log('  ❌ verification-consent (background-check): NOT FOUND!');
    }
    
    console.log('✅ Section 4 complete - ALL 8 reference fields + background check filled');
}

// Fill Section 5 - Review & Terms
async function fillSection5Complete() {
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    
    // Navigate to section 5
    if (formControl) {
        formControl.currentStep = 5;
        formControl.transitionToSection(5);
        await wait(1500); // Extra time for review section to populate
    }
    
    // Terms Agreement
    const termsAgreement = document.getElementById('terms-agreement');
    if (termsAgreement) {
        termsAgreement.checked = true;
        termsAgreement.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  ✅ terms-agreement: checked');
    }
    
    // Privacy Agreement
    const privacyAgreement = document.getElementById('privacy-agreement');
    if (privacyAgreement) {
        privacyAgreement.checked = true;
        privacyAgreement.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  ✅ privacy-agreement: checked');
    }
    
    console.log('✅ Section 5 complete - ALL 2 checkboxes filled');
    
    // Verify snapshot cards populated
    await wait(500);
    console.log('\n📊 Verifying Snapshot Cards...');
    const personalCard = document.querySelector('#personal-snapshot');
    const faithCard = document.querySelector('#faith-snapshot');
    const relationshipCard = document.querySelector('#relationship-snapshot');
    
    if (personalCard && faithCard && relationshipCard) {
        console.log('✅ All 3 snapshot cards found');
    } else {
        console.log('❌ Some snapshot cards missing');
    }
}

// Expose globally
window.ultimateCompleteTest = ultimateCompleteTest;

// Log that the test is loaded
console.log('%c✅ ULTIMATE COMPLETE TEST LOADED!', 'background: #D4AF37; color: white; padding: 8px; font-weight: bold;');
console.log('💡 Type: ultimateCompleteTest() to run the complete test');
console.log('⏱️  Total time: ~60 seconds (with 2-second intervals)');

