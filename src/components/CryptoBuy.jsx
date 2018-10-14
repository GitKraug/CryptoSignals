import React from 'react';
import './../styles/CryptoBuy.css';
import axios from 'axios';
import Ticker from './Ticker';

const convertCoins = {
  'BQXBTC': 'ETHOS',
  'BCCBTC': 'BCH',
  'YOYOBTC': 'YOYOW',
  'IOTABTC': 'MIOTA',
  'BTCUSDT': 'BTC'
}

const removeCoins = ['VENBTC']

export default class CryptoBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_binance_coins_data: [],
      cmc_data: this.getLogos()
    };
  }

  filterCoins(coins) {
    return coins.filter(a => a.symbol.includes("BTC"))//.filter(a => parseInt(a.priceChangePercent)>=18)
  }

  filterOnVol(coins) {
    return coins.filter(coin => parseInt(coin.quoteVolume) >= 100)
  }

  getLogos() {
    var listingsUrl = 'https://api.coinmarketcap.com/v2/listings/'
    
    axios.get(listingsUrl).then(response => {
      this.setState({
        all_binance_coins_data: this.state.all_binance_coins_data,
        cmc_data: response.data.data.map(c => {
          return {
            id: c.id, 
            symbol: c.symbol, 
            logo: this.getLogoUrl(c.id)
          }
        })
      })
    })
  }

  getLogoUrlFromTicker(logos, ticker) {
    var shortTicker = convertCoins[ticker] !== undefined ? convertCoins[ticker] : ticker.substr(0, ticker.indexOf('BTC'))
    var logoObj = logos.filter(a => a.symbol === shortTicker)
    return logoObj.length>0 ? logoObj[0].logo : null
  }

  getLogoUrl(id) {
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/' + id + '.png'
  }

  componentDidMount() {
    axios.get('https://api.binance.com/api/v1/ticker/24hr').then(response => {
      this.setState({
        all_binance_coins_data: this.filterCoins(this.filterOnVol(response.data))
      })
    })
  }

  render() {
    var tickers = this.state.all_binance_coins_data
      .filter(coin => !(removeCoins.indexOf(coin.symbol) !== -1))
      .map(t => <Ticker ticker={t.symbol} priceChangePercent={t.priceChangePercent} logoUrl={ this.getLogoUrlFromTicker(this.state.cmc_data, t.symbol) } />)
   
    return (
      <div className="CryptoBuyContainer">
        { tickers }
      </div>
    )
  }
}
