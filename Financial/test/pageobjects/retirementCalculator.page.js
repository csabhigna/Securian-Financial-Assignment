class RetirementCalculatorPage {
    get currentAge() { return $('#current-age'); }
    get retirementAge() { return $('#retirement-age'); }
    get currentIncome() { return $('#current-income'); }
    get spouseIncome() { return $('#spouse-income'); }
    get currentRetirementSavings() { return $('#current-retirement-savings'); }
    get retirementContribution() { return $('#retirement-contribution'); }
    get retirementContributionIncrease() { return $('#retirement-contribution-increase'); }
    get socialSecurityBenefitsYes() { return $('input[name="social-security-benefits"][value="yes"]'); }
    get socialSecurityBenefitsNo() { return $('input[name="social-security-benefits"][value="no"]'); }
    get relationshipStatus() { return $('#relationship-status'); }
    get socialSecurityOverride() { return $('#social-security-override'); }
    get additionalIncome() { return $('#additional-income'); }
    get retirementDuration() { return $('#retirement-duration'); }
    get postRetirementIncomeIncrease() { return $('input[name="post-retirement-income-increase"]'); }
    get finalIncomeDesired() { return $('#final-income-desired'); }
    get preRetirementReturn() { return $('#pre-retirement-return'); }
    get postRetirementReturn() { return $('#post-retirement-return'); }
    get calculateButton() { return $('button=Calculate'); }

    async open() {
        await browser.url('/insights-tools/retirement-calculator.html');
    }

    async fillForm(data) {
        await this.currentAge.setValue(data.currentAge);
        await this.retirementAge.setValue(data.retirementAge);
        await this.currentIncome.setValue(data.currentIncome);
        await this.spouseIncome.setValue(data.spouseIncome);
        await this.currentRetirementSavings.setValue(data.currentRetirementSavings);
        await this.retirementContribution.setValue(data.retirementContribution);
        await this.retirementContributionIncrease.setValue(data.retirementContributionIncrease);
        if (data.socialSecurityBenefits === 'yes') {
            await this.socialSecurityBenefitsYes.click();
        } else {
            await this.socialSecurityBenefitsNo.click();
        }
        await this.relationshipStatus.selectByVisibleText(data.relationshipStatus);
        if (data.socialSecurityBenefits === 'yes') {
            await this.socialSecurityOverride.setValue(data.socialSecurityOverride);
        }
        await this.additionalIncome.setValue(data.additionalIncome);
        await this.retirementDuration.setValue(data.retirementDuration);
        await this.postRetirementIncomeIncrease.click();
        await this.finalIncomeDesired.setValue(data.finalIncomeDesired);
        await this.preRetirementReturn.setValue(data.preRetirementReturn);
        await this.postRetirementReturn.setValue(data.postRetirementReturn);
    }

    async submit() {
        await this.calculateButton.click();
    }
}

module.exports = new RetirementCalculatorPage();
