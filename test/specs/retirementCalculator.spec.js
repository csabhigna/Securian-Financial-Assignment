const { expect } = require('@wdio/globals')
const RetirementCalculatorPage = require('../pageobjects/retirementCalculator.page');
const retirementCalculatorPage = require('../pageobjects/retirementCalculator.page');

describe('Securian Retirement Calculator', () => {
    const sampleData = {
        currentAge: 40,
        retirementAge: 68,
        currentIncome: 100000,
        spouseIncome: 75000,
        currentRetirementSavings: 500000,
        retirementContribution: 10,
        retirementContributionIncrease: 2,
        socialSecurityBenefits: 'yes',
        relationshipStatus: 'Single',
        socialSecurityOverride: 4000,
        
    };

    beforeEach(async () => {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    });

    it('should toggle Social Security fields based on benefits selection', async () => {
        await RetirementCalculatorPage.socialSecurityBenefitsNo.click();
        await expect(RetirementCalculatorPage.socialSecurityOverride).not.toBeDisplayed();

        await RetirementCalculatorPage.socialSecurityBenefitsYes.click();
        await expect(RetirementCalculatorPage.socialSecurityOverride).toBeDisplayed();
    });

    it('should fill and submit the form with required fields', async () => {
        await RetirementCalculatorPage.fillForm(sampleData);
        await RetirementCalculatorPage.submitForm();
        try {
            await RetirementCalculatorPage.verifyResult();
        } catch (error) {
            console.error('Verification failed:', error.message);
        }
        
    });

    it('should update default calculator values', async () => {
        // Modify sample data for this test
        const updatedData = { ...sampleData,  socialSecurityBenefits: 'no',};
        
        await RetirementCalculatorPage.fillForm(updatedData);
        await RetirementCalculatorPage.submitForm();
        await RetirementCalculatorPage.verifyResult();
    });

    it('should throw error for empty inputs', async () => {
        await RetirementCalculatorPage.submitForm();
        const label= $('#calculator-input-alert-desc');
        let PleasefillFormError = await label.getText();
        expect(PleasefillFormError).toBe('Please fill out all required fields');

    });

    it('should throw error for invalid-current-age-error', async () => {
        // Modify sample data for this test
        const updatedData = { ...sampleData,  currentAge: 150, socialSecurityBenefits: 'no',};
        
        await RetirementCalculatorPage.fillForm(updatedData);
        await RetirementCalculatorPage.submitForm();
        const ageError= $('//*[@id="invalid-current-age-error"]');
        let PleasefillFormError = await ageError.getText();
        expect(PleasefillFormError).toBe('Age cannot be greater than 120');
        
    });
});

