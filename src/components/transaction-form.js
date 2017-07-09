import React, {Component} from 'react';
import '../css/transaction-form.css'

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this)
    this.clear = this.clear.bind(this)
  }

  save(w) {
    w.preventDefault()
    let form = {
      symbol: this.symbolElm.value || '',
      price: this.priceElm.value || '',
      qty: this.qtyElm.value || '',
      date: this.dateElm.value || '',
    };
    this.props.onSave(form)
    this.clear();
  }

  clear() {
    this.symbolElm.value = '';
    this.priceElm.value = '';
    this.qtyElm.value = '';
    this.dateElm.value = '';
  }

  render() {
    let form = this.props.form || {};
    return (
      <form className='transaction-form' onSubmit={this.save}>
        <input
          pattern='[a-zA-Z]+'
          required='required'
          id='symbol'
          type='text'
          defaultValue={form.symbol}
          placeholder='Symbol'
          className='input-field symbol'
          ref={(elm) => this.symbolElm = elm}
        />
        <input
          id='price'
          type='tel'
          defaultValue={form.symbol}
          placeholder='Price'
          className='input-field price'
          pattern='^\d{0,8}(\.\d{1,4})?$'
          required='required'
          ref={(elm) => this.priceElm = elm}
        />
        <input
          id='quantity'
          type='tel'
          defaultValue={form.qty}
          placeholder='Qty'
          className='input-field qty'
          pattern='^\d{0,8}$'
          required='required'
          ref={(elm) => this.qtyElm = elm}
        />
        <input
          id='date'
          type='text'
          defaultValue={form.date}
          placeholder='DD/MM/YYYY'
          required='required'
          pattern='\d{1,2}/\d{1,2}/\d{4}'
          className='input-field date'
          ref={(elm) => this.dateElm = elm}
        />
        <input
          id='btn-submit'
          type='submit'
          value={'+'}
          className='input-field btn'
        />
      </form>
    )
  }
}

TransactionForm.defaultProps = {
  form: {
    id: '',
    symbol: '',
    price: '',
    qty: '',
    date: '',
  }
}

export default TransactionForm;
