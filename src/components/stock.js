import React, {Component} from 'react';
import classnames from 'classnames';
import '../css/stock.css'
import Gauge from './gauge';
import Helpers from '../helpers'

class Stock extends Component {

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

  deleteStock = () => {
    this.setState({
      deleted: true
    }, () => {
      setTimeout(() => {
        this.props.onDeleteStock(this.props.stock.id)
      }, 600)
    });
  }

  editStock = () => {
    this.props.onEditStock(this.props.stock)
  }

  render() {
    let stock = this.props.stock;

    let cost = stock.quantity * stock.price;
    let value = stock.quantity * stock.currentPrice;
    let profit = value - cost;

    let daysOld = this.daysOld(stock.date);
    let gains = Math.ceil((100 * profit) / cost);
    // let changeInPrice = stock.currentPrice - stock.price;

    let priceChangeClassNames = classnames({
      'volatile-value': true,
      'price-change': true,
      down: stock.changePercent < 0,
      up: stock.changePercent >= 0
    });

    let profitChangeClassNames = classnames({
      'volatile-value': true,
      'profit-change': true,
      down: profit < 0,
      up: profit > 0
    });

    let stockClassNames = classnames({
      stock: true,
      animated: true,
      zoomOut: this.state.deleted
    })


    return (
      <div className={stockClassNames} onClick={this.editStock}>
        <div className='investment line-items'>
          <p className='bought-price'>
            {Helpers.currency(stock.price)}
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
              {stock.symbol}
            </p>
            <p className='market-price'>
              {Helpers.currency(stock.currentPrice)}
            </p>
            <p className={priceChangeClassNames}>
              {stock.change}
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
          <li onClick={this.deleteStock}>DEL</li>
        </ul>
      </div>
    )
  }
}

export default Stock;
