import React, {Component} from 'react';

import classnames from 'classnames';
import Stock from './stock';
import Helpers from '../helpers'
import '../css/portfolio.css'

class EmptyPortfolio extends Component {
  render() {
    return (
      <div className='empty-portfolio'>
        Add stocks to your portfolio
        <button onClick={this.props.onAddStock}> add stock</button>
      </div>
    )
  }
}

class StockPortfolio extends Component {

  render() {

    let wealth = this.props.stocks.reduce((memo, s) => {

      console.log('wealth : ' + s)
      memo.invested += (s.quantity * s.price);
      memo.current += (s.quantity * s.currentPrice);
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

      <div className='stock-portfolio'>
        <div className='wealth'>
          <p className='current'>
            {Helpers.currency(wealth.current)}
          </p>
          <p className={wealthChangeClassNames}>
            {wealthChange.toLocaleString()}
          </p>
        </div>
        {
          this.props.stocks.map((stock) => <Stock key={stock.id} stock={stock} {...this.props} />)
        }
      </div>
    )
  }
}

class Portfolio extends Component {
  render() {

    let elm = null;
    if (this.props.stocks.length > 0 ) {
      elm = <StockPortfolio {...this.props} />
    } else {
      elm = <EmptyPortfolio {...this.props} />
    }

    return (
      <div className='portfolio'>
        {elm}
      </div>
    )
  }
}


export default Portfolio;
