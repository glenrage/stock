import React, {Component} from "react";
import classnames from "classnames";
import "../css/formlayer.css";

class FormLayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      closing: false
    };
  }

  close = () => {
    this.setState({
      closing: true
    }, () => {
      setTimeout(() => {
        this.setState({closing: false});
        this.props.onClose();
      }, 250);
    })
  }

  render() {

    let isOpen = this.props.open;
    let formlayerClasses = classnames({
      formlayer: true,
      open: isOpen,
      closing: this.state.closing
    });

    let contentsClass = classnames({
      contents: true,
      animated: true,
      slideInUp: isOpen && !this.state.closing,
      slideOutDown: this.state.closing
    });

    return (
      <div className={formlayerClasses}>
        <div className={contentsClass}>
          <div className="wrapper">
            <header>
              <h2 className="title">{this.props.title}</h2>
              <button className="close-formlayer" onClick={this.close}>Close</button>
            </header>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default FormLayer;
