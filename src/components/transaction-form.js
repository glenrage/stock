import React, {Component} from 'react';
import '../css/transaction-form.css';
import InlineSelect from './inline-select';

let demo_ticker = {
  symbol: 'AMD',
  price: '10',
  quantity: '100',
  date: '10/10/2010',
  action: '',
  exchange: ''
};

class Form extends Component {

  constructor(props){
    super(props)

    this.state = {
      ticker: demo_ticker
    }

  }

  saveForm = (w) => {
    w.preventDefault()

    console.log('save form state :' + this.state)
    return;
    let trans = Object.assign({}, this.state);
    this.clearForm();
    this.props.onSave(trans)
  }

  cancelForm = () => {
    this.clearForm();
    this.props.onCancel();
  }

  clearForm = () => {
    this.setState({
      ticker: demo_ticker
    })
  }

  handleInputChange = (e) => {
    console.log('about to change ', e.target.id)
  }

  handleActionSelect = (selected) => {
    console.log('selected ' + selected)
    this.setState({
      action: selected
    })
  }

  handleExchangeSelect = (selected) => {
    this.setState({
      exchange: selected
    })
  }

  render() {
    let trans = this.state.trans || {};

    return (
        <form onSubmit={this.saveForm}>

          <ul className='fields'>
            <li className='field'>
              <InlineSelect
                label='Action'
                options={[{
                  text: 'Bought',
                  value: 'bought'
                }, {
                  text: 'Sold',
                  value: 'sold'
                }]}
                selected={this.state.action}
                onSelect={this.handleActionSelect}
              />
            </li>
            <li className='field'>
              <InlineSelect
                label='Exchange'
                options={[{
                  text: 'NYSE',
                  value: 'NYSE'
                }, {
                  text: 'NASDAQ',
                  value: 'NASDAQ'
                }]}
                selected={this.state.exchange}
                onSelect={this.handleExchangeSelect}
              />
            </li>

          <li className='field'>
          <div className='input-field'>
              <input
                id='symbol'
                type='text'
                value={trans.symbol}
                placeholder='Symbol'
                className='symbol'

                pattern='[a-zA-Z]+'
                required='required'
              />
            </div>
          </li>
            <li className='field'>
              <div className='input-field'>

        <input
          id='price'
          type='tel'
          value={trans.price}
          placeholder='Price'
          className='price'

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
          value={trans.qty}
          placeholder='Qty'
          className='qty'

          pattern='^\d{0,8}$'
          required='required'
        />
        </div>
        </li>
        <li className='field'>
          <div className='input-field'>
        <input
          id='date'
          type='text'
          value={trans.date}
          placeholder='DD/MM/YYYY'
          className='date'

          pattern='\d{1,2}/\d{1,2}/\d{4}'
          required='required'
        />
        </div>
        </li>
        </ul>
        <div className='cta-buttons'>
        <button className='secondary' onClick={this.cancelForm}>Cancel</button>
        <button className='primary' type='submit'>Add</button>
        </div>

      </form>

    )
  }
}

Form.defaultProps = {
  trans: {
    id: '',
    symbol: '',
    price: '',
    qty: '',
    date: '',
  }
}

class TransactionForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      closing: false
    };

  }

  save = (trans) => {
    this.props.onSave(trans)
  }

  close = () => {
    this.setState({
      closing: true
    }, () => {
        setTimeout(() => {
          this.props.onClose()
        }, 300)
      })
  }
    render() {
        return (
          <div className='transaction-form'>
          <Form
            {...this.props}
            onSave={this.save}
            onCancel={this.close}
          />
          </div>
        )
  }
}



export default TransactionForm;
