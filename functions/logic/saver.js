// Saves to GcloudDataStore
exports = module.exports = {};

let winston = require('winston');
let Datastore = require('@google-cloud/datastore'); //  gcloud beta auth application-default login
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication


// Local Imports
const coins = require('../parameters/coins');
const datastore = Datastore();

// Instantiates a GCloud Data Store client

// save price data 
// save mktprice
// save USD

// TODO: save USD rate
// TODO: save inflatio rate


exports.coinSaver = async (symbol, coinData) => {
    winston.info('Replacing Coin Data for [%s] to Google DataStore...', symbol);
    // Upsert/Replace the Entity at the Data Store using the Key

    datastore.upsert({
        key: datastore.key([
            'Coin',
            symbol,
        ]),
        data: coinData,
    })
        .then(() => {
            winston.info('Saving Coin [%s]', symbol);
        })
        .catch((error) => {
            winston.error('Error saving Coin [%s]', symbol);
            winston.error(error);
        });
};

exports.exchangeDataSaver = async (symbol, exchangeData) => {
    winston.info('Saving Exchange Data for [%s] to Google DataStore...', symbol);

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
            winston.info('Saved Market Data for [%s]', symbol);
        })
        .catch((error) => {
            winston.error('Error saving Market Data for [%s]', symbol);
            winston.error(error);
        });
};
exports.marketDataSaver = async (symbol, coinData) => {
    winston.info('Saving Market Data for [%s] to Google DataStore...', symbol);

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
            winston.info('Saved Market Data for [%s]', symbol);
        })
        .catch((error) => {
            winston.error('Error saving Market Data for [%s]', symbol);
            winston.error(error);
        });
};

// Initialize Google Data Store 
// Parent Entity: Coin, 'Symbol'

// coins.map(symbol => exports.coinSaver(symbol))


