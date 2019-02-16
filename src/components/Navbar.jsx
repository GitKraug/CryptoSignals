import React from 'react';
import './../styles/Navbar.css';
import {HOME, BITQUEEN, CRYPTOFREAK, URBANTA, INDICATORS} from './../constants/constants.jsx';
import SearchField from 'react-search-field';
import { Dropdown } from 'semantic-ui-react'

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

          <div className="NavbarItem">
            <Dropdown text="Oversikt">
              <Dropdown.Menu>
                <Dropdown.Item text='Home' />
                <Dropdown.Item text='Statistikk' />
                <Dropdown.Item text='Prisforskjell' />
                <Dropdown.Item text='Coinheat'/>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="NavbarItem">
            <Dropdown text="Tweets" >
              <Dropdown.Menu>
                <Dropdown.Item text='BitqueenBR' onClick={(view) => this.handleClick(BITQUEEN)} />
                <Dropdown.Item text='UrbanTa' onClick={(view) => this.handleClick(URBANTA)} />
                <Dropdown.Item text='CryptoFreak' onClick={(view) => this.handleClick(CRYPTOFREAK)}/>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="NavbarItem">
            <p onClick={(view) => this.handleClick(INDICATORS)} >Indicators</p>
          </div>

        </div>

        <div className="SearchFieldContainer">
          <SearchField placeholder='Search coin...' onChange={this.onSearchBarChange} />
        </div>
      </div>
    )
  }
}
