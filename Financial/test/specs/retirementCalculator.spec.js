const RetirementCalculatorPage = require('../pageobjects/retirementCalculator.page');

describe('Securian Retirement Calculator', () => {
    const sampleData = {
        currentAge: 40,
        retirementAge: 68,
        currentIncome: 100000,
        spouseIncome: 75000,
        currentRetirementSavings: 500000,
        retirementContribution: 10,
        retirementContributionIncrease: 0.25,
        socialSecurityBenefits: 'yes',
        relationshipStatus: 'Married',
        socialSecurityOverride: 4000,
        additionalIncome: 500,
        retirementDuration: 20,
        postRetirementIncomeIncrease: true,
        finalIncomeDesired: 75,
        preRetirementReturn: 8,
        postRetirementReturn: 5
    };

    beforeAll(async () => {
        await RetirementCalculatorPage.open();
        
    });

    it('should fill and submit the form with required fields', async () => {
        await RetirementCalculatorPage.fillForm(sampleData);
        await RetirementCalculatorPage.submit();
        

        // Add assertions to validate the results
    });

    it('should toggle Social Security fields based on benefits selection', async () => {
        await RetirementCalculatorPage.socialSecurityBenefitsNo.click();
        await expect(RetirementCalculatorPage.socialSecurityOverride).not.toBeDisplayed();

        await RetirementCalculatorPage.socialSecurityBenefitsYes.click();
        await expect(RetirementCalculatorPage.socialSecurityOverride).toBeDisplayed();
    });

    it('should update default calculator values', async () => {
        await RetirementCalculatorPage.currentAge.setValue(45);
        await RetirementCalculatorPage.retirementAge.setValue(70);
        // Continue updating other fields as required
        // Add assertions if necessary
    });
});
