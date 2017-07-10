import React, {Component} from 'react';
import classnames from 'classnames';
import '../css/ticker.css'
import Gauge from './gauge';
import Helpers from '../helpers'

class Ticker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleted: false
    }
  }

  daysOld(date) {
      console.log('date :' + date)
    let single = 24 * 60 * 60 * 1000
    let parts = date.split('/');
    let first = new Date(parts[2], parts[1], parts[0]);
    let second = new Date()
    return Math.round(Math.abs((first.getTime() - second.getTime()) / (single)));
  }

  deleteTicker = () => {
    this.setState({
      deleted: true
    }, () => {
      setTimeout(() => {
        this.props.onDeleteTicker(this.props.ticker.id)
      }, 600)
    });
  }

  editTicker = () => {
    this.props.onEditTicker(this.props.ticker)
  }

  render() {
    let ticker = this.props.ticker;

    let cost = ticker.qty * ticker.price;
    let value = ticker.qty * ticker.currentPrice;
    let profit = value - cost;

    let daysOld = this.daysOld(ticker.date);
    let gains = Math.ceil((100 * profit) / cost);
    // let changeInPrice = ticker.currentPrice - ticker.price;

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

    let tickerClassNames = classnames({
      stock: true,
      animated: true,
      zoomOut: this.state.deleted
    })


    return (
      <div className={tickerClassNames} onClick={this.editTicker}>
        <div className='investment line-items'>
          <p className='bought-price'>
            {Helpers.currency(ticker.price)}
          </p>
          <p className='cost'>
            {Helpers.currency(cost)}
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
            <p className='market-price'>
              {Helpers.currency(ticker.currentPrice)}
            </p>
            <p className={priceChangeClassNames}>
              {ticker.change}
            </p>
          </div>
        </div>
        <div className='return line-items'>
          <p className={profitChangeClassNames}>
            {gains}%
          </p>
          <p className='current-value'>
            {Helpers.currency(value)}
          </p>
          <p className={profitChangeClassNames}>
            {Helpers.currency(profit)}
          </p>

        </div>
        <ul className='actions'>
          <li onClick={this.deleteTicker}>DEL</li>
        </ul>
      </div>
    )
  }
}

export default Ticker;
