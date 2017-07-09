import React, {Component} from 'react';

class Ticker extends Component {

  render() {
    let ticker = this.props.ticker;

    return (
      <div className="ticker">
        <p>{ticker.symbol}</p>
        <p>{ticker.price}</p>
        <p>{ticker.qty}</p>
        <p>{ticker.date}</p>
      </div>
    )
  }
}

export default Ticker;
