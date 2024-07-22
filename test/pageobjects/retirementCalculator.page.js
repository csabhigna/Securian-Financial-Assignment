const { browser } = require('@wdio/globals')

class RetirementCalculatorPage {
    get currentAge() { return $('#current-age'); }
    get retirementAge() { return $('#retirement-age'); }
    get currentIncome() { return $('#current-income'); }
    get spouseIncome() { return $('#spouse-income'); }
    get currentRetirementSavings() { return $('#current-total-savings'); }
    get retirementContribution() { return $('#current-annual-savings'); }
    get retirementContributionIncrease() { return $('#savings-increase-rate'); }
    get socialSecurityBenefitsYes() { return $('//*[@id="include-social-container"]/ul/li[1]/label'); }
    get socialSecurityBenefitsNo() { return $('//*[@id="include-social-container"]/ul/li[2]/label'); }
    get martialStatusSingle(){ return $('//*[@id="marital-status-ul"]/li[1]/label'); }
    get martialStatusMarried(){ return $('//*[@id="marital-status-ul"]/li[2]/label'); }
    get socialSecurityOverride() { return $('//*[@id="social-security-override"]'); }
    get submitButton() { return $('//*[@id="retirement-form"]/div[4]/div[2]/div[1]/button'); }
    get preRetirementSubmission() { return $('//*[@id="calculator-intro-section"]/h2'); }
    get resultsPage() { return $('//*[@id="calculator-results-container"]/h3'); }
    
    
    async open() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    }

    async fillForm(data) {
        await this.currentAge.setValue(String(data.currentAge));
        await this.retirementAge.setValue(String(data.retirementAge));
        await this.currentIncome.click();
        await this.currentIncome.setValue(String(data.currentIncome));
        await this.spouseIncome.click();
        await this.spouseIncome.setValue(String(data.spouseIncome));
        await this.currentRetirementSavings.click();
        await this.currentRetirementSavings.setValue(String(data.currentRetirementSavings));
        await this.retirementContribution.click();
        await this.retirementContribution.setValue(String(data.retirementContribution));
        await this.retirementContributionIncrease.click();
        await this.retirementContributionIncrease.setValue(String(data.retirementContributionIncrease));

        if (data.socialSecurityBenefits === 'yes') {
            await this.socialSecurityBenefitsYes.click();
            
            if (data.relationshipStatus === 'Married') {
                await this.martialStatusMarried.click();
            } 
            await browser.pause(1000);
            await this.socialSecurityOverride.click();
            await this.socialSecurityOverride.setValue(String(data.socialSecurityOverride));
            
        } else {
            await this.socialSecurityBenefitsNo.click();
        }
        
        
    }

    async submitForm() {
        await this.submitButton.click();
        
    }

    async verifyResult() {
        await expect(this.resultsPage).toBeDisplayed();
    }

    
}

module.exports = new RetirementCalculatorPage();
