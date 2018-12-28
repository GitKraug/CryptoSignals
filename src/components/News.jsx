import React from 'react';
import './../styles/News.css';

export default class News extends React.Component {


  render() {
    return (
      <div><script src="https://cointelegraph.com/news-widget" data-ct-widget-limit="49" data-ct-widget-theme="dark" data-ct-widget-size="large" data-ct-widget-priceindex="true" data-ct-widget-images="true" data-ct-widget-currency="USD" data-ct-widget-language="en"></script></div>
    )
  }
}
