import $ from 'jquery'
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import request from 'request';

import './css/trance-trader.css';
import {demo_stock} from './components/data/constants';

import Portfolio from './components/portfolio';
import StockForm from './components/stock-form';
import NavBar from './components/nav-bar';
import Overlay from './components/overlay';

const LOCAL_KEY = 'appState'
const GOOG = 'https://finance.google.com/finance/info?q=';
const prefix = '//'

class TranceTrader extends Component {

  constructor(props) {
    super(props)

    // this.saveTransaction = this.saveTransaction.bind(this);
    // this.syncFromStorage = this.syncFromStorage.bind(this);
    // this.retrieveMarketData = this.retrieveMarketData.bind(this);
    // this.updatePortfolio = this.updatePortfolio.bind(this);
    // this.removeTicker = this.removeTicker.bind(this);
    // this.showStockForm = this.showStockForm.bind(this);
    // this.toggleStockForm = this.toggleStockForm.bind(this);
    // this.closeStockForm = this.closeStockForm.bind(this);

    this.state = Object.assign({
      stocks: [],
      stockToEdit: demo_stock
    }, this.syncFromStorage(), {
      showForm: false
    })

  }

  componentWillMount() {
    this.retrieveMarketData();
  }

  saveTransaction = (trans) => {
    let stocks = this.state.stocks;
    if(this.isValidTransaction(trans)) {
      this.closeStockForm()
      if(!trans.id) {
        trans.id = this.guid();
        stocks.push(trans)
      } else {
        stocks = stocks.map((stock) => {
          if (stock.id === trans.id) {
            return trans
          }
          return stock
        });
      }
      this.setState({
        stocks: stocks,
      }, () => {
        this.syncToStorage(this.state);
        this.retrieveMarketData();
      });
    }
  }

  toggleStockForm = (e) => {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  addStockForm = (e) => {
    console.log('add form')
    this.setState({
      showForm: true
    })
  }

  editStockForm = (stock) => {
    this.setState({
      showForm: true,
      formMode: 'edit',
      stockToEdit: stock
    })
  }

  closeStockForm = () => {
    this.setState({
      showForm: false
    })
  }

  removeStock = (id) => {
    let stocks = this.state.stocks.filter((t) => t.id !== id);
    this.setState({
      stocks: stocks
    }, () => {
      this.syncToStorage(this.state)
    });
  }

  syncToStorage = (state) => {
    if (!!state) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    }
  }

  syncFromStorage = () => {
    return JSON.parse(localStorage.getItem('appState'))
  }

  isValidTransaction = (trans) => {
    return trans.symbol.length > 0
      && trans.price > 0
      && trans.quantity > 0
      && trans.date.length > 0
  }

  isLocalHost = () => {
    return (window.location.hostname === 'localhost');
  }

  retrieveMarketData = () => {
    let stocks = this.state.stocks;
    if (stocks.length > 0) {

      let url = GOOG + stocks.map((s) => `${s.symbol.toUpperCase()}`).join(',');
      $.ajax({
          url: url,
          jsonp: 'callback',
          dataType: 'jsonp',
          success: (response) => {
              if (response) {
                  this.updatePortfolio(response);
              }
          }
      });

    }
  }

  updatePortfolio = (data) => {
    console.log('data : ' + data)
    if (data) {
      let symbols = data.reduce((note, s) => {
        note[s.t] = s;
        return note;
      }, {});
      console.log('symbols :' + symbols)
      let stocks = this.state.stocks.map((s) => {
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
        stocks: stocks
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

          <NavBar />
          <div className='content'>

            <Route exact path='/'render={() =>
              <Portfolio
                stocks={this.state.stocks}
                onAddStock={this.addStockForm}
                onEditStock={this.editStockForm}
                onRemoveStock={this.removeStock}
              />} />
          </div>

          <button className='add-stock' onClick={this.addStockForm}>
            {this.state.showForm ? '-' : '+'}
          </button>

          <Overlay
            title={this.state.formMode === 'edit' ? 'Edit Stock' : 'Add Stock'}
            open={this.state.showForm}
            onClose={this.closeStockForm}
            >
            <StockForm
              stock={this.state.stockToEdit}
              mode={this.state.formMode}

              onSave={this.saveTransaction}
              onClose={this.closeStockForm}
            />
          </Overlay>
        </div>
      </Router>
    )
  }
}

export default TranceTrader;
