import React from 'react';
import './../styles/Ticker.css';

export default class Ticker extends React.Component {
  render() {
  	var changePercentStyle={
  		color: parseInt(this.props.priceChangePercent) > 0 ? 'green' : 'red'
  	}

    return (
		<div className="TickerContainer">
			<img className="TickerLogo" src={this.props.logoUrl} /> 
			<p className="TickerHeading"> { this.props.ticker  } </p>
			
			<div className="TickerContent">
				<p className="TickerStats" style={changePercentStyle}>24hr: { this.props.priceChangePercent }%</p>
			</div>
		</div>
	)
  }
}
