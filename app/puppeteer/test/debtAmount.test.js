async function setupChai() {
    const chai = await import('chai');
    return chai;
}
  
describe('getDebtAmount Function', function() {
    let expect;

    before(async function() {
        const chai = await setupChai();
        expect = chai.expect;
        this.timeout(30000); // Extend timeout for Puppeteer operations
    });

    it('should fetch debt amount as a string', async function() {
        const getDebtAmount = require('../main/debtAmount');
        const debtAmount = await getDebtAmount();
        expect(debtAmount).to.be.a('string');
        expect(debtAmount).to.match(/^[\d,]+$/); // regex match for a string that includes digits and commas
    });
});
  
