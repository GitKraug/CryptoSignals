import React from 'react';
import './../styles/Search.css';
import SearchField from 'react-search-field';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(value) {
    this.props.onSearchCoinChange(value)
  }

  render() {
    return (
      <div className="SearchContainer">
        <SearchField placeholder='Search coin...' onChange={this.onFilterChange} />
      </div>
    )
  }
}
