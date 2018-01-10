// Retrieves data from Cryptocompare

// TODO: 
// 1) Save symbols to Google Cloud JSON storeA > https://cloud.google.com/datastore/docs/datastore-api-tutorial#datastore-update-entity-nodejs
// Timestamp, get dictionaries of symbols
// 2) On HTTP Request, Cloud Function > getMarketdata(symbols) => update symbol Data
// 3) On HTTP Request, Cloud Function > calcMarketCap()

global.fetch = require('node-fetch');

// Packages
let cryptocompare = require('cryptocompare');
let winston = require('winston');
let Datastore = require('@google-cloud/datastore'); //  gcloud beta auth application-default login

// Local Imports
let {coinSaver, marketDataSaver} = require('./saver');

// Coin list
const coins = require('../parameters/coins');
const datastore = Datastore();

let loopSymbols = async (coins) => {
    winston.info('Looping through Coins:', coins);

    for (let coin = 0; coin < coins.length; coin++) {
        const symbol = coins[coin];

        const currentMarketCap = await calcMarketCap();
        getMarketData(symbol)

            .then((priceData) => {
                // Custom Measures
                priceData['TIMESTAMP'] = new Date().toISOString(); // Timestamp
                priceData['MKTSHARE'] = priceData['MKTCAP'] / currentMarketCap;

                // Save Data
                coinSaver(symbol, priceData);
                marketDataSaver(symbol, priceData);
            })
            .catch((error) => {
                winston.error('Error looping through Coins:', coins);
                winston.error(error);
            });
    }
};


let getMarketData = async (coin, base = 'BTC', source = 'Cryptocompare') => {
    winston.info('Retrieving Price Data for [%s] from %s', coin, source);

    // TODO: Wrapper for cryptocompare / market APIs?
    // switch (source) {
    // case 'Cryptocompare':
    return cryptocompare.priceFull([coin], [base])
        .then((priceData) => {
            winston.info(priceData);
            priceData[coin][base]['SOURCE'] = 'https://www.cryptocompare.com/api/';
            return priceData[coin][base];
        })
        .catch((error) => {
            winston.info('Error retrieving Price Data for [%s]', coin);
            winston.error(error);
        });
};


let calcMarketCap = async () => {
    winston.info('Calculating current Total Market Cap...');

    const query = datastore.createQuery('Coin')
        .groupBy('MKTCAP');


    return datastore.runQuery(query)
        .then((results) => {
            const coins = results[0];

            let coinMarketCaps = [];
            coins.map((coin) => {
                coinMarketCaps.push(coin['MKTCAP']);
            }); // Map and pull from JSON FIXME: Way to do it by just pulling MKTCAP, not whole array?

            let TotalMarketCap = coinMarketCaps.reduce((a, b) => a + b); // sum

            winston.info('Calculed current Total Market Cap:', TotalMarketCap);
            return TotalMarketCap;
        })
        .catch((error) => {
            winston.error('Error calculating current Total Market Cap...');
        });
};

// console.log(coins[0])
// getMarketData(coins[0])
// loopSymbols(coins.slice(0, 2))
loopSymbols(coins);
