import React from 'react';
import './../styles/Indicators.css';
import TradingViewWidget from 'react-tradingview-widget';
import {VALID_SYMBOLS} from './../constants/constants.jsx';

export default class Indicators extends React.Component {
  toIndicatorQuery() {
    var filteredValidSymbols = VALID_SYMBOLS.filter(symbol => symbol.includes(this.props.indicatorQuery) && symbol.includes("BTC"))
    return filteredValidSymbols.length === 1 ? filteredValidSymbols[0] : "BTCUSDT"
  }

  render() {
    return (
      <div className="IndicatorsContainer">
        <p className="IndicatorCurrency">{this.toIndicatorQuery()}</p>
        <TradingViewWidget symbol={"BINANCE:" + this.toIndicatorQuery()} />
      </div>
    )
  }
}
