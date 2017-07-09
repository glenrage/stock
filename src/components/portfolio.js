import React, {Component} from 'react';

import classnames from 'classnames';
import Ticker from './ticker';
import Helpers from '../helpers'
import '../css/portfolio.css'

class Portfolio extends Component {


  render() {
    console.log(this.props.tickers)
    let wealth = this.props.tickers.reduce((memo, s) => {

      console.log('wealth : ' + s)
      memo.invested += (s.qty * s.price);
      memo.current += (s.qty * s.currentPrice);
      return memo;
    }, {invested: 0, current: 0});

    let wealthChange = wealth.current - wealth.invested;

    let wealthChangeClassNames = classnames({
      'wealth-change': true,
      'voaltile-value': true,
      up: wealthChange > 0,
      down: wealthChange < 0
    });

    return (
      <div className='portfolio'>
        <div className='wealth'>
          <p className='current'>
            {Helpers.currency(wealth.current)}
          </p>
          <p className={wealthChangeClassNames}>
            {wealthChange.toLocaleString()}
          </p>


        </div>
        {
          this.props.tickers.map((ticker) => <Ticker key={ticker.id} ticker={ticker} {...this.props} />)
        }
      </div>
    )
  }
}

export default Portfolio;
