import React from 'react';
import CryptoBuy from './CryptoBuy.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import {HOME} from './../constants/constants.jsx';
import Navbar from './Navbar.jsx';
import News from './News.jsx';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: HOME
    };
  }

  changeView(viewName) {
    this.setState({
      view: viewName
    })
  }

  render() {
    var views = {
      'home': <CryptoBuy />,
      'bitqueen': <TwitterFeed profile={'bitqueenbr'} />,
      'cryptofreak': <TwitterFeed profile={'teddycleps'} />,
      'urbanta': <TwitterFeed profile={'urban_ta'} />,
      'news': <News />
    }

    console.log("view: " + this.state.view)

    return (
      <div className="NavigationContainer">
        <Navbar changeView={(view) => this.changeView(view)} />
        {
          views[this.state.view]
        }
      </div>
    )
  }
}
