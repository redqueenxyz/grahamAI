
// Buys coin from Exchange
require('dotenv').config();

// Packages
const Kraken = require('kraken-api');
const fs = require('fs');
const util = require('util');

// exchange Settings
// Kraken
// Set an higher timeout 
const exchange = new Kraken(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET, {
    timeout: 60 * 60 * 48 * 1000,
});

const investmentAmount = process.env.INVESTMENT_AMOUNT;
// see full list of exhange pairs here
// https://api.kraken.com/0/public/AssetPairs
const pair = (process.env.ASSETS_PAIR || 'XBTCZEUR').toUpperCase();
const cryptoCurrency = pair.split('X')[1].slice(0, 3);
const fiatCurrency = pair.split('Z')[1].slice(0, 3);

/**
 * @param {string} pairname
 * @return {object} marketData 
 *  
 */
let getExchangeData = async (coin, base = 'BTC') => {
    const interval = 60;
    const tickResponse = await client.api('OHLC', { pair, interval });
    // a = ask array(<price>, <whole lot volume>, <lot volume>),
    // b = bid array(<price>, <whole lot volume>, <lot volume>),
    // c = last trade closed array(<price>, <lot volume>),
    // v = volume array(<today>, <last 24 hours>),
    // p = volume weighted average price array(<today>, <last 24 hours>),
    // t = number of trades array(<today>, <last 24 hours>),
    // l = low array(<today>, <last 24 hours>),
    // h = high array(<today>, <last 24 hours>),
    // o = today's opening price
    console.log(tickResponse);
};


getExchangeData();

let loopSymbols = async (coins) => {
    console.log(`Looping through Coins:`)


        .then((priceData) => {
            // Custom Measures
            priceData['TIMESTAMP'] = new Date().toISOString(); // Timestamp
            priceData['MKTSHARE'] = priceData['MKTCAP'] / currentMarketCap;

            // Save Data
            coinSaver(symbol, priceData);
            marketDataSaver(symbol, priceData);
        })
        .catch((error) => {
            winston.error('Error looping through Coins:`)
        winston.error(error);
        });
}
};
console.log(pair);
// (

//     async () => {
//         try {
//             // Retrieve crypto/eur price
//             const cryptoPrice = tickResponse['result'][pair]['a'][0];
//             if (typeof cryptoPrice === 'undefined') {
//                 console.log(`Unable to retrieve ${cryptoCurrency} price`);
//                 return;
//             }
//             const volumeToBuy = (investmentAmount / cryptoPrice).toFixed(6);
//             const roundedInvestmentAmount = (volumeToBuy * cryptoPrice).toFixed(3);

//             // Kraken does not allow to buy less than 0.002XBT
//             if (volumeToBuy < 0.002) {
//                 console.log(`Increase your investment amount.`,
//                     `You must buy at least 0.002 ${cryptoCurrency} per trade`);
//                 return;
//             }
//             const logMessage = util.format(`[${timestamp()}] Buying ${volumeToBuy} ${cryptoCurrency}`,
//                 `which is equal to ${roundedInvestmentAmount} ${fiatCurrency}`,
//                 `at price ${cryptoPrice} ${fiatCurrency}/${cryptoCurrency}\n`);
//             // Log prices to file
//             fs.appendFile('buy.log', logMessage, (err) => {
//                 if (err) {
//                     console.log('An error has occured');
//                     console.log(err);
//                     return;
//                 }
//             });
//             // buy disposed amount for today
//             const tradeResponse = await client.api('AddOrder', {
//                 pair,https://api.kraken.com/0/public/AssetPairs
//                 volume: volumeToBuy,
//                 type: 'buy',
//                 ordertype: 'market',
//             });
//             // Retrieve and log transaction ids
//             const txIds = tradeResponse['result']['txid'];
//             if (typeof txIds === 'undefined') {
//                 console.log('Unable to read transaction ids');
//                 return;
//             }
//             console.log(util.format(`[${timestamp()}] Trade completed successfully: ${txIds}`));
//         } catch (e) {
//             console.log(e);
//             // Log to file in case of failure
//             fs.appendFile('buy.log', util.format(`[${timestamp()}] Unable to perform operation: ${e}`), (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         }
//     })();