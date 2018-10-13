import React from 'react';
import './../styles/CryptoBuy.css';
import axios from 'axios';
import Ticker from './Ticker';

export default class CryptoBuy extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      all_binance_coins_data: []
    };
	}

  filterCoins(coins) {
    return coins.filter(a => a.symbol.includes("BTC"))
  }

  filterOnVol(coins) {
    return coins.filter(coin => parseInt(coin.quoteVolume) >= 100)
  }

  componentDidMount() {
    axios.get('https://api.binance.com/api/v1/ticker/24hr').then(response => {this.setState({
      all_binance_coins_data: this.filterCoins(this.filterOnVol(response.data))
    })});
  }

  render() {
    var tickers = this.state.all_binance_coins_data.map(t => <Ticker ticker={t.symbol} />)

    return (
			<div className="CryptoBuyContainer">
				{ tickers }
			</div>
		)
  }
}
