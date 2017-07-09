import $ from 'jquery'
import React, {Component} from 'react';
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
      trans.id = trans.id || //this.guid();
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
      console.log(tickers)
      let url = GOOG + tickers.map((a) => `${a.symbol.toUpperCase()}`).join(',');
      $.ajax({
          url: url,
          jsonp: 'callback',
          dataType: 'jsonp',
          success: (response) => {
            console.log(response)
              if (response) {
                  this.updatePortfolio(response);
              }
          }
      });
    }
  }

  updatePortfolio(data) {
    if (data) {
      let prices = data.reduce((note, s) => {
        note[s.t] = s.l
        return note;
      }, {});
      let tickers = this.state.tickers.map((t) => {
        t['currentPrice'] = prices[t.symbol];
        return t
      });
      this.setState({
        tickers: tickers
      });
      this.syncToStorage(this.state);
    }
  }

  render() {
    return (
      <div className='app'>

        <TransactionForm trans={this.state.trans} onSave={this.saveTransaction} />
        <Portfolio
          tickers={this.state.tickers}
          onRemoveTicker={this.removeTicker}
          />
      </div>
    )
  }
}

export default TranceTrader;
