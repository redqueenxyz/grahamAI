// Bot environment

// Dependencies
import * as dotenv from 'dotenv'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'


// Exchanges
import { KrakenClient } from 'kraken-api'

// Process Environment
dotenv.config()

// Firebase Environment
// admin.initializeApp(functions.config().firebase)

// Kraken Environment
export const exchange = new KrakenClient(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET, {
    timeout: 60 * 60 * 48 * 1000,
});

