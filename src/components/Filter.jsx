import React from 'react';
import './../styles/Filter.css';
import Select from 'react-select';
import {options} from './../constants/constants.jsx';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="FilterContainer">
        <div className="SelectContainer">
          <p className="FilterChosen">Søkekriterier</p>
          <Select onChange={this.props.handleChange} options={options} placeholder={this.props.filter} />
        </div>
      </div>
    )
  }
}
