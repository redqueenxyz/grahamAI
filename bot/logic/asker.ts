
// Retrieves data from Cryptocompare

// TODO: 
// 1) Save symbols to Google Cloud JSON storeA > https://cloud.google.com/datastore/docs/datastore-api-tutorial#datastore-update-entity-nodejs
// Timestamp, get dictionaries of symbols
// 2) On HTTP Request, Cloud Function > getMarketdata(symbols) => update symbol Data
// 3) On HTTP Request, Cloud Function > calcMarketCap()

import * as fetch from 'node-fetch'
import * as cryptocompare from 'cryptocompare'

// Packages
let cryptocompare = require('cryptocompare');

// Local Imports
let { coinSaver, marketDataSaver } = require('./saver');

// Coin list
const coins = require('../parameters/coins');
const datastore = Datastore();

let loopSymbols = async (coins) => {
  console.log(`Looping through Coins:`)

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
        winston.error('Error looping through Coins:`)
        winston.error(error);
      });
  }
};


let getMarketData = async (coin, base = 'BTC', source = 'Cryptocompare') => {
  console.log(`Retrieving Price Data for [%s] from %s`)

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
      console.log(`Error retrieving Price Data for [%s]`)
    });
};


let calcMarketCap = async () => {
  console.log(`Calculating current Total Market Cap...');

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

          console.log(`Calculed current Total Market Cap:', TotalMarketCap);
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
// Runs users through surveys