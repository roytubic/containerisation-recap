import { getDebtAmount } from './debtAmount.js';
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import 'dotenv/config';

async function main() {
    // Get env variables
    const INFLUX_API = process.env.INFLUX_API
    const ORG_NAME = process.env.ORG_NAME
    const BUCKET_NAME = process.env.BUCKET_NAME
    const AUTH_TOKEN = process.env.WRITE_USER_TOKEN

    // Set up client
    const influxDB = new InfluxDB({url: INFLUX_API, token: AUTH_TOKEN})
    const writeApi = influxDB.getWriteApi(ORG_NAME, BUCKET_NAME)

    // Run the datapoint
    const debtAmount = await getDebtAmount();
    console.log(debtAmount)
    console.log(`The total debt amount is ${debtAmount}`);
    const debtAmountFloat = parseFloat(debtAmount.replace(/,/g, '')); 
    console.log(debtAmountFloat)
    const point1 = new Point('NZ-debt').tag('sensor_id', 'TLM01').floatField('value', debtAmountFloat)
    console.log(` ${point1}`)


    writeApi.writePoint(point1)


    writeApi.close().then(() => {
        console.log('WRITE FINISHED')
    })
    .catch((e) => {
        console.error(e);
        console.log('\\nFinished Error')
    })
}

setInterval(main, 10000);
