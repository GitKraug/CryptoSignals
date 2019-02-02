import React from 'react';
import './../styles/Spinner.css';
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="SpinnerContainer">
        <p className="SpinnerText">Henter data...</p>
        <Loader type="Puff" color="#00BFFF" height="300" width="300"/>
      </div>
    )
  }
}
