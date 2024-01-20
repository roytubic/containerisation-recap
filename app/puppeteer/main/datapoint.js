const getDebtAmount = require('./debtAmount.js');

async function main() {
    const debtAmount = await getDebtAmount();
    console.log(debtAmount)
    console.log(`The total debt amount is ${debtAmount}`);
}

main().catch(console.error);
