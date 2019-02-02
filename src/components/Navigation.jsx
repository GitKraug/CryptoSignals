import React from 'react';
import CryptoBuy from './CryptoBuy.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import {HOME} from './../constants/constants.jsx';
import Navbar from './Navbar.jsx';
import Indicators from './Indicators.jsx';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: HOME,
      navigationActive: false
    };
  }

  changeView(viewName) {
    if(this.state.navigationActive) {
      this.setState({
        view: viewName,
        navigationActive: this.state.navigationActive
      })
    }
  }

  activateNavigation() {
    this.setState({
      view: this.state.view,
      navigationActive: true
    })
  }

  render() {
    var views = {
      'home': <CryptoBuy activateNavigation={() => this.activateNavigation()} />,
      'bitqueen': <TwitterFeed profile={'bitqueenbr'} />,
      'cryptofreak': <TwitterFeed profile={'teddycleps'} />,
      'urbanta': <TwitterFeed profile={'urban_ta'} />,
      'indicators': <Indicators />
    }

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
