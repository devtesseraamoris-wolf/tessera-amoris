/**
 * AUTOMATED TEST SUITE - Tessera Amoris
 * Automatically fills forms and tests all functionality
 * 
 * Usage:
 * 1. Open application.html in browser
 * 2. Open console (F12)
 * 3. Type: startAutoTest()
 * 4. Watch the magic happen!
 */

class AutoTestSuite {
    constructor() {
        this.testData = {
            // Personal Information (Section 1)
            personal: {
                fullName: 'John Michael Smith',
                birthMonth: '6',
                birthDay: '15',
                birthYear: '1990',
                gender: 'male',
                email: 'john.smith@example.com',
                phone: '+1234567890',
                country: 'United States',
                state: 'California',
                city: 'Los Angeles',
                nationality: 'American',
                occupation: 'Software Engineer',
                education: 'bachelors'
            },
            
            // Faith & Values (Section 2)
            faith: {
                faithTradition: 'christian-catholic',
                communityInvolvement: 'active',
                valuesImportance: 'essential'
            },
            
            // Relationship Preferences (Section 3)
            relationship: {
                relationshipGoal: 'marriage',
                previousMarriage: 'no',
                haveChildren: 'no',
                wantChildren: 'yes',
                relocation: 'yes',
                partnerLocation: 'anywhere',
                partnerAgeRange: '25-35'
            },
            
            // Verification (Section 4)
            verification: {
                backgroundCheck: true
            },
            
            // Review & Terms (Section 5)
            review: {
                termsAgreement: true,
                privacyAgreement: true
            }
        };
        
        this.currentSection = 1;
        this.testResults = [];
        this.isRunning = false;
    }

    /**
     * Start the automated test
     */
    async start() {
        if (this.isRunning) {
            console.warn('⚠️ Test already running!');
            return;
        }

        this.isRunning = true;
        this.testResults = [];
        
        console.log('🚀 Starting Automated Test Suite...');
        console.log('═══════════════════════════════════════');
        
        try {
            // Close quiz modal if open
            await this.closeQuizModal();
            
            // Fill each section
            await this.fillSection1();
            await this.wait(1000);
            
            await this.goToNextSection();
            await this.fillSection2();
            await this.wait(1000);
            
            await this.goToNextSection();
            await this.fillSection3();
            await this.wait(1000);
            
            await this.goToNextSection();
            await this.fillSection4();
            await this.wait(1000);
            
            await this.goToNextSection();
            await this.wait(1000);
            
            // Test review section
            await this.testReviewSection();
            
            // Fill section 5
            await this.fillSection5();
            await this.wait(1000);
            
            // Test terms validation
            await this.testTermsValidation();
            
            // Show results
            this.showResults();
            
        } catch (error) {
            console.error('❌ Test failed:', error);
            this.logResult('Test Execution', false, error.message);
        } finally {
            this.isRunning = false;
        }
    }

    /**
     * Close quiz modal if it's open
     */
    async closeQuizModal() {
        const quizOverlay = document.querySelector('.quiz-overlay');
        if (quizOverlay && !quizOverlay.classList.contains('hidden')) {
            console.log('📋 Closing quiz modal...');
            quizOverlay.classList.add('hidden');
            
            // Show application form
            const appForm = document.getElementById('application-form-container');
            if (appForm) {
                appForm.style.display = 'block';
            }
        }
    }

