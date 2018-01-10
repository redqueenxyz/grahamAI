// Buys coin from Kraken

// Dependencies

// Local
import { exchange } from './env'

const investmentAmount = process.env.INVESTMENT_AMOUNT;
// see full list of exhange pairs here
// https://api.kraken.com/0/public/AssetPairs
const pair = (process.env.ASSETS_PAIR || "XBTCZEUR").toUpperCase();
const cryptoCurrency = pair.split("X")[1].slice(0, 3);
const fiatCurrency = pair.split("Z")[1].slice(0, 3);


let buyOrder = async (coin: string, base: string = "BTC") => {

}

/**
 * Retrieves tradeable pairs from the Kraken Exchange
 *  https://api.kraken.com/0/public/AssetPairs
 */
export let getPairs = async () => {
    return exchange.api("AssetPairs")
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log("FUCK")
            console.log(error)
        })
}

// getPairs()


export let getExchangeData = async (coin: string, base: string = "ETH", interval: Number = 60) => {
    let pair = coin + base

    return exchange.api("OHLC", { pair, interval })
        .then((response) => {
            // a = ask array(<price>, <whole lot volume>, <lot volume>),
            // b = bid array(<price>, <whole lot volume>, <lot volume>),
            // c = last trade closed array(<price>, <lot volume>),
            // v = volume array(<today>, <last 24 hours>),
            // p = volume weighted average price array(<today>, <last 24 hours>),
            // t = number of trades array(<today>, <last 24 hours>),
            // l = low array(<today>, <last 24 hours>),
            // h = high array(<today>, <last 24 hours>),
            // o = today's opening price
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}

// getExchangeData("ETH");

// let loopSymbols = async (coins) => {
//     winston.info('Looping through Coins:', coins);

//             .then((priceData) => {
//     // Custom Measures
//     priceData['TIMESTAMP'] = new Date().toISOString(); // Timestamp
//     priceData['MKTSHARE'] = priceData['MKTCAP'] / currentMarketCap;

//     // Save Data
//     coinSaver(symbol, priceData);
//     marketDataSaver(symbol, priceData);
// })
//     .catch((error) => {
//         winston.error('Error looping through Coins:', coins);
//         winston.error(error);
//     });
//     }
// };
// console.log(pair);

let tradeAttempt = async () => {

    let response = await exchange.api('AddOrder', {
        pair: 'XETHZCAD',
        volume: 0.1,
        type: 'buy',
        ordertype: 'market'
    });

    console.log(response)
}
tradeAttempt()

// let tokenBuyer = async (coin: string, base: string = "BTC") => { }
//     try {
//         // Retrieve crypto/eur price
//         const cryptoPrice = tickResponse['result'][pair]['a'][0];
//         if (typeof cryptoPrice === 'undefined') {
//             console.log(`Unable to retrieve ${cryptoCurrency} price`);
//             return;
//         }
//         const volumeToBuy = (investmentAmount / cryptoPrice).toFixed(6);
//         const roundedInvestmentAmount = (volumeToBuy * cryptoPrice).toFixed(3);

//         // Kraken does not allow to buy less than 0.002XBT
//         if (volumeToBuy < 0.002) {
//             console.log(`Increase your investment amount.`,
//                 `You must buy at least 0.002 ${cryptoCurrency} per trade`);
//             return;
//         }
//         const logMessage = util.format(`[${timestamp()}] Buying ${volumeToBuy} ${cryptoCurrency}`,
//             `which is equal to ${roundedInvestmentAmount} ${fiatCurrency}`,
//             `at price ${cryptoPrice} ${fiatCurrency}/${cryptoCurrency}\n`);
//         // Log prices to file
//         fs.appendFile('buy.log', logMessage, (err) => {
//             if (err) {
//                 console.log('An error has occured');
//                 console.log(err);
//                 return;
//             }
//         });
//         // buy disposed amount for today
//         const tradeResponse = await client.api('AddOrder', {
//             pair, https://api.kraken.com/0/public/AssetPairs
//                 volume: volumeToBuy,
//             type: 'buy',
//             ordertype: 'market',
//         });
//         // Retrieve and log transaction ids
//         const txIds = tradeResponse['result']['txid'];
//         if (typeof txIds === 'undefined') {
//             console.log('Unable to read transaction ids');
//             return;
//         }
//         console.log(util.format(`[${timestamp()}] Trade completed successfully: ${txIds}`));
//     } catch (e) {
//         console.log(e);
//         // Log to file in case of failure
//         fs.appendFile('buy.log', util.format(`[${timestamp()}] Unable to perform operation: ${e}`), (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// }