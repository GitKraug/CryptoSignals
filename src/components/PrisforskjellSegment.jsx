import React from 'react';
import './../styles/Prisforskjell.css';
import { Divider, Header, Image, Segment } from 'semantic-ui-react';

export default class PrisforskjellSegment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  sortData(data) {
    return data.sort((a, b) => parseFloat(a.percentSpread) - parseFloat(b.priceChangePercent))
  }

  stringContains(str, item) {
    return str.indexOf(item) !== -1
  }

  getBaseCurrency(ticker) {
    if(this.stringContains(ticker, "BTC")) {
      return "BTC"
    } else {
      if(this.stringContains(ticker, "ETH") && !this.stringContains(ticker, "BTC")){
        return "ETH"
      } else {
        return "BTC"
      }
    }
  }

  getActionColor(action) {
    if(action === "BUY") {
      return "green"
    } else if(action === "SELL") {
      return "red"
    } else {
      return "black"
    }
  }

  getPriceBasedOnActoin(ticker, action) {
    if(action === "BUY") {
      return ticker.ask
    } else if(action === "SELL") {
      return ticker.bid
    } else return ticker.ask
  }

  render() {
    return (
      <div className="PrisforskjellSegmentContainer">
          {
            this.props.data.length > 0 &&
            <Segment className="SegmentContainer">
              {
                  this.sortData(this.props.data).map((priser, index) => {
                  var divider = index === (this.props.data.length - 1) ? null : <Divider section />

                  return (
                    <div>
                      <div className="HeaderSegmentSection">
                        <p className="tickerSegment">{priser.ticker}</p>
                        <p className="GreenSpread"> ({priser.percentSpread}%)</p>
                      </div>

                      <div className="PrisinfoContainer">
                        {
                          priser.exchangeInfo.map((info, index) => {
                            var action = info.action!=="NONE" ? info.action : null

                            return (
                              <div className="PrisEnkeltExchangeContainer">
                                <p className="ExchangeInfo">{info.exchange.toUpperCase()}:</p>
                                <p className="ExchangeInfo"> {this.getPriceBasedOnActoin(info, action)} { this.getBaseCurrency(priser.ticker)}</p>
                                <p className="SellAndBuyMarker" style={{color: this.getActionColor(info.action), fontWeight: 'bold'}}> { action } </p>
                              </div>
                            );
                          })
                        }
                      </div>

                      {
                          divider
                      }
                    </div>
                  );
              })
            }
            </Segment>
          }

      </div>
    )
  }
}
