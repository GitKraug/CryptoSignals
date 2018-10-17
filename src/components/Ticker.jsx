import React from 'react';
import './../styles/Ticker.css';

export default class Ticker extends React.Component {
  render() {
  	var changePercentStyle = {
  		color: parseFloat(this.props.priceChangePercent) > 0 ? 'green' : 'red'
  	}

    return (
		<div className="TickerContainer">
			<img className="TickerLogo" src={this.props.cmcData.logoUrl} alt='' /> 
			<p className="TickerHeading"> { this.props.ticker  } </p>
			<p className="SmallerTickerHeading"> ({this.props.cmcData.name}) </p>
			
			<div className="TickerContent">
				<p className="TickerStats" style={changePercentStyle}>24hr: { this.props.priceChangePercent }%</p>
			</div>
		</div>
	)
  }
}