    /**
     * Fill Section 1: Personal Information
     */
    async fillSection1() {
        console.log('\n📝 Filling Section 1: Personal Information');
        console.log('─────────────────────────────────────');
        
        const data = this.testData.personal;
        
        // Basic fields
        this.setFieldValue('full-name', data.fullName);
        this.setFieldValue('birth-month', data.birthMonth);
        this.setFieldValue('birth-day', data.birthDay);
        this.setFieldValue('birth-year', data.birthYear);
        this.setFieldValue('gender', data.gender);
        this.setFieldValue('email', data.email);
        this.setFieldValue('phone', data.phone);
        
        // Location fields
        this.setFieldValue('country', data.country);
        await this.wait(500);
        this.setFieldValue('state', data.state);
        await this.wait(500);
        this.setFieldValue('city', data.city);
        
        // Nationality
        this.setFieldValue('nationality', data.nationality);
        
        // Occupation (special handling)
        const occupationInput = document.getElementById('occupation');
        if (occupationInput) {
            occupationInput.value = data.occupation;
            occupationInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Education
        this.setFieldValue('education', data.education);
        
        // Languages (simulate selection)
        const languagesInput = document.getElementById('languages');
        if (languagesInput) {
            languagesInput.value = JSON.stringify(['English', 'Spanish']);
            languagesInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        console.log('✅ Section 1 filled');
        this.logResult('Section 1: Personal Info', true);
    }

    /**
     * Fill Section 2: Faith & Values
     */
    async fillSection2() {
        console.log('\n📝 Filling Section 2: Faith & Values');
        console.log('─────────────────────────────────────');
        
        const data = this.testData.faith;
        
        this.setFieldValue('faith-tradition', data.faithTradition);
        this.setFieldValue('community-involvement', data.communityInvolvement);
        this.setFieldValue('values-importance', data.valuesImportance);
        
        console.log('✅ Section 2 filled');
        this.logResult('Section 2: Faith & Values', true);
    }

    /**
     * Fill Section 3: Relationship Preferences
     */
    async fillSection3() {
        console.log('\n📝 Filling Section 3: Relationship Preferences');
        console.log('─────────────────────────────────────');
        
        const data = this.testData.relationship;
        
        this.setFieldValue('relationship-goal', data.relationshipGoal);
        this.setFieldValue('previous-marriage', data.previousMarriage);
        this.setFieldValue('have-children', data.haveChildren);
        this.setFieldValue('want-children', data.wantChildren);
        this.setFieldValue('relocation', data.relocation);
        this.setFieldValue('partner-location', data.partnerLocation);
        this.setFieldValue('partner-age-range', data.partnerAgeRange);
        
        console.log('✅ Section 3 filled');
        this.logResult('Section 3: Relationship', true);
    }

    /**
     * Fill Section 4: Verification
     */
    async fillSection4() {
        console.log('\n📝 Filling Section 4: Verification');
        console.log('─────────────────────────────────────');
        
        const data = this.testData.verification;
        
        const bgCheckbox = document.getElementById('background-check');
        if (bgCheckbox) {
            bgCheckbox.checked = data.backgroundCheck;
            bgCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        console.log('✅ Section 4 filled');
        this.logResult('Section 4: Verification', true);
    }

    /**
     * Fill Section 5: Review & Terms
     */
    async fillSection5() {
        console.log('\n📝 Filling Section 5: Terms & Conditions');
        console.log('─────────────────────────────────────');
        
        const data = this.testData.review;
        
        const termsCheckbox = document.getElementById('terms-agreement');
        if (termsCheckbox) {
            termsCheckbox.checked = data.termsAgreement;
            termsCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Terms checkbox checked');
        }
        
        const privacyCheckbox = document.getElementById('privacy-agreement');
        if (privacyCheckbox) {
            privacyCheckbox.checked = data.privacyAgreement;
            privacyCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Privacy checkbox checked');
        }
        
        this.logResult('Section 5: Terms filled', true);
    }

    /**
     * Test Review Section Data Display
     */
    async testReviewSection() {
        console.log('\n🧪 Testing Review Section Data Display');
        console.log('─────────────────────────────────────');
        
        const tests = [
            { id: 'personal-snapshot', label: 'Personal Info Display' },
            { id: 'faith-snapshot', label: 'Faith Info Display' },
            { id: 'relationship-snapshot', label: 'Relationship Info Display' }
        ];
        
        for (const test of tests) {
            const element = document.getElementById(test.id);
            if (element) {
                const hasData = !element.textContent.includes('Not provided');
                if (hasData) {
                    console.log(`✅ ${test.label}: Data displayed`);
                    this.logResult(test.label, true);
                } else {
                    console.log(`❌ ${test.label}: Showing "Not provided"`);
                    this.logResult(test.label, false, 'Showing "Not provided"');
                }
            } else {
                console.log(`❌ ${test.label}: Element not found`);
                this.logResult(test.label, false, 'Element not found');
            }
        }
    }

    /**
     * Test Terms Validation
     */
    async testTermsValidation() {
        console.log('\n🧪 Testing Terms Validation');
        console.log('─────────────────────────────────────');
        
        // Test 1: Uncheck terms and try to submit
        const termsCheckbox = document.getElementById('terms-agreement');
        const privacyCheckbox = document.getElementById('privacy-agreement');
        
        if (termsCheckbox && privacyCheckbox) {
            // Uncheck
            termsCheckbox.checked = false;
            privacyCheckbox.checked = false;
            
            // Try to validate
            const formControl = window.tesseraFormControl;
            if (formControl) {
                const validation = formControl.validateSection(5);
                
                if (!validation.isValid) {
                    console.log('✅ Validation correctly fails when unchecked');
                    this.logResult('Terms Validation (unchecked)', true);
                } else {
                    console.log('❌ Validation should fail when unchecked');
                    this.logResult('Terms Validation (unchecked)', false, 'Validation passed when it should fail');
                }
            }
            
            // Re-check for final submission
            termsCheckbox.checked = true;
            privacyCheckbox.checked = true;
            
            const validation2 = formControl.validateSection(5);
            if (validation2.isValid) {
                console.log('✅ Validation correctly passes when checked');
                this.logResult('Terms Validation (checked)', true);
            } else {
                console.log('❌ Validation should pass when checked');
                this.logResult('Terms Validation (checked)', false, 'Validation failed when it should pass');
            }
        }
    }

    /**
     * Go to next section
     */
    async goToNextSection() {
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn && nextBtn.style.display !== 'none') {
            console.log(`➡️ Moving to Section ${this.currentSection + 1}`);
            nextBtn.click();
            this.currentSection++;
            await this.wait(1000); // Wait for transition
        }
    }

    /**
     * Set field value
     */
    setFieldValue(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = value;
            } else {
                field.value = value;
            }
            field.dispatchEvent(new Event('change', { bubbles: true }));
            field.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(`  ✓ ${fieldId}: ${value}`);
            return true;
        } else {
            console.warn(`  ⚠️ Field not found: ${fieldId}`);
            return false;
        }
    }

