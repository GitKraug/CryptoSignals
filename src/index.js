import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CryptoBuy from './components/CryptoBuy';
import Navigation from './components/Navigation';

ReactDOM.render(
	<Navigation />,
	document.getElementById('root')
);

registerServiceWorker();
