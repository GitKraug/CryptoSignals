import React from 'react';
import './../styles/Navbar.css';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="NavbarContainer">
        <p className="NavbarItem">Oversikt</p>
        <p className="NavbarItem">Tweets</p>
      </div>
    )
  }
}