    /**
     * Log test result
     */
    logResult(testName, passed, error = null) {
        this.testResults.push({
            test: testName,
            passed: passed,
            error: error
        });
    }

    /**
     * Show test results
     */
    showResults() {
        console.log('\n');
        console.log('═══════════════════════════════════════');
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('═══════════════════════════════════════');
        
        const passed = this.testResults.filter(r => r.passed).length;
        const failed = this.testResults.filter(r => !r.passed).length;
        const total = this.testResults.length;
        
        console.log(`\nTotal Tests: ${total}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`Success Rate: ${Math.round((passed / total) * 100)}%\n`);
        
        console.log('Detailed Results:');
        console.log('─────────────────────────────────────');
        
        this.testResults.forEach((result, index) => {
            const icon = result.passed ? '✅' : '❌';
            console.log(`${index + 1}. ${icon} ${result.test}`);
            if (result.error) {
                console.log(`   Error: ${result.error}`);
            }
        });
        
        console.log('\n═══════════════════════════════════════');
        
        if (failed === 0) {
            console.log('🎉 ALL TESTS PASSED! Form is ready for submission.');
            console.log('\n💡 You can now click "Submit Application" to test database saving.');
        } else {
            console.log('⚠️ Some tests failed. Please review the errors above.');
        }
        
        console.log('═══════════════════════════════════════\n');
    }

    /**
     * Wait helper
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize and expose globally
window.autoTestSuite = new AutoTestSuite();

// Convenience function
window.startAutoTest = function() {
    window.autoTestSuite.start();
};

console.log('🧪 Auto Test Suite loaded!');
console.log('💡 Type startAutoTest() to begin automated testing');

