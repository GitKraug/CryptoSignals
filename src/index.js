import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CryptoBuy from './components/CryptoBuy';
import TwitterFeed from './components/TwitterFeed';

ReactDOM.render(
	<TwitterFeed />,
	document.getElementById('root')
);

registerServiceWorker();
