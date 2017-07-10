import React, {Component} from 'react';

import '../css/transaction-form.css'

class Form extends Component {
  render() {
    let trans = this.props.trans || {};

    // let formClassNames = classnames({
    //       animated: true,
    //       zoomIn: !this.state.closing,
    //       zoomOut: this.state.closing
    //   });

    return (
      // <div className='transaction-form'>
        <form onSubmit={this.save}>


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
        <li className="field">

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
        <button className='secondary'>Cancel</button>
        <button className='primary'>Add</button>
        </div>

      </form>

    )
  }
}

class TransactionForm extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this)
    this.clear = this.clear.bind(this)
    this.closeForm = this.closeForm.bind(this);

    this.state = {
      closing: false
    };

  }

  save(w) {
    w.preventDefault()
    let trans = {
      symbol: this.symbolElm.value || '',
      price: this.priceElm.value || '',
      qty: this.qtyElm.value || '',
      date: this.dateElm.value || '',
    };
    this.props.onSave(trans)
    this.clear();
  }

  clear() {
    this.symbolElm.value = '';
    this.priceElm.value = '';
    this.qtyElm.value = '';
    this.dateElm.value = '';
  }

  closeForm(e) {
    e.preventDefault();
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
             <Form {...this.props} />
         </div>
     )
   }
}


TransactionForm.defaultProps = {
  trans: {
    id: '',
    symbol: '',
    price: '',
    qty: '',
    date: '',
  }
}

export default TransactionForm;
