import React, {Component} from 'react';
import classnames from 'classnames';
import '../css/ticker.css'
import Gauge from './gauge';

let CURRENCY = '$'

class Ticker extends Component {

  constructor(props) {
    super(props);

    this.removeTicker = this.removeTicker.bind(this)
  }

  daysOld(date) {
    let single = 24 * 60 * 60 * 1000
    let parts = date.split('/');
    let first = new Date(parts[2], parts[1], parts[0]);
    let second = new Date()
    return Math.round(Math.abs((first.getTime() - second.getTime()) / (single)));
  }

  currency(value = 0) {
    return (CURRENCY + value.toLocaleString());
  }

  removeTicker() {
    this.props.onRemoveTicker(this.props.ticker.id);
  }

  render() {
    let ticker = this.props.ticker;

    let cost = ticker.qty * ticker.price;
    let value = ticker.qty * ticker.currentPrice;
    let profit = value - cost;

    let daysOld = this.daysOld(ticker.date);
    let gains = Math.ceil((100 * profit) / cost);
    let changeInPrice = ticker.currentPrice - ticker.price;

    let priceChangeClassNames = classnames({
      'volatile-value': true,
      'price-change': true,
      down: ticker.changePercent < 0,
      up: ticker.changePercent >= 0
    });

    let changeInPriceClassNames = classnames({
      'volatile-value': true,
      profit: true,
      'change-in-price': true,
      down: changeInPrice < 0,
      up: changeInPrice > 0
    });

    let profitChangeClassNames = classnames({
      'volatile-value': true,
      'profit-change': true,
      down: profit < 0,
      up: profit > 0
    });

    return (
      <div className='ticker'>
        <div className='investment line-items'>
          <p className='bought-price'>
            {this.currency(ticker.price)}
            </p>
          <p className='cost'>
            {this.currency(cost)}
          </p>
          <p className='age'>
            {daysOld} days ago
          </p>
        </div>
        <div className='details'>
          <Gauge className='profit-meter' value={gains} />

          <div className='content'>
            <p className='symbol'>
              {ticker.symbol}
            </p>
            <p className="market-price">
              {this.currency(ticker.currentPrice)}
            </p>
            <p className={priceChangeClassNames}>
              {ticker.change}
            </p>
          </div>
        </div>
        <div className='return line-items'>
          <p className={changeInPriceClassNames}>
            {(ticker.currentPrice - ticker.price).toFixed(2)}
          </p>
          <p className='current-value'>
            {this.currency(value)}
          </p>
          <p className={profitChangeClassNames}>
            {this.currency(profit)}
          </p>

        </div>
        <ul className='actions'>
          <li onClick={this.props.onRemoveTicker}>X</li>
        </ul>
      </div>
    )
  }
}

export default Ticker;
