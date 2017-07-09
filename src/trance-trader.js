import React, {Component} from 'react';
import './trance-trader.css'
import Portfolio from './components/portfolio'
import TransactionForm from './components/transaction-form'

class TranceTrader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stocks: []
    };

    this.saveTransaction = this.saveTransaction.bind(this)
  }

  saveTransaction(trans) {
    let stocks = this.state.stocks;
    stocks.push(trans);
    this.setState(stocks)
  }

  isValidTransaction(trans){

  }
  render() {
    return (
      <div className="app">
        <h2>Trance Trader</h2>
        <hr/>
        <TransactionForm trans={''} onSave={this.saveTransaction}/>
        <Portfolio stocks={this.state.stocks}/>
      </div>
    )
  }
}

export default TranceTrader;
