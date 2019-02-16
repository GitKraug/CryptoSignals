import React from 'react';
import './../styles/Prisforskjell.css';
import axios from 'axios';
import {PRISFORSKJELL} from './../constants/url.jsx';
import Loader from 'react-loader-spinner';

export default class Prisforskjell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prisforskjell: [],
      externalCallsFinished: false
    };
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    var externalData = this.state
    var uri = PRISFORSKJELL

    await axios.get(uri).then(response => {
      externalData.prisforskjell = response.data
      externalData.externalCallsFinished = true
    }).catch(error => { console.log("Feil ved henting av prisforskjeller, " +  JSON.stringify(error)) })

    this.setState(externalData)
  }

  render() {
    return (
      <div className="PrisforskjellContainer">
        {
          this.state.externalCallsFinished ? <p>{JSON.stringify(this.state.prisforskjell)}</p> :
          <Loader type="Oval" color="green" height={200} width={200} />
        }
      </div>
    )
  }
}
