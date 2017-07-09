'use strict';

import React, {Component} from 'react';
import '../css/gauge.css'

class Gauge extends Component {

  calcProgressOffset(progress) {
    return 339.292 * (1 - progress);
  }

  render() {

    let val = this.props.value;

    if(val < -100) {
      val = -100;
    } else if (val > 100) {
      val = 100;
    }

    let progressColor = (val < 0) ? '#e74c3c' : '#27ae60';

    let offset = this.calcProgressOffset(val / 100)

    return (
      <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
         <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12"/>
         <circle cx="60" cy="60" r="54" fill="none" stroke={progressColor} strokeWidth="12"
                 strokeDasharray="339.292" strokeDashoffset={offset} />
     </svg>
    )
  }
}

export default Gauge
