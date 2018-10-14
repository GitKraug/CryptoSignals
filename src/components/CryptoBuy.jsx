import React from 'react';
import './../styles/CryptoBuy.css';
import axios from 'axios';
import Ticker from './Ticker';
import Select from 'react-select';

const convertCoins = {
  'BQXBTC': 'ETHOS',
  'BCCBTC': 'BCH',
  'YOYOBTC': 'YOYOW',
  'IOTABTC': 'MIOTA',
  'BTCUSDT': 'BTC'
}

const removeCoins = ['VENBTC']

const options = [
  { value: 'priceChange24Hr', label: 'Største prisendring siste 24 timer' },
  { value: 'mostGains', label: 'Største prisøkning' },
  { value: 'vanilla', label: 'Største verditap' },
  { value: 'best_RSI', label: 'Laveste RSI (Relative Strength Index)' }
]

export default class CryptoBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_binance_coins_data: [],
      cmc_data: this.getLogos(),
      filter: 'Velg filter'
    };
  }

  handleChange = (selectedOption) => {
    this.setState({
      all_binance_coins_data: this.state.all_binance_coins_data,
      cmc_data: this.state.cmc_data,
      filter: selectedOption.label
    })
  }

  filterCoins(coins) {
    return coins.filter(a => a.symbol.includes("BTC"))
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
        }),
        filter: this.state.filter
      })
    })
  }

  getLogoUrlFromTicker(logos, ticker) {
    var shortTicker = convertCoins[ticker] !== undefined ? convertCoins[ticker] : ticker.substr(0, ticker.indexOf('BTC'))
    var logoObj = logos.filter(a => a.symbol === shortTicker)
    return logoObj.length > 0 ? logoObj[0].logo : null
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
        <div className="FilterContainer">
          <div className="SelectContainer">
            <p className="FilterChosen">Søkekriterier</p>
            <Select onChange={this.handleChange} options={options} placeholder={this.state.filter} />
          </div>
        </div>
        { tickers }
      </div>
    )
  }
}
