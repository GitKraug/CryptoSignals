import React from 'react';
import './../styles/Spinner.css';
import Loader from 'react-loader-spinner'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="SpinnerContainer">
        <p className="SpinnerText">Henter data... ({this.props.percent.toFixed(0)}%)</p>
          <Loader type="Oval" color="green" height={200} width={200} />
      </div>
    )
  }
}
