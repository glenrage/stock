import React, {Component} from 'react';
import '../css/transaction-form.css';
import InlineSelect from './inline-select';

class Form extends Component {

  constructor(props){
    super(props)

    this.state = {}

  }

  saveForm = (w) => {
    w.preventDefault()
    let trans = {
      symbol: this.symbolElm.value || '',
      price: this.priceElm.value || '',
      qty: this.qtyElm.value || '',
      date: this.dateElm.value || '',
    };
    this.clearForm();
    this.props.onSave(trans)
  }

  cancelForm = () => {
    this.clearForm();
    this.props.onCancel();
  }

  clearForm = () => {
    this.symbolElm.value = '';
    this.priceElm.value = '';
    this.qtyElm.value = '';
    this.dateElm.value = '';
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
    let trans = this.props.trans || {};

    return (
        <form onSubmit={this.saveForm}>

          <ul className='fields options'>
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
          </ul>
          <ul className='fields inline'>
            <li className='field'>

              <input
                id='symbol'
                type='text'
                defaultValue={trans.symbol}
                placeholder='Symbol'
                className='symbol'
                ref={(elm) => this.symbolElm = elm}
                pattern='[a-zA-Z]+'
                required='required'
              />
            </li>
            <li className='field'>

        <input
          id='price'
          type='tel'
          defaultValue={trans.price}
          placeholder='Price'
          className='price'
          ref={(elm) => this.priceElm = elm}
          pattern='^\d{0,8}(\.\d{1,4})?$'
          required='required'
        />
        </li>
        <li className="field">

        <input
          id='quantity'
          type='tel'
          defaultValue={trans.qty}
          placeholder='Qty'
          className='qty'
          ref={(elm) => this.qtyElm = elm}
          pattern='^\d{0,8}$'
          required='required'
        />
        </li>
        <li className='field'>

        <input
          id='date'
          type='text'
          defaultValue={trans.date}
          placeholder='DD/MM/YYYY'
          className='date'
          ref={(elm) => this.dateElm = elm}
          pattern='\d{1,2}/\d{1,2}/\d{4}'
          required='required'
        />
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
