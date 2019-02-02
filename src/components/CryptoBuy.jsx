import React from 'react';
import './../styles/CryptoBuy.css';
import axios from 'axios';
import Ticker from './Ticker';
import {convertCoins, removeCoins, priceChange24Hr, mostGains, lessGains, tradeCount} from './../constants/constants.jsx';
import Filter from './Filter.jsx';
import {CORS_PROXY_URL, BINANCE_TICKERS_24H_URL, CMC_LOGO_URL, CMC_LISTINGS_URL, KRAUG_CRYPTO_API, CURRENT_RSI} from './../constants/url.jsx';

export default class CryptoBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_binance_coins_data: [],
      cmc_data: this.getLogos(),
      filter: 'Velg filter',
      rsi_data: []
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

  handleChange(selectedOption) {
    this.setState({
      all_binance_coins_data: this.state.all_binance_coins_data,
      cmc_data: this.state.cmc_data,
      filter: selectedOption.value,
      rsi_data: this.state.rsi_data
    })
  }

  filterCoins(coins) {
    return coins.filter(a => a.symbol.includes("BTC"))
  }

  getLogos() {
    axios.get(CMC_LISTINGS_URL).then(response => {
      this.setState({
        all_binance_coins_data: this.state.all_binance_coins_data,
        cmc_data: response.data.data.map(c => {
          return {
            id: c.id,
            symbol: c.symbol,
            logo: this.getLogoUrl(c.id)
          }
        }),
        filter: this.state.filter,
        rsi_data: this.state.rsi_data
      })
    }).catch(error => { console.log("Feil ved henting av CMC-listings") })
  }

  getLogoUrlFromTicker(logos, ticker) {
    var shortTicker = convertCoins[ticker] !== undefined ? convertCoins[ticker] : ticker.substr(0, ticker.indexOf('BTC'))
    var logoObj = logos !== undefined ? logos.filter(a => a.symbol === shortTicker) : null

    return logoObj.length > 0 ? logoObj[0].logo : null
  }

  getLogoUrl(id) {
    return CMC_LOGO_URL + id + '.png'
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    var externalData = {}

    await axios.get(CORS_PROXY_URL + BINANCE_TICKERS_24H_URL).then(response => {
      externalData = {
        all_binance_coins_data: this.filterCoins(response.data),
        cmc_data: this.state.cmc_data,
        filter: 'Velg filter',
        rsi_data: []
      }
    }).catch(error => { console.log("Feil ved henting av Binance-tickers") })

    var symbols = externalData.all_binance_coins_data.map(binance_data => binance_data.symbol)
    var rsi_axios_calls = []
    var rsi = []
    var unsuccessful_data = []

    symbols.map(s => {
      var uri = KRAUG_CRYPTO_API + CURRENT_RSI + '?symbol=' + s + '&interval=1d'

      rsi_axios_calls.push(axios(uri).then(response => {
        rsi.push({symbol: s, rsi: response.data.currentRsi})
      }).catch(e => {
        unsuccessful_data.push(s)
      }))
    })

    await axios.all(rsi_axios_calls)
    var response = {
      values: rsi,
      errors: unsuccessful_data
    }

    externalData.rsi_data = response

    this.setState(externalData)
  }

  render() {
    var tickers = this.getFilteredList()
      .filter(coin => !(removeCoins.indexOf(coin.symbol) !== -1))
      .map(t => <Ticker ticker={t.symbol} priceChangePercent={t.priceChangePercent} logoUrl={ this.getLogoUrlFromTicker(this.state.cmc_data, t.symbol) } key={t.symbol} />)
      .filter(nullfailsafe => nullfailsafe.props.logoUrl !== null)

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
