// Saves data to a database

import * as datastore from '@google-cloud/datastore'

// Local Imports
const coins = require('../parameters/coins');

// Google Cloud Datastore
const datastore = Datastore();

// TODO: Add these variables?
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
        .catch(error => {
            console.log(`Error saving data for ${symbol}: ${err.stack}`)
        });
};

/**
 * 
 * @param symbol {string} - Crypto ticker symbol
 * @param exchangeData {object} - Kraken data response
 */
export async function exchangeDataSaver(symbol: string, exchangeData: object) {
    console.log(`Saving Exchange Data for ${symbol} to Google DataStore...`);

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
            console.log(`Saved Market Data for ${symbol}`)
        })
        .catch(error => {
            console.log(`Error saving Market Data for ${symbol}: ${err.stack}`)
        });
};

/**
 * Saves market data from Cryptowatch to Cloud DataStore
 * @param symbol {string} - coinID
 * @param coinData {object} - coinData
 */
export async function marketDataSaver(symbol: string, coinData: object) {
    console.log(`Saving Market Data for ${symbol} to Google DataStore`)

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
            console.log(`Saved Market Data for ${symbol}`)
        })
        .catch(error => {
            console.log(`Error saving Market Data for ${symbol}: ${err.stack}`)
        });
};

// Parent Entity: Coin, 'Symbol'
// Initialize Google Data Store 
// coins.map(symbol => exports.coinSaver(symbol))


