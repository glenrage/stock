import React, {Component} from 'react';

import classnames from 'classnames';
import NetWorthMeter from './networth-meter';
import Stock from './stock';
import Helpers from '../helpers';
import '../css/portfolio.css';

class EmptyPortfolio extends Component {
  render() {
    return (
      <div className="empty-portfolio">
          <p className="intro"> Portfolio Tracker </p>
          <div className="instruction">
          <p> Start with </p>
          <button onClick={this.props.onSamplePortfolio}> Sample Portfolio</button>
          <p> or, add stocks and customize your own portfolio. </p>
        <button onClick={this.props.onAddStock}> Add stock</button>
        </div>
      </div>
    )
  }
}

class StockPortfolio extends Component {

  render() {

    let netWorth = this.props.stocks.reduce((memo, s) => {
      console.log('netWorth : ' + s)
      memo.invested += (s.quantity * s.price);
      memo.current += (s.quantity * s.currentPrice);
      return memo;
    }, {invested: 0, current: 0});

    return (

      <div className="stock-portfolio">
        <div className="netWorth">
          <NetWorthMeter netWorth={netWorth} stocks={this.props.stocks}/>
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
      <div className="portfolio">
        {elm}
      </div>
    )
  }
}

export default Portfolio;
