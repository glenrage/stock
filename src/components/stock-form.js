import React, {Component} from 'react';
import AutoSuggest from 'react-autosuggest';
import InlineSelect from './inline-select';
import {actions, demo_stock, exchanges} from './data/constants'

import '../css/stock-form.css';

class StockForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      closing: false,
      stock: Object.assign({}, demo_stock, props.stock)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({stock: Object.assign({}, nextProps.stock)})
  }

  saveForm = (w) => {
    w.preventDefault()
    console.log('save form state :' + this.state)
    let trans = Object.assign({}, this.state.stock);
    this.clearForm();
    this.props.onSave(trans)
  }

  cancelForm = (e) => {
    e.preventDefault();
    this.props.onClose()
  };

  clearForm = () => {
    this.setState({stock: demo_stock})
  };

  deleteStock = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.stock.id);
  };

  getDateFunc = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  };

  injectDate = () => {
    let stock = this.state.stock;
    stock.date = this.getDateFunc();
    this.setState = ({stock});
  };

  handleInputChange = (e) => {
    console.log('about to change ', e.target.id)
    let stock = {};
    stock[e.target.id] = e.target.value;
    this.setState({stock: Object.assign({}, this.state.stock, stock)});
  }

  handleActionSelect = (selected) => {
    console.log('selected ' + selected)
    this.setState({stock: Object.assign({}, this.state.stock, {action: selected})})
  }

  handleExchangeSelect = (selected) => {
    this.setState({stock: Object.assign({}, this.state.stock, {exchange: selected})})
  }

  render() {
    let stock = this.state.stock;
    let symbolProps = {
      id: 'symbol',
      type: 'text',
      value: stock.symbol,
      onChange: this.handleInputChange,
      placeholder: 'Symbol',
      className: 'symbol',
      required: 'required'
    };
    let mode = this.props.mode;
    let deleteElm = (
      <button className='alternate' onClick={this.deleteStock}><span className='icon-trash-o'/>
        Delete
      </button>
    )
    return (
      <div className='stock-form'>
        <form onSubmit={this.saveForm}>
          <ul className='fields'>
            <li className='field'>
              <InlineSelect
                label='Action'
                options={[
                {
                  text: actions.buy,
                  value: actions.buy
                }, {
                  text: actions.sell,
                  value: actions.sell
                }]}
                selected={stock.action}
                onSelect={this.handleActionSelect.bind(this)}/>
            </li>
            <li className='field'>
              <InlineSelect
                label='Exchange'
                options={Object.keys(exchanges).map((e) =>
                ({text: exchanges[e],
                  value: exchanges[e]}))}
                  selected={stock.exchange}
                  onSelect={this.handleExchangeSelect}
                />
            </li>
            <li className='field'>
              <div className='input-field'>
                <input id='symbol'
                 type='text'
                 value={stock.symbol}
                 onChange={this.handleInputChange}
                 placeholder='Symbol'
                 className='symbol'
                 pattern='[a-zA-Z]+'
                 required='required'
                />
              </div>
            </li>
            <li className='field'>
              <div className='input-field'>
                <input id='price'
                 type='tel'
                 value={stock.price}
                 placeholder='Price'
                 className='price'
                 onChange={this.handleInputChange}
                 pattern='^\d{0,8}(\.\d{1,4})?$'
                 required='required'
                />
              </div>
            </li>
            <li className="field">
              <div className='input-field'>
                <input
                  id='quantity'
                  type='tel'
                  value={stock.quantity}
                  placeholder='Quantity'
                  className='quantity'
                  onChange={this.handleInputChange}
                  pattern='^\d{0,8}$'
                  required='required'
                />
              </div>
            </li>
            <li className='field'>
              <div className='input-field stock-date'>
                <input
                  id='date'
                  type='text'
                  value={stock.date}
                  placeholder='DD/MM/YYYY'
                  className='date'
                  onChange={this.handleInputChange}
                  pattern='\d{1,2}/\d{1,2}/\d{4}'
                  required='required'
                />
                <span className='icon-calender-plus-o today' onClick={this.injectDate}/>
              </div>
            </li>
          </ul>
          <div className='cta-buttons'>
            {
              mode === 'edit' ? deleteElm : null
            }
            <button
              className='secondary'
              onClick={this.cancelForm}>Cancel
            </button>
            <button
              className='primary'
              type='submit'>
              {this.props.mode === 'edit' ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default StockForm;
