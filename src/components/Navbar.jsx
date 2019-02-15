import React from 'react';
import './../styles/Navbar.css';
import {HOME, BITQUEEN, CRYPTOFREAK, URBANTA, INDICATORS} from './../constants/constants.jsx';
import SearchField from 'react-search-field';

export default class Navbar extends React.Component {
  constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSearchBarChange = this.onSearchBarChange.bind(this);
	}

  handleClick(view) {
    this.props.changeView(view)
  }

  onSearchBarChange(value) {
    this.props.onSearchBarChange(value)
  }

  render() {
    return (
      <div className="NavbarContainer">
        <div className="LeftNavBarItemsContainer">
          <p className="NavbarItem" onClick={(view) => this.handleClick(HOME)} >Oversikt</p>
          <p className="NavbarItem" onClick={(view) => this.handleClick(BITQUEEN)} >BitqueenBR</p>
          <p className="NavbarItem" onClick={(view) => this.handleClick(URBANTA)} >UrbanTA</p>
          <p className="NavbarItem" onClick={(view) => this.handleClick(CRYPTOFREAK)} >CrypoFreak</p>
          <p className="NavbarItem" onClick={(view) => this.handleClick(INDICATORS)} >Indicators</p>
        </div>
        <div className="SearchFieldContainer">
          <SearchField placeholder='Search coin...' onChange={this.onSearchBarChange} />
        </div>
      </div>
    )
  }
}
