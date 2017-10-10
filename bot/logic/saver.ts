// Saves to database

import * as datastore from '@google-cloud/datastore'

// Local Imports
const coins = require('../parameters/coins');
const datastore = Datastore();

// Instantiates a GCloud Data Store client

// save price data 
// save mktprice
// save USD

// TODO: save USD rate
// TODO: save inflatio rate


export async function coinSaver(symbol: string, coinData: object) {
    console.log(`Saving ${coinData} for ${symbol}`)

    datastore.upsert({
        key: datastore.key([
            'Coin',
            symbol,
        ]),
        data: coinData,
    })
        .then(() => {
            console.log(`Saved data for ${symbol}`)
        })
        .catch((error) => {
            console.log(`Error saving data for ${symbol}: ${err.stack}`)
        });
};

exports.exchangeDataSaver = async (symbol, exchangeData) => {
    console.log(`Saving Exchange Data for [%s] to Google DataStore...', symbol);

    const timestamp = new Date().toISOString();
    // Key
    let key = datastore.key([
        'Coin',
        symbol,
        'Market',
        timestamp,
    ]);

    const entity = {
        key: key,
        data: coinData,
    };

    datastore.upsert(entity) // Overwrite, not insert
        .then(() => {
            console.log(`Saved Market Data for [%s]', symbol);
        })
        .catch((error) => {
    winston.error('Error saving Market Data for [%s]', symbol);
    winston.error(error);
});
};
exports.marketDataSaver = async (symbol, coinData) => {
    console.log(`Saving Market Data for [%s] to Google DataStore...', symbol);

    const timestamp = new Date().toISOString();
    // Key
    let key = datastore.key([
        'Coin',
        symbol,
        'Market',
        timestamp,
    ]);

    const entity = {
        key: key,
        data: coinData,
    };

    datastore.upsert(entity) // Overwrite, not insert
        .then(() => {
            console.log(`Saved Market Data for [%s]', symbol);
        })
        .catch((error) => {
    winston.error('Error saving Market Data for [%s]', symbol);
    winston.error(error);
});
};

// Initialize Google Data Store 
// Parent Entity: Coin, 'Symbol'

// coins.map(symbol => exports.coinSaver(symbol))


