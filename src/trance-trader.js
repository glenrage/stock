import $ from 'jquery'
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './css/trance-trader.css';

import Portfolio from './components/portfolio';
import TransactionForm from './components/transaction-form';

const LOCAL_KEY = 'appState'
const GOOG = 'https://finance.google.com/finance/info?q=';
const prefix = '//'

class TranceTrader extends Component {

  constructor(props) {
    super(props)

    this.saveTransaction = this.saveTransaction.bind(this);
    this.syncFromStorage = this.syncFromStorage.bind(this);
    this.retrieveMarketData = this.retrieveMarketData.bind(this);
    this.updatePortfolio = this.updatePortfolio.bind(this);
    this.removeTicker = this.removeTicker.bind(this)

    this.state = (this.syncFromStorage()) || {
      tickers: [],
      trans: {}
  };

  }

  componentWillMount() {
    this.retrieveMarketData();
  }

  saveTransaction(trans) {
    let tickers = this.state.tickers;
    if(this.isValidTransaction(trans)) {
      trans.id = trans.id || this.guid();
      tickers.push(trans);
      this.setState({
        tickers: tickers,
        trans: {}
      });
      this.syncToStorage(this.state);
      this.retrieveMarketData();
    }
  }

  removeTicker(id) {
    let tickers = this.state.tickers.filter((t) => t.id !== id);
    this.setState({
      tickers: tickers
    }, () => {
      this.syncToStorage(this.state)
    });
  }

  syncToStorage(state) {
    if (!!state) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    }
  }

  syncFromStorage() {
    return JSON.parse(localStorage.getItem('appState'))
  }

  isValidTransaction(trans){
    return trans.symbol.length > 0
      && trans.price > 0
      && trans.qty > 0
      && trans.date.length > 0
  }

  isLocalHost() {
    return (window.location.hostname === 'localhost');
  }

  retrieveMarketData() {
    let tickers = this.state.tickers;
    if (tickers.length > 0) {

      let url = GOOG + tickers.map((s) => `${s.symbol.toUpperCase()}`).join(',');
  //     let options = this.isLocalHost() ? {} : {
  //                mode: 'no-cors'};
  //     fetch(url, options).then(r => r.text()).then((text) => {
  //      if (text) {
  //          text = text.substr(text.indexOf(prefix) + prefix.length);
  //          text = text.trim();
  //          this.updatePortfolio(JSON.parse(text));
  //      }
  //  }).catch((error) => {
  //      console.error('Unable to fetch market data', error);
  //  });
      // $.ajax({
      //     url: url,
      //     jsonp: 'callback',
      //     dataType: 'jsonp',
      //     success: (response) => {
      //         if (response) {
      //             this.updatePortfolio(response);
      //         }
      //     }
      // });

    }
  }

  updatePortfolio(data) {
    console.log('data : ' + data)
    if (data) {
      let symbols = data.reduce((note, s) => {
        note[s.t] = s;
        return note;
      }, {});
      console.log('symbols :' + symbols)
      let tickers = this.state.tickers.map((s) => {
        let symbol = symbols[s.symbol]

        if(symbol) {
          s['currentPrice'] = symbol.l;
          s['change'] = symbol.c;
          s['changePercent'] = symbol.cp;
          return s;
        } else {
          console.log('s.symbol : ' + s.symbol)
          return {}
        }

      });
      this.setState({
        tickers: tickers
      });
      this.syncToStorage(this.state);
    }
  }

  guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


  render() {
    return (
      <Router>
      <div className='app'>
        <h1 className='app-title'>Trance Trader</h1>
        <ul className='main-menu'>
          <li>
            <Link to='/stock/add'> + </Link>
          </li>
        </ul>
        <Route exact path='/'
          render={() =>
            <Portfolio
              tickers={this.state.tickers}
              onRemoveTicker={this.removeTicker}
          />} />
        <Route path='/stock/add'
          render={() =>
            <TransactionForm
              trans={this.state.trans}
              onSave={this.saveTransaction} />
        } />
      </div>
      </Router>
    )
  }
}

export default TranceTrader;
