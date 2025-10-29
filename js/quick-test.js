/**
 * QUICK TEST - Direct section navigation and data verification
 * Bypasses validation to test data display
 */

async function quickTest() {
    console.log('🚀 Starting Quick Test...');
    console.log('═══════════════════════════════════════\n');
    
    // Close quiz
    const quizOverlay = document.querySelector('.quiz-overlay');
    if (quizOverlay) {
        quizOverlay.classList.add('hidden');
    }
    const appForm = document.getElementById('application-form-container');
    if (appForm) {
        appForm.style.display = 'block';
    }
    
    await wait(500);
    
    // Fill Section 1
    console.log('📝 Filling Section 1...');
    document.getElementById('full-name').value = 'John Smith';
    document.getElementById('birth-month').value = '6';
    document.getElementById('birth-day').value = '15';
    document.getElementById('birth-year').value = '1990';
    document.getElementById('gender').value = 'male';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('phone').value = '+1234567890';
    document.getElementById('country').value = 'United States';
    await wait(300);
    document.getElementById('state').value = 'California';
    await wait(300);
    document.getElementById('city').value = 'Los Angeles';
    document.getElementById('nationality').value = 'American';
    document.getElementById('occupation').value = 'Software Engineer';
    document.getElementById('education').value = 'bachelors';
    document.getElementById('languages').value = JSON.stringify(['English', 'Spanish']);
    console.log('✅ Section 1 filled\n');
    
    // Fill Section 2
    console.log('📝 Filling Section 2...');
    document.getElementById('faith-tradition').value = 'christian-catholic';
    document.getElementById('community-involvement').value = 'active';
    document.getElementById('values-importance').value = 'essential';
    console.log('✅ Section 2 filled\n');
    
    // Fill Section 3
    console.log('📝 Filling Section 3...');
    document.getElementById('relationship-goal').value = 'marriage';
    document.getElementById('previous-marriage').value = 'no';
    document.getElementById('have-children').value = 'no';
    document.getElementById('want-children').value = 'yes';
    document.getElementById('relocation').value = 'yes';
    document.getElementById('partner-age-range').value = '25-35';
    console.log('✅ Section 3 filled\n');
    
    // Fill Section 4
    console.log('📝 Filling Section 4...');
    document.getElementById('background-check').checked = true;
    console.log('✅ Section 4 filled\n');
    
    // Navigate directly to Section 5 (bypass validation)
    console.log('➡️ Navigating to Section 5 (Review)...');
    const formControl = window.tesseraFormControl || window.TesseraFormControl;
    if (formControl) {
        formControl.currentStep = 5;
        formControl.transitionToSection(5);
    }
    
    await wait(1500);
    
    // Test Review Section
    console.log('\n🧪 Testing Review Section Data Display');
    console.log('─────────────────────────────────────');
    
    const personalSnapshot = document.getElementById('personal-snapshot');
    const faithSnapshot = document.getElementById('faith-snapshot');
    const relationshipSnapshot = document.getElementById('relationship-snapshot');
    
    if (personalSnapshot) {
        console.log('\n📋 Personal Info Snapshot:');
        console.log(personalSnapshot.textContent);
        const hasData = !personalSnapshot.textContent.includes('Not provided');
        console.log(hasData ? '✅ Has data' : '❌ Showing "Not provided"');
    } else {
        console.log('❌ Personal snapshot element not found');
    }
    
    if (faithSnapshot) {
        console.log('\n📋 Faith Info Snapshot:');
        console.log(faithSnapshot.textContent);
        const hasData = !faithSnapshot.textContent.includes('Not provided');
        console.log(hasData ? '✅ Has data' : '❌ Showing "Not provided"');
    } else {
        console.log('❌ Faith snapshot element not found');
    }
    
    if (relationshipSnapshot) {
        console.log('\n📋 Relationship Info Snapshot:');
        console.log(relationshipSnapshot.textContent);
        const hasData = !relationshipSnapshot.textContent.includes('Not provided');
        console.log(hasData ? '✅ Has data' : '❌ Showing "Not provided"');
    } else {
        console.log('❌ Relationship snapshot element not found');
    }
    
    // Fill terms
    console.log('\n📝 Filling Terms & Conditions...');
    document.getElementById('terms-agreement').checked = true;
    document.getElementById('privacy-agreement').checked = true;
    console.log('✅ Terms filled');
    
    // Test validation
    console.log('\n🧪 Testing Terms Validation...');
    if (formControl) {
        const validation = formControl.validateSection(5);
        console.log('Validation result:', validation.isValid ? '✅ PASSED' : '❌ FAILED');
        if (!validation.isValid) {
            console.log('Missing fields:', validation.missingFields.map(f => f.id));
        }
    }
    
    console.log('\n═══════════════════════════════════════');
    console.log('✅ Quick Test Complete!');
    console.log('═══════════════════════════════════════\n');
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make it globally available
window.quickTest = quickTest;

console.log('✅ Quick Test loaded! Type: quickTest()');

