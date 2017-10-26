
// Buys coin from Exchange

// Packages
import * as Kraken from 'kraken-api'
import * as fs from 'fs'
import * as util from 'util'

// exchange Settings
// Kraken
// Set an higher timeout 
const exchange = new Kraken(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET, {
    timeout: 60 * 60 * 48 * 1000
});

/**
 * Makes Exchange orders.
 * @param volume {Number}: Amount to buy
 * @param coin  {String}: Coin to buy
 * @param base {String}: Coin to buy with
 */
let makeOrder = async (volume: Number, coin: String, base: String = 'CAD') => {
    // see full list of exhange pairs here
    // https://api.kraken.com/0/public/AssetPairs


    let tradeResponse: Function = await exchange.api('Fuck', {
        pair: 'X' + coin + 'Z' + base,
        volume: volume,
        type: 'buy',
        ordertype: 'market'
    })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
}

// checkOrder('XBT')
makeOrder(0.02, 'XBT')
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


// getExchangeData();

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
            console.error(`Error looping through Coins: ${error}`)
        });
}


let checkOrder = async (coin: String, base: String = 'CAD') => {
    exchange.api('Ticker', { "pair": 'X' + coin + 'Z' + base })
        .then(data => {
            console.log(data.result);
        })
        .catch(error => {
            console.log(error);
        })
};