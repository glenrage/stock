import React, {Component} from 'react';
import '../css/ticker.css'

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

  removeTicker() {
    this.props.onRemoveTicker(this.props.ticker.id);
  }

  render() {
    let ticker = this.props.ticker;

    let cost = ticker.qty * ticker.price;
    let total = ticker.qty * ticker.currentPrice;
    let profit = total - cost;
    let loss = (profit < 0);
    let daysOld = this.daysOld(ticker.date);
    let gains = Math.ceil((100 * profit) / cost);

    return (
      <div className='ticker'>
        <div className='investment'>
          <span className='symbol'>{ticker.symbol}</span>
          <i className='separator' />
          <span className='cost'>{`${ticker.qty} * ${ticker.price} = ${(ticker.qty * ticker.price).toLocaleString()}`}</span>
          <i className='separator' />
          <span className='age'>{daysOld}</span>
        </div>
        <div className={`return ${loss ? 'loss' : 'gain'}`}>
          <span className='current-price'>${ticker.currentPrice}</span>
          <i className='separator' />
          <span className='profit'>${profit.toLocaleString()}</span>
          <i className='separator' />
          <span className='gains'>{gains}%</span>
        </div>
        <ul className='actions'>
          <li onClick={this.removeTicker}>X</li>
        </ul>
      </div>
    )
  }
}

export default Ticker;
