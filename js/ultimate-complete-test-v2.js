/**
 * ULTIMATE COMPLETE TEST V2 - FIXED
 * Properly handles all field types (input, select, textarea, checkbox)
 * Ensures values are set BEFORE events are dispatched
 */

async function ultimateCompleteTestV2() {
    console.log('%c🚀 ULTIMATE COMPLETE TEST V2 - FIXED', 'background: #D4AF37; color: white; padding: 10px; font-size: 20px; font-weight: bold;');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    // Wait for initialization
    console.log('⏳ Waiting for form initialization...');
    await wait(3000);
    console.log('✅ Ready to start!\n');
    
    // STEP 1: Complete Quiz
    console.log('%c📝 STEP 1: Completing Pre-Screening Quiz', 'background: #2196F3; color: white; padding: 8px; font-weight: bold;');
    await completeQuizV2();
    await wait(2000);
    
    // STEP 2: Fill Section 1 - Personal Information
    console.log('\n%c📋 STEP 2: Section 1 - Personal Information', 'background: #4CAF50; color: white; padding: 8px; font-weight: bold;');
    await fillSection1V2();
    await wait(2000);
    
    // STEP 3: Fill Section 2 - Faith & Values
    console.log('\n%c✟ STEP 3: Section 2 - Faith & Values', 'background: #8B4513; color: white; padding: 8px; font-weight: bold;');
    await fillSection2V2();
    await wait(2000);
    
    // STEP 4: Fill Section 3 - Relationship Preferences
    console.log('\n%c💕 STEP 4: Section 3 - Relationship Preferences', 'background: #E91E63; color: white; padding: 8px; font-weight: bold;');
    await fillSection3V2();
    await wait(2000);
    
    // STEP 5: Fill Section 4 - Verification & References
    console.log('\n%c🔍 STEP 5: Section 4 - Verification & References', 'background: #FF9800; color: white; padding: 8px; font-weight: bold;');
    await fillSection4V2();
    await wait(2000);
    
    // STEP 6: Navigate to Section 5 and verify
    console.log('\n%c✅ STEP 6: Section 5 - Review & Terms', 'background: #9C27B0; color: white; padding: 8px; font-weight: bold;');
    await fillSection5V2();
    
    console.log('\n%c🎉 ULTIMATE COMPLETE TEST V2 FINISHED!', 'background: #4CAF50; color: white; padding: 10px; font-size: 20px; font-weight: bold;');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('✅ All fields filled');
    console.log('✅ All validations should pass');
    console.log('✅ Ready to submit!');
    
    // Show final data store
    console.log('\n📊 Final Data Store:');
    console.log('relocation_willingness:', window.formDataStore.relocation_willingness);
    console.log('background_check_consent:', window.formDataStore.background_check_consent);
    console.log('country:', window.formDataStore.country);
    console.log('education:', window.formDataStore.education);
}

// Helper function for delays
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// IMPROVED setField function - handles all field types correctly
async function setFieldV2(id, value) {
    const field = document.getElementById(id);
    if (!field) {
        console.log(`  ❌ ${id}: NOT FOUND`);
        return false;
    }
    
    const tagName = field.tagName.toLowerCase();
    const fieldType = field.type ? field.type.toLowerCase() : '';
    
    try {
        if (tagName === 'select') {
            // For SELECT elements
            field.value = value;
            await wait(500); // Much longer delay for select fields
            field.dispatchEvent(new Event('change', { bubbles: true }));
            field.dispatchEvent(new Event('input', { bubbles: true }));
            await wait(200); // Wait after events
            console.log(`  ✓ ${id}: ${value} (select)`);
        } else if (fieldType === 'checkbox') {
            // For CHECKBOX elements
            field.checked = value;
            await wait(50);
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`  ✓ ${id}: ${value} (checkbox)`);
        } else if (fieldType === 'radio') {
            // For RADIO elements
            field.checked = true;
            await wait(50);
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`  ✓ ${id}: selected (radio)`);
        } else if (tagName === 'textarea') {
            // For TEXTAREA elements
            field.value = value;
            await wait(50);
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`  ✓ ${id}: filled (textarea)`);
        } else {
            // For regular INPUT elements
            field.value = value;
            await wait(50);
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
            field.dispatchEvent(new Event('blur', { bubbles: true }));
            console.log(`  ✓ ${id}: ${value}`);
        }
        
        return true;
    } catch (error) {
        console.error(`  ❌ ${id}: ERROR -`, error.message);
        return false;
    }
}

// Complete the quiz
async function completeQuizV2() {
    // Skip quiz for now
    const skipButton = document.querySelector('.quiz-skip-button');
    if (skipButton) {
        skipButton.click();
        console.log('  ✓ Quiz bypassed');
    }
}

