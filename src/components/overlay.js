import React, {Component} from "react";
import classnames from "classnames";
import "../css/overlay.css";

class Overlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    toggle = () => {
        if (this.state.open) {
            this.setState({
                closing: true,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        open: false,
                        closing: false
                    });
                }, 250);
            });
        } else {
            this.setState({
                open: true
            })
        }

    }

    render() {

        let overlayClasses = classnames({
            overlay: true,
            open: this.state.open
        });

        let contentsClass = classnames({
            contents: true,
            animated: true,
            slideInUp: this.state.open && !this.state.closing,
            slideOutDown: this.state.closing
        });

        return (
           <div className={overlayClasses}>
               <div className={contentsClass}>
                   <div className="wrapper">
                       <header>
                           <h2 className="title">{this.props.title}</h2>
                           <button className="close-overlay" onClick={this.close}>✕</button>
                       </header>
                       {this.props.children}
                   </div>
               </div>
           </div>
       )
   }
}

export default Overlay;
