// Queries APIs for Data

// Package Dependencies
import * as fetch from 'node-fetch'
import * as cryptocompare from 'cryptocompare'

// Local Dependencies
import { coins } from './coins'
import { coinSaver, marketDataSaver } from './saver'

export async function loopSymbols(coins: string[]) {
  console.log(`Looping through {$coin}`)

  for (let coin = 0; coin < coins.length; coin++) {
    const symbol = coins[coin];

    const currentMarketCap = await calcMarketCap();
    getMarketData(symbol)

      .then(priceData => {
        // Custom Measures
        priceData['TIMESTAMP'] = new Date().toISOString(); // Timestamp
        priceData['MKTSHARE'] = priceData['MKTCAP'] / currentMarketCap;

        // Save Data
        coinSaver(symbol, priceData);
        marketDataSaver(symbol, priceData);
      })
      .catch((error) => {
        console.error(`Error looping through Coins: ${err.stack}`)
      });
  }
};


async function getMarketData(coin: string, base: string = 'ETH', source: string = 'Cryptocompare') {
  console.error(`Error Retrieving Price Data for ${coin}`)

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


async function calcMarketCap() {
  console.log(`Calculating current Total Market Cap...`)

  const query = datastore.createQuery('Coin')
    .groupBy('MKTCAP');


  return datastore.runQuery(query)
    .then(results => {
      const coins = results[0];

      let coinMarketCaps = [];
      coins.map(coin => {
        coinMarketCaps.push(coin['MKTCAP']);
      });

      let TotalMarketCap = coinMarketCaps.reduce((a, b) => a + b); // sum

      console.log(`Calculed current Total Market Cap: ${TotalMarketCap}`)
      return TotalMarketCap;
    })
    .catch(error => {
      console.error('Error calculating current Total Market Cap...');
    });
};

// console.log(coins[0])
// getMarketData(coins[0])
// loopSymbols(coins.slice(0, 2))
console.log("FUCK")
loopSymbols(coins);
// Runs users through surveys