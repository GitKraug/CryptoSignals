import React from 'react';
import './../styles/TwitterFeed.css';
import { Timeline } from 'react-twitter-widgets'

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
			<Timeline
				dataSource={{
			      sourceType: 'profile',
			      screenName: this.props.profile
			    }}
			    options={{
			      username: this.props.profile,
			      width: '1000'
			    }} />
		</div>
	)
  }
}
