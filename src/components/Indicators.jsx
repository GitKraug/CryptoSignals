import React from 'react';
import './../styles/Indicators.css';
import TradingViewWidget from 'react-tradingview-widget';

export default class Indicators extends React.Component {
  render() {
    return (
      <div className="IndicatorsContainer">
        <TradingViewWidget symbol="NASDAQ:AAPL" />
      </div>
    )
  }
}
