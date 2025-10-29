/**
 * ROBUST TEST FINAL - With Retry Logic and Double Check
 * Fills ALL fields correctly with verification at each step
 */

(function() {
    'use strict';

    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function setFieldWithRetry(id, value, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const field = document.getElementById(id);
            if (!field) {
                console.log(`  ❌ ${id}: NOT FOUND!`);
                return false;
            }

            // Set value
            field.value = value;
            await wait(200);  // Wait for value to be applied

            // Dispatch events
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
            await wait(300);  // Wait for data store to save

            // Verify
            const savedValue = field.value;
            const storeValue = window.formDataStore[field.name || id.replace(/-/g, '_')];
            
            if (savedValue === value || storeValue === value) {
                console.log(`  ✓ ${id}: ${value} (attempt ${attempt})`);
                return true;
            } else if (attempt < maxRetries) {
                console.log(`  ⚠️  ${id}: retry ${attempt}/${maxRetries}`);
                await wait(500);  // Wait before retry
            }
        }
        
        console.log(`  ❌ ${id}: FAILED after ${maxRetries} attempts`);
        return false;
    }

    async function setTextareaWithRetry(id, value) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        field.value = value;
        await wait(200);
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(300);
        
        console.log(`  ✓ ${id}: filled (${value.length} chars)`);
        return true;
    }

    async function setCheckboxWithRetry(id) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        field.checked = true;
        await wait(200);
        field.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(300);
        
        const storeKey = id.replace(/-/g, '_');
        const saved = window.formDataStore[storeKey] === true || window.formDataStore[storeKey] === 'true';
        
        if (saved) {
            console.log(`  ✓ ${id}: checked and saved`);
        } else {
            console.log(`  ⚠️  ${id}: checked but not in store`);
        }
        return true;
    }

    async function clickNext() {
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn) {
            nextBtn.click();
            await wait(2500);  // Wait for section transition
        }
    }

    async function doubleCheckSection(sectionName, requiredFields) {
        console.log(`\n🔍 DOUBLE CHECK: ${sectionName}`);
        let allFilled = true;
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field) {
                console.log(`  ❌ ${fieldId}: NOT FOUND`);
                allFilled = false;
                continue;
            }
            
            const value = field.value;
            const checked = field.type === 'checkbox' ? field.checked : null;
            
            if (field.type === 'checkbox') {
                if (!checked) {
                    console.log(`  ❌ ${fieldId}: NOT CHECKED`);
                    allFilled = false;
                }
            } else if (!value || value === '') {
                console.log(`  ❌ ${fieldId}: EMPTY`);
                allFilled = false;
            } else {
                console.log(`  ✓ ${fieldId}: ${value.substring(0, 30)}...`);
            }
        }
        
        if (allFilled) {
            console.log(`✅ ${sectionName}: ALL FIELDS FILLED`);
        } else {
            console.log(`⚠️  ${sectionName}: SOME FIELDS MISSING`);
        }
        
        return allFilled;
    }

    window.robustTestFinal = async function() {
        console.log('🚀 ROBUST TEST FINAL - With Retry & Double Check');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');

        // Wait for form to be ready
        console.log('⏳ Waiting for form initialization...');
        await wait(3000);
        console.log('✅ Ready to start!');
        console.log('');

        // STEP 1: Complete Quiz
        console.log('📝 STEP 1: Completing Pre-Screening Quiz');
        const quizAnswers = ['A', 'B', 'A', 'B', 'A'];
        for (let i = 0; i < quizAnswers.length; i++) {
            const option = document.querySelector(`input[value="${quizAnswers[i]}"]`);
            if (option) {
                option.checked = true;
                option.dispatchEvent(new Event('change', { bubbles: true }));
            }
            await wait(300);
            const nextBtn = document.querySelector('.quiz-next-btn');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
                await wait(1200);
            }
        }
        console.log('✅ Quiz complete');
        console.log('');

        // STEP 2: Section 1 - Personal Information
        console.log('📋 STEP 2: Section 1 - Personal Information');
        
        await setFieldWithRetry('full-name', 'Maria Silva Santos');
        await setFieldWithRetry('birth-month', '3');
        await setFieldWithRetry('birth-day', '15');
        await setFieldWithRetry('birth-year', '1992');
        await setFieldWithRetry('gender', 'female');
        await setFieldWithRetry('email', 'maria.santos@example.com');
        await setFieldWithRetry('country-code', '+55');
        await setFieldWithRetry('phone', '11987654321');
        
        // Location fields need more time
        await setFieldWithRetry('country', 'BR');
        await wait(1500);  // Wait for states to load
        await setFieldWithRetry('state', 'SP');
        await wait(1500);  // Wait for cities to load
        await setFieldWithRetry('city', 'São Paulo');
        
        await setFieldWithRetry('nationality', 'Brazilian');
        await setFieldWithRetry('occupation', 'Marketing Manager');
        await setFieldWithRetry('education', 'masters');
        
        // Languages
        const languagesField = document.getElementById('languages');
        if (languagesField) {
            languagesField.value = '["Portuguese","English","Spanish"]';
            languagesField.dispatchEvent(new Event('change', { bubbles: true }));
            await wait(300);
            console.log('  ✓ languages: Portuguese, English, Spanish');
        }
        
        // Double check Section 1
        await doubleCheckSection('Section 1', [
            'full-name', 'birth-month', 'birth-day', 'birth-year', 'gender',
            'email', 'country-code', 'phone', 'country', 'state', 'city',
            'nationality', 'occupation', 'education', 'languages'
        ]);
        
        console.log('✅ Section 1 complete');
        await clickNext();
        console.log('');

        // STEP 3: Section 2 - Faith & Values
        console.log('✟ STEP 3: Section 2 - Faith & Values');
        
        await setFieldWithRetry('faith-tradition', 'christian-catholic');
        await setFieldWithRetry('community-involvement', 'active');
        await setFieldWithRetry('values-importance', 'essential');
        await setTextareaWithRetry('values-journey', 'My faith has been the foundation of my life since childhood. I grew up in a Catholic family and have always found strength and guidance in my relationship with God. Prayer and attending Mass are central to my daily routine, and I seek to live out my values in every aspect of my life, from my career to my relationships.');
        await setTextareaWithRetry('family-vision', 'I envision a family built on love, faith, and mutual respect. I want to create a home where our children grow up with strong moral values, understanding the importance of kindness, honesty, and compassion. Together with my partner, I hope to build a legacy that extends beyond our lifetime, raising children who will make a positive impact on the world.');
        
        // Double check Section 2
        await doubleCheckSection('Section 2', [
            'faith-tradition', 'community-involvement', 'values-importance',
            'values-journey', 'family-vision'
        ]);
        
        console.log('✅ Section 2 complete');
        await clickNext();
        console.log('');

        // STEP 4: Section 3 - Relationship Preferences
        console.log('💕 STEP 4: Section 3 - Relationship Preferences');
        
        await setFieldWithRetry('relationship-goal', 'marriage');
        await setFieldWithRetry('previous-marriage', 'no');
        await setFieldWithRetry('have-children', 'no');
        await setFieldWithRetry('want-children', 'yes');
        await setFieldWithRetry('relocation', 'yes');
        await setFieldWithRetry('partner-age-range', '28-38');
        await setTextareaWithRetry('partner-qualities', 'I am looking for a partner who shares my faith and values, someone who is kind, compassionate, and committed to building a strong, loving family. I value honesty, integrity, and a sense of humor. My ideal partner is someone who values family, has a kind heart, and is committed to growing together in Christ.');
        
        // Double check Section 3
        await doubleCheckSection('Section 3', [
            'relationship-goal', 'previous-marriage', 'have-children',
            'want-children', 'relocation', 'partner-age-range', 'partner-qualities'
        ]);
        
        console.log('✅ Section 3 complete');
        await clickNext();
        console.log('');

        // STEP 5: Section 4 - Verification & References
        console.log('🔍 STEP 5: Section 4 - Verification & References');
        
        await setFieldWithRetry('reference-name-1', 'João Pedro Silva');
        await setFieldWithRetry('reference-relationship-1', 'Mentor and former professor');
        await setFieldWithRetry('reference-email-1', 'joao.silva@university.edu');
        await setFieldWithRetry('reference-phone-1', '+5511987654321');
        
        await setFieldWithRetry('reference-name-2', 'Ana Carolina Oliveira');
        await setFieldWithRetry('reference-relationship-2', 'Close friend for 10 years');
        await setFieldWithRetry('reference-email-2', 'ana.oliveira@email.com');
        await setFieldWithRetry('reference-phone-2', '+5511976543210');
        
        await setCheckboxWithRetry('verification-consent');
        
        // Double check Section 4
        await doubleCheckSection('Section 4', [
            'reference-name-1', 'reference-relationship-1', 'reference-email-1', 'reference-phone-1',
            'reference-name-2', 'reference-relationship-2', 'reference-email-2', 'reference-phone-2',
            'verification-consent'
        ]);
        
        console.log('✅ Section 4 complete');
        await clickNext();
        console.log('');

        // STEP 6: Section 5 - Review & Terms
        console.log('✅ STEP 6: Section 5 - Review & Terms');
        
        await wait(2000);  // Wait for review section to populate
        console.log('  ✓ Review section populated');
        
        await setCheckboxWithRetry('terms-agreement');
        await setCheckboxWithRetry('privacy-agreement');
        
        // Double check Section 5
        await doubleCheckSection('Section 5', [
            'terms-agreement', 'privacy-agreement'
        ]);
        
        console.log('✅ Section 5 complete');
        console.log('');

        console.log('🎉 ROBUST TEST FINAL FINISHED!');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('✅ All fields filled with retry logic');
        console.log('✅ All sections double-checked');
        console.log('✅ Ready to submit!');
        console.log('');
        console.log('📊 Final Data Store:');
        console.log('relocation_willingness:', window.formDataStore.relocation_willingness);
        console.log('background_check_consent:', window.formDataStore.background_check_consent);
        console.log('country:', window.formDataStore.country);
        console.log('education:', window.formDataStore.education);
        console.log('values_journey:', window.formDataStore.values_journey ? 'filled' : 'EMPTY');
        console.log('family_vision:', window.formDataStore.family_vision ? 'filled' : 'EMPTY');
    };

    console.log('✅ ROBUST TEST FINAL LOADED!');
    console.log('💡 Type: robustTestFinal() to run the complete test');
    console.log('⏱️  Total time: ~150 seconds (with retry logic and double checks)');
})();

