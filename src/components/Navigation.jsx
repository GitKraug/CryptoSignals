import React from 'react';
import CryptoBuy from './CryptoBuy.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import {HOME, EMPTY_SEARCH_BAR} from './../constants/constants.jsx';
import Navbar from './Navbar.jsx';
import Indicators from './Indicators.jsx';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: HOME,
      navigationActive: false,
      searchBarText: EMPTY_SEARCH_BAR
    };
  }

  changeView(viewName) {
    if(this.state.navigationActive) {
      this.setState({
        view: viewName,
        navigationActive: this.state.navigationActive,
        searchBarText: this.state.searchBarText
      })
    }
  }

  activateNavigation() {
    this.setState({
      view: this.state.view,
      navigationActive: true,
      searchBarText: this.state.searchBarText
    })
  }

  onSearchBarChange(value) {
    var state = this.state
    state.searchBarText = value
    this.setState({state})
  }

  render() {
    var views = {
      'home': <CryptoBuy activateNavigation={() => this.activateNavigation()} searchBarText={this.state.searchBarText} />,
      'bitqueen': <TwitterFeed profile={'bitqueenbr'} />,
      'cryptofreak': <TwitterFeed profile={'teddycleps'} />,
      'urbanta': <TwitterFeed profile={'urban_ta'} />,
      'indicators': <Indicators />
    }

    return (
      <div className="NavigationContainer">
        <Navbar changeView={(view) => this.changeView(view)} onSearchBarChange={(value) => this.onSearchBarChange(value)} />
        { views[this.state.view] }
      </div>
    )
  }
}
