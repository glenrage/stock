import React, {Component} from "react";
import classnames from "classnames";
import "../css/overlay.css";

class Overlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closing: false
        };
    }

    close = () => {
            this.setState({
                closing: true,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        closing: false
                    });
                    this.props.onClose();
                }, 250);
          })
    }

    render() {

        let isOpen = this.props.open;

        let overlayClasses = classnames({
            overlay: true,
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
           <div className={overlayClasses}>
               <div className={contentsClass}>
                   <div className='wrapper'>
                       <header>
                           <h2 className='title'>{this.props.title}</h2>
                           <button className='close-overlay' onClick={this.close}>close overlay</button>
                       </header>
                       {this.props.children}
                   </div>
               </div>
           </div>
       )
   }
}

export default Overlay;
