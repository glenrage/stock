import React, {Component} from 'react';

// import classnames from 'classnames';
import NetWorthMeter from './networth-meter';
import Ticker from './ticker';
// import Helpers from '../helpers';
import '../css/portfolio.css';

class EmptyPortfolio extends Component {
  render() {
    return (
      <div className="empty-portfolio">
          <p className="intro"> Portfolio Tracker </p>
          <div className="instruction">
          <p> Start with </p>
          <button onClick={this.props.onSamplePortfolio}> Sample Portfolio</button>

        </div>
      </div>
    )
  }
}

// <p> or, add tickers and customize your own portfolio. </p>
// <button onClick={this.props.onAddTicker}> Add ticker</button>

class TickerPortfolio extends Component {

  render() {

    let netWorth = this.props.tickers.reduce((memo, s) => {
      console.log('netWorth : ' + s)
      memo.invested += (s.quantity * s.price);
      memo.current += (s.quantity * s.currentPrice);
      return memo;
    }, {invested: 0, current: 0});

    return (

      <div className="ticker-portfolio">
        <div className="netWorth">
          <NetWorthMeter
            netWorth={netWorth}
            tickers={this.props.tickers}
          />
        </div>
        {
          this.props.tickers.map((ticker) => <Ticker key={ticker.id} ticker={ticker} {...this.props} />)
        }
      </div>
    )
  }
}

class Portfolio extends Component {
  render() {

    let elm = null;
    if (this.props.tickers.length > 0 ) {
      elm = <TickerPortfolio {...this.props} />
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
