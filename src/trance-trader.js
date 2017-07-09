import React, {Component} from 'react';
import './trance-trader.css';
import Portfolio from './components/portfolio';
import TransactionForm from './components/transaction-form';

const LOCAL_KEY = 'appState'

class TranceTrader extends Component {

  constructor(props) {
    super(props)

  this.state = (this.syncFromStorage()) || {
    tickers: []
  };

    this.syncFromStorage = this.syncFromStorage.bind(this)
  }

  componentWillMount() {

  }

  saveTransaction(trans) {
    let tickers = this.state.tickers;
    if(this.isValidTransaction(trans)) {
      trans.id = trans.id || this.guid();
      tickers.push(trans);
      this.setState(tickers);
      this.syncToStorage(this.state);
    }
  }

  syncToStorage(state) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
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
  render() {
    return (
      <div className="app">
        <h2>Trance Trader</h2>
        <hr/>
        <TransactionForm trans={''} onSave={this.saveTransaction}/>
        <Portfolio tickers={this.state.tickers}/>
      </div>
    )
  }
}

export default TranceTrader;
