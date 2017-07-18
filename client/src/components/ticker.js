import React, {Component} from 'react';
import classnames from 'classnames';
import Gauge from './gauge';
import Helpers from '../helpers';
import {ticker_mode} from './data/constants';
import ticker_codes from './data/tickers.js';
import '../css/ticker.css';
import '../css/ticker-summary.css';
import '../css/ticker-detail.css';

class TickerSummary extends Component {
  render() {
    let data = this.props.data;
    let {ticker} = data;

    return (
      <div className="ticker-summary">
        <div className="symbol column">
          <p>{ticker.symbol}</p>
          <em className="quantity">{ticker.quantity}</em>
        </div>
        <div className="price column">
          <p className="current">{Helpers.currency(ticker.currentPrice)}</p>
          <em className={data.priceChangeClassNames}>{ticker.change}</em>
        </div>
        <div className="profit column">
          <p className="current">{Helpers.currency(data.value)}</p>
          <em className={data.profitChangeClassNames}>{(data.profit).toLocaleString()}</em>
        </div>
      </div>
    )
  }
}

class TickerDetail extends Component {

  getTickerName = () => {
    let symbol = this.props.data.ticker.symbol;
    return (ticker_codes.find((tickers) => tickers.code === symbol)).description.split('(')[0];
  }

  render() {
    let data = this.props.data;
    let ticker = data.ticker;

    return (
      <div className="ticker-detail">
        <div className="columns">
          <div className="primary column">
            <p className="symbol">{ticker.symbol}</p>
            <p className="current-price">{ticker.currentPrice}</p>
            <p className={data.priceChangeClassNames}>{ticker.change}</p>
          </div>
          <div className="hero column">
            <Gauge className="profit-meter" value={data.profitPercent}/>
          </div>
          <div className="secondary column">
            <p className="investment">
              <em>
                <span className="icon-database"/> {ticker.quantity}
              </em>
              <em>
                <span className="icon-money"/> {Helpers.currency(ticker.price)}
              </em>
            </p>
            <p className="current-worth">{Helpers.currency(data.value)}</p>
            <p className={data.profitChangeClassNames}>{data.profit.toLocaleString()}</p>
          </div>
        </div>
        <div className="title">
          <p>{this.getTickerName()}</p>
        </div>
      </div>
    )
  }
}

class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleted: false
    };
  }

  daysOld(date) {
    let singleDay = 24 * 60 * 60 * 1000
    let parts = date.split('/');
    let firstDate = new Date(parts[2], parts[1], parts[0]);
    let secondDate = new Date()
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (singleDay)));
  }

  deleteTicker = (e) => {
    e.stopPropagation();
    this.setState({
      deleted: true
    }, () => {
      setTimeout(() => {
        this.props.onDeleteTicker(this.props.ticker.id);
      }, 600)
    });
  }

  editTicker = () => {
    this.props.onEditTicker(this.props.ticker);
  }

  render() {
    let ticker = this.props.ticker;
    let cost = ticker.quantity * ticker.price;
    let value = ticker.quantity * ticker.currentPrice;
    let profit = value - cost;
    let daysOld = this.daysOld(ticker.date);
    let profitPercent = Math.ceil((100 * profit) / cost);

    let priceChangeClassNames = classnames({
      'volatile-value': true,
      'price-change': true,
      down: ticker.changePercent < 0,
      up: ticker.changePercent >= 0
    });

    let profitChangeClassNames = classnames({
      'volatile-value': true,
      'profit-change': true,
      down: profit < 0,
      up: profit > 0
    });

    let data = {
      ticker,
      cost,
      value,
      profit,
      daysOld,
      profitPercent,
      profitChangeClassNames,
      priceChangeClassNames
    }

    let tickerClassNames = classnames({
      ticker: true,
      animated: true,
      zoomOut: this.state.deleted
    });

    return (
      <div className={tickerClassNames} onClick={this.editTicker}>
        {
          this.props.tickerMode === ticker_mode.detail ? <TickerDetail data={data}/> :
          <TickerSummary data={data}/>
        }
      </div>
    )
  }
}

export default Ticker;
