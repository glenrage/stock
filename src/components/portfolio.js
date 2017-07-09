import React, {Component} from 'react';
import Ticker from './ticker';

class Portfolio extends Component {

  render() {
    return (
      <div className="portfolio">
        {
          this.props.tickers.map((ticker) => <Ticker key={ticker.id} ticker={ticker} />)
        }
      </div>
    )
  }
}

export default Portfolio;
