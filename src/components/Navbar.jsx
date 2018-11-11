import React from 'react';
import './../styles/Navbar.css';
import {HOME, BITQUEEN, CRYPTOFREAK, URBANTA} from './../constants/constants.jsx';

export default class Navbar extends React.Component {
  constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);
	}

  handleClick(view) {
    this.props.changeView(view)
  }

  render() {
    return (
      <div className="NavbarContainer">
        <p className="NavbarItem" onClick={(view) => this.handleClick(HOME)} >Oversikt</p>
        <p className="NavbarItem" onClick={(view) => this.handleClick(BITQUEEN)} >BitqueenBR</p>
        <p className="NavbarItem" onClick={(view) => this.handleClick(URBANTA)} >UrbanTA</p>
        <p className="NavbarItem" onClick={(view) => this.handleClick(CRYPTOFREAK)} >CrypoFreak</p>
      </div>
    )
  }
}
