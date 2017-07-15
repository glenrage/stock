import React, {Component} from 'react';
import classnames from 'classnames';
import '../css/gauge.css'

class Gauge extends Component {
  calcProgressOffset(progress) {
    return 339.292 * (1 - progress);
  }

  render() {

    let val = this.props.value;
    let size = 120;
    let radius = size / 2;
    let trackRadius = radius - 6;
    let centerX = size / 2;
    let centerY = size / 2;

    if (val < -100) {
      val = -100;
    } else if (val > 100) {
      val = 100;
    }

    let progressClassNames = classnames({
      'gauge-progress-bar': true,
      'up': val >= 0,
      'down': val < 0
    });
    let indicatorClassNames = classnames({
      'indicator': true,
      'up': val >= 0,
      'down': val < 0
    });
    let offset = this.calcProgressOffset(val / 200);

    let needleAngle = (180 * val) / 100;

    let gaugeTicks = [];
    for (let i = 0; i <= 360; i += 10) {
      gaugeTicks.push(i);
    }
    return (
      <svg className="gauge-progress" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>

          <line id="tick" x1={size - 16} y1={centerY} x2={size - 10} y2={centerY} strokeLinecap={'round'}/>

          <gaugeGradient id="gaugeCenter" cx="50%" cy="50%" r="50%">
            <stop stopColor="#dc3a79" offset="0"/>
            <stop stopColor="#241d3b" offset="1"/>
          </gaugeGradient>

        </defs>

        <g id="ticks">
          {gaugeTicks.map((tick) => {
            let tickClassNames = classnames({
              tick: true,
              quarterTick: !!{
                0: 1,
                90: 1,
                180: 1,
                270: 1,
                360: 1
              }[tick]
            });
            return <use className={tickClassNames} key={'tick-' + tick} href="#tick" transform={`rotate(${tick} ${centerX} ${centerY})`}/>
          })
        }

        </g>

        <g id="tickLabels" className="tick-labels">
          <text x={85} y={65} textAnchor="middle" transform="rotate(90 90,65)">0</text>
          <text x={45} y={33} textAnchor="middle" transform="rotate(90 53,35)">50</text>
          <text x={15} y={65} textAnchor="middle" transform="rotate(90 20,65)">100</text>
          <text x={50} y={93} textAnchor="middle" transform="rotate(90 53,95)">50</text>
        </g>

        <circle className="gauge-track" cx={centerX} cy={centerY} r={trackRadius} fill="none"/>

        <circle className={progressClassNames} cx={centerX} cy={centerY} r={trackRadius} fill="none" strokeDasharray="339.292" strokeDashoffset={offset}/>

        <g id="needle" className="needle">
          <polygon className="point" points="60,50 60,70 120,60">
            <animateTransform attributeName="transform" type="rotate" from={`0 60 60`} to={`${needleAngle} ${ 60} ${ 60}`} dur="0.5s" fill="freeze"/>
          </polygon>
          <circle className="center" cx={centerX} cy={centerY} r="23"/>
        </g>
        <text x={centerX} y={'50'} textAnchor="middle" transform="rotate(90 60,60)" className={indicatorClassNames}>
          {this.props.value >= 0
            ? '▲'
            : ''}
        </text>
        <text x={centerX} y="67" textAnchor="middle" transform="rotate(90 60,60)" className="value">
          {this.props.value}
        </text>
        <text x={centerX} y={'78'} textAnchor="middle" transform="rotate(90 60,60)" className={indicatorClassNames}>
          {this.props.value >= 0
            ? ''
            : '▼'}
        </text>
      </svg>
    );
  }
}

export default Gauge
