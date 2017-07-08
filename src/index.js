import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InstaTrade from './insta-trade';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<InstaTrade />, document.getElementById('root'));
registerServiceWorker();
