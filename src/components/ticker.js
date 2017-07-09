import React, {Component} from 'react';
import '../css/ticker.css'

class Ticker extends Component {

  render() {
    let ticker = this.props.ticker;

    return (
      <div className="ticker">
        <p className="symbol cell">{ticker.symbol}</p>
        <p className="current-price cell">{ticker.currentPrice}</p>
        <p className="price cell">{ticker.price}</p>
        <p className="qty cell">{ticker.qty}</p>
        <p className="date cell">{ticker.date}</p>
      </div>
    )
  }
}

export default Ticker;
