import React from 'react';
import './../styles/Ticker.css';

export default class Ticker extends React.Component {
  render() {
  	var changePercentStyle = {
  		color: parseFloat(this.props.priceChangePercent) > 0 ? 'green' : 'red'
  	}

    var rsiStyle = {
  		color: parseFloat(this.props.rsi) < 30 ? 'green' : 'black'
  	}

    return (
		<div className="TickerContainer">
			<img className="TickerLogo" src={this.props.logoUrl} alt='' />
			<p className="TickerHeading"> { this.props.ticker  } </p>

			<div className="TickerContent">
				{
          this.props.priceChangePercent !== undefined && <p className="TickerStats" style={changePercentStyle}>24hr: { this.props.priceChangePercent }%</p>
        }
        {
          this.props.rsi !== undefined && <p className="TickerStats" style={rsiStyle}>RSI: { this.props.rsi.toFixed(2) }</p>
        }
			</div>
		</div>
	)
  }
}
