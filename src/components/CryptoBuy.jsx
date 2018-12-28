import React from 'react';
import './../styles/CryptoBuy.css';
import axios from 'axios';
import Ticker from './Ticker';
import {convertCoins, removeCoins, priceChange24Hr, mostGains, lessGains, tradeCount} from './../constants/constants.jsx';
import Filter from './Filter.jsx';

export default class CryptoBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_binance_coins_data: [],
      cmc_data: this.getLogos(),
      filter: 'Velg filter'
    };
  }

  filterOnGainsAscending() {
    var toBeSorted = this.state.all_binance_coins_data
    return toBeSorted.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent)).reverse()
  }

  filterOnGainsDescending() {
    var toBeSorted = this.state.all_binance_coins_data
    return toBeSorted.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent))
  }

  filterOnMostChangeDescending() {
    var toBeSorted = this.state.all_binance_coins_data
    return toBeSorted.sort((a, b) => Math.abs(parseFloat(a.priceChangePercent)) - Math.abs(parseFloat(b.priceChangePercent))).reverse()
  }

  filterOnTradeCount() {
    var toBeSorted = this.state.all_binance_coins_data
    toBeSorted.sort((a, b) => Math.abs(parseFloat(a.count)) - Math.abs(parseFloat(b.count))).reverse()
    return toBeSorted
  }

  getFilteredList() {
    var mapping = {
      mostGains: this.state.filter === mostGains ? this.filterOnGainsAscending() : this.state.all_binance_coins_data,
      lessGains: this.state.filter === lessGains ? this.filterOnGainsDescending() : this.state.all_binance_coins_data,
      priceChange24Hr: this.state.filter === priceChange24Hr ? this.filterOnMostChangeDescending() : this.state.all_binance_coins_data,
      tradeCount: this.state.filter === tradeCount ? this.filterOnTradeCount() : this.state.all_binance_coins_data
    }

    return this.state.filter !== 'Velg filter' && this.state.all_binance_coins_data.length > 0 && mapping[this.state.filter] !== undefined ? mapping[this.state.filter] : this.state.all_binance_coins_data
  }

  handleChange = (selectedOption) => {
    this.setState({
      all_binance_coins_data: this.state.all_binance_coins_data,
      cmc_data: this.state.cmc_data,
      filter: selectedOption.value
    })
  }

  filterCoins(coins) {
    return coins.filter(a => a.symbol.includes("BTC"))
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
    var logoObj = logos !== undefined ? logos.filter(a => a.symbol === shortTicker) : null

    return logoObj.length > 0 ? logoObj[0].logo : null
  }

  getLogoUrl(id) {
    return 'https://s2.coinmarketcap.com/static/img/coins/32x32/' + id + '.png'
  }

  componentDidMount() {
    var binance_request_url = 'https://api.binance.com/api/v1/ticker/24hr'
    var cors_proxy_request = 'https://cors-anywhere.herokuapp.com/' + binance_request_url

    axios.get(cors_proxy_request).then(response => {
      this.setState({
        all_binance_coins_data: this.filterCoins(response.data),
        cmc_data: this.state.cmc_data,
        filter: 'Velg filter'
      })
    })
  }

  render() {
    var tickers = this.getFilteredList()
      .filter(coin => !(removeCoins.indexOf(coin.symbol) !== -1))
      .map(t => <Ticker ticker={t.symbol} priceChangePercent={t.priceChangePercent} logoUrl={ this.getLogoUrlFromTicker(this.state.cmc_data, t.symbol) } key={t.symbol} />)

    return (
      <div className="CryptoBuyContainerColumn">
        <div className="CryptoBuyContainer">
          <Filter handleChange={(option) => this.handleChange(option)} placeholder={this.state.filter} />
          { tickers }
        </div>
      </div>
    )
  }
}
