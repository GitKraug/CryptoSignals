import React from 'react';
import './../styles/Ticker.css';

export default class Ticker extends React.Component {
  render() {
    return (
			<div className="TickerContainer">
        <p className="TickerHeading"> { this.props.ticker  } </p>
			</div>
		)
  }
}
