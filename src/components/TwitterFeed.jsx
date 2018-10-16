import React from 'react';
import './../styles/TwitterFeed.css';
import { Timeline } from 'react-twitter-widgets'
import Navbar from './Navbar'

export default class TwitterFeed extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {};
	}

  render() {
    return (
		<div className="TwitterFeedContainer">
			<Navbar />
			<Timeline
			    dataSource={{
			      sourceType: 'profile',
			      screenName: ['BitQueenBR', 'urban_ta']
			    }}
			    options={{
			      username: 'BitQueenBR', 
			      width: '1000'
			    }}
			    onLoad={() => console.log('Timeline is loaded!')} />
		</div>
	)
  }
}


