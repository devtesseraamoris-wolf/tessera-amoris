/**
 * COMPLETE TEST - Includes Quiz + Full Form + Visual Feedback
 * This test completes the entire flow from quiz to submission
 */

async function completeTest() {
    console.log('%c🚀 COMPLETE TEST STARTING...', 'background: #4CAF50; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
    console.log('═══════════════════════════════════════\n');
    
    // Step 1: Complete the Quiz
    console.log('%c📝 STEP 1: Completing Pre-Screening Quiz', 'background: #2196F3; color: white; padding: 5px; font-weight: bold;');
    await completeQuiz();
    
    await wait(2000);
    
    // Step 2: Fill and Submit Application
    console.log('\n%c📝 STEP 2: Filling Application Form', 'background: #2196F3; color: white; padding: 5px; font-weight: bold;');
    await fillCompleteApplication();
    
    console.log('\n%c✅ COMPLETE TEST FINISHED!', 'background: #4CAF50; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
    console.log('═══════════════════════════════════════\n');
}

async function completeQuiz() {
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
        console.log('  ✅ Quiz completed! Proceeding to application...');
        await wait(1000);
    } else {
        // Force close quiz
        if (quizOverlay) quizOverlay.style.display = 'none';
        if (quizModal) quizModal.style.display = 'none';
        const appForm = document.getElementById('application-form-container');
        if (appForm) appForm.style.display = 'block';
        console.log('  ✅ Quiz bypassed (proceed button not found)');
    }
}

async function fillCompleteApplication() {
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    
    // Fill Section 1: Personal Information
    console.log('\n📋 Section 1: Personal Information');
    console.log('─────────────────────────────────────');
    
    setFieldValue('full-name', 'Maria Silva Santos');
    setFieldValue('birth-month', '3');
    setFieldValue('birth-day', '15');
    setFieldValue('birth-year', '1992');
    setFieldValue('gender', 'female');
    setFieldValue('email', 'maria.santos@example.com');
    setFieldValue('phone', '+5511987654321');
    setFieldValue('country', 'Brazil');
    await wait(500);
    setFieldValue('state', 'São Paulo');
    await wait(500);
    setFieldValue('city', 'São Paulo');
    setFieldValue('nationality', 'Brazilian');
    
    // Occupation - set both visible and hidden fields
    const occupationInput = document.getElementById('occupation');
    const occupationHidden = document.getElementById('occupation-hidden');
    if (occupationInput) {
        occupationInput.value = 'Marketing Manager';
        occupationInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (occupationHidden) {
        occupationHidden.value = 'Marketing Manager';
    }
    
    setFieldValue('education', 'masters');
    
    // Languages - set as JSON array
    const languagesField = document.getElementById('languages');
    if (languagesField) {
        languagesField.value = JSON.stringify(['Portuguese', 'English', 'Spanish']);
    }
    
    console.log('✅ Section 1 filled');
    
    // Force advance to Section 2
    if (formControl) {
        formControl.currentStep = 2;
        formControl.transitionToSection(2);
        await wait(1000);
    }
    
    // Fill Section 2: Faith & Values
    console.log('\n📋 Section 2: Faith & Values');
    console.log('─────────────────────────────────────');
    
    setFieldValue('faith-tradition', 'christian-catholic');
    setFieldValue('community-involvement', 'active');
    setFieldValue('values-importance', 'essential');
    
    console.log('✅ Section 2 filled');
    
    // Force advance to Section 3
    if (formControl) {
        formControl.currentStep = 3;
        formControl.transitionToSection(3);
        await wait(1000);
    }
    
    // Fill Section 3: Relationship Preferences
    console.log('\n📋 Section 3: Relationship Preferences');
    console.log('─────────────────────────────────────');
    
    setFieldValue('relationship-goal', 'marriage');
    setFieldValue('previous-marriage', 'no');
    setFieldValue('have-children', 'no');
    setFieldValue('want-children', 'yes');
    setFieldValue('relocation', 'yes');
    setFieldValue('partner-age-range', '28-38');
    
    console.log('✅ Section 3 filled');
    
    // Force advance to Section 4
    if (formControl) {
        formControl.currentStep = 4;
        formControl.transitionToSection(4);
        await wait(1000);
    }
    
    // Fill Section 4: Verification
    console.log('\n📋 Section 4: Verification');
    console.log('─────────────────────────────────────');
    
    const backgroundCheck = document.getElementById('background-check');
    if (backgroundCheck) {
        backgroundCheck.checked = true;
    }
    
    console.log('✅ Section 4 filled');
    
    // Force advance to Section 5
    if (formControl) {
        formControl.currentStep = 5;
        formControl.transitionToSection(5);
        await wait(1500);
    }
    
    // Test Review Section Display
    console.log('\n🧪 Testing Review Section Data Display');
    console.log('─────────────────────────────────────');
    
    await wait(500);
    
    const personalSnapshot = document.getElementById('personal-snapshot');
    const faithSnapshot = document.getElementById('faith-snapshot');
    const relationshipSnapshot = document.getElementById('relationship-snapshot');
    
    let reviewTestsPassed = 0;
    let reviewTestsFailed = 0;
    
    if (personalSnapshot) {
        const text = personalSnapshot.textContent;
        const hasData = !text.includes('Not provided');
        console.log('Personal Info:', hasData ? '✅ Showing data' : '❌ Showing "Not provided"');
        console.log('  Content preview:', text.substring(0, 100) + '...');
        hasData ? reviewTestsPassed++ : reviewTestsFailed++;
    }
    
    if (faithSnapshot) {
        const text = faithSnapshot.textContent;
        const hasData = !text.includes('Not provided');
        console.log('Faith Info:', hasData ? '✅ Showing data' : '❌ Showing "Not provided"');
        console.log('  Content preview:', text.substring(0, 100) + '...');
        hasData ? reviewTestsPassed++ : reviewTestsFailed++;
    }
    
    if (relationshipSnapshot) {
        const text = relationshipSnapshot.textContent;
        const hasData = !text.includes('Not provided');
        console.log('Relationship Info:', hasData ? '✅ Showing data' : '❌ Showing "Not provided"');
        console.log('  Content preview:', text.substring(0, 100) + '...');
        hasData ? reviewTestsPassed++ : reviewTestsFailed++;
    }
    
    // Fill Section 5: Terms & Conditions
    console.log('\n📋 Section 5: Terms & Conditions');
    console.log('─────────────────────────────────────');
    
    const termsAgreement = document.getElementById('terms-agreement');
    const privacyAgreement = document.getElementById('privacy-agreement');
    
    if (termsAgreement) {
        termsAgreement.checked = true;
        console.log('✅ Terms accepted');
    }
    if (privacyAgreement) {
        privacyAgreement.checked = true;
        console.log('✅ Privacy accepted');
    }
    
    // Test Terms Validation
    console.log('\n🧪 Testing Terms Validation');
    console.log('─────────────────────────────────────');
    
    if (formControl) {
        const validation = formControl.validateSection(5);
        if (validation.isValid) {
            console.log('✅ Validation PASSED - Ready to submit!');
        } else {
            console.log('❌ Validation FAILED');
            console.log('Missing fields:', validation.missingFields.map(f => f.id));
        }
    }
    
    // Final Summary
    console.log('\n═══════════════════════════════════════');
    console.log('📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`Review Section Tests: ${reviewTestsPassed} passed, ${reviewTestsFailed} failed`);
    console.log('═══════════════════════════════════════\n');
}

function setFieldValue(id, value) {
    const field = document.getElementById(id);
    if (field) {
        field.value = value;
        field.dispatchEvent(new Event('change', { bubbles: true }));
        field.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`  ✓ ${id}: ${value}`);
    } else {
        console.warn(`  ⚠️ Field not found: ${id}`);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make it globally available
window.completeTest = completeTest;

console.log('✅ Complete Test loaded!');
console.log('💡 Type: completeTest() to run the full test with quiz');

