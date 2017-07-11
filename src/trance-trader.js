import $ from 'jquery'
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Portfolio from './components/portfolio';
import StockForm from './components/stock-form';
import NavBar from './components/nav-bar';
import Overlay from './components/overlay';
import {demo_stock, stock_mode} from './components/data/constants';
import './css/trance-trader.css';

const LOCAL_KEY = 'appState'
const GOOG = 'https://finance.google.com/finance/info?q=';
const prefix = '//'

class TranceTrader extends Component {

  constructor(props) {
    super(props)

    this.state = Object.assign({
      stocks: [],
      stockMode: stock_mode.detail
    }, this.syncFromStorage(), {
      formMode: '',
      showForm: false,
      stockToEdit: demo_stock,
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
            return trans;
          }
          return stock;
        });
      }
      this.setState({
        stocks: stocks,
        stockToEdit: demo_stock
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
    this.setState({
      showForm: true
    });
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
      showForm: false,
      stockToEdit: demo_stock,
      formMode: ''
    });
  }

  deleteStock = (id) => {
    let stocks = this.state.stocks.filter((t) => t.id !== id);
    this.setState({
      stocks: stocks
    }, () => {
      this.closeStockForm();
      this.syncToStorage(this.state);
    });
  }

  toggleStockMode = () => {
    let mode = this.state.stockMode;
    if (mode === stock_mode.summary) {
      mode = stock_mode.detail;
    } else {
      mode = stock_mode.summary
    }
    this.setState({
      stockMode: mode
    }, () => {
      this.syncToStorage(this.state);
    });
  }

  syncToStorage = (state) => {
    state = state || this.state;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
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
    if (data) {
      let symbols = data.reduce((note, s) => {
        note[s.t] = s;
        return note;
      }, {});
      let stocks = this.state.stocks.map((s) => {
        let symbol = symbols[s.symbol]
        if(symbol) {
          s['currentPrice'] = symbol.l;
          s['change'] = symbol.c;
          s['changePercent'] = symbol.cp;
          return s;
        } else {
          return {}
        }
      });
      this.setState({
        stocks: stocks
      });
      this.syncToStorage(this.state);
    }
  }

  refresh = () => {
    this.retrieveMarketData();
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
      <Router basename='/trader'>
        <div className='app'>

          <NavBar
            stockMode={this.state.stockMode}
            onAddStock={this.addStockForm}
            onToggleStockMode={this.toggleStockMode}
            onReload={this.reload}
          />
          <div className='content'>
            <Route exact path='/'render={() =>
              <Portfolio
                stocks={this.state.stocks}
                stockMode={this.state.stockMode}
                onAddStock={this.addStockForm}
                onEditStock={this.editStockForm}
                onDeleteStock={this.deleteStock}
                onToggleStockMode={this.toggleStockMode}
              />} />
          </div>
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
              onDelete={this.deleteStock}
            />
          </Overlay>
        </div>
      </Router>
    )
  }
}

export default TranceTrader;