// Fill Section 1 - Personal Information
async function fillSection1V2() {
    if (window.tesseraFormControl) {
        window.tesseraFormControl.transitionToSection(1);
        await wait(500);
    }
    
    await setFieldV2('full-name', 'Maria Silva Santos');
    await setFieldV2('birth-month', '3');
    await setFieldV2('birth-day', '15');
    await setFieldV2('birth-year', '1992');
    await setFieldV2('gender', 'female');
    await setFieldV2('email', 'maria.santos@example.com');
    await setFieldV2('country-code', '+55');
    await setFieldV2('phone', '11987654321');
    
    // Location fields - wait longer for async loading
    await setFieldV2('country', 'Brazil');
    await wait(500);
    await setFieldV2('state', 'São Paulo');
    await wait(500);
    await setFieldV2('city', 'São Paulo');
    
    await setFieldV2('nationality', 'Brazilian');
    await setFieldV2('occupation', 'Marketing Manager');
    await setFieldV2('education', 'masters');
    
    // Languages - special handling
    const languagesInput = document.getElementById('languages');
    if (languagesInput) {
        languagesInput.value = JSON.stringify(['Portuguese', 'English', 'Spanish']);
        languagesInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  ✓ languages: ["Portuguese", "English", "Spanish"]');
    }
    
    console.log('✅ Section 1 complete');
}

// Fill Section 2 - Faith & Values
async function fillSection2V2() {
    if (window.tesseraFormControl) {
        window.tesseraFormControl.transitionToSection(2);
        await wait(500);
    }
    
    await setFieldV2('faith-tradition', 'christian-catholic');
    await setFieldV2('community-involvement', 'active');
    await setFieldV2('values-importance', 'essential');
    
    await setFieldV2('values-journey', 'My faith has been the foundation of my life since childhood. I grew up in a Catholic family and have always found strength and guidance in my relationship with God. Prayer and attending Mass are central to my daily routine, and I seek to live out my values in every aspect of my life, from my career to my relationships.');
    
    await setFieldV2('family-vision', 'I envision a family built on love, faith, and mutual respect. I want to create a home where our children grow up with strong moral values, understanding the importance of kindness, honesty, and compassion. Together with my partner, I hope to build a legacy that extends beyond our lifetime, raising children who will make a positive impact on the world.');
    
    console.log('✅ Section 2 complete');
}

// Fill Section 3 - Relationship Preferences
async function fillSection3V2() {
    if (window.tesseraFormControl) {
        window.tesseraFormControl.transitionToSection(3);
        await wait(500);
    }
    
    await setFieldV2('relationship-goal', 'marriage');
    await setFieldV2('previous-marriage', 'no');
    await setFieldV2('have-children', 'no');
    await setFieldV2('want-children', 'yes');
    await setFieldV2('relocation', 'yes'); // This maps to relocation_willingness
    await setFieldV2('partner-age-range', '28-38');
    
    await setFieldV2('partner-qualities', "I'm looking for someone who shares my deep faith and values family above all. Someone with a kind heart, strong moral compass, and a commitment to growing together spiritually. I value honesty, loyalty, and the ability to communicate openly. My ideal partner is someone who dreams of building a legacy together, raising children with love and faith, and making a positive impact on the world around us.");
    
    console.log('✅ Section 3 complete');
}

// Fill Section 4 - Verification & References
async function fillSection4V2() {
    if (window.tesseraFormControl) {
        window.tesseraFormControl.transitionToSection(4);
        await wait(1000); // Wait longer for dynamic component to load
    }
    
    // References
    await setFieldV2('reference-name-1', 'João Pedro Silva');
    await setFieldV2('reference-relationship-1', 'Mentor and former professor');
    await setFieldV2('reference-email-1', 'joao.silva@university.edu');
    await setFieldV2('reference-phone-1', '+5511987654321');
    
    await setFieldV2('reference-name-2', 'Ana Carolina Oliveira');
    await setFieldV2('reference-relationship-2', 'Close friend for 10 years');
    await setFieldV2('reference-email-2', 'ana.oliveira@email.com');
    await setFieldV2('reference-phone-2', '+5511976543210');
    
    // Background Check - CRITICAL!
    await wait(500); // Wait for component to fully render
    await setFieldV2('verification-consent', true);
    
    console.log('✅ Section 4 complete');
}

// Fill Section 5 - Review & Terms
async function fillSection5V2() {
    if (window.tesseraFormControl) {
        window.tesseraFormControl.transitionToSection(5);
        await wait(1000);
    }
    
    // Populate review section
    if (window.populateExceptionalReview) {
        window.populateExceptionalReview();
        console.log('  ✓ Review section populated');
    }
    
    // Terms checkboxes
    await setFieldV2('terms-agreement', true);
    await setFieldV2('privacy-agreement', true);
    
    console.log('✅ Section 5 complete');
}

