import React, {Component} from 'react';
import '../css/ticker.css'

class Ticker extends Component {

  render() {
    let ticker = this.props.ticker;

    let cost = ticker.qty * ticker.price;
    let total = ticker.qty * ticker.currentPrice;
    let profit = total - cost;
    let loss = (profit < 0)

    return (
      <div className='ticker'>
        <div className='investment'>
          <span className='symbol'>{ticker.symbol}</span>
          <i className='separator' />
          <span className='cost'>{`${ticker.qty} * ${ticker.price} = ${(ticker.qty * ticker.price).toLocaleString()}`}</span>
          <i className='separator' />
          <span className='age'>0 days</span>
        </div>
        <div className={`return ${loss ? 'loss' : 'gain'}`}>
          <span className='current-price'>${ticker.currentPrice}</span>
          <i className='separator' />
          <span className='profit'>${profit.toLocaleString()}</span>
          <i className='separator' />
          <span className='profit'>${total.toLocaleString()}</span>
        </div>
      </div>
    )
  }
}

export default Ticker;
