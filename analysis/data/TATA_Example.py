
## Imports
import pandas as pd
import quandl
import os

#Extraction of closing stock value of five companies of TATA group
def fetchStockData():
    stockData = pd.DataFrame()
    global dataset
    for name in dataset:
        df = quandl.get("NSE/"+name, authtoken="YOUR_AUTH_TOKEN_HERE")
        df = df[["Close"]].copy()
        df.columns = ['Close_' + name]
        if stockData.empty:
            stockData = df
        else:
            stockData = stockData.join(df)
    return stockData

dataset = ["TATACHEM","TATASTEEL","TATACOMM","TCS","TATAMOTORS"]

# Pickles the results or retrieves it if it's already pickled
if os.path.isfile('./TATA_GROUP'):
    stockData = pd.read_pickle('TATA_GROUP')
else:
    stockData = fetchStockData()
    stockData.to_pickle('TATA_GROUP')

# Writes the data to csv
stockData.to_csv("./TATAGROUP.csv")
print("The closing stock rates of five companies under the Tata group has been stored in TATAGROUP.csv")

