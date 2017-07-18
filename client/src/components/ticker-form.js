import React, {Component} from 'react';
// import AutoSuggest from 'react-autosuggest';
import InlineSelect from './inline-select';
import {actions, blank_ticker, exchanges} from './data/constants'
import '../css/ticker-form.css';

class TickerForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      closing: false,
      ticker: Object.assign({}, blank_ticker, props.ticker)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ticker: Object.assign({}, nextProps.ticker)})
  }

  saveForm = (w) => {
    w.preventDefault()
    let trans = Object.assign({}, this.state.ticker);
    this.clearForm();
    this.props.onSave(trans)
  }

  cancelForm = (e) => {
    e.preventDefault();
    this.props.onClose()
  };

  clearForm = () => {
    this.setState({ticker: blank_ticker})
  };

  deleteTicker = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.ticker.id);
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
    let ticker = this.state.ticker;
    ticker.date = this.getDateFunc();
    this.setState = ({ticker});
  };

  handleInputChange = (e) => {
    let ticker = {};
    ticker[e.target.id] = e.target.value;
    this.setState({ticker: Object.assign({}, this.state.ticker, ticker)});
  }

  handleActionSelect = (selected) => {
    this.setState({ticker: Object.assign({}, this.state.ticker, {action: selected})})
  }

  handleExchangeSelect = (selected) => {
    this.setState({ticker: Object.assign({}, this.state.ticker, {exchange: selected})})
  }

  render() {
    let ticker = this.state.ticker;
    let mode = this.props.mode;
    let deleteElm = (
      <button className="alternate" onClick={this.deleteTicker}><span className="icon-trash-o" />
        Delete
      </button>
    )
    return (
      <div className="ticker-form">
        <form onSubmit={this.saveForm}>
          <ul className="fields">
            <li className="field">
              <InlineSelect
                label="Action"
                options={[
                {
                  text: actions.buy,
                  value: actions.buy
                }, {
                  text: actions.sell,
                  value: actions.sell
                }]}
                selected={ticker.action}
                onSelect={this.handleActionSelect.bind(this)}/>
            </li>
            <li className="field">
              <InlineSelect
                label="Exchange"
                options={
                  Object.keys(exchanges).map((e) =>({
                    text: exchanges[e],
                    value: exchanges[e]
                  }))
                }
                  selected={ticker.exchange}
                  onSelect={this.handleExchangeSelect}
                />
            </li>
            <li className="field">
              <div className="input-field">
                <input
                 id="symbol"
                 type="text"
                 value={ticker.symbol}
                 onChange={this.handleInputChange}
                 placeholder="Symbol"
                 className="symbol"
                 pattern="[a-zA-Z]+"
                 required="required"
                />
              </div>
            </li>
            <li className="field">
              <div className="input-field">
                <input
                  id="price"
                  type="tel"
                  value={ticker.price}
                  placeholder="Price"
                  className="price"
                  onChange={this.handleInputChange}
                  pattern="^\d{0,8}(\.\d{1,4})?$"
                  required="required"
                />
              </div>
            </li>
            <li className="field">
              <div className="input-field">
                <input
                  id="quantity"
                  type="tel"
                  value={ticker.quantity}
                  onChange={this.handleInputChange}
                  placeholder="Quantity"
                  className="quantity"
                  pattern="^\d{0,8}$"
                  required="required"
                />
              </div>
            </li>
            <li className="field">
              <div className="input-field ticker-date">
                <input
                  id="date"
                  type="text"
                  value={ticker.date}
                  placeholder="DD/MM/YYYY"
                  className="date"
                  onChange={this.handleInputChange}
                  pattern="\d{1,2}/\d{1,2}/\d{4}"
                  required="required"
                />
                <span className="icon-calender-plus-o today" onClick={this.injectDate}/>
              </div>
            </li>
          </ul>
          <div className="cta-buttons">
            {
              mode === 'edit' ? deleteElm : null
            }
            <button
              className="secondary"
              onClick={this.cancelForm}>Cancel
            </button>
            <button
              className="primary"
              type="submit">
              {mode === 'edit' ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default TickerForm;
