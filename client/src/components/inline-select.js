import React, {Component} from "react";
import classnames from "classnames";
import "../css/inline-select.css";

class InlineSelect extends Component {
  render() {
    return (

      <div className='inline-select'>
        <label>{this.props.label}</label>
          <ul>
          {
            this.props.options.map((o, idx) => {
              let optionClassNames = classnames({
                option: true,
                selected: o.value === this.props.selected
              });

              return (
                <li
                    className={optionClassNames} key={o.value || idx}
                    onClick={this.props.onSelect.bind(this, o.value)}
                  >
                  {o.text}
                </li>
              )
            })
          }
          </ul>
        </div>
    )
  }
}

export default InlineSelect;
