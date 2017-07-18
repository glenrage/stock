import $ from 'jquery'
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Portfolio from './components/portfolio';
import TickerForm from './components/ticker-form';
import NavBar from './components/nav-bar';
import FormLayer from './components/formlayer';
import {ticker_mode, blank_ticker, GOOG, LOCAL_KEY}  from './components/data/constants';
import sample_tickers from './components/data/sample_tickers'
import './css/trance-trader.css';

class TranceTrader extends Component {

  constructor(props) {
    super(props)

    this.state = Object.assign({
      tickers: [],
      tickerMode: ticker_mode.detail
    }, this.syncFromStorage(), {
      formMode: '',
      showForm: false,
      tickerToEdit: blank_ticker,
    })
  }

  componentWillMount() {
    this.retrieveMarketData();
  }

  saveTransaction = (trans) => {
    let tickers = this.state.tickers;
    if(this.isValidTransaction(trans)) {
      this.closeTickerForm()
      if(!trans.id) {
        tickers.push(trans)
      } else {
        tickers = tickers.map((ticker) => {
          if (ticker.id === trans.id) {
            return trans;
          }
          return ticker;
        });
      }
      this.setState({
        tickers: tickers,
        tickerToEdit: blank_ticker
      }, () => {
        this.syncToStorage(this.state);
        this.retrieveMarketData();
      });
    }
  }

  toggleTickerForm = (e) => {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  addTickerForm = (e) => {
    this.setState({
      showForm: true
    });
  }

  editTickerForm = (ticker) => {
    this.setState({
      showForm: true,
      formMode: 'edit',
      tickerToEdit: ticker
    })
  }

  closeTickerForm = () => {
    this.setState({
      showForm: false,
      tickerToEdit: blank_ticker,
      formMode: ''
    });
  }

  deleteTicker = (id) => {
    let tickers = this.state.tickers.filter((t) => t.id !== id);
    this.setState({
      tickers: tickers
    }, () => {
      this.closeTickerForm();
      this.syncToStorage(this.state);
    });
  }

  toggleTickerMode = () => {
    let mode = this.state.tickerMode;
    if (mode === ticker_mode.summary) {
      mode = ticker_mode.detail;
    } else {
      mode = ticker_mode.summary
    }
    this.setState({
      tickerMode: mode
    }, () => {
      this.syncToStorage(this.state);
    });
  }

  samplePortfolio = () => {
    sample_tickers.forEach((ticker) => {
      this.saveTransaction(ticker);
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
    let tickers = this.state.tickers;
    if (tickers.length > 0) {

      let url = GOOG + tickers.map((s) => `${s.symbol.toUpperCase()}`).join(',');
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
      let tickers = this.state.tickers.map((s) => {
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
        tickers: tickers
      });
      this.syncToStorage(this.state);
    }
  }

  refresh = () => {
    this.retrieveMarketData();
  }

  render() {
    return (
      <Router basename='/'>
        <div className='app'>

          <NavBar
            tickerMode={this.state.tickerMode}
            onAddTicker={this.addTickerForm}
            onToggleTickerMode={this.toggleTickerMode}
            onReload={this.reload}
          />
          <div className='content'>
            <Route exact path='/'render={() =>
              <Portfolio
                tickers={this.state.tickers}
                tickerMode={this.state.tickerMode}
                onAddTicker={this.addTickerForm}
                onEditTicker={this.editTickerForm}
                onDeleteTicker={this.deleteTicker}
                onToggleTickerMode={this.toggleTickerMode}
                onSamplePortfolio={this.samplePortfolio}
              />} />
          </div>
          <FormLayer
            title={this.state.formMode === 'edit' ? 'Edit Ticker' : 'Add Ticker'}
            open={this.state.showForm}
            onClose={this.closeTickerForm}
            >
            <TickerForm
              ticker={this.state.tickerToEdit}
              mode={this.state.formMode}
              onSave={this.saveTransaction}
              onClose={this.closeTickerForm}
              onDelete={this.deleteTicker}
            />
          </FormLayer>
        </div>
      </Router>
    )
  }
}

export default TranceTrader;
