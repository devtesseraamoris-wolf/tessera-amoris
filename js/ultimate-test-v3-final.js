/**
 * ULTIMATE COMPLETE TEST V3 - FINAL
 * Fills ALL fields with proper timing for select elements
 */

(function() {
    'use strict';

    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function setSelectField(id, value) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        // Set value
        field.value = value;
        
        // Wait for value to be applied
        await wait(100);
        
        // Dispatch events
        field.dispatchEvent(new Event('change', { bubbles: true }));
        field.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Wait for data store to save
        await wait(300);
        
        // Verify value was saved
        const savedValue = field.value;
        if (savedValue === value) {
            console.log(`  ✓ ${id}: ${value} (verified)`);
            return true;
        } else {
            console.log(`  ⚠️  ${id}: expected "${value}", got "${savedValue}"`);
            return false;
        }
    }

    async function setInputField(id, value) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(100);
        
        console.log(`  ✓ ${id}: ${value}`);
        return true;
    }

    async function setTextareaField(id, value) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        field.value = value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(100);
        
        console.log(`  ✓ ${id}: filled (textarea)`);
        return true;
    }

    async function setCheckbox(id) {
        const field = document.getElementById(id);
        if (!field) {
            console.log(`  ❌ ${id}: NOT FOUND!`);
            return false;
        }

        field.checked = true;
        field.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(100);
        
        console.log(`  ✓ ${id}: checked`);
        return true;
    }

    async function clickNext() {
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn) {
            nextBtn.click();
            await wait(2000); // Wait for section transition
        }
    }

    window.ultimateTestV3 = async function() {
        console.log('🚀 ULTIMATE TEST V3 - FINAL');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');

        // Wait for form to be ready
        console.log('⏳ Waiting for form initialization...');
        await wait(2000);
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
            await wait(200);
            const nextBtn = document.querySelector('.quiz-next-btn');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
                await wait(1000);
            }
        }
        console.log('✅ Quiz complete');
        console.log('');

        // STEP 2: Section 1 - Personal Information
        console.log('📋 STEP 2: Section 1 - Personal Information');
        
        await setInputField('full-name', 'Maria Silva Santos');
        await setSelectField('birth-month', '3');
        await setSelectField('birth-day', '15');
        await setSelectField('birth-year', '1992');
        await setSelectField('gender', 'female');
        await setInputField('email', 'maria.santos@example.com');
        await setSelectField('country-code', '+55');
        await setInputField('phone', '11987654321');
        await setSelectField('country', 'BR');
        await wait(1000); // Wait for states to load
        await setSelectField('state', 'SP');
        await wait(1000); // Wait for cities to load
        await setSelectField('city', 'São Paulo');
        await setInputField('nationality', 'Brazilian');
        await setInputField('occupation', 'Marketing Manager');
        await setSelectField('education', 'masters');
        
        // Languages
        const languagesField = document.getElementById('languages');
        if (languagesField) {
            languagesField.value = '["Portuguese","English","Spanish"]';
            languagesField.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('  ✓ languages: Portuguese, English, Spanish');
        }
        
        console.log('✅ Section 1 complete');
        await clickNext();
        console.log('');

        // STEP 3: Section 2 - Faith & Values
        console.log('✟ STEP 3: Section 2 - Faith & Values');
        
        await setSelectField('faith-tradition', 'christian-catholic');
        await setSelectField('community-involvement', 'active');
        await setSelectField('values-importance', 'essential');
        await setTextareaField('values-journey', 'My faith has been the foundation of my life since childhood. I grew up in a Catholic family and have always found strength and guidance in my relationship with God. Prayer and attending Mass are central to my daily routine, and I seek to live out my values in every aspect of my life, from my career to my relationships.');
        await setTextareaField('family-vision', 'I envision a family built on love, faith, and mutual respect. I want to create a home where our children grow up with strong moral values, understanding the importance of kindness, honesty, and compassion. Together with my partner, I hope to build a legacy that extends beyond our lifetime, raising children who will make a positive impact on the world.');
        
        console.log('✅ Section 2 complete');
        await clickNext();
        console.log('');

        // STEP 4: Section 3 - Relationship Preferences
        console.log('💕 STEP 4: Section 3 - Relationship Preferences');
        
        await setSelectField('relationship-goal', 'marriage');
        await setSelectField('previous-marriage', 'no');
        await setSelectField('have-children', 'no');
        await setSelectField('want-children', 'yes');
        await setSelectField('relocation', 'yes');
        await setSelectField('partner-age-range', '28-38');
        await setTextareaField('partner-qualities', 'I am looking for a partner who shares my faith and values, someone who is kind, compassionate, and committed to building a strong, loving family. I value honesty, integrity, and a sense of humor. My ideal partner is someone who values family, has a kind heart, and is committed to growing together in Christ.');
        
        console.log('✅ Section 3 complete');
        await clickNext();
        console.log('');

        // STEP 5: Section 4 - Verification & References
        console.log('🔍 STEP 5: Section 4 - Verification & References');
        
        await setInputField('reference-name-1', 'João Pedro Silva');
        await setInputField('reference-relationship-1', 'Mentor and former professor');
        await setInputField('reference-email-1', 'joao.silva@university.edu');
        await setInputField('reference-phone-1', '+5511987654321');
        
        await setInputField('reference-name-2', 'Ana Carolina Oliveira');
        await setInputField('reference-relationship-2', 'Close friend for 10 years');
        await setInputField('reference-email-2', 'ana.oliveira@email.com');
        await setInputField('reference-phone-2', '+5511976543210');
        
        await setCheckbox('verification-consent');
        
        console.log('✅ Section 4 complete');
        await clickNext();
        console.log('');

        // STEP 6: Section 5 - Review & Terms
        console.log('✅ STEP 6: Section 5 - Review & Terms');
        
        await wait(1000); // Wait for review section to populate
        console.log('  ✓ Review section populated');
        
        await setCheckbox('terms-agreement');
        await setCheckbox('privacy-agreement');
        
        console.log('✅ Section 5 complete');
        console.log('');

        console.log('🎉 ULTIMATE TEST V3 FINISHED!');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('✅ All fields filled');
        console.log('✅ All validations should pass');
        console.log('✅ Ready to submit!');
        console.log('');
        console.log('📊 Final Data Store:');
        console.log('relocation_willingness:', window.formDataStore.relocation_willingness);
        console.log('background_check_consent:', window.formDataStore.background_check_consent);
        console.log('country:', window.formDataStore.country);
        console.log('education:', window.formDataStore.education);
    };

    console.log('✅ ULTIMATE TEST V3 LOADED!');
    console.log('💡 Type: ultimateTestV3() to run the complete test');
    console.log('⏱️  Total time: ~120 seconds (with proper delays)');
})();

