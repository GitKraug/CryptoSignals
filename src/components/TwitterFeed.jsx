import React from 'react';
import './../styles/TwitterFeed.css';
import { Timeline } from 'react-twitter-widgets'
import Navbar from './Navbar'

export default class TwitterFeed extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	tweets: []
	    };
	}

  render() {
    return (
		<div className="TwitterFeedContainer">
			<Navbar />
			
			<Timeline 
				dataSource={{
			      sourceType: 'profile',
			      screenName: 'BitQueenBR'
			    }}
			    options={{
			      username: 'BitQueenBR', 
			      width: '1000'
			    }} />
		    
		    <Timeline 
				dataSource={{
			      sourceType: 'profile',
			      screenName: 'urban_ta'
			    }}
			    options={{
			      username: 'urban_ta', 
			      width: '1000'
			    }} />

		     <Timeline 
				dataSource={{
			      sourceType: 'profile',
			      screenName: 'teddycleps'
			    }}
			    options={{
			      username: 'teddycleps', 
			      width: '1000'
			    }} />

		</div>
	)
  }
}

