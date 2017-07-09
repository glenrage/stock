import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css'
import TranceTrader from './trance-trader';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TranceTrader />, document.getElementById('root'));
registerServiceWorker();
